// Bloquer le scroll immédiatement au chargement
document.body.classList.add("no-scroll");

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialisations
  AOS.init({ mirror: true, duration: 700 });

  // 1b. Thème clair / sombre avec persistance
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = themeToggle ? themeToggle.querySelector("i") : null;
  const root = document.documentElement;

  const getMatrixPalette = () => {
    const styles = getComputedStyle(root);
    return {
      color:
        styles.getPropertyValue("--matrix-color").trim() || "#00f2ff",
      trail:
        styles.getPropertyValue("--matrix-trail").trim() ||
        "rgba(5, 5, 5, 0.05)",
    };
  };

  let matrixPalette = getMatrixPalette();

  const applyTheme = (mode) => {
    const isLight = mode === "light";
    document.body.classList.toggle("light-mode", isLight);
    root.classList.toggle("light-mode", isLight);
    if (themeIcon) {
      themeIcon.classList.toggle("fa-sun", isLight);
      themeIcon.classList.toggle("fa-moon", !isLight);
    }
    localStorage.setItem("theme", isLight ? "light" : "dark");
    matrixPalette = getMatrixPalette();
  };

  const storedTheme = localStorage.getItem("theme") || "dark";
  applyTheme(storedTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const nextTheme = document.body.classList.contains("light-mode")
        ? "dark"
        : "light";
      applyTheme(nextTheme);
    });
  }

  // 2. Loader Moderne avec Progression et Particules Améliorées
  const progressBar = document.getElementById("progressBar");
  const percentage = document.getElementById("loaderPercentage");
  const status = document.getElementById("loaderStatus");
  const loader = document.querySelector(".loader");
  const container = document.querySelector(".loader-bg");

  if (container) {
    const centerGlow = document.createElement("div");
    centerGlow.style.cssText = `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(0, 242, 255, 0.25), transparent 70%);
    animation: glowPulse 3s ease-in-out infinite;
    pointer-events: none;
    z-index: 0;
  `;
    container.appendChild(centerGlow);

    const PARTICLE_COUNT = 50;
    const colors = ["#00f2ff", "#7000ff"];
    const sizes = [3, 4, 5, 6, 7, 8];
    const particles = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = document.createElement("span");
      p.classList.add("loader-particle");

      const x = Math.random() * 100;
      const y = Math.random() * 100;

      p.style.top = y + "%";
      p.style.left = x + "%";

      const size = sizes[Math.floor(Math.random() * sizes.length)];
      p.style.width = size + "px";
      p.style.height = size + "px";

      const color = colors[Math.floor(Math.random() * colors.length)];
      p.style.background = color;
      p.style.boxShadow = `0 0 ${size * 6}px ${color}`;

      const tx = (Math.random() * 2 - 1) * 300;
      const ty = (Math.random() * 2 - 1) * 400;

      p.style.setProperty("--tx", `${tx}px`);
      p.style.setProperty("--ty", `${ty}px`);

      const duration = size > 6 ? 3 + Math.random() * 2 : 2 + Math.random() * 2;
      const delay = Math.random() * 2;
      const pulseDuration = 0.8 + Math.random() * 0.7; 

      p.style.animation = `
      particleFloat ${duration}s ease-in-out ${delay}s infinite,
      particlePulse ${pulseDuration}s ease-in-out ${delay}s infinite
    `;

      p.style.zIndex = "0";
      container.appendChild(p);

      particles.push({ element: p, x, y, color, size });
    }

  }

  if (progressBar && percentage && status && loader) {
    let progress = 0;

    const loadingSteps = [
      { percent: 20, text: "Réveil des serveurs..." },
      { percent: 40, text: "Chargement des ressources..." },
      { percent: 60, text: "Vérification des fichiers..." },
      { percent: 80, text: "Dernier contrôle avant le décollage..." },
      { percent: 100, text: "Prêt !" },
    ];
    let currentStep = 0;

    const updateProgress = () => {
      if (currentStep < loadingSteps.length) {
        const step = loadingSteps[currentStep];
        const increment = (step.percent - progress) / 10;

        const progressInterval = setInterval(() => {
          progress += increment;
          if (progress >= step.percent) {
            progress = step.percent;
            clearInterval(progressInterval);
            currentStep++;

            if (currentStep < loadingSteps.length) {
              setTimeout(updateProgress, 100);
            } else {
              setTimeout(() => {
                gsap.to(loader, {
                  opacity: 0,
                  duration: 0.5,
                  ease: "power2.inOut",
                  onComplete: () => {
                    loader.style.display = "none";
                    document.body.classList.remove("no-scroll");
                    const firstLink = document.querySelector(
                      '.nav-link[href="#accueil"]'
                    );
                    if (firstLink) firstLink.classList.add("active");
                  },
                });
              }, 200);
            }
          }

          progressBar.style.width = progress + "%";
          percentage.textContent = Math.floor(progress) + "%";
        }, 20);

        status.textContent = step.text;
      }
    };

    setTimeout(updateProgress, 400);
  } else {
    const firstLink = document.querySelector('.nav-link[href="#accueil"]');
    if (firstLink) firstLink.classList.add("active");
  }

  // 3. Année dynamique
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 4. Effet de lumière sur la grille au passage de la souris
  const glowPoint = document.querySelector(".glow-point");
  if (glowPoint) {
    document.addEventListener("mousemove", (e) => {
      glowPoint.style.left = e.clientX + "px";
      glowPoint.style.top = e.clientY + "px";
      glowPoint.style.opacity = "1";
    });

    document.addEventListener("mouseleave", () => {
      glowPoint.style.opacity = "0";
    });
  }

  // 5. Matrix Canvas Effect
  const canvas = document.getElementById("matrixCanvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const letters = "01010101010101";
    const fontSize = 16;
    const columns = width / fontSize;
    const drops = Array.from({ length: columns }).fill(1);

    function drawMatrix() {
      ctx.fillStyle = matrixPalette.trail;
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = matrixPalette.color;
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }
    setInterval(drawMatrix, 50);

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    // Recalcule la palette après un toggle de thème
    const observer = new MutationObserver(() => {
      matrixPalette = getMatrixPalette();
    });
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
  }

  // 6. Navigation active au scroll
  const navLinks = document.querySelectorAll(".nav-link");
  const scrollTargets = document.querySelectorAll("section, footer");
  window.addEventListener("scroll", () => {
    let current = "";
    scrollTargets.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute("id") || section.tagName.toLowerCase();
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      const targetId = link.getAttribute("href").slice(1);
      if (targetId === current) {
        link.classList.add("active");
      }
    });

    // Scroll Progress Bar
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrollPercent = (scrollTop / scrollHeight) * 100;
    scrollPercent = Math.min(scrollPercent, 100);
    
    const progressBar = document.getElementById("scrollProgress");
    if(progressBar) {
        progressBar.style.width = scrollPercent + "%";
    }
  });

  // 7. Smooth Scroll pour les liens
  const navToggle = document.querySelector(".nav-toggle");
  const navLinksEl = document.getElementById("navLinks");

  const closeMobileMenu = () => {
    if (navLinksEl && navToggle && navLinksEl.classList.contains("open")) {
      navLinksEl.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
      const icon = navToggle.querySelector("i");
      if (icon) {
        icon.classList.add("fa-bars");
        icon.classList.remove("fa-times");
      }
    }
  };

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 50,
          behavior: "smooth",
        });
        closeMobileMenu();
      }
    });
  });

  // 7b. Toggle menu mobile
  if (navToggle && navLinksEl) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinksEl.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      const icon = navToggle.querySelector("i");
      if (icon) {
        icon.classList.toggle("fa-bars", !isOpen);
        icon.classList.toggle("fa-times", isOpen);
      }
    });

    // Fermer au clic à l'extérieur
    document.addEventListener("click", (e) => {
      const clickedInside =
        navLinksEl.contains(e.target) || navToggle.contains(e.target);
      if (!clickedInside) {
        closeMobileMenu();
      }
    });
  }

  // 8. Modal Logic avec Animations & Chargement Dynamique
  const modal = document.getElementById("projectModal");
  const mTitle = document.getElementById("modalTitle");
  const mDesc = document.getElementById("modalDesc");
  const mTech = document.getElementById("modalTech");
  const mPoints = document.getElementById("modalPoints");
  const mLinks = document.getElementById("modalLinks");
  const closeBtn = document.querySelector(".close-modal");

  let projectsInfo = {};

  fetch('data/projects.json')
    .then(response => response.json())
    .then(data => {
        projectsInfo = data;
    })
    .catch(error => console.error("Erreur lors du chargement des projets :", error));

  let currentCarouselIndex = 0;

  const createCarouselDots = (imageCount) => {
    const dotsContainer = document.getElementById("carouselDots");
    if (!dotsContainer) return;
    dotsContainer.innerHTML = "";
    for (let i = 0; i < imageCount; i++) {
      const dot = document.createElement("button");
      dot.className = i === 0 ? "carousel-dot active" : "carousel-dot";
      dot.addEventListener("click", () => showCarouselImage(i));
      dotsContainer.appendChild(dot);
    }
  };

  const showCarouselImage = (index) => {
    const carouselImage = document.getElementById("carouselImage");
    const dots = document.querySelectorAll(".carousel-dot");
    if (!carouselImage || !currentProjectData) return;

    const images = currentProjectData.images || [];
    if (images.length === 0) return;

    currentCarouselIndex = (index + images.length) % images.length;
    const src = images[currentCarouselIndex];
    const resolver = (path) => {
      if (path.includes("/assets/images/")) {
        return { primary: path, alt: path.replace("/assets/images/", "/images/") };
      }
      if (path.includes("/images/")) {
        return { primary: path, alt: path.replace("/images/", "/assets/images/") };
      }
      return { primary: path, alt: null };
    };
    const { primary, alt } = resolver(src);
    carouselImage.dataset.fallback = "0";
    carouselImage.onerror = () => {
      if (alt && carouselImage.dataset.fallback !== "1") {
        carouselImage.dataset.fallback = "1";
        carouselImage.src = alt;
      }
    };
    carouselImage.src = primary;
    carouselImage.style.opacity = "0";
    setTimeout(() => {
      carouselImage.style.transition = "opacity 0.3s ease";
      carouselImage.style.opacity = "1";
    }, 10);

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentCarouselIndex);
    });
  };

  let currentProjectData = null;

  const renderModal = (data) => {
    mDesc.textContent = data.desc;
    mTech.innerHTML = data.tech
      .map((t) => `<span class="pill">${t}</span>`)
      .join(" ");
    mPoints.innerHTML = data.points.map((p) => `<li>${p}</li>`).join("");
    const linkValue = (data.link || "").trim();
    const normalizedLink = linkValue.toLowerCase();

    if (!linkValue || linkValue === "#") {
      mLinks.innerHTML = "";
      return;
    }

    if (
      normalizedLink === "indisponible" ||
      normalizedLink === "non disponible"
    ) {
      mLinks.innerHTML =
        '<button class="btn btn-unavailable" type="button" disabled><i class="fas fa-ban"></i> Lien du projet indisponible</button>';
      return;
    }

    if (
      normalizedLink === "prochainement" ||
      normalizedLink === "bientot" ||
      normalizedLink === "bientôt"
    ) {
      mLinks.innerHTML =
        '<button class="btn btn-soon" type="button" disabled><i class="fas fa-hourglass-half"></i> Lien du projet disponible prochainement</button>';
      return;
    }

    mLinks.innerHTML = `<a class="btn btn-primary" target="_blank" href="${linkValue}"><i class="fas fa-external-link-alt"></i> Voir le projet</a>`;
  };

  const renderModalWithCarousel = (data) => {
    currentProjectData = data;
    currentCarouselIndex = 0;
    renderModal(data);

    const images = data.images || [];
    const carouselContainer = document.getElementById("carouselContainer");
    if (images.length > 0) {
      if (carouselContainer) carouselContainer.style.display = "";
      createCarouselDots(images.length);
      showCarouselImage(0);
    } else {
      if (carouselContainer) carouselContainer.style.display = "none";
    }
  };

  document.querySelectorAll(".btn-detail").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!modal) return;
      const card = btn.closest(".project-card");
      const title = card?.querySelector("h3")?.innerText || "Projet";
      const data = projectsInfo[title];

      mTitle.textContent = title;
      renderModalWithCarousel(
        data || { desc: "Détails à venir", tech: [], points: [], link: "#" }
      );
      modal.style.display = "flex";
      document.body.style.overflow = "hidden";

      // Animation GSAP améliorée
      gsap.fromTo(modal, { opacity: 0 }, { opacity: 1, duration: 0.25 });
      gsap.fromTo(
        ".modal-content",
        { scale: 0.9, y: -30, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }
      );
    });
  });

  // Carousel navigation
  const carouselPrev = document.getElementById("carouselPrev");
  const carouselNext = document.getElementById("carouselNext");
  if (carouselPrev && carouselNext) {
    carouselPrev.addEventListener("click", () => {
      if (currentProjectData && currentProjectData.images) {
        showCarouselImage(currentCarouselIndex - 1);
      }
    });
    carouselNext.addEventListener("click", () => {
      if (currentProjectData && currentProjectData.images) {
        showCarouselImage(currentCarouselIndex + 1);
      }
    });
  }

  const closeModal = () => {
    if (!modal) return;
    gsap.to(".modal-content", {
      scale: 0.9,
      y: -30,
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        modal.style.display = "none";
        document.body.style.overflow = "";
      },
    });
    gsap.to(modal, { opacity: 0, duration: 0.2 });
  };

  closeBtn?.addEventListener("click", closeModal);
  window.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  // 9. Effet terminal typewriter avec Intersection Observer
  const terminalBody = document.getElementById("terminalBody");
  if (terminalBody) {
    const cursor = document.createElement("span");
    cursor.className = "cursor";
    cursor.textContent = "_";
    cursor.style.animation = "blink 1s infinite";

    const lines = [
      { type: "cmd", text: "whoami" },
      { type: "out", text: "Tibo Tessier, développeur Full Stack en devenir" },
      { type: "cmd", text: "cat passion.txt" },
      { type: "out", text: "> Full Stack Development 🚀" },
      { type: "out", text: "> Code propre & optimisé 💯" },
      { type: "out", text: "> Innovation & Créativité 🎨" },
      { type: "cmd", text: 'echo "Prêt à apprendre ! "' },
      { type: "out", text: "Prêt à apprendre !" },
    ];

    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const typeLine = async (entry) => {
      const line = document.createElement("div");
      line.className = "term-line";

      if (entry.type === "cmd") {
        const prompt = document.createElement("span");
        prompt.className = "p-green";
        prompt.textContent = "$ ";
        line.appendChild(prompt);
      }

      const content = document.createElement("span");
      line.appendChild(content);
      terminalBody.appendChild(line);

      if (cursor.parentElement) cursor.parentElement.removeChild(cursor);
      line.appendChild(cursor);

      // Typed effect avec délai rapide
      for (let i = 0; i < entry.text.length; i++) {
        content.textContent += entry.text[i];
        terminalBody.scrollTop = terminalBody.scrollHeight;
        await wait(20);
      }

      await wait(200);
    };

    const showPrompt = () => {
      const line = document.createElement("div");
      line.className = "term-line";
      const prompt = document.createElement("span");
      prompt.className = "p-green";
      prompt.textContent = "$ ";
      line.appendChild(prompt);
      terminalBody.appendChild(line);
      if (cursor.parentElement) cursor.parentElement.removeChild(cursor);
      line.appendChild(cursor);
    };

    const runTerminal = async () => {
      terminalBody.innerHTML = "";
      for (const entry of lines) {
        await typeLine(entry);
      }
      showPrompt();
    };

    // Observer pour démarrer l'animation quand la section est visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            !terminalBody.classList.contains("typed")
          ) {
            terminalBody.classList.add("typed");
            runTerminal();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(terminalBody);
  }

  // Contact Form Handler
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.setAttribute("novalidate", "novalidate");

    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const email = formData.get("email");
      const message = formData.get("message");
      const emailInput = contactForm.querySelector('[name="email"]');
      const messageInput = contactForm.querySelector('[name="message"]');

      const getOrCreateErrorEl = (input) => {
        if (!input) return null;
        let el = input.nextElementSibling;
        if (!el || !el.classList || !el.classList.contains("error-msg")) {
          el = document.createElement("div");
          el.className = "error-msg";
          input.insertAdjacentElement("afterend", el);
        }
        return el;
      };

      const clearFieldError = (input) => {
        if (!input) return;
        input.classList.remove("input-error");
        const el = input.nextElementSibling;
        if (el && el.classList.contains("error-msg")) {
          el.textContent = "";
        }
      };

      const showFieldError = (input, msg) => {
        if (!input) return;
        input.classList.add("input-error");
        const el = getOrCreateErrorEl(input);
        if (el) el.textContent = msg;
      };

      const showToast = (message, type = "error") => {
        const toast = document.createElement("div");
        toast.className = `toast toast-${type}`;
        toast.setAttribute("role", "alert");
        toast.setAttribute("aria-live", "polite");
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => {
          toast.style.opacity = "0";
          toast.style.transform = "translate(-50%, 10px)";
          setTimeout(() => toast.remove(), 300);
        }, 3500);
      };

      // Validation améliorée
      clearFieldError(emailInput);
      clearFieldError(messageInput);
      let hasError = false;
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      if (!email || !emailPattern.test(String(email))) {
        showFieldError(emailInput, "Veuillez saisir un email valide.");
        hasError = true;
      }
      if (!message || String(message).trim().length < 2) {
        showFieldError(messageInput, "Votre message doit contenir au moins 2 caractères.");
        hasError = true;
      }

      if (hasError) {
        return;
      }

      const submitBtn = contactForm.querySelector('button[type="submit"], input[type="submit"]');
      const originalLabel = submitBtn ? submitBtn.textContent : null;
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Envoi...";
      }
      contactForm.setAttribute("aria-busy", "true");

      try {
        const response = await fetch("https://formspree.io/f/mqeawqwq", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            email: email,
            message: message,
          }),
        });

        if (response.ok) {
          const modal = document.getElementById("successModal");
          if (modal) {
            modal.classList.add("active");
          }
          contactForm.reset();
        } else {
          let serverMsg = "Erreur lors de l'envoi. Veuillez réessayer.";
          try {
            const data = await response.json();
            if (data && Array.isArray(data.errors) && data.errors.length) {
              serverMsg = data.errors[0].message || serverMsg;
            }
          } catch (_) {}
          showToast(serverMsg, "error");
        }
      } catch (error) {
        console.error("Erreur:", error);
        showToast("Une erreur réseau est survenue. Réessayez plus tard.", "error");
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          if (originalLabel) submitBtn.textContent = originalLabel;
        }
        contactForm.removeAttribute("aria-busy");
      }
    });

    // Clear errors live on input
    const emailInput2 = contactForm.querySelector('[name="email"]');
    const messageInput2 = contactForm.querySelector('[name="message"]');
    emailInput2 && emailInput2.addEventListener("input", () => {
      const val = emailInput2.value;
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      if (emailPattern.test(String(val))) {
        const el = emailInput2.nextElementSibling;
        if (el && el.classList.contains("error-msg")) el.textContent = "";
        emailInput2.classList.remove("input-error");
      }
    });
    messageInput2 && messageInput2.addEventListener("input", () => {
      const val = messageInput2.value;
      if (String(val).trim().length >= 10) {
        const el = messageInput2.nextElementSibling;
        if (el && el.classList.contains("error-msg")) el.textContent = "";
        messageInput2.classList.remove("input-error");
      }
    });
  }
});

