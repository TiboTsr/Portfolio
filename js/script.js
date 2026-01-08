// Bloquer le scroll immédiatement au chargement
document.body.classList.add("no-scroll");

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialisations
  AOS.init({ mirror: true, duration: 700 });

  // 2. Loader Moderne avec Progression et Particules Améliorées
  const progressBar = document.getElementById("progressBar");
  const percentage = document.getElementById("loaderPercentage");
  const status = document.getElementById("loaderStatus");
  const loader = document.querySelector(".loader");
  const container = document.querySelector(".loader-bg");
  
  // ===== PARTICULES AMÉLIORÉES =====
  if (container) {    
    // Canvas pour les connexions entre particules
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.inset = '0';
    canvas.style. pointerEvents = 'none';
    canvas.style.zIndex = '1';
    canvas.width = container.offsetWidth;
    canvas. height = container.offsetHeight;
    container.insertBefore(canvas, container.firstChild);

    const ctx = canvas.getContext('2d');

    // Effet de lumière centrale
    const centerGlow = document.createElement('div');
    centerGlow.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 300px;
      height: 300px;
      background: radial-gradient(circle, rgba(0, 242, 255, 0.2), transparent 70%);
      animation: glowPulse 3s ease-in-out infinite;
      pointer-events: none;
      z-index: 0;
    `;
    container.appendChild(centerGlow);

    // Configuration des particules
    const PARTICLE_COUNT = 60;
    const colors = ["#00f2ff", "#7000ff"];
    const sizes = [2, 3, 4, 5, 6, 8];
    const particles = [];

    // Création des particules avec plus de variété
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = document.createElement("span");
      p.classList.add("loader-particle");

      const x = Math.random() * 100;
      const y = Math.random() * 100;
      
      p.style.top = y + "%";
      p.style.left = x + "%";

      // Tailles variées
      const size = sizes[Math. floor(Math.random() * sizes.length)];
      p.style.width = size + "px";
      p.style.height = size + "px";

      // Couleur aléatoire
      const color = colors[Math.floor(Math.random() * colors.length)];
      p.style.background = color;
      p.style.boxShadow = `0 0 ${size * 4}px ${color}`;

      // Mouvement aléatoire
      const tx = (Math.random() * 2 - 1) * 120;
      const ty = (Math.random() * 2 - 1) * 160;

      p.style.setProperty("--tx", `${tx}px`);
      p.style.setProperty("--ty", `${ty}px`);

      // Animation avec vitesses variées selon la taille
      const duration = size > 5 ? 5 + Math.random() * 4 : 2 + Math.random() * 3;
      const delay = Math.random() * 3;
      const pulseDuration = 1 + Math.random();
      
      p.style.animation = `
        particleFloat ${duration}s linear ${delay}s infinite,
        particlePulse ${pulseDuration}s ease-in-out ${delay}s infinite
      `;

      p.style.zIndex = '2';
      container.appendChild(p);
      
      // Stocker pour les connexions
      particles.push({ element: p, x, y, color, size });
    }

    console.log(`✅ ${PARTICLE_COUNT} particules créées avec succès`);

    // Dessiner les connexions entre particules proches
    function drawConnections() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const containerRect = container.getBoundingClientRect();
      
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        const rect1 = p1.element. getBoundingClientRect();
        const x1 = rect1.left + rect1.width / 2 - containerRect.left;
        const y1 = rect1.top + rect1.height / 2 - containerRect.top;
        
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const rect2 = p2.element.getBoundingClientRect();
          const x2 = rect2.left + rect2.width / 2 - containerRect.left;
          const y2 = rect2.top + rect2.height / 2 - containerRect.top;
          
          const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
          
          // Connexion si distance < 150px
          if (distance < 150) {
            const opacity = (1 - distance / 150) * 0.3;
            ctx.strokeStyle = `rgba(0, 242, 255, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
        }
      }
      
      requestAnimationFrame(drawConnections);
    }

    // Démarrer l'animation des connexions
    drawConnections();

    // Redimensionner le canvas si la fenêtre change
    window. addEventListener('resize', () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    });
  } else {
    console.error("❌ Container . loader-bg non trouvé !");
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
              // Animation de sortie immédiate
              setTimeout(() => {
                gsap.to(loader, {
                  opacity: 0,
                  duration: 0.5,
                  ease: "power2.inOut",
                  onComplete:  () => {
                    loader. style.display = "none";
                    // Débloquer le scroll
                    document. body.classList.remove("no-scroll");
                    // Activer "Accueil" après le loader
                    const firstLink = document.querySelector(
                      '. nav-link[href="#accueil"]'
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

    // Démarrer la progression après un court délai
    setTimeout(updateProgress, 400);
  } else {
    // Si le loader est absent, s'assurer que la page est utilisable
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
      glowPoint.style.left = e. clientX + "px";
      glowPoint. style.top = e.clientY + "px";
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
    const drops = Array. from({ length: columns }).fill(1);

    function drawMatrix() {
      ctx.fillStyle = "rgba(5, 5, 5, 0.05)";
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = "#00f2ff";
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
  }

  // 6. Navigation active au scroll
  const navLinks = document.querySelectorAll(".nav-link");
  const scrollTargets = document.querySelectorAll("section, footer");
  window.addEventListener("scroll", () => {
    let current = "";
    scrollTargets.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (scrollY >= sectionTop - 200) {
        current = section. getAttribute("id") || section.tagName.toLowerCase();
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      const targetId = link.getAttribute("href").slice(1);
      if (targetId === current) {
        link.classList.add("active");
      }
    });
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
      const target = document.querySelector(this. getAttribute("href"));
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
        icon.classList.toggle("fa-bars", ! isOpen);
        icon.classList.toggle("fa-times", isOpen);
      }
    });

    // Fermer au clic à l'extérieur
    document.addEventListener("click", (e) => {
      const clickedInside = navLinksEl.contains(e.target) || navToggle.contains(e.target);
      if (!clickedInside) {
        closeMobileMenu();
      }
    });
  }

  // 8. Modal Logic avec Animations
  const modal = document.getElementById("projectModal");
  const mTitle = document.getElementById("modalTitle");
  const mDesc = document.getElementById("modalDesc");
  const mTech = document.getElementById("modalTech");
  const mPoints = document.getElementById("modalPoints");
  const mLinks = document. getElementById("modalLinks");
  const closeBtn = document.querySelector(".close-modal");

  const projectsInfo = {
    "Application Tri Web": {
      desc: "Application web permettant de suivre et gérer le tri des déchets au sein d'un campus universitaire.\nLes utilisateurs peuvent consulter les données de recyclage en temps réel, ajouter de nouvelles entrées, et visualiser des statistiques détaillées pour encourager les bonnes pratiques écologiques.",
      tech: ["PHP", "SQL", "HTML/CSS"],
      points: [
        "Système complet de gestion des données (ajout, modification, suppression)",
        "Connexion sécurisée avec gestion des utilisateurs",
        "Projet orienté écologie et responsabilité environnementale",
      ],
      link: "prochainement",
        images: [
          "./images/AppRecycl1.png",
          "./images/AppRecycl2.png",
          "./images/AppRecycl3.png",
          "./images/AppRecycl4.png",
          "./images/AppRecycl5.png",
          "./images/AppRecycl6.png",
          "./images/AppRecycl7.png",
          "./images/AppRecycl8.png",
        ],
    },
    "Morpion JavaFX": {
      desc:  "Jeu de morpion développé en Java avec JavaFX, intégrant une interface graphique animée et une logique de jeu structurée.\nLe projet met l'accent sur la programmation orientée objet et la gestion des événements utilisateur.",
      tech: ["Java", "JavaFX", "POO"],
      points: [
        "Gestion des tours, des scores et des états de la partie",
        "Code clair, structuré et maintenable",
        "Projet pédagogique axé sur les bonnes pratiques Java, JavaFX et POO",
      ],
      link: "http://github.com/TiboTsr/IHM-Morpion",
        images: [
          "./images/Morpion1.png",
          "./images/Morpion2.png",
          "./images/Morpion3.png",
          "./images/Morpion4.png",
        ],
    },
    "Jeu Timeline": {
      desc: "Jeu inspiré du Timeline, où les cartes sont générées dynamiquement à partir de fichiers JSON.\nLe joueur doit placer correctement des événements dans l'ordre chronologique, avec une interface intuitive et fluide.",
      tech: ["Java", "JSON", "UX"],
      points: [
        "Chargement dynamique des cartes depuis des fichiers JSON",
        "Interaction fluide grâce au drag & drop",
        "Facilité d'ajout de nouveaux decks sans modifier le code",
      ],
      link: "indisponible",
        images:  [],
    },
    "Application web Météo": {
      desc: "Application web permettant de consulter la météo actuelle et les prévisions sur plusieurs jours à partir d'une API externe. L'utilisateur peut rechercher une ville et visualiser des informations détaillées sur les conditions météorologiques.",
      tech: ["JavaScript", "API", "HTML", "CSS"],
      points: [
        "Connexion à une API météo (OpenWeather)",
        "Gestion des erreurs réseau et des villes inconnues",
        "Design responsive adapté au mobiles",
        "Affichage des prévisions sur plusieurs jours",
      ],
      link: "prochainement",
        images: [
          "./images/AppMeteo1.png",
          "./images/AppMeteo2.png",
          "./images/AppMeteo3.png",
          "./images/AppMeteo4.png",
        ],
    },
    "Bot Discord mise à jour Apple": {
      desc: "Bot Discord automatisé qui surveille les nouvelles mises à jour des appareils Apple et envoie des notifications sur un serveur Discord dès qu'une mise à jour est détectée.",
      tech: ["Python", "SQL"],
      points: [
        "Récupération automatique des données via une API",
        "Envoi de notifications en temps réel sur Discord",
        "Stockage des mises à jour en base de données SQL",
        "Gestion des erreurs et des doublons",
      ],
      link: "https://applebot.tibotsr.dev/",
        images: [
          "./images/AppleBot1.png",
          "./images/AppleBot2.png",
          "./images/AppleBot3.png",
          "./images/AppleBot4.png",
        ],
    },
  };

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
      if (! carouselImage || !currentProjectData) return;

      const images = currentProjectData.images || [];
      if (images.length === 0) return;

      currentCarouselIndex = (index + images.length) % images.length;
      carouselImage. src = images[currentCarouselIndex];
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
    mPoints.innerHTML = data.points. map((p) => `<li>${p}</li>`).join("");
    const linkValue = (data.link || "").trim();
    const normalizedLink = linkValue.toLowerCase();

    if (! linkValue || linkValue === "#") {
      mLinks.innerHTML = "";
      return;
    }

    if (normalizedLink === "indisponible" || normalizedLink === "non disponible") {
      mLinks.innerHTML =
        '<button class="btn btn-unavailable" type="button" disabled><i class="fas fa-ban"></i> Lien du projet indisponible</button>';
      return;
    }

    if (normalizedLink === "prochainement" || normalizedLink === "bientot" || normalizedLink === "bientôt") {
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
      const carouselContainer = document. getElementById("carouselContainer");
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
      if (! modal) return;
      const card = btn.closest(".project-card");
      const title = card?. querySelector("h3")?.innerText || "Projet";
      const data = projectsInfo[title];

      mTitle.textContent = title;
        renderModalWithCarousel(
        data || { desc: "Détails à venir", tech: [], points: [], link: "#" }
      );
      modal.style.display = "flex";
      document.body.style.overflow = "hidden";

      // Animation GSAP améliorée
      gsap. fromTo(modal, { opacity: 0 }, { opacity: 1, duration: 0.25 });
      gsap.fromTo(
        ". modal-content",
        { scale: 0.9, y: -30, opacity: 0 },
        { scale: 1, y:  0, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }
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
    if (! modal) return;
    gsap.to(". modal-content", {
      scale: 0.9,
      y: -30,
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        modal.style.display = "none";
        document.body.style. overflow = "";
      },
    });
    gsap.to(modal, { opacity: 0, duration: 0.2 });
  };

  closeBtn?. addEventListener("click", closeModal);
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
      { type:  "out", text: "Tibo Tessier, développeur Full Stack en devenir" },
      { type:  "cmd", text: "cat passion.txt" },
      { type: "out", text: "> Full Stack Development 🚀" },
      { type: "out", text: "> Code propre & optimisé 💯" },
      { type: "out", text: "> Innovation & Créativité 🎨" },
      { type: "cmd", text: "echo \"Prêt à apprendre ! \"" },
      { type: "out", text:  "Prêt à apprendre !" },
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

      if (cursor. parentElement) cursor.parentElement.removeChild(cursor);
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
          if (entry.isIntersecting && !terminalBody.classList.contains("typed")) {
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
  const contactForm = document. getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const email = formData.get("email");
      const message = formData. get("message");

      // Validation
      if (!email || !message) {
        return; // Let HTML5 validation show the styled error
      }

      try {
        const response = await fetch("https://formspree.io/f/mqeawqwq", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON. stringify({
            email: email,
            message: message,
          }),
        });

        if (response.ok) {
          const modal = document.getElementById("successModal");
          if (modal) {
            modal. classList.add("active");
          }
          contactForm.reset();
        } else {
          alert("Erreur lors de l'envoi.  Veuillez réessayer.");
        }
      } catch (error) {
        console.error("Erreur:", error);
        alert("Erreur lors de l'envoi.  Veuillez réessayer.");
      }
    });
  }
});

// Modal Functions (outside DOMContentLoaded)
function closeModal() {
  const modal = document.getElementById("successModal");
  if (modal) {
    modal.classList.remove("active");
  }
}

// Close modal when clicking outside
window.addEventListener("click", (e) => {
  const modal = document.getElementById("successModal");
  if (modal && e.target === modal) {
    closeModal();
  }
});
