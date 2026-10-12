(function () {
  "use strict";

  var W = window.WEDDING;
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // line icons for the order of the day (48 x 48, stroked via CSS)
  var ICONS = {
    toast: '<g transform="rotate(-12 17 24)"><path d="M12 8h10l-1 13a4 4 0 0 1-8 0z"/><path d="M17 25v13M12 39h10"/></g><g transform="rotate(12 31 24)"><path d="M26 8h10l-1 13a4 4 0 0 1-8 0z"/><path d="M31 25v13M26 39h10"/></g><path d="M24 2v4M20 4l1 2M28 4l-1 2"/>',
    rings: '<circle cx="18" cy="29" r="11"/><circle cx="31" cy="29" r="11"/><path d="M18 18l-4-4 2-4h4l2 4z"/>',
    sign: '<path d="M11 6h18l8 8v28H11z"/><path d="M29 6v8h8"/><path d="M17 23h14M17 29h14"/><path d="M17 36q3-4 5 0t5-1 4 1"/>',
    dine: '<circle cx="24" cy="25" r="10"/><circle cx="24" cy="25" r="6"/><path d="M7 9v9a3 3 0 0 0 6 0V9M10 9v32"/><path d="M41 41V9c-4 3-5 12-3 18h3"/>',
    cake: '<path d="M9 41h30"/><path d="M12 41V30h24v11"/><path d="M12 35q3 3 6 0t6 0 6 0 6 0"/><path d="M17 30v-8h14v8"/><path d="M24 22v-5"/><path d="M24 17c-2.5-2-2-5 0-7 2 2 2.5 5 0 7z"/>',
    car: '<path d="M5 33v-7l5-2 4-9h18l5 9 6 2v7h-4"/><path d="M19 33h10"/><circle cx="14" cy="33" r="4.5"/><circle cx="34" cy="33" r="4.5"/><path d="M14 24h22M24 15v9"/>'
  };

  /* ---------- content from data.js ---------- */
  var day = new Date(W.date + "T" + W.start + ":00+05:30");
  var fmt = function (opts) {
    return new Intl.DateTimeFormat("en-GB", Object.assign({ timeZone: "Asia/Colombo" }, opts)).format(day);
  };
  var startTime = new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Colombo", hour: "numeric", minute: "2-digit" }).format(day);

  var bind = {
    first: W.couple.first,
    second: W.couple.second,
    monogram: W.couple.monogram,
    initials: W.couple.first.charAt(0) + W.couple.second.charAt(0),
    hosts: W.hosts,
    request: W.request,
    weekday: fmt({ weekday: "long" }),
    month: fmt({ month: "long" }),
    day: fmt({ day: "numeric" }),
    year: fmt({ year: "numeric" }),
    longDate: fmt({ day: "numeric", month: "long", year: "numeric" }),
    startTime: startTime,
    venueName: W.venue.name,
    venueAddress: W.venue.address,
    dressCode: W.dressCode,
    rsvpBy: W.rsvp.by,
    closing: W.closing
  };
  $$("[data-bind]").forEach(function (el) {
    var value = bind[el.getAttribute("data-bind")];
    if (value != null) el.textContent = value;
  });
  document.title = W.couple.first + " & " + W.couple.second + " — Wedding Invitation";

  /* ---------- photographs ---------- */
  $("#heroImg").src = W.photos.hero;
  $("#venueImg").src = W.photos.venue;
  var portrait = $("#portraitPhoto");
  portrait.style.backgroundImage = 'url("' + W.photos.portrait + '")';
  if (W.photos.portraitSize) portrait.style.backgroundSize = W.photos.portraitSize;
  if (W.photos.portraitPosition) portrait.style.backgroundPosition = W.photos.portraitPosition;
  if (W.photos.heroPosition) $("#heroImg").style.objectPosition = W.photos.heroPosition;

  /* ---------- guest name from ?to= (text only, never HTML) ---------- */
  var guest = (new URLSearchParams(location.search).get("to") || "").replace(/\s+/g, " ").trim().slice(0, 40);
  if (guest) {
    $("#stageGuest").textContent = guest;
    var heroGuest = $("#heroGuest");
    heroGuest.textContent = "Dear " + guest + ",";
    heroGuest.hidden = false;
  }

  /* ---------- order of the day ---------- */
  var timeline = $("#timeline");
  W.schedule.forEach(function (item, i) {
    var li = document.createElement("li");
    li.className = "events__item reveal";
    li.style.setProperty("--d", ((i % 2) * 0.12) + "s");

    var icon = document.createElement("span");
    icon.className = "events__icon";
    icon.setAttribute("aria-hidden", "true");
    // ICONS is a fixed map defined above; item.icon only selects a key
    icon.innerHTML = '<svg viewBox="0 0 48 48">' + (ICONS[item.icon] || ICONS.rings) + "</svg>";
    li.appendChild(icon);

    [["p", "events__time", item.time], ["h3", "events__title", item.title], ["p", "events__note", item.note]].forEach(function (row) {
      var el = document.createElement(row[0]);
      el.className = row[1];
      el.textContent = row[2];
      li.appendChild(el);
    });
    timeline.appendChild(li);
  });

  /* ---------- links: map, calendar, WhatsApp ---------- */
  var stamp = function (time) { return W.date.replace(/-/g, "") + "T" + time.replace(":", "") + "00"; };
  var title = W.couple.first + " & " + W.couple.second + " — Wedding";
  $("#mapBtn").href = W.venue.mapUrl;
  $("#calBtn").href = "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    "&text=" + encodeURIComponent(title) +
    "&dates=" + stamp(W.start) + "/" + stamp(W.end) +
    "&ctz=Asia/Colombo" +
    "&location=" + encodeURIComponent(W.venue.name + ", " + W.venue.address);

  var wa = function (message) { return "https://wa.me/" + W.rsvp.whatsapp + "?text=" + encodeURIComponent(message); };
  var from = guest ? " — " + guest : "";
  $("#yesBtn").href = wa("With joy, we accept your invitation to the wedding of " + W.couple.first + " & " + W.couple.second + "." + from);
  $("#noBtn").href = wa("With regret, we are unable to attend the wedding of " + W.couple.first + " & " + W.couple.second + ". Wishing you both every happiness." + from);

  /* ---------- countdown ---------- */
  var cd = {};
  $$("[data-cd]").forEach(function (el) { cd[el.getAttribute("data-cd")] = el; });
  var tick = function () {
    var s = Math.floor(Math.max(0, day.getTime() - Date.now()) / 1000);
    cd.days.textContent = Math.floor(s / 86400);
    cd.hours.textContent = Math.floor((s % 86400) / 3600);
    cd.minutes.textContent = Math.floor((s % 3600) / 60);
    cd.seconds.textContent = s % 60;
  };
  tick();
  setInterval(tick, 1000);

  /* ---------- gold dust: stage sparkles + hero flecks ---------- */
  var scatter = function (host, count, cls, setup) {
    for (var i = 0; i < count; i++) {
      var el = document.createElement("span");
      el.className = cls;
      setup(el, i);
      host.appendChild(el);
    }
  };
  if (!reduced) {
    scatter($("#sparkles"), 30, "sparkle", function (el, i) {
      el.style.left = ((i * 37) % 100) + "%";
      el.style.top = ((i * 53) % 100) + "%";
      el.style.setProperty("--t", (3 + (i % 4)) + "s");
      el.style.setProperty("--dl", ((i * 0.37) % 4) + "s");
    });
    scatter($("#flecks"), 14, "fleck", function (el, i) {
      el.style.setProperty("--x", ((i * 29 + 7) % 96) + "%");
      el.style.setProperty("--sz", (2 + (i % 3)) + "px");
      el.style.setProperty("--t", (9 + (i % 5) * 2) + "s");
      el.style.setProperty("--dl", (i * 0.8) + "s");
      el.style.setProperty("--dx", ((i % 2 ? 1 : -1) * (14 + (i % 3) * 14)) + "px");
    });
    $$(".heartfloat").forEach(function (el, i) {
      el.style.setProperty("--sway", (i % 2 ? 14 : -14) + "px");
    });
  }

  /* ---------- opening sequence ---------- */
  var stage = $("#stage");
  var openBtn = $("#openBtn");
  var steps = [["s1", 0], ["s2", 350], ["s2b", 800], ["s3", 1250], ["s4", 2400], ["s5", 3150]];
  var timers = [];

  var finish = function () {
    stage.hidden = true;
    $("#invite").focus({ preventScroll: true });
  };
  var reveal = function () {
    document.body.classList.remove("is-sealed");
    document.body.classList.add("is-open");
  };
  var open = function () {
    if (stage.classList.contains("s1")) return;
    if (reduced) { stage.classList.add("s1"); reveal(); finish(); return; }
    steps.forEach(function (step) {
      timers.push(setTimeout(function () {
        stage.classList.add(step[0]);
        if (step[0] === "s5") reveal();
      }, step[1]));
    });
    timers.push(setTimeout(finish, 4000));
  };
  var reset = function () {
    timers.forEach(clearTimeout);
    timers = [];
    window.scrollTo(0, 0);
    document.body.classList.remove("is-open");
    document.body.classList.add("is-sealed");
    steps.forEach(function (step) { stage.classList.remove(step[0]); });
    stage.hidden = false;
    openBtn.focus();
  };

  $("#invite").setAttribute("tabindex", "-1");
  openBtn.addEventListener("click", open);
  $("#env").addEventListener("click", function (e) { if (e.target !== openBtn) open(); });
  $("#replayBtn").addEventListener("click", reset);

  /* ---------- scroll reveals ---------- */
  var targets = $$(".reveal");
  if ("IntersectionObserver" in window && !reduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("is-in"); io.unobserve(entry.target); }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    targets.forEach(function (el) { io.observe(el); });
  } else {
    targets.forEach(function (el) { el.classList.add("is-in"); });
  }
})();
