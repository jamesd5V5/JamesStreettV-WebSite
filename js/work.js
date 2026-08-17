(function (global) {
  var JOBS = [
    {
      id: "createbase",
      kind: "work",
      role: "Software Engineer",
      org: "CreateBase",
      place: "Remote, CA",
      dates: "Dec 2025 – Present",
      stamp: "Dec 2025 – Present",
      lede: "Designed large-scale music rights matching systems using OpenSearch to link DSP and audit metadata to MLC datasets, addressing historically inconsistent industry metadata, partnered with AWS.",
      skills: ["Python", "OpenSearch", "AWS", "Metadata Standards", "Data Auditing", "Library Scaling"],
      body: [
        "Built scalable backend services and asynchronous processing pipelines for ingesting, parsing, and matching chaotic real-time industry metadata streams."
      ],
      image: "",
      images: []
    },
    {
      id: "voicetune",
      kind: "work",
      role: "Machine Learning Engineer",
      org: "VoiceTune AI",
      place: "Dublin, Ireland",
      dates: "Jul 2025 – Sep 2025",
      stamp: "Summer 2025",
      lede: "Researched generative audio applications for voice modulation and custom sound design tools, with deep signal processing and feature extraction to analyze and categorize sound profiles.",
      skills: ["Librosa", "Sound Design Research", "Signal Processing", "ElevenLabs", "Python"],
      body: [
        "Collaborated with researchers at Trinity College Dublin on international R&D projects."
      ],
      image: "",
      images: []
    },
    {
      id: "navy",
      kind: "work",
      role: "Acoustic Engineer Assistant",
      org: "San Diego Navy Base",
      place: "San Diego, CA",
      dates: "Dec 2024 – Jun 2025",
      stamp: "Dec 2024 – Jun 2025",
      lede: "Analyzed complex underwater audio to identify and catalog a multitude of unique acoustic signatures.",
      skills: ["Python", "MATLAB", "Signal Processing", "Acoustic Analysis"],
      body: [
        "Optimized and defined parameters for data classification workflows across massive audio libraries."
      ],
      image: "",
      images: []
    },
    {
      id: "ucsd-audio",
      kind: "work",
      role: "Audio Engineer",
      org: "UC San Diego",
      place: "La Jolla, CA",
      dates: "Feb 2023 – Jun 2025",
      stamp: "Feb 2023 – Jun 2025",
      lede: "Mixed 90+ live performances across UC San Diego, optimizing room acoustics for performers and audiences.",
      skills: ["Pro Tools", "Dante", "AV Systems", "Live Sound", "Microphone Technique"],
      body: [
        "Ran AV system setups including live sound reinforcement, system setup, and troubleshooting for events."
      ],
      image: "",
      images: []
    },
    {
      id: "dolphinbox",
      kind: "project",
      role: "Award-winning research",
      org: "DolphinBox",
      place: "UC San Diego",
      dates: "Feb 2025 – Jun 2025",
      stamp: "Jun 2025",
      lede: "Built a real-time edge system that turns thousands of biological acoustic array signals into spectrograms and MFCC feature vectors.",
      skills: ["Python", "PyTorch", "DSP", "Acoustic Engineering"],
      body: [
        "Trained a multi-label CNN that reached 94% classification accuracy, tuned for live, low-latency identification on local hardware.",
        "Sole recipient of the Michael L. Sherman ICAM Research Award across the graduating class."
      ],
      image: "",
      images: []
    },
    {
      id: "spc",
      kind: "project",
      role: "Room EQ Wizard automation",
      org: "Statistical Process Controller",
      place: "Personal / research",
      dates: "Feb 2026 – May 2026",
      stamp: "May 2026",
      lede: "Engineered an automated acoustic validation tool that talks to Room EQ Wizard’s REST API to ingest high-resolution frequency response data (54k+ points), intended for UMIK-1 use.",
      skills: ["REW", "SPC", "Python", "REST API", "UMIK-1"],
      body: [
        "Developed a linear-interpolation comparison engine to audit live measurements against golden-reference JSON schemas, enabling real-time Pass/Fail detection."
      ],
      image: "",
      images: []
    },
    {
      id: "gmtk",
      kind: "project",
      role: "Technical Sound Design",
      org: "Game Jam Competitions",
      place: "GMTK",
      dates: "Jul 2022 – Present",
      stamp: "Present",
      lede: "Every year my team and I compete in rapid-turnaround (96 hour) GMTK game jams, where I create the music and SFX completely from scratch with a microphone, Ableton, and Godot.",
      skills: ["Ableton", "Sound Design", "Godot", "Unity", "C#"],
      body: [
        "GMTK Game Jam 2025 — Top 10% of 9,500+ entries.",
        "GMTK Game Jam 2024 — Top 4% of 7,500+ entries."
      ],
      image: "",
      images: []
    },
    {
      id: "el-bondi",
      kind: "project",
      role: "Freelance Special Effects",
      org: "El Bondi Deconstruction",
      place: "Burning Man",
      dates: "Dec 2025",
      stamp: "Dec 2025",
      lede: "Supported a permitted special-effects demolition and deconstruction project, assisting with rigging, teardown, equipment handling, and site safety.",
      skills: ["Special Effects Production", "Production Teardown / Strike"],
      body: [
        "Assisted with controlled practical-effects production work involving tools, wiring, mounting, transport, and post-event strike."
      ],
      image: "",
      images: []
    }
  ];

  function pad(n) {
    return n < 10 ? "0" + n : String(n);
  }

  function haystack(job) {
    return [
      job.org,
      job.role,
      job.place,
      job.stamp,
      job.dates,
      job.lede,
      job.kind,
      (job.skills || []).join(" "),
      (job.body || []).join(" ")
    ]
      .join(" ")
      .toLowerCase();
  }

  function skillsHtml(skills) {
    return (skills || [])
      .map(function (skill) {
        return "<li>" + skill + "</li>";
      })
      .join("");
  }

  function cardHtml(job, number) {
    var media = job.image
      ? '<div class="work-card-media"><img src="' + job.image + '" alt="" /></div>'
      : "";
    return (
      '<button type="button" class="work-card" data-work="' +
      job.id +
      '" data-kind="' +
      job.kind +
      '">' +
      media +
      '<p class="work-card-index"><span>' +
      pad(number) +
      '</span><span class="work-card-when"><span>' +
      job.stamp +
      "</span><span>" +
      (job.kind === "project" ? "Project" : "Work") +
      "</span></span></p>" +
      "<h3>" +
      job.org +
      "</h3>" +
      '<p class="work-card-role">' +
      job.role +
      "</p>" +
      '<p class="work-card-lede">' +
      job.lede +
      "</p>" +
      '<ul class="work-skills">' +
      skillsHtml(job.skills) +
      "</ul>" +
      "</button>"
    );
  }

  function detailHtml(job) {
    var gallery = (job.images || [])
      .map(function (src) {
        return '<img src="' + src + '" alt="" />';
      })
      .join("");
    var hero = job.image
      ? '<div class="work-detail-hero"><img src="' + job.image + '" alt="" /></div>'
      : "";
    var extra = gallery
      ? '<div class="work-detail-gallery">' + gallery + "</div>"
      : "";
    var body = (job.body || [])
      .map(function (para) {
        return "<p>" + para + "</p>";
      })
      .join("");
    return (
      hero +
      '<p class="work-detail-meta">' +
      job.kind +
      " · " +
      job.place +
      " · " +
      job.stamp +
      "</p>" +
      "<h3>" +
      job.role +
      "</h3>" +
      "<h4>" +
      job.org +
      "</h4>" +
      "<p>" +
      job.lede +
      "</p>" +
      body +
      '<ul class="work-skills">' +
      skillsHtml(job.skills) +
      "</ul>" +
      extra
    );
  }

  function WorkDesk(root) {
    var grid = root.querySelector("[data-work-grid]");
    var detail = root.querySelector("[data-work-detail]");
    var status = root.querySelector("[data-work-status]");
    var search = root.querySelector("[data-work-search]");
    var workCheck = root.querySelector("[data-work-filter=work]");
    var projectCheck = root.querySelector("[data-work-filter=project]");
    var selected = null;
    var visible = JOBS.slice();

    function jobById(id) {
      var i;
      for (i = 0; i < JOBS.length; i++) {
        if (JOBS[i].id === id) return JOBS[i];
      }
      return null;
    }

    function visibleIndex(id) {
      var i;
      for (i = 0; i < visible.length; i++) {
        if (visible[i].id === id) return i;
      }
      return -1;
    }

    function termsFrom(query) {
      return query
        .split(",")
        .map(function (part) {
          return part.trim().toLowerCase();
        })
        .filter(Boolean);
    }

    function filtered() {
      var query = search && search.value ? search.value.trim() : "";
      var terms = termsFrom(query);
      var showWork = !workCheck || workCheck.checked;
      var showProject = !projectCheck || projectCheck.checked;
      return JOBS.filter(function (job) {
        if (job.kind === "work" && !showWork) return false;
        if (job.kind === "project" && !showProject) return false;
        if (!terms.length) return true;
        var hay = haystack(job);
        return terms.every(function (term) {
          return hay.indexOf(term) !== -1;
        });
      });
    }

    function closeDetail() {
      selected = null;
      root.classList.remove("is-expanded", "from-left", "from-right");
      if (detail) detail.innerHTML = "";
      if (status) status.textContent = "Work";
    }

    function render() {
      visible = filtered();
      if (selected && visibleIndex(selected) < 0) closeDetail();
      if (!visible.length) {
        grid.innerHTML = '<p class="work-empty">Nothing matches.</p>';
        return;
      }
      grid.innerHTML = visible
        .map(function (job, i) {
          return cardHtml(job, i + 1);
        })
        .join("");
      if (selected) {
        var card = grid.querySelector('[data-work="' + selected + '"]');
        if (card) {
          card.classList.add("is-active");
          grid.querySelectorAll(".work-card").forEach(function (el) {
            if (el !== card) el.classList.add("is-hidden");
          });
        }
      }
    }

    function openDetail(id) {
      var job = jobById(id);
      var index = visibleIndex(id);
      if (!job || index < 0) return;
      if (selected === id) {
        closeDetail();
        render();
        return;
      }
      selected = id;
      var fromLeft = index % 2 === 0;
      root.classList.add("is-expanded");
      root.classList.toggle("from-left", fromLeft);
      root.classList.toggle("from-right", !fromLeft);
      render();
      detail.innerHTML = detailHtml(job);
      if (status) status.textContent = job.org;
    }

    grid.addEventListener("click", function (event) {
      var card = event.target.closest("[data-work]");
      if (!card) return;
      openDetail(card.getAttribute("data-work"));
    });

    if (search) {
      search.addEventListener("input", function () {
        closeDetail();
        render();
      });
    }
    [workCheck, projectCheck].forEach(function (box) {
      if (!box) return;
      box.addEventListener("change", function () {
        closeDetail();
        render();
      });
    });

    root.addEventListener("click", function (event) {
      var action = event.target.closest("[data-work-action]");
      if (!action) return;
      var name = action.getAttribute("data-work-action");
      if (name === "close") close();
      if (name === "back") {
        closeDetail();
        render();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (root.hidden) return;
      if (event.key === "Escape") {
        if (selected) {
          closeDetail();
          render();
        } else close();
      }
    });

    function open() {
      root.hidden = false;
      root.setAttribute("aria-hidden", "false");
      document.body.classList.add("work-open");
      render();
      if (search) search.focus();
    }

    function close() {
      closeDetail();
      root.hidden = true;
      root.setAttribute("aria-hidden", "true");
      document.body.classList.remove("work-open");
    }

    render();

    return {
      open: open,
      close: close,
      isOpen: function () {
        return !root.hidden;
      }
    };
  }

  global.WorkDesk = { create: WorkDesk };
})(window);
