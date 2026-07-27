/* ================================================================
   MICHELE & [NOME SPOSA] — SCRIPT DEL SITO
   ================================================================
   Il file è diviso in piccoli blocchi indipendenti, ognuno con un
   commento che spiega cosa fa. Puoi disattivare un blocco intero
   commentandolo, senza rompere gli altri.
   ================================================================ */

document.addEventListener("DOMContentLoaded", () => {

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
  const petalCount = 16;

  if (petalsContainer) {
    for (let i = 0; i < petalCount; i++) {
      const petal = document.createElement("span");
      petal.className = "petal";
      petal.style.left = `${Math.random() * 100}%`;
      petal.style.setProperty("--drift", `${(Math.random() - 0.5) * 120}px`);
      petal.style.animationDuration = `${8 + Math.random() * 9}s`;
      petal.style.animationDelay = `${Math.random() * 10}s`;
      petal.style.width = petal.style.height = `${8 + Math.random() * 8}px`;
      petalsContainer.appendChild(petal);
    }
  }

  /* --------------------------------------------------------------
     5. ANIMAZIONI DI COMPARSA AL LO SCROLL
     Aggiunge la classe "reveal" a blocchi principali e la rivela
     quando entrano nella parte visibile dello schermo.
  -------------------------------------------------------------- */
  const revealTargets = document.querySelectorAll(
    ".story-text, .story-media, .venue-text, .venue-media, .trip-card, .gift-card, .section__title, .section__intro"
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
     6. GALLERIA DEL VIAGGIO DI NOZZE (slideshow unico)
     Cambia slide con le frecce, i pallini, lo swipe su mobile, e
     avanza da sola ogni 6 secondi (si ferma se ci passi sopra o
     mentre tocchi lo schermo).
  -------------------------------------------------------------- */
  const slideshow = document.getElementById("tripSlideshow");

  if (slideshow) {
    const slides = Array.from(slideshow.querySelectorAll(".slideshow__slide"));
    const dots = Array.from(slideshow.querySelectorAll(".slideshow__dot"));
    const prevBtn = slideshow.querySelector(".slideshow__arrow--prev");
    const nextBtn = slideshow.querySelector(".slideshow__arrow--next");
    let current = 0;
    let autoplayTimer = null;

    function goTo(index) {
      const total = slides.length;
      current = (index + total) % total;
      slides.forEach((slide, i) => slide.classList.toggle("is-active", i === current));
      dots.forEach((dot, i) => dot.classList.toggle("is-active", i === current));
    }

    function startAutoplay() {
      stopAutoplay();
      autoplayTimer = setInterval(() => goTo(current + 1), 3800);
    }
    function stopAutoplay() {
      if (autoplayTimer) clearInterval(autoplayTimer);
    }

    if (prevBtn) prevBtn.addEventListener("click", () => { goTo(current - 1); startAutoplay(); });
    if (nextBtn) nextBtn.addEventListener("click", () => { goTo(current + 1); startAutoplay(); });
    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => { goTo(i); startAutoplay(); });
    });

    slideshow.addEventListener("mouseenter", stopAutoplay);
    slideshow.addEventListener("mouseleave", startAutoplay);

    // Swipe con il dito su smartphone e tablet
    let touchStartX = null;
    slideshow.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].clientX;
      stopAutoplay();
    }, { passive: true });

    slideshow.addEventListener("touchend", (e) => {
      if (touchStartX === null) return;
      const deltaX = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(deltaX) > 40) {
        goTo(deltaX < 0 ? current + 1 : current - 1);
      }
      touchStartX = null;
      startAutoplay();
    }, { passive: true });

    goTo(0);
    startAutoplay();
  }

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
