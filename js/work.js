(function (global) {
  var JOBS = [
    {
      "id": "createbase",
      "kind": "work",
      "role": "Software Engineer",
      "org": "CreateBase",
      "place": "Los Angeles, CA",
      "dates": "Dec 2025 – Present",
      "stamp": "Dec 2025 – Present",
      "caption": "SWE 2025–Present",
      "start": "2025-12",
      "end": "present",
      "tone": 0,
      "types": ["swe"],
      "lede": "Engineered scalable music rights matching microservices using <strong>Python</strong>, <strong>OpenSearch</strong>, <strong>AWS ECS</strong>, <strong>Glue</strong>, and many <strong>APIs</strong> to reconcile chaotic DSP, PRO, and MLC metadata against canonical industry datasets.",
      "skills": ["Python", "AWS", "OpenSearch", "APIs", "ETL Pipelines", "PostgreSQL", "Music Metadata"],
      "body": [
        "Architected containerized microservices on AWS ECS and automated Glue ETL jobs to ingest, parse, and normalize millions of unstructured records from income statements, publisher contracts, and legacy PRO databases (Songview, BMI, ASCAP...).",
        "Developed high-throughput entity-resolution pipelines utilizing OpenSearch and <strong>AWS RDS PostgreSQL</strong> to cross-match fuzzy metadata (ISRC, ISWC, IPI, writer/publisher identity groups...) against canonical catalogs like Mechanical Licensing Collective (MLC).",
        "Built asynchronous processing queues and document-parsing engines to resolve complex contributor identity rules and stream real-time reconciliation reports for rights holders.",
        "Contributed core technical architecture that helped secure <strong>$15K</strong> in early venture/pre-seed funding by demonstrating automated detection of uncollected mechanical and performance royalties."
      ],
      "image": "pics/createbase1.png",
      "images": []
    },
    {
      id: "voicetune",
      kind: "work",
      role: "Machine Learning Engineer Intern",
      org: "VoiceTune AI",
      place: "Dublin, Ireland",
      dates: "Jul 2025 – Sep 2025",
      stamp: "Jul 2025 – Sep 2025",
      start: "2025-07",
      end: "2025-09",
      tone: 1,
      types: ["swe", "ae"],
      lede: "Had the great opputinity to research abroad at Trinity College Dublin over summer of 2025. Where I researched <strong>generative audio</strong> for voice modulation and custom sound design tools, with deep <strong>signal processing</strong> and <strong>feature extraction</strong> to analyze and categorize sound profiles.",
      skills: ["Python", "Librosa", "ElevenLabs", "Unity", "Unreal Engine", "Sound Design Research", "DSP"],
      body: [
        "Where I collaborated with researchers at Trinity College Dublin on international <strong>R&D</strong> projects. I was able to learn about the latest advancements in generative audio and how to articulate and model to custom sound design tools. Using Python libraries/extensions like Librosa, ElevenLabs... I was able to create custom voice modulation tools designed for software like <strong>Unity</strong>, <strong>Unreal Engine</strong>, and <strong>Godot</strong>.",
      ],
      image: "pics/voicetuneai1.png",
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
      start: "2024-12",
      end: "2025-06",
      tone: 2,
      types: ["swe", "ae"],
      lede: "Working under Dr. Christine Johnson at the San Diego Navy Base, we analyzed complex bioacoustic multichannel signals across a variety of <strong>hydrophones</strong>, <strong>sonar</strong> and other acoustic devices to identtify and catalog a multitude of unique acoustic signatures.",
      skills: ["Python", "MATLAB", "DSP", "Bioacoustic engineering", "Marine Mammal Communication"],
      body: [
        "It was my responsibility to <strong>optimize, automate and define parameters</strong> for data classification workflows across massive audio libraries. Using a multitude of <strong>Python</strong> libraries, <strong>MATLAB</strong> and <strong>Signal Processing</strong> techniques. Working with Dr. Johnson, gave me a deep understanding not only of the technology, but the cognitive processes of marine mammals and their communication. And how to express that through sound design and engineering."
      ],
      image: "pics/NavyBase1.png",
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
      start: "2023-02",
      end: "2025-06",
      tone: 3,
      types: ["ae"],
      lede: "As an Audio Enginner at UC San Diego I mixed <strong>90+ live performances</strong> across UC San Diego, working with multiple venues and artists, from Orchestras, Choirs, Jazz Ensembles, Quartets, and Rock Bands.",
      skills: ["Pro Tools", "Dante", "AV Systems", "FOH Engineer", "Post Production Engineer"],
      body: [
        "Working both as a <strong>FOH engineer</strong> and <strong>Post Production Engineer</strong>, I was responsible for setting up and mixing the audio and video for the live performances, ensuring the sound was clear and consistent for the audience. Using <strong>Pro Tools</strong>, <strong>Dante</strong>, <strong>Atem</strong> and other <strong>AV Systems</strong>, I also had to troubleshoot and fix any issues that arose during the performances.",
        "It was also my job to <strong>mix/master</strong> the audio from these live shows to be archived at the UC San Diego Library found here. <a href=\"https://vimeo.com/ucsdmusic\" target=\"_blank\" rel=\"noreferrer\">vimeo.com/ucsdmusic</a>"
      ],
      image: "pics/AudioEnginner1.png",
      images: []
    },
    {
      id: "student-manager",
      kind: "work",
      role: "Student Manager",
      org: "UC San Diego",
      place: "La Jolla, CA",
      dates: "Sep 2021 – Sep 2023",
      stamp: "Sep 2021 – Sep 2023",
      note: "Part-time",
      start: "2021-09",
      end: "2023-09",
      tone: 4,
      types: ["field"],
      lede: "As a Student Manager at UC San Diego, I oversaw and <strong>trained 75+ student employees annually</strong>, ensuring operational efficiency and staff preparedness.",
      skills: ["Leadership", "Management"],
      body: [
        "With hardwork and excellent customer service through morning rushes and late nights, within 6 months I rose through the ranks and was <strong>promoted</strong> to Student Manager. <strong>Managaing 6 different locations at a time</strong>, <strong>managing schedules</strong>, <strong>training new employees</strong>, and ensuring the quality of the work was up to standard."
      ],
      image: "pics/studentlead1.png",
      images: []
    },
    {
      id: "mammoth",
      kind: "work",
      role: "Founder and Software Engineer",
      org: "Mammoth Plugins",
      place: "Self-employed",
      dates: "Oct 2019 – Jun 2025",
      stamp: "Oct 2019 – Jun 2025",
      start: "2019-10",
      end: "2025-06",
      tone: 5,
      types: ["swe"],
      lede: "Founder of a freelance startup. Developed and sold <strong>15+ plugins</strong> for games such as Minecraft and Stardew Valley, with an average 4.7/5 star rating and <strong>1.5k+ downloads</strong> on websites like SpigotMc. Devloping in <strong>Java</strong>, <strong>C++</strong> and various <strong>APIs</strong>, I was able to create a variety of plugins working alongside server owners to create a unique and engaging experience for their players. With easy to finetune <strong>yml/json</strong> files, customization was endless within vanila gaming.",
      skills: ["Java", "C++", "Entrepreneurship", "APIs", "YML/JSON", "Plugin Development"],
      body: [
        "One of those plugins is a free to play plugin called Bacon Brawl, a Mineplex-inspired Minecraft minigame. Where Users can for example customize their own characters, items depending the playstyle determined by server owners with 5k+ users at a time. Source is on GitHub: <a href=\"https://github.com/jamesd5V5/BaconBrawl\" target=\"_blank\" rel=\"noreferrer\">github.com/jamesd5V5/BaconBrawl</a>"
      ],
      image: "pics/mammoth1.png",
      images: []
    },
    {
      id: "dolphinbox",
      kind: "project",
      role: "Award Winning ML Bioacoustic Research",
      org: "DolphinBox",
      place: "UC San Diego",
      dates: "Feb 2025 – Jun 2025",
      stamp: "Jun 2025",
      start: "2025-02",
      end: "2025-06",
      mark: "square",
      types: ["swe", "ae"],
      lede: "Built a real-time <strong>embedded system</strong> that classifies bioacoustic signals into <strong>spectrograms</strong> and <strong>MFCC feature vectors</strong> for dolphin communication classification.",
      skills: ["Python", "PyTorch", "DSP", "Bioacoustics engineering", "Embedded Systems", "Machine Learning"],
      body: [
        "Since the 1970s, there has been no major breakthrough in dolphin communication research. Mainly due to the fact that humans hear 20-20kHz, dolphins hear 0-180khz. That's a lot of extra infomation to process, that us humans physically cannot hear. But with the help of machine learning, we have the ability to process this extra infomation and make sense of it.",
        "By orchestrating a team of researchers and enginners, I was able to record 2 teenage boy dolphins in a controlled envrionement with various types of <strong>hydrophones</strong>. Where the dolphins would be given trials. With a screen inbetween, if one dolphin was given a certain object type, through communication, the other dolphin would be able to identify the same object type and awarded through treats.",
        "This project gave me a deep understanding of the complexity of dolphin communication, <strong>bioacoustics</strong> and the power of <strong>machine learning</strong>, using <strong>Python</strong> and <strong>PyTorch</strong> to process and make sense of this infomation.",
        "Sole recipient of the <strong>Michael L. Sherman ICAM Research Award</strong> across the graduating class."
      ],
      image: "pics/Dolphin1.png",
      images: []
    },
    {
      id: "spc",
      kind: "project",
      role: "Acoustic Automation Validation Tool",
      org: "Statistical Process Controller",
      caption: "SPC",
      place: "Personal / research",
      dates: "Feb 2026 – May 2026",
      stamp: "May 2026",
      start: "2026-02",
      end: "2026-05",
      mark: "square",
      types: ["ae", "swe"],
      lede: "Engineered an automated acoustic validation tool that talks to <strong>Room EQ Wizard’s REST API</strong> to ingest high-resolution frequency response data (54k+ points), designed for UMIK-1. Using <strong>Python</strong> and <strong>APIs</strong> this tool allows one to process and validate the data, comparing tests like <strong>sine sweeps</strong> and <strong>impulses responses</strong> to correctly model room acoustics for various implacations, referencing golden-reference JSON schemas. ",
      skills: ["REW", "SPC", "Python", "REST API", "UMIK-1", "DSP"],
      body: [
        "Source is on GitHub: <a href=\"https://github.com/jamesd5V5/statistical-process-controller\" target=\"_blank\" rel=\"noreferrer\">github.com/jamesd5V5/statistical-process-controller</a>"
      ],
      image: "pics/Statistical1.png",
      images: []
    },
    {
      id: "gmtk",
      kind: "project",
      role: "Game Developer",
      org: "Game Jam Competitions",
      place: "GMTK",
      dates: "Jul 2022 – Jul 2025",
      stamp: "Jul 2022, 2023, 2024, 2025",
      start: "2022-07",
      end: "2025-07",
      types: ["ae", "swe"],
      marks: [
        { at: "2022-07", label: "GMTK 2022" },
        { at: "2023-07", label: "GMTK 2023" },
        { at: "2024-07", label: "GMTK 2024" },
        { at: "2025-07", label: "GMTK 2025" }
      ],
      lede: "For the past 5 years my team and I compete in rapid-turnaround (96 hour) annual GMTK game jam, where we are given a theme and with the very limited amount of time, we develop a game from scratch using both <strong>Unity</strong> and <strong>Godot</strong>. Everything from the art, code and music is all made by our team (besides the fonts). I specialize not only in the <strong>core gameplay</strong>, but the <strong>sound design</strong> and <strong>music composition</strong> using <strong>C#</strong>, <strong>Gdscript</strong>, and <strong>Ableton</strong>. Our games over the years have been praised with many awards and recognition.",
      skills: ["Godot", "Unity", "C#", "C++", "Gdscript", "Ableton", "Sound Design", "Game Development"],
      body: [
        "GMTK Game Jam 2025 — Top 10% of 9,500+ entries. <a href=\"https://github.com/SkylerGoh-dev/GMTK-2025-Game-Jam\" target=\"_blank\" rel=\"noreferrer\">github.com/SkylerGoh-dev/GMTK-2025-Game-Jam</a>",
        "GMTK Game Jam 2024 — Top 4% of 7,500+ entries. <a href=\"https://github.com/SkylerGoh-dev/GMTK-2024-Game-Jam\" target=\"_blank\" rel=\"noreferrer\">github.com/SkylerGoh-dev/GMTK-2024-Game-Jam</a>"
      ],
      image: "pics/gamejam1.png",
      images: ["pics/gamejam2.png", "pics/gamejam3.png"]
    },
    {
      id: "el-bondi",
      kind: "project",
      role: "Special Effects Freelance",
      org: "El Bondi Deconstruction",
      place: "Burning Man",
      dates: "Dec 2025",
      stamp: "Dec 2025",
      start: "2025-12",
      end: "2025-12",
      mark: "star",
      types: ["field"],
      lede: "Freelance Special Effects. Rain, Fire, Snow, Explosions. Sourced In L.A, I've gone through all types of projects, from small to large, working with my <strong>hands</strong>, <strong>heavy machinery</strong>, <strong>rigging</strong>, and <strong>maintaing safety protocols</strong>.",
      skills: ["Special Effects Production", "Production Teardown / Strike"],
      body: [
        "One of my most recent contracts was giving El Bondi, a burning man art piece, a last hurrah. <strong>Rigging a bus to explode artisitcally</strong> by weaking the frames and structure of the bus just right, while also wiring up the charges. Assisted with controlled practical-effects production work involving <strong>tools</strong>, <strong>wiring</strong>, <strong>mounting</strong>, <strong>transport</strong>, and <strong>post-event strike</strong>. Because in reality, computers can't handle the heat. Helping to bring the art piece to life for the final event."
      ],
      image: "pics/elbondi1.png",
      images: ["pics/ElBondi2.gif", "pics/elbondi3.png"]
    },
    {
      id: "ucsd-degree",
      kind: "education",
      role: "B.S. Machine Learning & B.A. Audio Engineering",
      org: "UC San Diego",
      place: "La Jolla, CA",
      dates: "Sep 2021 – Jun 2025",
      stamp: "Sep 2021 – Jun 2025",
      start: "2021-09",
      end: "2025-06",
      types: ["swe", "ae"],
      lede: "Dual degrees completed at UC San Diego. Minor in Computer Science. 3.8 GPA",
      skills: ["Machine Learning", "Audio Engineering", "Computer Science"],
      body: [
        "Apart of Strides (Daily Running Club), Rock Climbing and Billards Clubs."
      ],
      image: "pics/ucsd.png",
      images: []
    }
  ];

  var NOW = new Date();
  var AXIS_END = NOW.getFullYear() * 12 + (NOW.getMonth() + 1);

  function parseMonth(stamp) {
    if (!stamp || stamp === "present") return null;
    var parts = String(stamp).split("-");
    var year = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10);
    if (!year || !month) return null;
    return year * 12 + month;
  }

  var AXIS_START = JOBS.reduce(function (min, job) {
    var values = [parseMonth(job.start), parseMonth(job.end)];
    (job.marks || []).forEach(function (mark) {
      values.push(parseMonth(mark.at || mark));
    });
    values.forEach(function (value) {
      if (value != null && value < min) min = value;
    });
    return min;
  }, AXIS_END);
  if (AXIS_END <= AXIS_START) AXIS_END = AXIS_START + 1;
  var AXIS_SPAN = AXIS_END - AXIS_START;

  function monthValue(stamp) {
    if (!stamp || stamp === "present") return AXIS_END;
    var parsed = parseMonth(stamp);
    return parsed == null ? AXIS_END : parsed;
  }

  var FOCUS_START = 2023 * 12 + 1;
  var FOLD_PCT = 16;

  function hasFold() {
    return AXIS_START < FOCUS_START - 3;
  }

  function toPct(value) {
    var clamped = Math.min(AXIS_END, Math.max(AXIS_START, value));
    if (!hasFold()) {
      return ((clamped - AXIS_START) / AXIS_SPAN) * 100;
    }
    if (clamped <= FOCUS_START) {
      var early = FOCUS_START - AXIS_START;
      return early ? ((clamped - AXIS_START) / early) * FOLD_PCT : 0;
    }
    var late = AXIS_END - FOCUS_START;
    return late ? FOLD_PCT + ((clamped - FOCUS_START) / late) * (100 - FOLD_PCT) : 100;
  }

  function jobRange(job) {
    var start = monthValue(job.start);
    var end = monthValue(job.end);
    if (end < start) end = start;
    return { start: start, end: end };
  }

  function assignLanes(items) {
    var sorted = items.slice().sort(function (a, b) {
      return a.range.start - b.range.start || a.range.end - b.range.end;
    });
    var lanes = [];
    sorted.forEach(function (item) {
      var i;
      for (i = 0; i < lanes.length; i++) {
        if (lanes[i] <= item.range.start) {
          item.lane = i;
          lanes[i] = item.range.end;
          return;
        }
      }
      item.lane = lanes.length;
      lanes.push(item.range.end);
    });
    return lanes.length || 1;
  }

  function sortByLastDate(jobs) {
    return jobs.slice().sort(function (a, b) {
      var aPresent = a.end === "present" ? 1 : 0;
      var bPresent = b.end === "present" ? 1 : 0;
      if (aPresent !== bPresent) return bPresent - aPresent;
      var endDiff = monthValue(b.end) - monthValue(a.end);
      if (endDiff) return endDiff;
      return monthValue(b.start) - monthValue(a.start);
    });
  }

  function typeLabels(job) {
    var names = { swe: "SWE", ae: "AE", field: "Field" };
    return (job.types || [])
      .map(function (type) {
        return names[type] || type;
      })
      .join(" · ");
  }

  function typeIconSvg(type) {
    if (type === "swe") {
      return '<svg class="work-type-icon" viewBox="0 0 16 16" aria-hidden="true"><rect x="4" y="1" width="2" height="2"/><rect x="10" y="1" width="2" height="2"/><rect x="6" y="3" width="2" height="2"/><rect x="8" y="3" width="2" height="2"/><rect x="2" y="5" width="12" height="2"/><rect x="2" y="7" width="2" height="2"/><rect x="6" y="7" width="4" height="2"/><rect x="12" y="7" width="2" height="2"/><rect x="0" y="9" width="16" height="2"/><rect x="0" y="11" width="2" height="2"/><rect x="4" y="11" width="8" height="2"/><rect x="14" y="11" width="2" height="2"/><rect x="2" y="13" width="2" height="2"/><rect x="12" y="13" width="2" height="2"/></svg>';
    }
    if (type === "ae") {
      return '<svg class="work-type-icon" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.6"/><circle cx="8" cy="8" r="2.1" fill="var(--paper)"/><circle cx="8" cy="8" r="0.7"/><circle cx="8" cy="8" r="3.6" fill="none" stroke="var(--paper)" stroke-width="0.7"/><path d="M8 1.9a6.1 6.1 0 0 1 5.2 3.1L8 8Z" fill="var(--paper)" opacity="0.55"/></svg>';
    }
    if (type === "field") {
      return '<svg class="work-type-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.6a4 4 0 0 1 4 4c0 2.9-4 8.6-4 8.6S4 8.5 4 5.6a4 4 0 0 1 4-4z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="5.6" r="1.35"/></svg>';
    }
    return "";
  }

  function typeIcons(job) {
    var names = { swe: "SWE", ae: "AE", field: "Field" };
    return (job.types || [])
      .map(function (type) {
        var label = names[type] || type;
        return (
          '<span class="work-type-mark" title="' +
          label +
          '" aria-label="' +
          label +
          '">' +
          typeIconSvg(type) +
          "</span>"
        );
      })
      .join("");
  }

  function kindLabel(job) {
    if (job.kind === "project") return "Project";
    if (job.kind === "education") return "Education";
    return "Work";
  }

  function haystack(job) {
    return [
      job.org,
      job.role,
      job.place,
      job.stamp,
      job.dates,
      job.note,
      job.lede,
      job.kind,
      kindLabel(job),
      (job.types || []).join(" "),
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

  function calendarMonth(value) {
    return ((value - 1) % 12) + 1;
  }

  function calendarYear(value) {
    return Math.floor((value - 1) / 12);
  }

  function yearTicks() {
    var ticks = [];
    var lastYear = NOW.getFullYear();
    var year;
    if (hasFold()) {
      ticks.push({ label: String(calendarYear(AXIS_START)), pct: 0 });
      ticks.push({ label: "2021", pct: toPct(2021 * 12 + 1) });
      ticks.push({ label: "2022", pct: toPct(2022 * 12 + 1) });
      ticks.push({ label: "2023", pct: FOLD_PCT });
      for (year = 2024; year <= lastYear; year++) {
        ticks.push({ label: String(year), pct: toPct(year * 12 + 1) });
      }
      return ticks;
    }
    var firstYear = calendarYear(AXIS_START);
    for (year = firstYear; year <= lastYear; year++) {
      var jan = year * 12 + 1;
      ticks.push({
        label: String(year),
        pct: jan <= AXIS_START ? 0 : toPct(jan)
      });
    }
    return ticks;
  }

  function rulerMarks() {
    var marks = [];
    var value;
    if (hasFold()) {
      [2021, 2022].forEach(function (year) {
        var pct = toPct(year * 12 + 1);
        if (pct > 1 && pct < FOLD_PCT - 1) marks.push({ kind: "year", pct: pct });
      });
      for (value = AXIS_START; value < FOCUS_START; value++) {
        var earlyMonth = calendarMonth(value);
        var earlyPct = toPct(value);
        if (earlyPct < 1.2 || earlyPct > FOLD_PCT - 1.2) continue;
        if (earlyMonth === 1 && calendarYear(value) === 2020) {
          marks.push({ kind: "year", pct: earlyPct });
        } else if (earlyMonth === 7) {
          marks.push({ kind: "half", pct: earlyPct });
        }
      }
    }
    var denseFrom = hasFold() ? FOCUS_START : AXIS_START;
    for (value = denseFrom; value <= AXIS_END; value++) {
      var month = calendarMonth(value);
      var pct = toPct(value);
      if (pct < 0.2 || pct > 99.6) continue;
      if (month === 1) marks.push({ kind: "year", pct: pct });
      else if (month === 7) marks.push({ kind: "half", pct: pct });
      else marks.push({ kind: "month", pct: pct });
    }
    return marks;
  }

  function markStyle(left, width) {
    var style = "left:" + left.toFixed(2) + "%;";
    if (width != null) style += "width:" + Math.max(width, 1.1).toFixed(2) + "%;";
    return style;
  }

  function itemBodyHtml(job) {
    var shots = [];
    if (job.image) shots.push(job.image);
    (job.images || []).forEach(function (src) {
      if (shots.indexOf(src) === -1) shots.push(src);
    });
    var gallery = shots
      .map(function (src) {
        return '<img src="' + src + '" alt="" />';
      })
      .join("");
    var body = (job.body || [])
      .map(function (para) {
        return "<p>" + para + "</p>";
      })
      .join("");
    var skills = job.skills && job.skills.length
      ? '<ul class="work-skills">' + skillsHtml(job.skills) + "</ul>"
      : "";
    var lede = job.lede ? "<p>" + job.lede + "</p>" : "";
    return (
      '<div class="work-item-body-inner">' +
      '<div class="work-item-content">' +
      lede +
      body +
      skills +
      "</div>" +
      (gallery ? '<div class="work-item-gallery">' + gallery + "</div>" : "") +
      "</div>"
    );
  }

  function WorkDesk(root) {
    var timeline = root.querySelector("[data-work-timeline]");
    var list = root.querySelector("[data-work-list]");
    var scrollDownBtn = root.querySelector("[data-work-scroll=down]");
    var scrollUpBtn = root.querySelector("[data-work-scroll=up]");
    var status = root.querySelector("[data-work-status]");
    var search = root.querySelector("[data-work-search]");
    var typeChecks = root.querySelectorAll("[data-work-type]");
    var headerTitle = document.querySelector(".site-header-title");
    var pinned = null;
    var opened = null;
    var collapsed = {
      work: false,
      project: false,
      education: false
    };
    var scrollEdge = 10;
    var listScrollReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function syncListScrollHints() {
      if (!list || root.hidden) return;
      var overflow = list.scrollHeight > list.clientHeight + scrollEdge;
      var atBottom = list.scrollTop + list.clientHeight >= list.scrollHeight - scrollEdge;
      if (!overflow) {
        if (scrollDownBtn) {
          scrollDownBtn.hidden = true;
          scrollDownBtn.classList.remove("is-visible");
        }
        if (scrollUpBtn) {
          scrollUpBtn.hidden = true;
          scrollUpBtn.classList.remove("is-visible");
        }
        return;
      }
      if (scrollDownBtn) {
        scrollDownBtn.hidden = atBottom;
        scrollDownBtn.classList.toggle("is-visible", !atBottom);
      }
      if (scrollUpBtn) {
        scrollUpBtn.hidden = !atBottom;
        scrollUpBtn.classList.toggle("is-visible", atBottom);
      }
    }

    function scrollListStep(direction) {
      if (!list) return;
      var delta = Math.max(120, Math.round(list.clientHeight * 0.72));
      if (direction === "up") delta = -delta;
      list.scrollBy({
        top: delta,
        behavior: listScrollReduced ? "auto" : "smooth"
      });
    }

    function jobById(id) {
      var i;
      for (i = 0; i < JOBS.length; i++) {
        if (JOBS[i].id === id) return JOBS[i];
      }
      return null;
    }

    function termsFrom(query) {
      return query
        .split(",")
        .map(function (part) {
          return part.trim().toLowerCase();
        })
        .filter(Boolean);
    }

    function selectedTypes() {
      var on = [];
      typeChecks.forEach(function (box) {
        if (box.checked) on.push(box.getAttribute("data-work-type"));
      });
      return on;
    }

    function readFilterParams() {
      var hash = window.location.hash || "";
      var hashQuery = "";
      var split = hash.indexOf("?");
      if (split !== -1) {
        hashQuery = hash.slice(split + 1);
        hash = hash.slice(0, split);
      }
      var params = new URLSearchParams(window.location.search || "");
      var extra = new URLSearchParams(hashQuery);
      extra.forEach(function (value, key) {
        if (!params.has(key)) params.set(key, value);
      });
      function list(name) {
        return (params.get(name) || "")
          .toLowerCase()
          .split(/[,+]/)
          .map(function (part) {
            return part.trim();
          })
          .filter(Boolean);
      }
      var types = list("type").concat(list("types")).map(function (type) {
        if (type === "software" || type === "eng") return "swe";
        if (type === "audio") return "ae";
        return type;
      });
      return {
        types: types,
        wantOpen: hash === "#work" || params.get("work") === "1" || types.length > 0
      };
    }

    function applyFilterParams(parsed) {
      typeChecks.forEach(function (box) {
        box.checked = parsed.types.indexOf(box.getAttribute("data-work-type")) !== -1;
      });
    }

    function syncFilterUrl(clear) {
      var url = new URL(window.location.href);
      ["type", "types", "kind", "kinds", "work"].forEach(function (key) {
        url.searchParams.delete(key);
      });
      if (clear) {
        history.replaceState(null, "", url.pathname + url.search);
        return;
      }
      var types = selectedTypes();
      if (types.length) url.searchParams.set("type", types.join(","));
      history.replaceState(null, "", url.pathname + url.search + "#work");
    }

    function matchesTypes(job, types) {
      if (!typeChecks.length) return true;
      if (!types.length) return true;
      var tags = job.types || [];
      if (!tags.length) return false;
      return tags.some(function (tag) {
        return types.indexOf(tag) !== -1;
      });
    }

    function filtered() {
      var query = search && search.value ? search.value.trim() : "";
      var terms = termsFrom(query);
      var types = selectedTypes();
      return JOBS.filter(function (job) {
        if (!matchesTypes(job, types)) return false;
        if (!terms.length) return true;
        var hay = haystack(job);
        return terms.every(function (term) {
          return hay.indexOf(term) !== -1;
        });
      });
    }

    function matchedIds() {
      var ids = {};
      filtered().forEach(function (job) {
        ids[job.id] = true;
      });
      return ids;
    }

    function setStatus() {
      if (!status) return;
      var job = opened ? jobById(opened) : null;
      status.textContent = job ? job.org : "Work";
    }

    function renderTimeline() {
      var matched = matchedIds();
      var works = [];
      var projects = [];
      var education = [];
      JOBS.forEach(function (job) {
        var range = jobRange(job);
        var item = { job: job, range: range };
        if (job.kind === "work") works.push(item);
        else if (job.kind === "education") education.push(item);
        else projects.push(item);
      });
      var laneCount = assignLanes(works);
      var ticks = yearTicks()
        .map(function (tick) {
          return (
            '<span class="work-timeline-year" style="left:' +
            tick.pct.toFixed(2) +
            '%">' +
            tick.label +
            "</span>"
          );
        })
        .join("");
      var ruler = rulerMarks()
        .map(function (mark) {
          return (
            '<span class="work-tick is-' +
            mark.kind +
            '" style="left:' +
            mark.pct.toFixed(2) +
            '%"></span>'
          );
        })
        .join("");

      function barButton(item, extraClass) {
        var job = item.job;
        var left = toPct(item.range.start);
        var right = job.end === "present" ? item.range.end : Math.min(AXIS_END, item.range.end + 1);
        var width = toPct(right) - left;
        var mute = matched[job.id] ? "" : " is-mute";
        var pin = pinned === job.id ? " is-pinned" : "";
        var attrs = extraClass.indexOf("is-edu") !== -1
          ? ""
          : ' data-tone="' + (job.tone || 0) + '" data-lane="' + item.lane + '"';
        return (
          '<button type="button" class="work-mark work-mark-bar' +
          extraClass +
          mute +
          pin +
          '" data-work-mark="' +
          job.id +
          '" data-caption="' +
          (job.caption || job.role + " · " + job.stamp) +
          '"' +
          attrs +
          ' style="' +
          markStyle(left, width) +
          '" aria-label="' +
          job.role +
          ", " +
          job.org +
          ", " +
          job.stamp +
          '"><span class="work-mark-label">' +
          job.org +
          "</span></button>"
        );
      }

      var bars = works.map(function (item) {
        return barButton(item, "");
      }).join("");
      var eduBars = education.map(function (item) {
        return barButton(item, " is-edu");
      }).join("");
      var rail = projects
        .map(function (item) {
          var job = item.job;
          var mute = matched[job.id] ? "" : " is-mute";
          var pin = pinned === job.id ? " is-pinned" : "";
          var points = job.marks && job.marks.length
            ? job.marks
            : [{ at: job.end === "present" ? job.start : job.end }];
          return points
            .map(function (point) {
              var at = point.at || point;
              var caption = point.label
                ? point.label + " · Jul " + String(at).slice(0, 4)
                : (job.caption || job.role) + (job.caption ? "" : " · " + job.stamp);
              var shape = job.mark === "star" ? " is-star" : job.mark === "square" ? " is-square" : "";
              return (
                '<button type="button" class="work-mark work-mark-dot' +
                shape +
                mute +
                pin +
                '" data-work-mark="' +
                job.id +
                '" data-caption="' +
                caption +
                '" aria-label="' +
                caption +
                '" style="left:' +
                toPct(monthValue(at) + 0.5).toFixed(2) +
                '%"></button>'
              );
            })
            .join("");
        })
        .join("");
      var nowPct = toPct(AXIS_END);
      timeline.innerHTML =
        '<div class="work-timeline-scroll">' +
        '<div class="work-timeline-track" style="--lanes:' +
        laneCount +
        ";--edu:" +
        (education.length ? 1 : 0) +
        '">' +
        '<p class="work-timeline-caption" data-work-caption hidden></p>' +
        '<div class="work-timeline-ruler" aria-hidden="true">' +
        ruler +
        "</div>" +
        '<div class="work-timeline-years" aria-hidden="true">' +
        ticks +
        "</div>" +
        '<div class="work-timeline-now" style="left:' +
        nowPct.toFixed(2) +
        '%" title="Now"><span>Now</span></div>' +
        '<div class="work-timeline-lanes">' +
        bars +
        "</div>" +
        (eduBars ? '<div class="work-timeline-edu">' + eduBars + "</div>" : "") +
        '<div class="work-timeline-rail">' +
        rail +
        "</div>" +
        '<div class="work-timeline-axis" aria-hidden="true"></div>' +
        "</div></div>";
    }

    function itemHtml(job) {
      var open = opened === job.id;
      var meta = [job.place, job.org, job.note, job.stamp].filter(Boolean).join(" · ");
      var tone = job.kind === "work" ? ' data-tone="' + (job.tone || 0) + '"' : "";
      return (
        '<article class="work-item' +
        (open ? " is-open" : "") +
        '" data-work-item="' +
        job.id +
        '"' +
        tone +
        ' data-kind="' +
        job.kind +
        '">' +
        '<button type="button" class="work-item-toggle" aria-expanded="' +
        (open ? "true" : "false") +
        '">' +
        '<span class="work-item-role">' +
        job.role +
        (typeIcons(job) ? '<span class="work-item-role-types">' + typeIcons(job) + "</span>" : "") +
        "</span>" +
        '<span class="work-item-side">' +
        '<span class="work-item-kind">' +
        kindLabel(job) +
        "</span>" +
        (typeLabels(job)
          ? '<span class="work-item-types">' + typeLabels(job) + "</span>"
          : "") +
        "</span>" +
        '<span class="work-item-meta">' +
        meta +
        '<span class="work-item-chevron" aria-hidden="true"></span>' +
        "</span>" +
        "</button>" +
        '<div class="work-item-body">' +
        itemBodyHtml(job) +
        "</div>" +
        "</article>"
      );
    }

    function sectionHtml(title, key, jobs) {
      if (!jobs.length) return "";
      var shut = collapsed[key];
      return (
        '<section class="work-section' +
        (shut ? " is-collapsed" : "") +
        '" data-work-section="' +
        key +
        '">' +
        '<button type="button" class="work-list-kicker" aria-expanded="' +
        (shut ? "false" : "true") +
        '">' +
        title +
        '<span class="work-section-chevron" aria-hidden="true"></span>' +
        "</button>" +
        '<div class="work-section-body"><div class="work-section-inner">' +
        jobs.map(itemHtml).join("") +
        "</div></div>" +
        "</section>"
      );
    }

    function renderList() {
      var matched = filtered();
      if (pinned) {
        var pinnedRows = matched.filter(function (job) {
          return job.id === pinned;
        });
        list.innerHTML = pinnedRows.length
          ? pinnedRows.map(itemHtml).join("")
          : '<p class="work-empty">Nothing matches.</p>';
        return;
      }
      var work = sortByLastDate(matched.filter(function (job) { return job.kind === "work"; }));
      var projects = sortByLastDate(matched.filter(function (job) { return job.kind === "project"; }));
      var education = sortByLastDate(matched.filter(function (job) { return job.kind === "education"; }));
      if (!work.length && !projects.length && !education.length) {
        list.innerHTML = '<p class="work-empty">Nothing matches.</p>';
        return;
      }
      list.innerHTML =
        sectionHtml("Work", "work", work) +
        sectionHtml("Projects", "project", projects) +
        sectionHtml("Education", "education", education);
    }

    function render() {
      var ids = matchedIds();
      if (pinned && !ids[pinned]) {
        pinned = null;
        opened = null;
      }
      if (opened && !ids[opened] && opened !== pinned) opened = null;
      var allBtn = root.querySelector("[data-work-action=all]");
      if (allBtn) allBtn.hidden = !pinned;
      renderTimeline();
      renderList();
      setStatus();
      requestAnimationFrame(function () {
        requestAnimationFrame(syncListScrollHints);
      });
    }

    function expandSectionFor(row) {
      var section = row.closest("[data-work-section]");
      if (!section || !section.classList.contains("is-collapsed")) return;
      var key = section.getAttribute("data-work-section");
      if (!key) return;
      collapsed[key] = false;
      section.classList.remove("is-collapsed");
      var btn = section.querySelector(".work-list-kicker");
      if (btn) btn.setAttribute("aria-expanded", "true");
    }

    function scrollListToItem(id) {
      if (!list || !id) return;
      var row = list.querySelector('[data-work-item="' + id + '"]');
      if (!row) return;
      var section = row.closest("[data-work-section]");
      var sectionWasCollapsed = section && section.classList.contains("is-collapsed");
      expandSectionFor(row);

      function alignTitle() {
        var toggle = row.querySelector(".work-item-toggle");
        if (!toggle) return;
        var listRect = list.getBoundingClientRect();
        var top = toggle.getBoundingClientRect().top - listRect.top;
        var pad = 14;
        list.scrollTop += top - pad;
      }

      if (sectionWasCollapsed) {
        window.setTimeout(alignTitle, 420);
      } else {
        requestAnimationFrame(function () {
          requestAnimationFrame(alignTitle);
        });
      }
    }

    function pinJob(id) {
      var job = jobById(id);
      if (!job) return;
      if (pinned === id) {
        pinned = null;
        opened = id;
      } else {
        pinned = id;
        opened = id;
      }
      render();
      scrollListToItem(id);
    }

    function toggleItem(id) {
      var opening = opened !== id;
      if (opened === id) opened = null;
      else opened = id;
      renderList();
      setStatus();
      if (opening && opened === id) scrollListToItem(id);
    }

    function clearHover() {
      timeline.classList.remove("is-hovering");
      timeline.querySelectorAll(".is-hover").forEach(function (el) {
        el.classList.remove("is-hover");
      });
      list.querySelectorAll(".is-hover").forEach(function (el) {
        el.classList.remove("is-hover");
      });
      hideCaption();
    }

    function setHover(id, mark) {
      clearHover();
      if (!id) return;
      timeline.classList.add("is-hovering");
      timeline.querySelectorAll('[data-work-mark="' + id + '"]').forEach(function (el) {
        el.classList.add("is-hover");
      });
      var item = list.querySelector('[data-work-item="' + id + '"]');
      if (item) item.classList.add("is-hover");
      var cap = mark || timeline.querySelector('[data-work-mark="' + id + '"]');
      if (cap) showCaption(cap);
    }

    function showCaption(mark) {
      var caption = timeline.querySelector("[data-work-caption]");
      if (!caption || !mark) return;
      var job = jobById(mark.getAttribute("data-work-mark"));
      if (!job) return;
      caption.hidden = false;
      caption.textContent = mark.getAttribute("data-caption") || (job.role + " · " + job.stamp);
      var track = timeline.querySelector(".work-timeline-track");
      var markBox = mark.getBoundingClientRect();
      var trackBox = track.getBoundingClientRect();
      var x = markBox.left - trackBox.left + markBox.width / 2;
      x = Math.max(72, Math.min(trackBox.width - 72, x));
      caption.style.left = x + "px";
    }

    function hideCaption() {
      var caption = timeline.querySelector("[data-work-caption]");
      if (!caption) return;
      caption.hidden = true;
    }

    timeline.addEventListener("click", function (event) {
      var mark = event.target.closest("[data-work-mark]");
      if (!mark) return;
      pinJob(mark.getAttribute("data-work-mark"));
    });

    timeline.addEventListener("pointerover", function (event) {
      var mark = event.target.closest("[data-work-mark]");
      if (!mark) return;
      setHover(mark.getAttribute("data-work-mark"), mark);
    });

    timeline.addEventListener("pointerout", function (event) {
      var mark = event.target.closest("[data-work-mark]");
      if (!mark) return;
      if (event.relatedTarget && timeline.contains(event.relatedTarget) && event.relatedTarget.closest("[data-work-mark]")) {
        return;
      }
      clearHover();
    });

    timeline.addEventListener("focusin", function (event) {
      var mark = event.target.closest("[data-work-mark]");
      if (!mark) return;
      setHover(mark.getAttribute("data-work-mark"), mark);
    });

    timeline.addEventListener("focusout", function () {
      window.setTimeout(function () {
        if (!timeline.querySelector(".work-mark:focus-visible") && !list.querySelector(".work-item-toggle:focus-visible")) {
          clearHover();
        }
      }, 0);
    });

    list.addEventListener("pointerover", function (event) {
      var item = event.target.closest("[data-work-item]");
      if (!item) return;
      setHover(item.getAttribute("data-work-item"));
    });

    list.addEventListener("pointerout", function (event) {
      var item = event.target.closest("[data-work-item]");
      if (!item) return;
      if (event.relatedTarget && list.contains(event.relatedTarget) && event.relatedTarget.closest("[data-work-item]")) {
        return;
      }
      clearHover();
    });

    list.addEventListener("click", function (event) {
      if (event.target.closest("a[href]")) return;
      var sectionBtn = event.target.closest(".work-list-kicker");
      if (sectionBtn) {
        var section = sectionBtn.closest("[data-work-section]");
        if (!section) return;
        var key = section.getAttribute("data-work-section");
        collapsed[key] = !collapsed[key];
        section.classList.toggle("is-collapsed", collapsed[key]);
        sectionBtn.setAttribute("aria-expanded", collapsed[key] ? "false" : "true");
        return;
      }
      var toggle = event.target.closest(".work-item-toggle");
      if (!toggle) return;
      var item = toggle.closest("[data-work-item]");
      if (!item) return;
      toggleItem(item.getAttribute("data-work-item"));
    });

    list.addEventListener("scroll", syncListScrollHints, { passive: true });

    if (scrollDownBtn) {
      scrollDownBtn.addEventListener("click", function () {
        scrollListStep("down");
      });
    }

    if (scrollUpBtn) {
      scrollUpBtn.addEventListener("click", function () {
        scrollListStep("up");
      });
    }

    window.addEventListener("resize", syncListScrollHints, { passive: true });

    function nudgeList() {
      if (!list) return;
      list.classList.remove("is-nudge");
      void list.offsetWidth;
      list.classList.add("is-nudge");
      window.setTimeout(function () {
        list.classList.remove("is-nudge");
      }, 480);
    }

    function onFilterChange() {
      render();
      nudgeList();
      if (!root.hidden) syncFilterUrl(false);
    }

    if (search) {
      search.addEventListener("input", function () {
        render();
      });
    }
    typeChecks.forEach(function (box) {
      var type = box.getAttribute("data-work-type");
      var icon = typeIconSvg(type);
      if (icon) {
        var mark = document.createElement("span");
        mark.className = "work-type-mark";
        mark.setAttribute("aria-hidden", "true");
        mark.innerHTML = icon;
        box.parentNode.appendChild(mark);
      }
      box.addEventListener("change", onFilterChange);
    });

    root.addEventListener("click", function (event) {
      var action = event.target.closest("[data-work-action]");
      if (!action) return;
      if (action.getAttribute("data-work-action") === "close") close();
      if (action.getAttribute("data-work-action") === "all") {
        pinned = null;
        render();
      }
      if (action.getAttribute("data-work-action") === "clear-filters") {
        typeChecks.forEach(function (box) {
          box.checked = false;
        });
        onFilterChange();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (root.hidden) return;
      if (event.key !== "Escape") return;
      if (pinned || opened) {
        pinned = null;
        opened = null;
        render();
        return;
      }
      close();
    });

    function open() {
      root.hidden = false;
      root.setAttribute("aria-hidden", "false");
      document.body.classList.add("work-open");
      if (headerTitle) headerTitle.setAttribute("aria-hidden", "false");
      render();
      syncFilterUrl(false);
      if (search) search.focus();
    }

    function close() {
      pinned = null;
      opened = null;
      root.hidden = true;
      root.setAttribute("aria-hidden", "true");
      document.body.classList.remove("work-open");
      if (headerTitle) headerTitle.setAttribute("aria-hidden", "true");
      syncFilterUrl(true);
    }

    var boot = readFilterParams();
    if (boot.types.length) applyFilterParams(boot);

    render();

    return {
      open: open,
      close: close,
      shouldOpen: function () {
        return readFilterParams().wantOpen;
      },
      isOpen: function () {
        return !root.hidden;
      }
    };
  }

  global.WorkDesk = { create: WorkDesk };
})(window);
