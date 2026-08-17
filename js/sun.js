(function (global) {
  function hash(x, y) {
    var n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
    return n - Math.floor(n);
  }

  function SunMark(canvas, options) {
    options = options || {};
    var reduced = !!options.reduced;
    var ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) {
      return { setPaused: function () {}, destroy: function () {} };
    }

    var paused = false;
    var raf = 0;
    var wavesEl = document.getElementById("waves");

    function size() {
      var dpi = Math.min(window.devicePixelRatio || 1, 1.75);
      var w = Math.max(1, canvas.clientWidth);
      var h = Math.max(1, canvas.clientHeight);
      var pw = Math.max(1, Math.floor(w * dpi));
      var ph = Math.max(1, Math.floor(h * dpi));
      if (canvas.width !== pw || canvas.height !== ph) {
        canvas.width = pw;
        canvas.height = ph;
      }
      return { w: pw, h: ph, dpi: dpi, cssW: w, cssH: h };
    }

    function layout(dim) {
      var sea = canvas.parentElement.getBoundingClientRect();
      var box = canvas.getBoundingClientRect();
      var scale = dim.h / dim.cssH;
      var horizon = Math.max(8, (sea.top - box.top) * scale);
      var R = Math.min(horizon * 0.98, dim.w * 0.2);
      return {
        cx: dim.w * 0.155,
        horizon: horizon,
        R: R
      };
    }

    function halfWidth(d, t, R) {
      if (d >= 1) return 0;
      var envelope = Math.pow(1 - d, 0.82);
      if (d > 0.8) envelope *= 1 - (d - 0.8) / 0.2;
      var zig =
        Math.sin(d * 14.5 + t * 0.48) * 0.11 +
        Math.sin(d * 7.2 - t * 0.3) * 0.07 +
        Math.sin(d * 22.0 + t * 0.18) * 0.03;
      var pinch = d < 0.14 ? 0.86 + d * 1.0 : 1;
      return Math.max(0, R * 1.18 * pinch * envelope * (0.94 + zig));
    }

    function drawDisk(sun) {
      ctx.fillStyle = "#0c0c0c";
      ctx.beginPath();
      ctx.arc(sun.cx, sun.horizon, sun.R, Math.PI, 0, false);
      ctx.closePath();
      ctx.fill();
    }

    function drawReflection(dim, sun, t) {
      var cx = sun.cx;
      var hy = sun.horizon;
      var R = sun.R;
      var depth = R * 2.05;
      var row = Math.max(2, Math.round(2.6 * dim.dpi));
      var y;

      ctx.fillStyle = "#f3efe6";

      for (y = hy + 2; y < hy + depth; y += row) {
        var d = (y - hy) / depth;
        if (d > 0.97) continue;
        var band = Math.floor((y - hy) / (row * 3));
        var hw = halfWidth(d, t, R);
        var jag = (hash(band, 3.3) - 0.5) * R * 0.06;
        var left = cx - hw + jag;
        var right = cx + hw - jag * 0.6;
        if (right - left < 4) continue;

        var gap = hash(band, 8.1);
        if (gap > 0.82 && d > 0.12) continue;

        var seaY = y - hy;
        var seaH = wavesEl
          ? Math.max(1, Math.floor(wavesEl.clientHeight * dim.dpi))
          : dim.h;
        var drift = global.seaDrift ? global.seaDrift(seaY, seaH, t) : t * (9 + d * 14);
        var step = Math.max(8, (11 + d * 10) * dim.dpi);
        var col0 = Math.floor((left - 20 - drift) / step);
        var col1 = Math.ceil((right + 20 - drift) / step);
        var col;

        for (col = col0; col <= col1; col++) {
          var n = hash(col, band + 11);
          if (n > 0.7 + (1 - d) * 0.12) continue;
          var x = col * step + drift + ((band * 7) % 11);
          if (x < left || x > right) continue;

          var maxLen = Math.max(3, (right - x) - 1);
          var len = Math.min(maxLen, (4 + n * 18 * (1.15 - d) + (1 - d) * 10) * dim.dpi);
          if (len < 2) continue;
          var swell = global.seaSwell
            ? global.seaSwell(x, seaY, t, dim.dpi)
            : 0;
          ctx.fillRect(x, y + swell, len, n > 0.55 ? 2 : 1);
        }
      }

      var bleed = 18;
      var b;
      for (b = 0; b < bleed; b++) {
        var ang = (0.12 + hash(b, 1.4) * 0.76) * Math.PI;
        var wob = Math.sin(t * 0.35 + b) * 0.04;
        var px = cx + Math.cos(ang + wob) * (R * 0.98);
        var py = hy + Math.sin(ang + wob) * (R * 0.98);
        if (py < hy + 4) continue;
        var out = (8 + hash(b, 2.2) * 22) * dim.dpi;
        var dir = px < cx ? -1 : 1;
        var pulse = 0.5 + 0.5 * Math.sin(t * 0.4 + b * 1.7);
        if (pulse < 0.28) continue;
        var bleedSwell = global.seaSwell
          ? global.seaSwell(px, py - hy, t, dim.dpi)
          : 0;
        ctx.fillRect(px, py + bleedSwell, dir * out, hash(b, 3) > 0.6 ? 2 : 1);
      }
    }

    function draw(now) {
      var dim = size();
      var sun = layout(dim);
      var t = global.seaTime ? global.seaTime(reduced) : 0;
      ctx.clearRect(0, 0, dim.w, dim.h);
      drawDisk(sun);
      drawReflection(dim, sun, t);
      if (!reduced && !paused) raf = requestAnimationFrame(draw);
    }

    size();
    draw(performance.now());
    window.addEventListener("resize", function () {
      if (reduced || paused) draw(performance.now());
    });

    return {
      setPaused: function (value) {
        paused = !!value;
        if (!paused && !reduced && !raf) raf = requestAnimationFrame(draw);
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

  global.SunMark = SunMark;
})(window);
