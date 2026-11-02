/* ================================================================
   MICHELE & [NOME SPOSA] — SCRIPT DEL SITO
   ================================================================
   Il file è diviso in piccoli blocchi indipendenti, ognuno con un
   commento che spiega cosa fa. Puoi disattivare un blocco intero
   commentandolo, senza rompere gli altri.
   ================================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* TORNA IN CIMA + puntini del carosello (blocchi indipendenti, in testa allo script) */
  (function () {
    var toTop = document.getElementById("toTop");
    if (toTop) {
      var tick = function () {
        var y = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        toTop.classList.toggle("is-visible", y > 600);
      };
      window.addEventListener("scroll", tick, { passive: true });
      document.addEventListener("scroll", tick, { passive: true });
      toTop.addEventListener("click", function (e) { e.preventDefault(); var ix = document.getElementById("indice"); if (ix) ix.scrollIntoView({ behavior: "smooth", block: "start" }); });
      tick();
    }

    var pj = document.getElementById("journey"), bp = document.getElementById("jPrev"), bn = document.getElementById("jNext");
    if (pj && bp && bn) {
      var step = function (dir) {
        var c = pj.querySelector(".stop"); var w = c ? c.getBoundingClientRect().width + 16 : 300;
        pj.scrollBy({ left: dir * w, behavior: "smooth" });
      };
      bp.addEventListener("click", function () { step(-1); });
      bn.addEventListener("click", function () { step(1); });
    }
    var j = document.getElementById("journey"), dots = document.querySelectorAll("#journeyDots i");
    if (j && dots.length) {
      var upd = function () {
        var cards = j.querySelectorAll(".stop"), best = 0, d = 1e9;
        cards.forEach(function (c, i) { var x = Math.abs(c.offsetLeft - j.scrollLeft - 16); if (x < d) { d = x; best = i; } });
        dots.forEach(function (el, i) { el.classList.toggle("on", i === best); });
      };
      j.addEventListener("scroll", upd, { passive: true }); upd();
    }
  })();

  /* --------------------------------------------------------------
     1. MENU MOBILE
     Apre e chiude la navigazione su schermi stretti.
  -------------------------------------------------------------- */
  const navToggle = document.getElementById("navToggle");
  const primaryNav = document.getElementById("primaryNav");

  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = primaryNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Chiude il menu quando si sceglie una voce (utile su mobile)
    primaryNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        primaryNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* --------------------------------------------------------------
     2. EVIDENZIA LA VOCE DI MENU DELLA SEZIONE VISIBILE
  -------------------------------------------------------------- */
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".primary-nav a");

  if (sections.length && navLinks.length && "IntersectionObserver" in window) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            navLinks.forEach((link) => {
              link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
            });
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    sections.forEach((section) => navObserver.observe(section));
  }

  /* --------------------------------------------------------------
     3. CONTO ALLA ROVESCIA VERSO IL 10 LUGLIO 2027, ORE 16:00
     MODIFICA QUI: se cambia data/ora del rito, aggiorna weddingDate.
  -------------------------------------------------------------- */
  const weddingDate = new Date("2027-07-10T17:00:00");

  const cd = {
    days: document.getElementById("cd-days"),
    hours: document.getElementById("cd-hours"),
    mins: document.getElementById("cd-mins"),
    secs: document.getElementById("cd-secs"),
  };

  function updateCountdown() {
    const now = new Date();
    const diff = weddingDate - now;

    if (diff <= 0) {
      if (cd.days) cd.days.textContent = "0";
      if (cd.hours) cd.hours.textContent = "0";
      if (cd.mins) cd.mins.textContent = "0";
      if (cd.secs) cd.secs.textContent = "0";
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    if (cd.days) cd.days.textContent = days;
    if (cd.hours) cd.hours.textContent = String(hours).padStart(2, "0");
    if (cd.mins) cd.mins.textContent = String(mins).padStart(2, "0");
    if (cd.secs) cd.secs.textContent = String(secs).padStart(2, "0");
  }

  if (cd.days) {
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  /* --------------------------------------------------------------
     4. PETALI CHE CADONO NELL'HERO (effetto atmosfera fiabesca)
     MODIFICA QUI: cambia petalCount per averne di più o di meno.
  -------------------------------------------------------------- */
  const petalsContainer = document.getElementById("heroPetals");
  const petalCount = 26;

  if (petalsContainer) {
    const kinds = ["", "petal--gold", "petal--blush"];
    for (let i = 0; i < petalCount; i++) {
      const petal = document.createElement("span");
      petal.className = "petal " + kinds[i % kinds.length];
      petal.style.left = `${Math.random() * 100}%`;
      petal.style.setProperty("--drift", `${(Math.random() - 0.5) * 160}px`);
      petal.style.animationDuration = `${8 + Math.random() * 9}s`;
      petal.style.animationDelay = `${Math.random() * 10}s`;
      petal.style.width = petal.style.height = `${8 + Math.random() * 9}px`;
      petalsContainer.appendChild(petal);
    }
    // piccole scintille dorate che si accendono e si spengono
    for (let i = 0; i < 28; i++) {
      const sp = document.createElement("span");
      sp.className = "sparkle";
      sp.style.left = `${Math.random() * 100}%`;
      sp.style.top = `${Math.random() * 100}%`;
      sp.style.animationDelay = `${Math.random() * 3.2}s`;
      sp.style.animationDuration = `${2.4 + Math.random() * 2.4}s`;
      petalsContainer.appendChild(sp);
    }
  }

  /* --------------------------------------------------------------
     5. ANIMAZIONI DI COMPARSA AL LO SCROLL
     Aggiunge la classe "reveal" a blocchi principali e la rivela
     quando entrano nella parte visibile dello schermo.
  -------------------------------------------------------------- */
  const revealTargets = document.querySelectorAll(
    ".story-text, .story-media, .venue-text, .venue-media, .gift-card, .section__title, .section__intro, .trip-stats, .chapter, .ticket, .index-item, .crest"
  );
  revealTargets.forEach((el) => el.classList.add("reveal"));

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealTargets.forEach((el) => revealObserver.observe(el));
  } else {
    // Se il browser non supporta IntersectionObserver, mostra subito tutto
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  }

  /* --------------------------------------------------------------
     6. VIAGGIO DI NOZZE: linea di progresso dorata e tappa corrente
     La linea si "riempie" mentre si scorre, e il pallino della tappa
     al centro dello schermo si illumina.
  -------------------------------------------------------------- */
  const journey = document.getElementById("journey");
  const journeyFill = document.getElementById("journeyFill");
  const stops = document.querySelectorAll(".stop");

  function updateJourney() {
    if (!journey || !journeyFill) return;
    const rect = journey.getBoundingClientRect();
    const mid = window.innerHeight * 0.55;
    const progress = Math.max(0, Math.min(rect.height, mid - rect.top));
    journey.style.setProperty("--progress", progress + "px");
  }

  if (stops.length && "IntersectionObserver" in window) {
    const stopObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => entry.target.classList.toggle("is-current", entry.isIntersecting));
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );
    stops.forEach((s) => stopObserver.observe(s));
  }

  /* --------------------------------------------------------------
     6b. EFFETTO PARALLASSE LEGGERO SULLE FOTO INCORNICIATE
  -------------------------------------------------------------- */
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const parallaxImgs = Array.from(document.querySelectorAll(".venue-media img, .frame img, .stop__media > img:not(.stop__polaroid)"));

  function updateParallax() {
    if (reduceMotion) return;
    const vh = window.innerHeight;
    parallaxImgs.forEach((img) => {
      if (!img.isConnected) return;
      const r = img.parentElement.getBoundingClientRect();
      if (r.bottom < -100 || r.top > vh + 100) return;
      const offset = ((r.top + r.height / 2) - vh / 2) / vh;
      img.style.translate = "0 " + (offset * -22).toFixed(1) + "px";
    });
  }

  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      updateJourney();
      updateParallax();
      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  /* --------------------------------------------------------------
     6c. PULSANTE "TORNA IN CIMA" (compare dopo un po' di scroll)
  -------------------------------------------------------------- */

  /* --------------------------------------------------------------
     7. COPIA IBAN NEGLI APPUNTI
  -------------------------------------------------------------- */
  const copyIbanBtn = document.getElementById("copyIbanBtn");

  if (copyIbanBtn) {
    copyIbanBtn.addEventListener("click", async () => {
      const targetId = copyIbanBtn.getAttribute("data-copy-target");
      const targetEl = document.getElementById(targetId);
      if (!targetEl) return;

      const text = targetEl.textContent.replace(/\s+/g, " ").trim();

      try {
        await navigator.clipboard.writeText(text);
      } catch (err) {
        // Ripiego per browser che non supportano l'API Clipboard
        const tempInput = document.createElement("textarea");
        tempInput.value = text;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
      }

      const originalLabel = copyIbanBtn.textContent;
      copyIbanBtn.textContent = "Copiato ✓";
      copyIbanBtn.classList.add("is-copied");

      setTimeout(() => {
        copyIbanBtn.textContent = originalLabel;
        copyIbanBtn.classList.remove("is-copied");
      }, 2000);
    });
  }

});


/* LIBRO DEL VIAGGIO: due pagine alla volta, si sfoglia con le frecce (o con il dito) */
(function () {
  var book = document.getElementById("book"); if (!book) return;
  var sp = Array.prototype.slice.call(book.querySelectorAll(".spread")), cur = 0;
  var cnt = document.getElementById("bookCount");
  function show(n, dir) {
    if (n < 0 || n >= sp.length) return;
    sp.forEach(function (s, i) { s.classList.remove("is-on", "flip-next", "flip-prev"); if (i === n) { void s.offsetWidth; s.classList.add("is-on", dir > 0 ? "flip-next" : "flip-prev"); } });
    cur = n; if (cnt) cnt.textContent = (n + 1) + " / " + sp.length;
  }
  show(0, 1); sp[0].classList.remove("flip-next");
  document.getElementById("bookNext").addEventListener("click", function () { show(cur + 1, 1); });
  document.getElementById("bookPrev").addEventListener("click", function () { show(cur - 1, -1); });
  var x0 = null, y0 = null;
  book.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
  book.addEventListener("touchend", function (e) {
    if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0; x0 = null;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5) show(cur + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
  }, { passive: true });
})();
