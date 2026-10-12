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
    car: '<path d="M5 33v-7l5-2 4-9h18l5 9 6 2v7h-4"/><path d="M19 33h10"/><circle cx="14" cy="33" r="4.5"/><circle cx="34" cy="33" r="4.5"/><path d="M14 24h22M24 15v9"/>',
    music: '<path d="M18 36V12l18-4v24"/><path d="M18 19l18-4"/><circle cx="13" cy="36" r="5"/><circle cx="31" cy="32" r="5"/>',
    gift: '<rect x="8" y="20" width="32" height="22"/><rect x="6" y="13" width="36" height="7"/><path d="M24 13v29"/><path d="M24 13c-8-10-16-2-8 0zM24 13c8-10 16-2 8 0z"/>'
  };

  /* ---------- painted flowers, drawn in SVG ---------- */
  var Flora = (function () {
    // paint definitions travel inside every flower, so each one can be a self-contained picture
    var DEFS = "<defs>" +
      '<filter id="wc" x="-20%" y="-20%" width="140%" height="140%"><feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="3" seed="4" result="n"/>' +
      '<feDisplacementMap in="SourceGraphic" in2="n" scale="6" xChannelSelector="R" yChannelSelector="G"/><feGaussianBlur stdDeviation=".3"/>' +
      '<feDropShadow dx="0" dy="1.6" stdDeviation="1.6" flood-color="#463718" flood-opacity=".2"/></filter>' +
      '<filter id="sh" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000" flood-opacity=".24"/></filter>' +
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
    // party pieces: [highlight, body, shade]
    var BALLOON = {
      gold: ["#F7E3A6", "#C9A24B", "#8A6C30"], champagne: ["#FFF3D1", "#E3C98A", "#A8853F"], cream: ["#FFFFFF", "#F1E6D2", "#CDBE9C"],
      blush: ["#FBE1DC", "#E2A79E", "#B9766C"], plum: ["#C78A9A", "#7E3549", "#4E1B2B"],
      violet: ["#B9A2F0", "#6B4BC2", "#3B2A6B"], pink: ["#F7A8C8", "#E24B8A", "#8E2356"], black: ["#6A6A75", "#22222B", "#0A0A10"]
    };
    var HEART = { pink: ["#FFC2D6", "#F0649A"], lilac: ["#E6D2FF", "#A974E8"], red: ["#FF9C9C", "#E0384F"], gold: ["#F7E3A6", "#C9A24B"] };
    var FLAT = { yellow: "#FFD93B", pink: "#FF5FA2", cyan: "#19C3E6", cobalt: "#2F54EB", orange: "#FF7A3D", black: "#17171B", white: "#FFFFFF" };
    var face = function (y, s2) {
      return '<circle cx="' + f(-7 * s2) + '" cy="' + f(y) + '" r="' + f(2.2 * s2) + '" fill="#4A3F5C"/><circle cx="' + f(7 * s2) + '" cy="' + f(y) + '" r="' + f(2.2 * s2) + '" fill="#4A3F5C"/>' +
        '<path d="M' + f(-4 * s2) + " " + f(y + 5 * s2) + "Q0 " + f(y + 10 * s2) + " " + f(4 * s2) + " " + f(y + 5 * s2) + '" fill="none" stroke="#4A3F5C" stroke-width="1.6" stroke-linecap="round"/>' +
        '<circle cx="' + f(-13 * s2) + '" cy="' + f(y + 5 * s2) + '" r="' + f(3 * s2) + '" fill="#FF9DB5" fill-opacity=".6"/><circle cx="' + f(13 * s2) + '" cy="' + f(y + 5 * s2) + '" r="' + f(3 * s2) + '" fill="#FF9DB5" fill-opacity=".6"/>';
    };
    var poly = function (n, outer, inner, rot) {
      var pts = [];
      for (var k = 0; k < n * 2; k++) {
        var a = (rot || 0) + k * Math.PI / n, rad = k % 2 ? inner : outer;
        pts.push(f(Math.sin(a) * rad) + "," + f(-Math.cos(a) * rad));
      }
      return pts.join(" ");
    };
    var CONFETTI = { blush: ["#C9A24B", "#E2A79E", "#6B2D3E", "#E9D9B6"], party: ["#E3C98A", "#7C5CE0", "#E24B8A", "#3FD0A5"],
      kid: ["#F28B82", "#FBC86A", "#8FD3B0", "#8CB8F0"], comic: ["#FFD93B", "#FF5FA2", "#19C3E6", "#FFFFFF"], sweet: ["#F0649A", "#A974E8", "#FFC2D6", "#E3C98A"] };
    var star = function (x, y, size) {
      var k = size * 0.12, z = f(size), n = f(-size);
      return '<path transform="translate(' + f(x) + " " + f(y) + ')" d="M0 ' + n + "Q" + f(k) + " " + f(-k) + " " + z + " 0Q" + f(k) + " " + f(k) + " 0 " + z +
        "Q" + f(-k) + " " + f(k) + " " + n + " 0Q" + f(-k) + " " + f(-k) + " 0 " + n + 'Z" fill="url(#g-gold)"/>';
    };
    var tones = { beige: ["url(#g-beige)", "#B9A67C", ".85"], sage: ["url(#g-sage)", "#6F8A62", ".9"], teal: ["url(#g-teal)", "#3E6E96", ".9"] };

    var make = function (type, seed) {
      var r = rng(seed * 97 + 13), body = "", painted = true, fx = "wc", i;
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
      } else if (kind === "balloon") {
        var c = BALLOON[parts[1]] || BALLOON.gold;
        fx = "sh";
        body = '<radialGradient id="b" cx="35%" cy="28%" r="75%"><stop offset="0" stop-color="' + c[0] + '"/><stop offset=".55" stop-color="' + c[1] + '"/><stop offset="1" stop-color="' + c[2] + '"/></radialGradient>' +
          '<path d="M0 22Q9 34 -3 44T3 58" fill="none" stroke="' + c[2] + '" stroke-opacity=".75" stroke-width=".8"/>' +
          '<ellipse cx="0" cy="-14" rx="27" ry="34" fill="url(#b)"/><path d="M-4 19.5h8l-4 6z" fill="' + c[2] + '"/>' +
          '<ellipse cx="-10" cy="-30" rx="5" ry="10" fill="#fff" fill-opacity=".5" transform="rotate(28 -10 -30)"/>';
      } else if (kind === "sparkle") {
        painted = false;
        body = star(0, 0, 40) + star(30, -32, 14) + star(-32, 28, 10);
      } else if (kind === "confetti") {
        painted = false;
        var cols = CONFETTI[parts[1]] || CONFETTI.blush;
        for (i = 0; i < 18; i++) {
          var cx = (r() - 0.5) * 100, cy = (r() - 0.5) * 100, col = cols[i % cols.length];
          body += i % 3 ? '<circle cx="' + f(cx) + '" cy="' + f(cy) + '" r="' + f(1.6 + r() * 2.4) + '" fill="' + col + '"/>'
            : '<rect x="' + f(cx) + '" y="' + f(cy) + '" width="7" height="3" rx="1" fill="' + col + '" transform="rotate(' + f(r() * 180) + " " + f(cx) + " " + f(cy) + ')"/>';
        }
      } else if (kind === "discoball") {
        fx = "sh";
        var grid = "";
        [8, 18, 27].forEach(function (rx) { grid += '<ellipse rx="' + rx + '" ry="34"/>'; });
        [-24, -12, 0, 12, 24].forEach(function (y) { grid += '<path d="M-34 ' + y + "Q0 " + (y + 7) + " 34 " + y + '"/>'; });
        var tiles = "";
        for (i = 0; i < 16; i++) {
          var a = r() * Math.PI * 2, d = Math.sqrt(r()) * 29;
          tiles += '<rect x="' + f(Math.cos(a) * d - 3) + '" y="' + f(Math.sin(a) * d - 3) + '" width="6" height="6" fill="' + ["#fff", "#fff", "#F7E3A6", "#D7C8FF"][i % 4] + '" fill-opacity="' + f(0.25 + r() * 0.6) + '"/>';
        }
        body = '<path d="M0 -58V-34" stroke="#8D8FA0" stroke-width="1"/>' +
          '<radialGradient id="d" cx="35%" cy="30%" r="80%"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".4" stop-color="#C9CCD6"/><stop offset="1" stop-color="#555A6E"/></radialGradient>' +
          '<clipPath id="dc"><circle r="34"/></clipPath><circle r="34" fill="url(#d)"/>' +
          '<g clip-path="url(#dc)">' + tiles + '<g fill="none" stroke="#33364A" stroke-opacity=".55" stroke-width=".7">' + grid + "</g></g>" +
          star(-24, -22, 12) + star(31, -36, 9) + star(28, 30, 7);
      } else if (kind === "streamer") {
        painted = false;
        body = '<path d="M-46 -30C-20 -54 -26 -6 -4 -18S14 24 44 8" fill="none" stroke="url(#g-gold)" stroke-width="3" stroke-linecap="round"/>' +
          '<path d="M-40 14C-22 -2 -14 34 4 22S26 44 42 34" fill="none" stroke="url(#g-gold)" stroke-width="1.6" stroke-linecap="round" stroke-opacity=".8"/>';
      } else if (kind === "rainbow") {
        fx = "sh";
        [["#F28B82", 44], ["#FBC86A", 35], ["#8FD3B0", 26], ["#8CB8F0", 17]].forEach(function (band) {
          body += '<path d="M' + (-band[1]) + " 18A" + band[1] + " " + band[1] + " 0 0 1 " + band[1] + ' 18" fill="none" stroke="' + band[0] + '" stroke-width="9"/>';
        });
        body += '<g fill="#fff"><circle cx="-34" cy="22" r="12"/><circle cx="-20" cy="24" r="9"/><circle cx="34" cy="22" r="12"/><circle cx="20" cy="24" r="9"/></g>';
      } else if (kind === "cloud") {
        fx = "sh";
        body = '<g fill="#fff"><circle cx="-20" cy="6" r="17"/><circle cx="0" cy="-6" r="23"/><circle cx="22" cy="6" r="17"/><rect x="-22" y="4" width="46" height="19" rx="9"/></g>' + face(2, 1);
      } else if (kind === "starface") {
        fx = "sh";
        body = '<polygon points="' + poly(5, 40, 19) + '" fill="#FFD45E" stroke="#FFD45E" stroke-width="10" stroke-linejoin="round"/>' + face(2, 0.9);
      } else if (kind === "heart") {
        var h = HEART[parts[1]] || HEART.pink;
        fx = "sh";
        body = '<radialGradient id="h" cx="35%" cy="28%" r="80%"><stop offset="0" stop-color="' + h[0] + '"/><stop offset="1" stop-color="' + h[1] + '"/></radialGradient>' +
          '<path d="M0 38C-58 2-34-42 0-14C34-42 58 2 0 38Z" fill="url(#h)"/><ellipse cx="-17" cy="-14" rx="5" ry="9" fill="#fff" fill-opacity=".45" transform="rotate(-30 -17 -14)"/>';
      } else if (kind === "butterfly") {
        var bf = HEART[parts[1]] || HEART.lilac;
        fx = "sh";
        body = '<linearGradient id="w" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + bf[0] + '"/><stop offset="1" stop-color="' + bf[1] + '"/></linearGradient>' +
          '<g fill="url(#w)" fill-opacity=".92"><ellipse cx="-22" cy="-14" rx="24" ry="17" transform="rotate(28 -22 -14)"/><ellipse cx="22" cy="-14" rx="24" ry="17" transform="rotate(-28 22 -14)"/>' +
          '<ellipse cx="-16" cy="16" rx="15" ry="12" transform="rotate(-24 -16 16)"/><ellipse cx="16" cy="16" rx="15" ry="12" transform="rotate(24 16 16)"/></g>' +
          '<g fill="#fff" fill-opacity=".55"><circle cx="-26" cy="-16" r="5"/><circle cx="26" cy="-16" r="5"/></g>' +
          '<path d="M0 -20V24M0 -20Q-6 -34 -12 -36M0 -20Q6 -34 12 -36" fill="none" stroke="#5B4670" stroke-width="2.4" stroke-linecap="round"/>';
      } else if (kind === "burst") {
        painted = false;
        var bc = FLAT[parts[1]] || FLAT.yellow, pts = poly(14, 50, 35);
        body = '<polygon points="' + pts + '" fill="#111" transform="translate(4 4)"/><polygon points="' + pts + '" fill="' + bc + '" stroke="#111" stroke-width="3" stroke-linejoin="round"/>';
        for (i = 0; i < 9; i++) body += '<circle cx="' + f(-14 + (i % 3) * 7) + '" cy="' + f(8 + Math.floor(i / 3) * 7) + '" r="' + f(2.4 - Math.floor(i / 3) * 0.5) + '" fill="#111" fill-opacity=".35"/>';
      } else if (kind === "bolt") {
        painted = false;
        body = '<path d="M10 -54L-24 4H-4L-14 54L26 -10H6Z" fill="#111" transform="translate(4 4)"/><path d="M10 -54L-24 4H-4L-14 54L26 -10H6Z" fill="#FFD93B" stroke="#111" stroke-width="3" stroke-linejoin="round"/>';
      } else if (kind === "key") {
        painted = false;
        body = '<g fill="none" stroke="url(#g-gold)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" transform="rotate(-35)"><circle cx="0" cy="-30" r="14"/><circle cx="0" cy="-30" r="5"/><path d="M0 -16V44M0 30H12M0 40H9"/></g>';
      } else if (kind === "bubble") {
        var bb = FLAT[parts[1]] || FLAT.cobalt, dot = parts[1] === "white" ? "#17171B" : "#fff";
        fx = "sh";
        body = '<path d="M-40 -30h80a8 8 0 0 1 8 8v34a8 8 0 0 1-8 8h-48l-18 18v-18h-14a8 8 0 0 1-8-8v-34a8 8 0 0 1 8-8z" fill="' + bb + '"/>' +
          '<g fill="' + dot + '"><circle cx="-16" cy="-5" r="4.5"/><circle cx="0" cy="-5" r="4.5"/><circle cx="16" cy="-5" r="4.5"/></g>';
      } else if (kind === "cup") {
        fx = "sh";
        body = '<path d="M-26 -8h44v20a22 22 0 0 1-44 0z" fill="#fff" stroke="#17171B" stroke-width="3" stroke-linejoin="round"/><path d="M18 -2h6a9 9 0 0 1 0 18h-8" fill="none" stroke="#17171B" stroke-width="3"/>' +
          '<path d="M-32 38h56" stroke="#17171B" stroke-width="3" stroke-linecap="round"/><path d="M-14 -20q-6-8 0-16M0 -20q-6-8 0-16" fill="none" stroke="#17171B" stroke-width="2.4" stroke-linecap="round" stroke-opacity=".6"/>';
      } else if (kind === "goldbuds") {
        painted = false;
        for (i = 0; i < 4; i++) {
          var x = -24 + i * 16, top = -40 + (i % 2) * 14 + r() * 8;
          body += '<path d="M0 48Q' + f(x * 0.4) + " 0 " + f(x) + " " + f(top + 10) + '" fill="none" stroke="#B8944A" stroke-width=".9"/>' +
            '<ellipse cx="' + f(x) + '" cy="' + f(top) + '" rx="4.5" ry="10" fill="url(#g-gold)" transform="rotate(' + f(x * 0.5) + " " + f(x) + " " + f(top) + ')"/>';
        }
      }
      return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="-60 -60 120 120">' + DEFS +
        "<g" + (painted ? ' filter="url(#' + fx + ')"' : "") + ">" + body + "</g></svg>";
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
    initials: W.seal || (W.couple.first.charAt(0) + W.couple.second.charAt(0)),
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
  if (W.stageText) $(".stage__script").textContent = W.stageText;
  if (W.stageHint) $(".stage__hint").textContent = W.stageHint;
  document.title = W.pageTitle || (W.couple.first + " & " + W.couple.second + " — Wedding Invitation");

  /* ---------- photographs ---------- */
  var photos = $("#photos");
  if (!W.photos.length) photos.hidden = true;
  photos.classList.add("photos--" + W.photoStyle);
  if (W.photoStyle === "film") photos.parentNode.classList.add("colb--film");
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

  /* ---------- wish cards: a message instead of date and venue ---------- */
  if (W.wish) {
    var dcard = $(".dcard");
    dcard.classList.add("dcard--wish");
    while (dcard.firstChild) dcard.removeChild(dcard.firstChild);
    [["p", "caps dcard__eyebrow", W.wish.eyebrow], ["p", "dcard__msg", W.wish.message], ["p", "dcard__from", W.wish.from]].forEach(function (row) {
      if (!row[2]) return;
      var el = document.createElement(row[0]);
      el.className = row[1];
      el.textContent = row[2];
      dcard.appendChild(el);
    });
  }

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
    "&text=" + encodeURIComponent(W.calendarTitle || (W.couple.first + " & " + W.couple.second + " — Wedding")) +
    "&dates=" + stamp(W.start) + "/" + stamp(W.end) + "&ctz=Asia/Colombo" +
    "&location=" + encodeURIComponent(W.venue.name + ", " + W.venue.address);
  var wa = function (message) { return "https://wa.me/" + W.rsvp.whatsapp + "?text=" + encodeURIComponent(message); };
  var from = guest ? " — " + guest : "";
  var eventName = W.eventName || ("the wedding of " + W.couple.first + " & " + W.couple.second);
  $("#yesBtn").href = wa("With joy, we accept your invitation to " + eventName + "." + from);
  $("#noBtn").href = wa("With regret, we are unable to attend " + eventName + ". " + (W.declineWish || "Wishing you both every happiness.") + from);

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
  // opener: "envelope" (default) | "gift" (lid lifts off a box) | "door" (double doors swing open)
  var opener = W.opener || "envelope";
  var steps = opener === "envelope"
    ? [["s1", 0], ["s2", 550], ["s2b", 1180], ["s3", 1900], ["s4", 3050]]
    : [["s1", 0], ["s2", 500], ["s3", 1750], ["s4", 2550]];
  if (opener !== "envelope") {
    stage.classList.add("stage--" + opener);
    if (opener === "door") {
      var leaf = document.createElement("div");
      leaf.className = "cenv__door2";
      leaf.setAttribute("aria-hidden", "true");
      env.insertBefore(leaf, openBtn);
    }
  }
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
        if (step[0] === "s3" && opener === "envelope") glide();
        stage.classList.add(step[0]);
        if (step[0] === "s4") reveal();
      }, step[1]));
    });
    timers.push(setTimeout(finish, steps[steps.length - 1][1] + 1250));
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

  /* ---------- celebrate: a burst of confetti on tap ---------- */
  if (W.celebrate) {
    var party = document.createElement("button");
    party.type = "button";
    party.className = "btn-inv btn-inv--primary reveal";
    party.textContent = W.celebrate;
    $("#replayBtn").parentNode.insertBefore(party, $("#replayBtn"));
    var colours = W.celebrateColours || ["#F28B82", "#FBC86A", "#8FD3B0", "#8CB8F0", "#F0649A"];
    party.addEventListener("click", function () {
      if (reduced) return;
      var layer = document.createElement("div");
      layer.className = "burstlayer";
      for (var i = 0; i < 70; i++) {
        var bit = document.createElement("i");
        bit.style.setProperty("--x", (Math.random() * 100) + "vw");
        bit.style.setProperty("--dx", ((Math.random() - 0.5) * 30) + "vw");
        bit.style.setProperty("--t", (2 + Math.random() * 1.6) + "s");
        bit.style.setProperty("--dl", (Math.random() * 0.5) + "s");
        bit.style.setProperty("--r", (Math.random() * 720 - 360) + "deg");
        bit.style.background = colours[i % colours.length];
        if (i % 3 === 0) bit.style.borderRadius = "50%";
        layer.appendChild(bit);
      }
      document.body.appendChild(layer);
      setTimeout(function () { layer.remove(); }, 4400);
    });
  }

  // sections a card does not need (wish cards have no venue, schedule or reply)
  (W.hide || []).forEach(function (id) {
    var section = document.getElementById(id);
    if (section) section.remove();
  });

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