function closeModal() {
  const modal = document.getElementById("successModal");
  if (modal) {
    modal.classList.remove("active");
  }
}

window.addEventListener("click", (e) => {
  const modal = document.getElementById("successModal");
  if (modal && e.target === modal) {
    closeModal();
  }
});

// Gestion du curseur personnalisé
const cursor = document.querySelector('.custom-cursor');
const cursorDot = document.querySelector('.custom-cursor-dot');

if (cursor && cursorDot) {
    document.addEventListener('mousemove', (e) => {
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
        
        cursor.animate({
            left: e.clientX + 'px',
            top: e.clientY + 'px'
        }, { duration: 500, fill: "forwards" });
    });

    const links = document.querySelectorAll('a, button, .project-card');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
        link.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
    });
}


// Fonction pour copier l'email
function copyEmail(event) {
    event.preventDefault();
    const email = 'tibo.tessier@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
        const emailLink = event.target.closest('a');
        if (emailLink) {
            emailLink.classList.add('copied');
            setTimeout(() => {
                emailLink.classList.remove('copied');
            }, 2000);
        }
    }).catch(err => {
        console.error('Erreur lors de la copie:', err);
    });
}

// Fonction pour copier le téléphone
function copyTel(event) {
    event.preventDefault();
    const tel = '07 72 21 54 15';
    navigator.clipboard.writeText(tel).then(() => {
        const telLink = event.target.closest('a');
        if (telLink) {
            telLink.classList.add('copied');
            setTimeout(() => {
                telLink.classList.remove('copied');
            }, 2000);
        }
    }).catch(err => {
        console.error('Erreur lors de la copie:', err);
    });
}

