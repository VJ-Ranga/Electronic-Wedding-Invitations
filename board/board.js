(function () {
  "use strict";

  var board = document.getElementById("board");
  var el = function (tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
  };
  var img = function (cls, src, alt) {
    var node = el("img", cls);
    node.src = src;
    node.alt = alt;
    node.loading = "lazy";
    return node;
  };

  window.BOARD.forEach(function (card, i) {
    var col = el("div", "col-12 col-md-6 col-lg-4");
    var tile = el("article", "tile");
    tile.style.setProperty("--d", (i * 0.12) + "s");

    var stage = el("a", "tile__stage");
    stage.href = card.url;
    stage.target = "_blank";
    stage.rel = "noopener";
    stage.setAttribute("aria-label", "Open " + card.name);
    stage.appendChild(el("span", "tile__no", card.no + " · " + card.kind));
    stage.appendChild(img("tile__open", card.open, card.name + " invitation, opened"));
    var phone = el("span", "tile__phone");
    phone.appendChild(img("", card.sealed, card.name + " envelope, sealed"));
    stage.appendChild(phone);

    var body = el("div", "tile__body");
    var head = el("div", "tile__head");
    head.appendChild(el("h2", "tile__name", card.name));
    var swatches = el("div", "tile__swatches");
    swatches.setAttribute("aria-hidden", "true");
    card.swatches.forEach(function (colour) {
      var dot = el("span");
      dot.style.background = colour;
      swatches.appendChild(dot);
    });
    head.appendChild(swatches);
    body.appendChild(head);
    body.appendChild(el("p", "tile__mood", card.mood));

    var points = el("ul", "tile__points");
    card.points.forEach(function (point) {
      var li = el("li");
      var mark = el("i", "fa-solid fa-heart");
      mark.setAttribute("aria-hidden", "true");
      li.appendChild(mark);
      li.appendChild(el("span", "", point));
      points.appendChild(li);
    });
    body.appendChild(points);

    var btn = el("a", "btn-b btn-b--primary");
    btn.href = card.url;
    btn.target = "_blank";
    btn.rel = "noopener";
    btn.appendChild(el("span", "", "Open card"));
    var arrow = el("i", "fa-solid fa-arrow-right");
    arrow.setAttribute("aria-hidden", "true");
    btn.appendChild(arrow);
    body.appendChild(btn);

    tile.appendChild(stage);
    tile.appendChild(body);
    col.appendChild(tile);
    board.appendChild(col);
  });

  var tiles = Array.prototype.slice.call(document.querySelectorAll(".tile"));
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("is-in"); io.unobserve(entry.target); }
      });
    }, { threshold: 0.1 });
    tiles.forEach(function (tile) { io.observe(tile); });
  } else {
    tiles.forEach(function (tile) { tile.classList.add("is-in"); });
  }
})();
