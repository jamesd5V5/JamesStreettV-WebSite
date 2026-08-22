(function () {
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fieldCanvas = document.getElementById("field");
  var waveCanvas = document.getElementById("waves");
  var saved = window.InkStudio ? window.InkStudio.loadSaved() : null;

  var field = window.InkField(fieldCanvas, {
    reduced: reduced,
    preset: saved || { type: "contour", seed: 1.7, invert: 0, density: 1, warp: 1, speed: 1, contrast: 1 }
  });
  var waves = window.WaveBand(waveCanvas, { reduced: reduced });
  var workRimCanvas = document.getElementById("work-rim-waves");
  var workRimWaves = workRimCanvas
    ? window.WaveBand(workRimCanvas, { reduced: reduced, sparkOnly: true })
    : { setPaused: function () {} };
  var sun = window.SunMark(document.getElementById("sun"), { reduced: reduced });
  var work = window.WorkDesk.create(document.getElementById("work"));
  var hero = document.querySelector(".hero");
  var sea = document.getElementById("sea");

  function setMotionPaused(paused) {
    field.setPaused(paused);
    waves.setPaused(paused);
    sun.setPaused(paused);
  }

  function heroVisible() {
    if (!hero) return true;
    var rect = hero.getBoundingClientRect();
    return rect.bottom > 0 && rect.top < window.innerHeight;
  }

  function seaVisible() {
    if (!sea) return false;
    var rect = sea.getBoundingClientRect();
    return rect.bottom > 0 && rect.top < window.innerHeight;
  }

  function syncHeaderTone() {
    if (document.body.classList.contains("work-open")) {
      document.body.classList.remove("header-over-hero");
      document.body.classList.remove("at-page-top");
      return;
    }
    if (!hero) return;
    var headerH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 72;
    var heroRect = hero.getBoundingClientRect();
    document.body.classList.toggle("header-over-hero", heroRect.bottom > headerH + 8);
    document.body.classList.toggle("at-page-top", window.scrollY < 48);
  }

  function syncMotion() {
    if (document.hidden) {
      setMotionPaused(true);
      workRimWaves.setPaused(true);
      return;
    }
    if (work.isOpen()) {
      setMotionPaused(true);
      workRimWaves.setPaused(false);
      return;
    }
    workRimWaves.setPaused(true);
    field.setPaused(!heroVisible());
    var seaOn = seaVisible();
    waves.setPaused(!seaOn);
    sun.setPaused(!seaOn);
  }

  if ("IntersectionObserver" in window) {
    var motionObserver = new IntersectionObserver(
      function () {
        syncMotion();
        syncHeaderTone();
      },
      { root: null, threshold: 0.01 }
    );
    if (hero) motionObserver.observe(hero);
    if (sea) motionObserver.observe(sea);
  }

  window.addEventListener("scroll", function () {
    syncMotion();
    syncHeaderTone();
  }, { passive: true });
  window.addEventListener("resize", function () {
    syncMotion();
    syncHeaderTone();
  }, { passive: true });

  document.querySelectorAll("[data-open-work]").forEach(function (el) {
    el.addEventListener("click", function (event) {
      event.preventDefault();
      work.open();
      syncMotion();
      syncHeaderTone();
    });
  });

  document.querySelectorAll(".site-header a:not([data-open-work])").forEach(function (el) {
    el.addEventListener("click", function () {
      if (work.isOpen()) work.close();
      syncMotion();
      syncHeaderTone();
    });
  });

  if (work.shouldOpen()) {
    work.open();
  }

  var workRoot = document.getElementById("work");
  var observer = new MutationObserver(function () {
    syncMotion();
    syncHeaderTone();
  });
  observer.observe(workRoot, { attributes: true, attributeFilter: ["hidden"] });

  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    var icon = btn.innerHTML;
    btn.addEventListener("click", function () {
      var value = btn.getAttribute("data-copy") || "";
      var done = function () {
        btn.classList.add("is-copied");
        btn.textContent = "Copied";
        window.setTimeout(function () {
          btn.classList.remove("is-copied");
          btn.innerHTML = icon;
        }, 1400);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).then(done).catch(done);
        return;
      }
      var field = document.createElement("textarea");
      field.value = value;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.left = "-9999px";
      document.body.appendChild(field);
      field.select();
      try {
        document.execCommand("copy");
      } catch (err) {}
      document.body.removeChild(field);
      done();
    });
  });

  document.addEventListener("visibilitychange", function () {
    syncMotion();
    syncHeaderTone();
  });

  syncMotion();
  syncHeaderTone();
})();