// Easter Egg Console
  console.log(
    "%c👋 Salut le Curieux !",
    "color: #00f2ff; font-size: 20px; font-weight: bold; background: #000; padding: 5px; border-radius: 5px;"
  );
  console.log(
    "%cSi vous voyez ce message, c'est que vous aimez voir ce qu'il y a sous le capot. On devrait s'entendre ! 😉\n\nContactez-moi : github.com/TiboTsr, linkedin.com/in/tibotessier, tibo.tessier@gmail.com",
    "color: #fff; font-size: 12px; line-height: 1.5;"
  );


// Scroll to Top Button
const scrollToTopBtn = document.querySelector('.scroll-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    scrollToTopBtn.classList.add('visible');
  } else {
    scrollToTopBtn.classList.remove('visible');
  }
});

scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Statistiques - Compteurs animés
const statNumbers = document.querySelectorAll('.stat-number');

const animateCounter = (element) => {
  const target = parseInt(element.getAttribute('data-target'));
  const duration = 2000;
  const increment = target / (duration / 16);
  let current = 0;
  
  const updateCounter = () => {
    current += increment;
    if (current < target) {
      element.textContent = Math.floor(current);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  };
  
  updateCounter();
};

// Observer pour démarrer l'animation quand la section est visible
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      statNumbers.forEach(stat => {
        if (stat.textContent === '0') {
          animateCounter(stat);
        }
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
  statsObserver.observe(statsSection);
}

// Easter Egg - Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase();
  
  if (key === konamiCode[konamiIndex]) {
    konamiIndex++;
    
    if (konamiIndex === konamiCode.length) {
      activateKonamiEasterEgg();
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
});

function activateKonamiEasterEgg() {
  const message = document.createElement('div');
  message.className = 'easter-egg-message';
  message.innerHTML = `
    <h3>🎮 Konami Code Activé ! 🎮</h3>
    <p>Bravo ! Vous avez trouvé l'Easter Egg secret !</p>
    <p style="font-size: 3rem; margin: 1rem 0;">🚀✨🎉</p>
  `;
  
  document.body.appendChild(message);
  document.body.classList.add('konami-activated');
  
  setTimeout(() => {
    message.remove();
    document.body.classList.remove('konami-activated');
  }, 5000);
  
  // Confetti effect
  for (let i = 0; i < 50; i++) {
    createConfetti();
  }
}

function createConfetti() {
  const confetti = document.createElement('div');
  confetti.style.cssText = `
    position: fixed;
    width: 10px;
    height: 10px;
    background: ${['#00f2ff', '#7000ff', '#ff00ff', '#00ff00'][Math.floor(Math.random() * 4)]};
    left: ${Math.random() * 100}vw;
    top: -10px;
    border-radius: 50%;
    pointer-events: none;
    z-index: 10001;
    animation: confettiFall ${2 + Math.random() * 3}s linear forwards;
  `;
  
  document.body.appendChild(confetti);
  
  setTimeout(() => confetti.remove(), 5000);
}

// Animation CSS pour les confettis
const style = document.createElement('style');
style.textContent = `
  @keyframes confettiFall {
    to {
      transform: translateY(100vh) rotate(360deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Easter Egg - Triple clic sur le logo
const loaderLogo = document.querySelector('.loader-logo');
if (loaderLogo) {
  let logoClickCount = 0;
  let logoClickTimer;
  
  loaderLogo.addEventListener('click', () => {
    logoClickCount++;
    clearTimeout(logoClickTimer);
    
    if (logoClickCount === 3) {
      console.log('%c🎊 Triple clic détecté ! Vous êtes rapide ! 🎊', 'color: #00f2ff; font-size: 16px; font-weight: bold;');
      logoClickCount = 0;
    } else {
      logoClickTimer = setTimeout(() => {
        logoClickCount = 0;
      }, 500);
    }
  });
}

// Amélioration du mode sombre/clair avec notification
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  const originalClickHandler = themeToggle.onclick;
  
  themeToggle.addEventListener('click', () => {
    const mode = document.body.classList.contains('light-mode') ? 'clair' : 'sombre';
    
    // Petite notification
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 2rem;
      background: var(--glass);
      backdrop-filter: blur(10px);
      border: 1px solid var(--border);
      padding: 1rem 1.5rem;
      border-radius: 12px;
      z-index: 9999;
      animation: slideIn 0.3s ease;
    `;
    notification.textContent = `Mode ${mode} activé`;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 2000);
  });
}

const notifStyle = document.createElement('style');
notifStyle.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(notifStyle);