(function (global) {
  var STORAGE_KEY = "vstreett-ink-preset";
  var HISTORY_MAX = 24;

  function clamp(n, a, b) {
    return Math.max(a, Math.min(b, n));
  }

  function rand(rng, a, b) {
    return a + rng() * (b - a);
  }

  function mulberry32(seed) {
    var t = seed >>> 0;
    return function () {
      t += 0x6d2b79f5;
      var r = Math.imul(t ^ (t >>> 15), 1 | t);
      r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
      return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
    };
  }

  function loadSaved() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? window.InkPreset.normalize(JSON.parse(raw)) : null;
    } catch (err) {
      return null;
    }
  }

  function savePreset(preset) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(window.InkPreset.normalize(preset)));
  }

  function baseTypes(salt) {
    var types = window.InkTypes;
    return types.map(function (type, i) {
      return window.InkPreset.normalize({
        type: type,
        seed: 2.4 + i * 11.17 + salt * 0.13,
        invert: type === "radial" ? 1 : 0,
        density: type === "maze" ? 1.15 : 1,
        warp: 1,
        speed: 1,
        contrast: 1
      });
    });
  }

  function vary(parent, index, salt) {
    var rng = mulberry32(Math.floor((parent.seed + 1) * 1000 + index * 97 + salt * 13));
    return window.InkPreset.normalize({
      type: parent.type,
      seed: parent.seed + (index + 1) * 19.7 + salt * 0.37,
      invert: rng() > 0.72 ? 1 - parent.invert : parent.invert,
      density: clamp(parent.density + rand(rng, -0.28, 0.32), 0.45, 1.85),
      warp: clamp(parent.warp + rand(rng, -0.35, 0.35), 0.2, 1.9),
      speed: clamp(parent.speed + rand(rng, -0.15, 0.2), 0.45, 1.6),
      contrast: clamp(parent.contrast + rand(rng, -0.2, 0.25), 0.65, 1.7)
    });
  }

  function Studio(root, options) {
    options = options || {};
    var reduced = !!options.reduced;
    var onApply = options.onApply || function () {};
    var cells = [].slice.call(root.querySelectorAll("[data-cell]"));
    var status = root.querySelector("[data-studio-status]");
    var backBtn = root.querySelector("[data-studio=back]");
    var fields = [];
    var history = [];
    var generation = 0;
    var salt = 1;

    function setStatus(text) {
      if (status) status.textContent = text;
    }

    function current() {
      return history[history.length - 1] || [];
    }

    function render(presets, title) {
      presets.forEach(function (preset, i) {
        if (!fields[i]) return;
        fields[i].setPreset(preset);
        var label = cells[i].querySelector("[data-label]");
        if (label) {
          label.textContent = history.length <= 1
            ? preset.type
            : preset.type + " · " + (preset.invert ? "night" : "paper");
        }
      });
      if (backBtn) backBtn.disabled = history.length <= 1;
      setStatus(title);
    }

    function show(presets, title) {
      history.push(presets);
      if (history.length > HISTORY_MAX) history.shift();
      render(presets, title);
    }

    function open() {
      root.hidden = false;
      root.setAttribute("aria-hidden", "false");
      document.body.classList.add("studio-open");
      if (!fields.length) {
        cells.forEach(function (cell) {
          var canvas = cell.querySelector("canvas");
          fields.push(window.InkField(canvas, {
            reduced: reduced,
            trackMouse: false,
            pixelRatio: 1.15,
            preset: window.InkPreset.normalize({ type: "contour" })
          }));
        });
      } else {
        fields.forEach(function (field) { field.setPaused(false); });
      }
      if (!history.length) show(baseTypes(salt), "Pick a type");
      else render(current(), history.length <= 1 ? "Pick a type" : "Pick a variation");
    }

    function close() {
      root.hidden = true;
      root.setAttribute("aria-hidden", "true");
      document.body.classList.remove("studio-open");
      fields.forEach(function (field) { field.setPaused(true); });
    }

    function back() {
      if (history.length <= 1) return;
      history.pop();
      render(current(), history.length <= 1 ? "Pick a type" : "Pick a variation");
    }

    function reroll() {
      salt += 1;
      generation += 1;
      if (history.length <= 1) {
        history = [];
        show(baseTypes(salt), "Pick a type");
        return;
      }
      var parent = current()[0];
      history.pop();
      show([0, 1, 2, 3].map(function (i) {
        return vary(parent, i, salt);
      }), "Four more of " + parent.type);
    }

    cells.forEach(function (cell, index) {
      cell.addEventListener("click", function (event) {
        if (event.target.closest("[data-keep]")) return;
        var preset = current()[index];
        if (!preset) return;
        salt += 1;
        show([0, 1, 2, 3].map(function (i) {
          return vary(preset, i, salt);
        }), "Variations of " + preset.type);
      });

      var keep = cell.querySelector("[data-keep]");
      if (keep) {
        keep.addEventListener("click", function (event) {
          event.preventDefault();
          event.stopPropagation();
          var preset = current()[index];
          if (!preset) return;
          savePreset(preset);
          onApply(preset);
          setStatus("Saved · " + preset.type);
        });
      }
    });

    root.addEventListener("click", function (event) {
      var action = event.target.closest("[data-studio]");
      if (!action) return;
      var name = action.getAttribute("data-studio");
      if (name === "close") close();
      if (name === "back") back();
      if (name === "reroll") reroll();
    });

    document.addEventListener("keydown", function (event) {
      if (root.hidden) return;
      if (event.key === "Escape") close();
    });

    return {
      open: open,
      close: close,
      loadSaved: loadSaved,
      isOpen: function () { return !root.hidden; }
    };
  }

  global.InkStudio = {
    create: Studio,
    loadSaved: loadSaved
  };
})(window);
