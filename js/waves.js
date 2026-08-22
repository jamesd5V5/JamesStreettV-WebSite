(function (global) {
  var SEA_ORIGIN = performance.now();

  function hash(x, y) {
    var n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
    return n - Math.floor(n);
  }

  function seaTime(reduced) {
    return reduced ? 0 : (performance.now() - SEA_ORIGIN) / 1000;
  }

  function seaSwell(x, seaY, t, dpi) {
    var row = Math.max(2, Math.round(2.5 * dpi));
    var band = Math.floor(Math.floor(seaY / row) / 3);
    return (
      Math.sin(t * 0.5 + band * 0.52 + x * 0.0036) * 5.4 * dpi +
      Math.sin(t * 0.28 - band * 0.31 + x * 0.0018) * 2.6 * dpi
    );
  }

  function seaDrift(seaY, seaH, t) {
    var ny = seaH > 0 ? seaY / seaH : 0;
    return t * (9 + ny * 14);
  }

  function WaveBand(canvas, options) {
    options = options || {};
    var reduced = !!options.reduced;
    var sparkOnly = !!options.sparkOnly;
    var rimSparkCount = sparkOnly ? (options.sparkCount || 180) : 0;
    var ctx = canvas.getContext("2d", sparkOnly ? { alpha: true } : { alpha: false });
    if (!ctx) {
      return { setPaused: function () {}, destroy: function () {} };
    }

    var paused = false;
    var raf = 0;

    function size() {
      var dpi = Math.min(window.devicePixelRatio || 1, 1.25);
      var w = canvas.clientWidth;
      var h = canvas.clientHeight;
      var pw = Math.max(1, Math.floor(w * dpi));
      var ph = Math.max(1, Math.floor(h * dpi));
      if (canvas.width !== pw || canvas.height !== ph) {
        canvas.width = pw;
        canvas.height = ph;
      }
      return { w: pw, h: ph, dpi: dpi };
    }

    var fadeGrad = null;
    var fadeGradH = 0;
    var rimSparks = sparkOnly ? buildRimSparks(rimSparkCount) : null;

    function buildRimSparks(count) {
      var sparks = [];
      for (var i = 0; i < count; i++) {
        sparks.push({
          pos: hash(i, 1.31),
          n: hash(i, 2.77),
          phase: hash(i, 4.13) * Math.PI * 2,
          period: 3.5 + hash(i, 5.9) * 4
        });
      }
      return sparks;
    }

    function rimEdgeFor(i, count, w, h, insetTop, insetBottom, innerH) {
      var span = 2 * w + 2 * innerH;
      var t = ((i + 0.5) / count) * span;
      if (t < w) return 0;
      t -= w;
      if (t < w) return 1;
      t -= w;
      if (t < innerH) return 2;
      return 3;
    }

    function creditClearZone(workEl, canvasRect, scaleX, scaleY) {
      var credit = workEl.querySelector(".work-credit span") || workEl.querySelector(".work-credit");
      if (!credit) return null;
      var pad = 6;
      var r = credit.getBoundingClientRect();
      if (!r.width || !r.height) return null;
      return {
        left: (r.left - canvasRect.left) * scaleX - pad * scaleX,
        right: (r.right - canvasRect.left) * scaleX + pad * scaleX,
        top: (r.top - canvasRect.top) * scaleY - pad * scaleY,
        bottom: (r.bottom - canvasRect.top) * scaleY + pad * scaleY
      };
    }

    function sparkInClearZone(x, y, len, thick, zone) {
      if (!zone) return false;
      return x < zone.right && x + len > zone.left && y < zone.bottom && y + thick > zone.top;
    }

    function drawRimSparks(w, h, t, dpi) {
      var workEl = canvas.parentElement;
      var rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      var style = workEl ? getComputedStyle(workEl) : null;
      var padTop = style ? parseFloat(style.paddingTop) : rem;
      var padBottom = style ? parseFloat(style.paddingBottom) : padTop;
      var padLeft = style ? parseFloat(style.paddingLeft) : rem;
      var insetTop = padTop * dpi;
      var insetBottom = padBottom * dpi;
      var insetX = padLeft * dpi;
      if (insetTop < 2 && insetBottom < 2) return;

      var innerH = Math.max(1, h - insetTop - insetBottom);
      var thick = Math.max(1, dpi * 0.85);
      var maxLenTop = insetTop * 1.75;
      var maxLenBottom = insetBottom * 1.75;
      var maxLenSide = insetX * 1.75;
      var canvasRect = canvas.getBoundingClientRect();
      var scaleX = canvasRect.width ? w / canvasRect.width : dpi;
      var scaleY = canvasRect.height ? h / canvasRect.height : dpi;
      var clearZone = workEl ? creditClearZone(workEl, canvasRect, scaleX, scaleY) : null;
      ctx.fillStyle = "#f3efe6";

      for (var i = 0; i < rimSparks.length; i++) {
        var spark = rimSparks[i];
        var pulse = 0.5 + 0.5 * Math.sin((t / spark.period) * Math.PI * 2 + spark.phase);
        if (pulse < 0.12) continue;

        var edge = rimEdgeFor(i, rimSparks.length, w, h, insetTop, insetBottom, innerH);
        var along = spark.pos;
        var len = Math.min((10 + spark.n * 22) * dpi, maxLenTop);
        var swell = 0;
        var x = 0;
        var y = 0;

        if (edge === 0) {
          y = spark.n * insetTop;
          x = along * Math.max(1, w - len);
          swell = seaSwell(x, y, t, dpi) * 0.35;
        } else if (edge === 1) {
          len = Math.min(len, maxLenBottom);
          y = h - spark.n * insetBottom;
          x = along * Math.max(1, w - len);
          swell = seaSwell(x, y, t, dpi) * 0.35;
        } else if (edge === 2) {
          len = Math.min(len, insetX * (0.35 + spark.n * 0.6), maxLenSide);
          y = insetTop + along * Math.max(1, innerH - 1);
          x = spark.n * insetX * 0.42;
          swell = seaSwell(x, y, t, dpi) * 0.35;
        } else {
          len = Math.min(len, insetX * (0.35 + spark.n * 0.6), maxLenSide);
          y = insetTop + along * Math.max(1, innerH - 1);
          x = w - insetX * (0.42 + spark.n * 0.55) - len;
          swell = seaSwell(x + len, y, t, dpi) * 0.35;
        }

        if (sparkInClearZone(x + swell, y + (spark.n - 0.5) * 2, len, thick, clearZone)) continue;
        ctx.fillRect(x + swell, y + (spark.n - 0.5) * 2, len, thick);
      }
    }

    function drawSeamSparks(w, h, t, dpi, insetX) {
      var workEl = canvas.parentElement;
      if (!workEl) return;
      var timeline = workEl.querySelector(".work-timeline-block");
      var listPanel = workEl.querySelector(".work-list-panel");
      if (!timeline || !listPanel) return;

      var canvasRect = canvas.getBoundingClientRect();
      if (!canvasRect.width || !canvasRect.height) return;

      var scaleY = h / canvasRect.height;
      var scaleX = w / canvasRect.width;
      var gapTop = (timeline.getBoundingClientRect().bottom - canvasRect.top) * scaleY;
      var gapBottom = (listPanel.getBoundingClientRect().top - canvasRect.top) * scaleY;
      var gapH = gapBottom - gapTop;
      if (gapH < 4) return;

      var margin = insetX * 0.55;
      var thick = Math.max(1, dpi * 0.85);
      var seamCount = 52;
      ctx.fillStyle = "#f3efe6";

      for (var i = 0; i < seamCount; i++) {
        var n = hash(i, 8.31);
        var pulse = 0.5 + 0.5 * Math.sin(t * 0.38 + n * 11.2);
        if (pulse < 0.14) continue;

        var y = gapTop + n * gapH;
        var len = (10 + hash(i, 3.14) * 30) * dpi;
        var span = Math.max(1, w - 2 * margin - len);
        var x = margin + hash(i, 1.72) * span;
        var swell = seaSwell(x, y, t, dpi) * 0.35;
        ctx.fillRect(x + swell, y + (n - 0.5) * 1.5, len, thick);
      }
    }

    function fadeGradient(h) {
      if (fadeGrad && fadeGradH === h) return fadeGrad;
      fadeGradH = h;
      fadeGrad = ctx.createLinearGradient(0, 0, 0, h);
      fadeGrad.addColorStop(0, "rgba(5,5,5,0)");
      fadeGrad.addColorStop(0.72, "rgba(5,5,5,0)");
      fadeGrad.addColorStop(1, "rgba(5,5,5,0.88)");
      return fadeGrad;
    }

    function draw(now) {
      var dim = size();
      var w = dim.w;
      var h = dim.h;
      var t = seaTime(reduced);

      if (sparkOnly) {
        ctx.clearRect(0, 0, w, h);
        drawRimSparks(w, h, t, dim.dpi);
        var workStyle = canvas.parentElement ? getComputedStyle(canvas.parentElement) : null;
        var padLeft = workStyle ? parseFloat(workStyle.paddingLeft) : 16;
        drawSeamSparks(w, h, t, dim.dpi, padLeft * dim.dpi);
      } else {
        ctx.fillStyle = "#050505";
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = "#f3efe6";

        var row = Math.max(2, Math.round(2.5 * dim.dpi));
        var step = Math.max(10, 12 * dim.dpi);
        for (var y = 0; y < h; y += row) {
          var ny = y / h;
          var density = Math.pow(1 - ny, 1.55);
          if (density < 0.03) continue;

          var rowIndex = Math.floor(y / row);
          var drift = seaDrift(y, h, t);
          var offset = ((rowIndex * 13) % 17) + drift;
          var col0 = Math.floor((-48 - offset) / step);
          var col1 = Math.ceil((w + 48 - offset) / step);

          for (var col = col0; col <= col1; col++) {
            var n = hash(col, rowIndex);
            var skip = hash(col + 19.2, rowIndex + 4.7);
            if (skip > density * 0.74) continue;

            if (n > 0.78) {
              var period = 4 + skip * 5;
              var pulse = 0.5 + 0.5 * Math.sin((t / period) * Math.PI * 2 + n * 18);
              if (pulse < 0.38) continue;
            }

            var x = col * step + offset;
            var swell = seaSwell(x, y, t, dim.dpi);
            var len = (6 + n * 26 + density * 16) * dim.dpi;
            var lineThick = n > 0.78 ? 2 : 1;
            ctx.fillRect(x, y + swell + (n - 0.5) * 2, len, lineThick);
          }
        }

        var fade = fadeGradient(h);
        ctx.fillStyle = fade;
        ctx.fillRect(0, 0, w, h);
      }

      if (!reduced && !paused) {
        raf = requestAnimationFrame(draw);
      }
    }

    size();
    draw(performance.now());
    window.addEventListener("resize", function () {
      fadeGrad = null;
      if (reduced || paused) draw(performance.now());
    });

    return {
      setPaused: function (value) {
        paused = !!value;
        if (!paused && !reduced && !raf) {
          raf = requestAnimationFrame(draw);
        }
        if (paused && raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      destroy: function () {
        cancelAnimationFrame(raf);
      }
    };
  }

  global.seaTime = seaTime;
  global.seaSwell = seaSwell;
  global.seaDrift = seaDrift;
  global.WaveBand = WaveBand;
})(window);
