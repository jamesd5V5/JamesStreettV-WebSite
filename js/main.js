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
  var sun = window.SunMark(document.getElementById("sun"), { reduced: reduced });
  var work = window.WorkDesk.create(document.getElementById("work"));

  document.querySelectorAll("[data-open-work]").forEach(function (el) {
    el.addEventListener("click", function (event) {
      event.preventDefault();
      field.setPaused(true);
      work.open();
    });
  });

  var workRoot = document.getElementById("work");
  var observer = new MutationObserver(function () {
    if (workRoot.hidden) field.setPaused(document.hidden);
  });
  observer.observe(workRoot, { attributes: true, attributeFilter: ["hidden"] });

  document.addEventListener("visibilitychange", function () {
    var hidden = document.hidden;
    if (!work.isOpen()) field.setPaused(hidden);
    waves.setPaused(hidden);
    sun.setPaused(hidden);
  });
})();
