/* Collage cards (Card 02, Card 03) — shared behaviour. Content comes from each card's data.js. */
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

  /* ---------- painted flowers, drawn in SVG ---------- */
  var Flora = (function () {
    // paint definitions travel inside every flower, so each one can be a self-contained picture
    var DEFS = "<defs>" +
      '<filter id="wc" x="-20%" y="-20%" width="140%" height="140%"><feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="3" seed="4" result="n"/>' +
      '<feDisplacementMap in="SourceGraphic" in2="n" scale="6" xChannelSelector="R" yChannelSelector="G"/><feGaussianBlur stdDeviation=".3"/>' +
      '<feDropShadow dx="0" dy="1.6" stdDeviation="1.6" flood-color="#463718" flood-opacity=".2"/></filter>' +
      '<radialGradient id="g-cream" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="48"><stop offset="0" stop-color="#B7A47B"/><stop offset=".3" stop-color="#E6DBC3"/><stop offset=".8" stop-color="#FFFFFF"/><stop offset="1" stop-color="#F8F3E8"/></radialGradient>' +
      '<radialGradient id="g-rose" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="48"><stop offset="0" stop-color="#D6B96E"/><stop offset=".4" stop-color="#F3E6BE"/><stop offset="1" stop-color="#FFFDF2"/></radialGradient>' +
      '<radialGradient id="g-blue" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="48"><stop offset="0" stop-color="#4E76B4"/><stop offset=".45" stop-color="#A4C1E7"/><stop offset="1" stop-color="#E8F1FC"/></radialGradient>' +
      '<linearGradient id="g-beige" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#C6B58E"/><stop offset="1" stop-color="#F0E8D6"/></linearGradient>' +
      '<linearGradient id="g-sage" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#5B7E5C"/><stop offset="1" stop-color="#B7C8A4"/></linearGradient>' +
      '<linearGradient id="g-teal" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#2C5C89"/><stop offset="1" stop-color="#93B5D1"/></linearGradient>' +
      '<linearGradient id="g-gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8A6C30"/><stop offset=".5" stop-color="#EBD59A"/><stop offset="1" stop-color="#A9853C"/></linearGradient>' +
      "</defs>";
    var rng = function (seed) { return function () { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }; };
    var f = function (n) { return n.toFixed(1); };
    var petal = function (l, w) {
      return "M0 0C" + f(-w) + " " + f(-l * 0.25) + " " + f(-w * 1.15) + " " + f(-l * 0.85) + " 0 " + f(-l) +
        "C" + f(w * 1.15) + " " + f(-l * 0.85) + " " + f(w) + " " + f(-l * 0.25) + " 0 0Z";
    };
    var ring = function (r, n, l, w, off, attrs) {
      var s = "";
      for (var i = 0; i < n; i++) {
        var a = off + i * 360 / n + (r() - 0.5) * 16;
        s += '<path d="' + petal(l * (0.88 + r() * 0.24), w * (0.9 + r() * 0.2)) + '" transform="rotate(' + f(a) + ')" ' + attrs + "/>";
      }
      return s;
    };
    var dots = function (r, n, rad, size, fill) {
      var s = "";
      for (var i = 0; i < n; i++) {
        var a = r() * Math.PI * 2, d = Math.sqrt(r()) * rad;
        s += '<circle cx="' + f(Math.cos(a) * d) + '" cy="' + f(Math.sin(a) * d) + '" r="' + f(size * (0.6 + r() * 0.7)) + '" fill="' + fill + '"/>';
      }
      return s;
    };
    var leaf = function (l, w) {
      return "M0 0C" + f(-w) + " " + f(-l * 0.3) + " " + f(-w * 0.8) + " " + f(-l * 0.8) + " 0 " + f(-l) +
        "C" + f(w * 0.8) + " " + f(-l * 0.8) + " " + f(w) + " " + f(-l * 0.3) + " 0 0Z";
    };
    var sprig = function (r, attrs, stem) {
      var s = '<path d="M0 48Q5 0 0 -46" fill="none" stroke="' + stem + '" stroke-width="1.1" stroke-linecap="round"/>';
      for (var i = 0; i < 6; i++) {
        var y = 34 - i * 15, side = i % 2 ? 1 : -1;
        s += '<path d="' + leaf(24 - i * 1.8, 8.5 - i * 0.5) + '" transform="translate(' + f(2 - Math.abs(y) * 0.03) + " " + y + ") rotate(" + f(side * (48 + r() * 14)) + ')" ' + attrs + "/>";
      }
      return s + '<path d="' + leaf(20, 7) + '" transform="translate(0 -44)" ' + attrs + "/>";
    };
    var cream = 'fill="url(#g-cream)" stroke="rgba(150,130,95,.34)" stroke-width=".5" fill-opacity=".96"';
    var rose = 'fill="url(#g-rose)" stroke="rgba(160,135,80,.34)" stroke-width=".5" fill-opacity=".96"';
    var blue = 'fill="url(#g-blue)" stroke="rgba(60,95,150,.34)" stroke-width=".5" fill-opacity=".94"';
    var line = 'fill="none" stroke="#B8944A" stroke-width=".9" stroke-linecap="round"';
    var tones = { beige: ["url(#g-beige)", "#B9A67C", ".85"], sage: ["url(#g-sage)", "#6F8A62", ".9"], teal: ["url(#g-teal)", "#3E6E96", ".9"] };

    var make = function (type, seed) {
      var r = rng(seed * 97 + 13), body = "", painted = true;
      var parts = type.split("-"), kind = parts[0], tone = tones[parts[1]];
      if (kind === "peony") {
        body = ring(r, 7, 46, 22, 0, cream) + ring(r, 6, 36, 19, 26, cream) + ring(r, 5, 25, 15, 8, cream) + ring(r, 4, 14, 10, 40, cream) +
          '<circle r="5" fill="#E8D48C" fill-opacity=".8"/>' + dots(r, 11, 5.5, 1.3, "#C9A24B");
      } else if (kind === "rose") {
        body = ring(r, 6, 44, 25, 0, rose) + ring(r, 5, 35, 21, 30, rose) + ring(r, 5, 26, 17, 4, rose) + ring(r, 4, 17, 12, 44, rose) + ring(r, 3, 9, 7, 10, rose) +
          '<circle r="2.5" fill="#D9BE7A" fill-opacity=".7"/>';
      } else if (kind === "anemone") {
        body = ring(r, 6, 46, 29, 0, blue) + ring(r, 5, 31, 21, 32, blue) +
          '<circle r="8" fill="#1F2D4E"/>' + dots(r, 16, 11.5, 1.1, "#1F2D4E") + dots(r, 6, 4, 1, "#5F7FB0");
      } else if (kind === "bud") {
        body = ring(r, 3, 30, 16, -30, cream) + ring(r, 2, 20, 11, -10, cream) +
          '<path d="M0 0Q4 24 -2 46" fill="none" stroke="#9A8F6E" stroke-width="1.1"/>';
      } else if (kind === "sprig") {
        body = sprig(r, 'fill="' + tone[0] + '" fill-opacity="' + tone[2] + '"', tone[1]);
      } else if (kind === "leaf") {
        body = '<path d="' + leaf(92, 26) + '" transform="translate(0 46)" fill="' + tone[0] + '" fill-opacity="' + tone[2] + '"/>' +
          '<path d="M0 46Q3 0 0 -44" fill="none" stroke="' + tone[1] + '" stroke-width=".7" stroke-opacity=".7"/>';
      } else if (kind === "lineflower") {
        painted = false;
        body = ring(r, 5, 45, 26, 0, line) + ring(r, 5, 30, 18, 36, line) + ring(r, 3, 15, 10, 20, line) + '<circle r="3" ' + line + "/>";
      } else if (kind === "linesprig") {
        painted = false;
        body = sprig(r, line, "#B8944A");
      } else if (kind === "goldbuds") {
        painted = false;
        for (var i = 0; i < 4; i++) {
          var x = -24 + i * 16, top = -40 + (i % 2) * 14 + r() * 8;
          body += '<path d="M0 48Q' + f(x * 0.4) + " 0 " + f(x) + " " + f(top + 10) + '" fill="none" stroke="#B8944A" stroke-width=".9"/>' +
            '<ellipse cx="' + f(x) + '" cy="' + f(top) + '" rx="4.5" ry="10" fill="url(#g-gold)" transform="rotate(' + f(x * 0.5) + " " + f(x) + " " + f(top) + ')"/>';
        }
      }
      return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="-60 -60 120 120">' + DEFS +
        "<g" + (painted ? ' filter="url(#wc)"' : "") + ">" + body + "</g></svg>";
    };
    return { make: make, painted: function (type) { return !/^(line|gold)/.test(type); } };
  })();

  // rows: [type, x%, y%, width%, rotation]
  var plant = function (zone, rows) {
    if (!zone || !rows) return;
    rows.forEach(function (row, i) {
      var el = document.createElement("div");
      el.className = "flora" + (Flora.painted(row[0]) ? "" : " flora--line");
      el.style.setProperty("--x", row[1] + "%");
      el.style.setProperty("--y", row[2] + "%");
      el.style.setProperty("--w", row[3] + "%");
      el.style.setProperty("--r", (row[4] || 0) + "deg");
      el.style.setProperty("--i", i);
      el.style.setProperty("--t", (5 + (i % 4)) + "s");
      // each flower becomes one flat picture: the browser paints it once, then only moves it,
      // which keeps the bloom and sway animations smooth on phones
      var img = document.createElement("img");
      img.alt = "";
      img.decoding = "async";
      img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(Flora.make(row[0], i + 1));
      el.appendChild(img);
      zone.appendChild(el);
    });
  };
  plant($("#zoneStage"), W.flora.stage);
  plant($("#zoneA"), W.flora.a);
  plant($("#zoneB"), W.flora.b);

  /* ---------- content ---------- */
  var day = new Date(W.date + "T" + W.start + ":00+05:30");
  var fmt = function (opts) { return new Intl.DateTimeFormat("en-GB", Object.assign({ timeZone: "Asia/Colombo" }, opts)).format(day); };
  var startTime = new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Colombo", hour: "numeric", minute: "2-digit" }).format(day).replace(":00", "");
  var dayNum = +fmt({ day: "numeric" });
  var suffix = (dayNum % 10 === 1 && dayNum !== 11) ? "st" : (dayNum % 10 === 2 && dayNum !== 12) ? "nd" : (dayNum % 10 === 3 && dayNum !== 13) ? "rd" : "th";

  var bind = {
    first: W.couple.first, second: W.couple.second, monogram: W.couple.monogram,
    initialA: W.couple.first.charAt(0), initialB: W.couple.second.charAt(0),
    initials: W.couple.first.charAt(0) + W.couple.second.charAt(0),
    hosts: W.hosts, request: W.request, and: W.and || "and",
    weekday: fmt({ weekday: "long" }).toUpperCase(),
    month: fmt({ month: "short" }).toUpperCase(), monthLong: fmt({ month: "long" }),
    day: String(dayNum), dayOrd: dayNum + suffix, year: fmt({ year: "numeric" }),
    startTime: "at " + startTime,
    venueName: W.venue.name, venueAddress: W.venue.address, venueLine1: W.venue.name,
    dressCode: W.dressCode, note: W.note, rsvpBy: W.rsvp.by, closing: W.closing
  };
  $$("[data-bind]").forEach(function (el) {
    var value = bind[el.getAttribute("data-bind")];
    if (value != null) el.textContent = value;
  });
  document.title = W.couple.first + " & " + W.couple.second + " — Wedding Invitation";

  /* ---------- photographs ---------- */
  var photos = $("#photos");
  photos.classList.add("photos--" + W.photoStyle);
  W.photos.forEach(function (p) {
    var fig = document.createElement("figure");
    var box = document.createElement("div");
    box.className = "photos__img";
    var img = document.createElement("img");
    img.src = p.src;
    img.alt = p.alt;
    img.decoding = "async";
    if (p.position) img.style.objectPosition = p.position;
    box.appendChild(img);
    fig.appendChild(box);
    photos.appendChild(fig);
  });

  /* ---------- guest name from ?to= (text only, never HTML) ---------- */
  var guest = (new URLSearchParams(location.search).get("to") || "").replace(/\s+/g, " ").trim().slice(0, 40);
  if (guest) $("#stageGuest").textContent = "For " + guest;

  /* ---------- order of the day ---------- */
  var timeline = $("#timeline");
  W.schedule.forEach(function (item, i) {
    var li = document.createElement("li");
    li.className = "events__item reveal";
    li.style.setProperty("--d", ((i % 3) * 0.1) + "s");
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
  $("#mapBtn").href = W.venue.mapUrl;
  $("#calBtn").href = "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    "&text=" + encodeURIComponent(W.couple.first + " & " + W.couple.second + " — Wedding") +
    "&dates=" + stamp(W.start) + "/" + stamp(W.end) + "&ctz=Asia/Colombo" +
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

  $$(".heartfloat").forEach(function (el, i) { el.style.setProperty("--sway", (i % 2 ? 14 : -14) + "px"); });

  /* ---------- opening sequence ---------- */
  var stage = $("#stage");
  var env = $("#env");
  var openBtn = $("#openBtn");
  // s1 seal lifts · s2 flap opens · s2b flap tucks behind · s3 envelope glides to its place on the page · s4 page takes over
  var steps = [["s1", 0], ["s2", 550], ["s2b", 1180], ["s3", 1900], ["s4", 3050]];
  var timers = [];
  var finish = function () { stage.hidden = true; $("#invite").focus({ preventScroll: true }); };
  var reveal = function () { document.body.classList.remove("is-sealed"); document.body.classList.add("is-open"); };
  // measure where the open envelope sits on the page and move the sealed one exactly there,
  // so the hand-over from stage to page has no jump
  var glide = function () {
    var from = env.getBoundingClientRect();
    var to = $(".oenv__body").getBoundingClientRect();
    env.style.setProperty("--tx", (to.left - from.left) + "px");
    env.style.setProperty("--ty", (to.top - from.top) + "px");
    env.style.setProperty("--sx", (to.width / from.width).toFixed(4));
  };
  var open = function () {
    if (stage.classList.contains("s1")) return;
    if (reduced) { stage.classList.add("s1"); reveal(); finish(); return; }
    steps.forEach(function (step) {
      timers.push(setTimeout(function () {
        if (step[0] === "s3") glide();
        stage.classList.add(step[0]);
        if (step[0] === "s4") reveal();
      }, step[1]));
    });
    timers.push(setTimeout(finish, 4300));
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
  env.addEventListener("click", function (e) { if (e.target !== openBtn) open(); });
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
