/* Al Shab Workshop - small helper script (no libraries) */

/* ---- Edit these three values ---- */
var WHATSAPP = "971545066017";   // international format, no + or spaces
var EMAIL    = "";               // e.g. "info@yourdomain.ae" - leave empty to hide email buttons
var SITE     = "Al Shab Workshop website";
/* --------------------------------- */

(function () {
  "use strict";

  /* Footer year */
  var yr = document.getElementById("yr");
  if (yr) yr.textContent = new Date().getFullYear();

  /* Mobile menu */
  var menuBtn = document.getElementById("menuBtn");
  var nav = document.getElementById("nav");
  menuBtn.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open);
  });
  nav.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      nav.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    }
  });

  /* Email (shown only if EMAIL is set) */
  var emailLink = document.getElementById("emailLink");
  var sendMail = document.getElementById("sendMail");
  if (EMAIL) {
    emailLink.hidden = false;
    emailLink.href = "mailto:" + EMAIL + "?subject=" + encodeURIComponent("Quote request");
    document.getElementById("emailText").textContent = EMAIL;
    sendMail.hidden = false;
  }

  /* Quote form -> WhatsApp / email */
  var form = document.getElementById("quoteForm");
  var note = document.getElementById("formNote");

  function buildMessage() {
    var f = form.elements;
    var name = f.name.value.trim();
    if (!name) {
      note.textContent = "Please enter your name first.";
      f.name.focus();
      return null;
    }
    note.textContent = "";
    var lines = [
      "Hello Al Shab Workshop, I would like a quote.",
      "Name: " + name,
      f.phone.value.trim() ? "Phone: " + f.phone.value.trim() : "",
      "Job type: " + f.job.value,
      f.details.value.trim() ? "Details: " + f.details.value.trim() : ""
    ];
    return lines.filter(Boolean).join("\n");
  }

  document.getElementById("sendWa").addEventListener("click", function () {
    var msg = buildMessage();
    if (msg) window.open("https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(msg), "_blank", "noopener");
  });
  sendMail.addEventListener("click", function () {
    var msg = buildMessage();
    if (msg) window.location.href = "mailto:" + EMAIL + "?subject=" + encodeURIComponent("Quote request") + "&body=" + encodeURIComponent(msg);
  });

  /* Gallery filter */
  var items = Array.prototype.slice.call(document.querySelectorAll(".g-item"));
  var chips = document.querySelectorAll(".chip");
  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      chips.forEach(function (c) { c.classList.remove("is-on"); });
      chip.classList.add("is-on");
      var f = chip.getAttribute("data-filter");
      items.forEach(function (it) {
        it.classList.toggle("is-hidden", f !== "all" && it.getAttribute("data-cat") !== f);
      });
    });
  });

  /* Lightbox (opens only for items whose photo has loaded) */
  var lb = document.getElementById("lightbox");
  var lbImg = document.getElementById("lbImg");
  var lbCap = document.getElementById("lbCap");
  var current = -1;

  function visibleLoaded() {
    return items.filter(function (it) {
      var img = it.querySelector("img");
      return !it.classList.contains("is-hidden") && img && img.complete && img.naturalWidth > 0;
    });
  }
  function show(list, i) {
    current = (i + list.length) % list.length;
    var it = list[current], img = it.querySelector("img");
    lbImg.src = img.currentSrc || img.src;
    lbImg.alt = img.alt;
    lbCap.textContent = it.getAttribute("data-cap") || "";
  }
  function openLb(it) {
    var list = visibleLoaded();
    var i = list.indexOf(it);
    if (i < 0) return;
    lb.hidden = false;
    document.body.style.overflow = "hidden";
    show(list, i);
    document.getElementById("lbClose").focus();
  }
  function closeLb() {
    lb.hidden = true;
    document.body.style.overflow = "";
    lbImg.src = "";
  }
  items.forEach(function (it) { it.addEventListener("click", function () { openLb(it); }); });
  document.getElementById("lbClose").addEventListener("click", closeLb);
  document.getElementById("lbPrev").addEventListener("click", function () { show(visibleLoaded(), current - 1); });
  document.getElementById("lbNext").addEventListener("click", function () { show(visibleLoaded(), current + 1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener("keydown", function (e) {
    if (lb.hidden) return;
    if (e.key === "Escape") closeLb();
    if (e.key === "ArrowRight") show(visibleLoaded(), current + 1);
    if (e.key === "ArrowLeft") show(visibleLoaded(), current - 1);
  });
})();
