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
    var ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) {
      return { setPaused: function () {}, destroy: function () {} };
    }

    var paused = false;
    var raf = 0;

    function size() {
      var dpi = Math.min(window.devicePixelRatio || 1, 1.75);
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

    function draw(now) {
      var dim = size();
      var w = dim.w;
      var h = dim.h;
      var t = seaTime(reduced);

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
        var band = Math.floor(rowIndex / 3);
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
          var thick = n > 0.78 ? 2 : 1;
          ctx.fillRect(x, y + swell + (n - 0.5) * 2, len, thick);
        }
      }

      var fade = ctx.createLinearGradient(0, 0, 0, h);
      fade.addColorStop(0, "rgba(5,5,5,0)");
      fade.addColorStop(0.72, "rgba(5,5,5,0)");
      fade.addColorStop(1, "rgba(5,5,5,0.88)");
      ctx.fillStyle = fade;
      ctx.fillRect(0, 0, w, h);

      if (!reduced && !paused) {
        raf = requestAnimationFrame(draw);
      }
    }

    size();
    draw(performance.now());
    window.addEventListener("resize", function () {
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
