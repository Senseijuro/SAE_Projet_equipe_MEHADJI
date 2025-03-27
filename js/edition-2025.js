// Script spécifique pour le slider de la page édition 2025
document.addEventListener("DOMContentLoaded", () => {
  // Corriger le bouton "next" pour qu'il utilise le même style que "prev"
  const nextBtn = document.getElementById("next")
  if (nextBtn) {
    // Supprimer le contenu textuel existant
    nextBtn.textContent = ""
  }

  // Éléments du slider
  const sliderContainer = document.querySelector(".slider")
  const sliderList = document.querySelector(".slider .list")
  const sliderItems = document.querySelectorAll(".slider .list .item")
  const thumbnailContainer = document.querySelector(".slider .thumbnail")
  const prevBtn = document.getElementById("prev")

  // Supprimer l'indicateur de thème s'il existe
  const themeIndicator = document.querySelector(".theme-indicator")
  if (themeIndicator) {
    themeIndicator.remove()
  }

  // S'assurer que toutes les miniatures sont créées
  function ensureAllThumbnails() {
    // Vérifier si le conteneur de miniatures existe
    if (!thumbnailContainer) return

    // Obtenir les miniatures existantes
    const existingThumbnails = thumbnailContainer.querySelectorAll(".item")

    // Si nous avons déjà le bon nombre de miniatures, ne rien faire
    if (existingThumbnails.length >= sliderItems.length) return

    // Sinon, créer les miniatures manquantes
    for (let i = existingThumbnails.length; i < sliderItems.length; i++) {
      // Obtenir l'image et le titre du slide correspondant
      const slideImg = sliderItems[i].querySelector("img").src
      const slideTitle = sliderItems[i].querySelector(".content h2")?.textContent || `Thème ${i + 1}`

      // Créer la nouvelle miniature
      const newThumbnail = document.createElement("div")
      newThumbnail.className = "item"
      newThumbnail.innerHTML = `
        <img src="${slideImg}">
        <div class="content">${slideTitle}</div>
      `

      // Ajouter l'événement de clic
      newThumbnail.addEventListener("click", () => {
        showSlide(i)
        resetAutoplay()
      })

      // Ajouter la miniature au conteneur
      thumbnailContainer.appendChild(newThumbnail)
    }
  }

  // Ajuster la position des flèches
  function adjustArrowsPosition() {
    if (prevBtn) {
      prevBtn.style.position = "absolute"
      prevBtn.style.left = "20px"
    }

    if (nextBtn) {
      nextBtn.style.position = "absolute"
      nextBtn.style.right = "20px"
    }
  }

  // Variables
  let activeIndex = 0
  let autoplayInterval
  const totalItems = sliderItems.length

  // Initialisation
  function initSlider() {
    // S'assurer que toutes les miniatures sont créées
    ensureAllThumbnails()

    // Ajuster la position des flèches
    adjustArrowsPosition()

    // Obtenir les miniatures mises à jour
    const thumbnailItems = thumbnailContainer ? thumbnailContainer.querySelectorAll(".item") : []

    // Ajouter les événements aux miniatures
    thumbnailItems.forEach((item, index) => {
      item.addEventListener("click", (e) => {
        e.preventDefault()
        showSlide(index)
        resetAutoplay()
        return false
      })
    })

    // Ajouter les événements aux boutons
    if (prevBtn) {
      prevBtn.addEventListener("click", (e) => {
        e.preventDefault()
        goToPrevSlide()
        resetAutoplay()
        return false
      })
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", (e) => {
        e.preventDefault()
        goToNextSlide()
        resetAutoplay()
        return false
      })
    }

    // Ajouter les événements clavier
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault()
        goToPrevSlide()
        resetAutoplay()
      } else if (e.key === "ArrowRight") {
        e.preventDefault()
        goToNextSlide()
        resetAutoplay()
      }
    })

    // Démarrer l'autoplay
    startAutoplay()

    // Pause de l'autoplay au survol du slider
    sliderContainer.addEventListener("mouseenter", () => {
      clearInterval(autoplayInterval)
    })

    // Reprise de l'autoplay quand la souris quitte le slider
    sliderContainer.addEventListener("mouseleave", () => {
      startAutoplay()
    })

    // Afficher le premier slide
    showSlide(activeIndex)
  }

  // Démarrer l'autoplay
  function startAutoplay() {
    clearInterval(autoplayInterval)
    autoplayInterval = setInterval(() => {
      goToNextSlide()
    }, 30000) // 30 secondes
  }

  // Réinitialiser l'autoplay
  function resetAutoplay() {
    clearInterval(autoplayInterval)
    startAutoplay()
  }

  // Afficher un slide spécifique
  function showSlide(index) {
    // Obtenir les miniatures mises à jour
    const thumbnailItems = thumbnailContainer ? thumbnailContainer.querySelectorAll(".item") : []

    // Masquer tous les slides
    sliderItems.forEach((item) => {
      item.classList.remove("active")
    })

    // Désactiver toutes les miniatures
    thumbnailItems.forEach((item) => {
      item.classList.remove("active")
    })

    // Afficher le slide actif
    sliderItems[index].classList.add("active")

    // Activer la miniature correspondante si elle existe
    if (thumbnailItems[index]) {
      thumbnailItems[index].classList.add("active")

      // Calculer la position pour que la miniature active soit visible
      // avec 1-2 miniatures avant et après si possible
      const thumbnailWidth = thumbnailItems[index].offsetWidth + 10 // Largeur + marge

      // Calculer la position pour montrer la miniature active avec quelques miniatures avant
      let scrollPosition

      // Si nous sommes sur la première miniature, s'assurer qu'elle est complètement visible
      if (index === 0) {
        scrollPosition = 0
      }
      // Si nous sommes sur la dernière miniature ou proche de la fin, s'assurer que les dernières sont complètement visibles
      else if (index >= thumbnailItems.length - 3) {
        // Calculer la position maximale de défilement pour voir les dernières miniatures
        scrollPosition = thumbnailContainer.scrollWidth - thumbnailContainer.clientWidth

        // S'assurer que la position n'est pas négative
        if (scrollPosition < 0) scrollPosition = 0
      }
      // Si nous sommes près du début, rester au début
      else if (index < 2) {
        scrollPosition = 0
      }
      // Sinon, centrer la miniature active avec 1-2 miniatures avant
      else {
        scrollPosition = (index - 1) * thumbnailWidth
      }

      // Appliquer le défilement
      thumbnailContainer.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      })
    }

    // Mettre à jour l'index actif
    activeIndex = index
  }

  // Aller au slide précédent
  function goToPrevSlide() {
    let newIndex = activeIndex - 1
    if (newIndex < 0) {
      newIndex = totalItems - 1
    }
    showSlide(newIndex)
  }

  // Aller au slide suivant
  function goToNextSlide() {
    let newIndex = activeIndex + 1
    if (newIndex >= totalItems) {
      newIndex = 0
    }
    showSlide(newIndex)
  }

  // Initialiser le slider
  initSlider()
})

// Fonctions communes du site
document.addEventListener("DOMContentLoaded", () => {
  // Navbar scroll effect
  const navbar = document.getElementById("navbar")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })

  // Mobile menu toggle
  const navbarToggle = document.getElementById("navbar-toggle")
  const navbarMenu = document.getElementById("navbar-menu")
  if (navbarToggle && navbarMenu) {
    navbarToggle.addEventListener("click", () => {
      navbarMenu.classList.toggle("active")
    })
  }

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (navbarMenu && navbarMenu.classList.contains("active")) {
        navbarMenu.classList.remove("active")
      }
    })
  })

  // Set current year in footer
  const currentYearElement = document.getElementById("current-year")
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear()
  }

  // Scroll animations
  const animatedElements = document.querySelectorAll(".fade-in, .slide-in-left, .slide-in-right")
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  animatedElements.forEach((element) => {
    observer.observe(element)
  })

  // Parallax effect for hero sections
  const heroElements = document.querySelectorAll(".hero-bg")
  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY
    heroElements.forEach((element) => {
      element.style.transform = `translateY(${scrolled * 0.3}px)`
    })
  })

  // Initialiser le widget de traduction
  initTranslationWidget()
})

// Widget de traduction - Code simplifié
function initTranslationWidget() {
  // Sélectionner les éléments du widget
  const planet = document.querySelector(".planet")
  const options = document.querySelector(".language-options")
  const languageOptions = document.querySelectorAll(".language-option")

  if (!planet || !options) {
    console.error("Widget de traduction non trouvé")
    return
  }

  // Ouvrir/fermer le menu des langues au clic sur la planète
  planet.addEventListener("click", (e) => {
    e.stopPropagation()
    options.classList.toggle("active")

    // Animation de la planète
    if (options.classList.contains("active")) {
      planet.style.animation = "rotate 5s linear infinite, pulse 2s infinite"
    } else {
      planet.style.animation = "rotate 20s linear infinite"
    }
  })

  // Fermer le menu si on clique ailleurs sur la page
  document.addEventListener("click", () => {
    if (options.classList.contains("active")) {
      options.classList.remove("active")
      planet.style.animation = "rotate 20s linear infinite"
    }
  })

  // Empêcher la propagation du clic sur le menu
  options.addEventListener("click", (e) => {
    e.stopPropagation()
  })

  // Gérer le clic sur une option de langue
  languageOptions.forEach((option) => {
    option.addEventListener("click", function () {
      const lang = this.getAttribute("data-lang")
      changeLanguage(lang)
      options.classList.remove("active")
    })
  })
}

// Fonction pour changer la langue
function changeLanguage(lang) {
  console.log(`Changement de langue vers: ${lang}`)

  // Afficher un indicateur de chargement
  const loadingIndicator = document.createElement("div")
  loadingIndicator.style.position = "fixed"
  loadingIndicator.style.top = "50%"
  loadingIndicator.style.left = "50%"
  loadingIndicator.style.transform = "translate(-50%, -50%)"
  loadingIndicator.style.backgroundColor = "var(--red-primary)"
  loadingIndicator.style.color = "white"
  loadingIndicator.style.padding = "20px 30px"
  loadingIndicator.style.borderRadius = "10px"
  loadingIndicator.style.zIndex = "9999"

  // Texte de chargement selon la langue
  const loadingText = {
    fr: "Traduction en cours...",
    en: "Translating...",
    es: "Traduciendo...",
    ja: "翻訳中...",
  }

  loadingIndicator.textContent = loadingText[lang] || loadingText["en"]
  document.body.appendChild(loadingIndicator)

  // Simuler un délai de traduction
  setTimeout(() => {
    // Traduire la page
    translatePage(lang)

    // Retirer l'indicateur de chargement
    document.body.removeChild(loadingIndicator)

    // Mettre à jour l'attribut lang de la page
    document.documentElement.lang = lang
  }, 1000)
}

// Remplacer la fonction translatePage par cette version améliorée qui traduit tous les éléments

// Fonction pour traduire la page
function translatePage(lang) {
  // Dictionnaire de traduction complet
  const translations = {
    fr: {
      // Navbar
      "nav-link-1": "Exposition 2026",
      "nav-link-2": "Édition 2025",
      "nav-link-3": "Notre Équipe",

      // Hero section
      "hero-title": "Édition 2025",
      "hero-subtitle":
        "Du 15 février au 13 avril 2025, les Trésors de Banlieues ont accueilli plus de 22,000 visiteurs pour une célébration unique de l'art urbain contemporain.",

      // Section Retour
      "section-title": "Retour sur l'exposition",
      "section-text-1":
        "L'édition 2025 des Trésors de Banlieues a été un véritable succès, réunissant artistes, amateurs d'art et curieux autour d'une programmation riche et diversifiée. Pendant deux mois, notre espace d'exposition s'est transformé en un lieu de rencontres, d'échanges et de découvertes artistiques.",
      "section-text-2":
        "Cette édition a mis en lumière la richesse et la diversité de l'art urbain contemporain, à travers des œuvres qui questionnent notre rapport à la ville, à l'identité et à la mémoire collective.",

      // Stats
      "stat-label-1": "Visiteurs",
      "stat-label-2": "Artistes",
      "stat-label-3": "Jours",

      // Thématiques
      "themes-title": "Les 11 Thématiques",
      "themes-subtitle": "Découvrez les différentes facettes de l'exposition à travers ses thèmes principaux",

      // Thèmes individuels
      "theme-label": "Thème",
      "theme-1-title": "Une enfance en banlieue",
      "theme-1-desc": "Exploration des souvenirs et expériences de jeunesse dans les quartiers périphériques.",
      "theme-2-title": "Logement et cadre de vie au coeur des inégalités sociales",
      "theme-2-desc": "Exploration des identités multiples qui se forgent dans l'environnement urbain.",
      "theme-3-title": "D'Eglises en Cathédrales",
      "theme-3-desc": "Regard sur l'habitat et les conditions de vie en banlieue.",
      "theme-4-title": 'Napoléon, ex "petit caporal"',
      "theme-4-desc": "Exploration de l'histoire partagée des communautés de banlieue.",
      "theme-5-title": "1870-71, 14-18, 39-45, 46-54, 54-62 : de chiffres et des larmes",
      "theme-5-desc": "Célébration des expressions artistiques nées dans les quartiers périphériques.",
      "theme-6-title": "Mémoires familiales, paysannes et ouvrières du siècle dernier",
      "theme-6-desc": "Exploration des déplacements et des flux dans l'espace urbain.",
      "theme-7-title": "Le bestiaire des banlieues",
      "theme-7-desc": "Regard sur les liens sociaux et les réseaux d'entraide en banlieue.",
      "theme-8-title": "L'Impressionnisme en banlieue",
      "theme-8-desc": "Exploration des mutations des paysages urbains périphériques.",
      "theme-9-title": "Quand les portraits composent la plus belle parure des banlieues",
      "theme-9-desc": "Regard sur les enjeux environnementaux dans les quartiers périphériques.",
      "theme-10-title": "Arts décoratifs et ameublement d'art",
      "theme-10-desc":
        "Réflexions et projections sur le futur des quartiers périphériques et leur développement durable.",
      "theme-11-title": "Thème 11",
      "theme-11-desc": "Description du thème 11.",

      // CTA
      "cta-title": "Prêt pour l'édition 2026 ?",
      "cta-text":
        "Ne manquez pas la prochaine édition des Trésors de Banlieues qui promet d'être encore plus spectaculaire.",
      "cta-button": "Découvrir l'édition 2026",

      // Footer
      "footer-title-1": "Trésors de Banlieues",
      "footer-text": "Une exposition d'art urbain célébrant la créativité et la diversité culturelle des banlieues.",
      "footer-links-title": "Liens Rapides",
      "footer-link-1": "Exposition 2026",
      "footer-link-2": "Édition 2025",
      "footer-link-3": "Notre Équipe",
      "footer-contact": "Contact",
      "footer-address-1": "Halle des Grésillons",
      "footer-address-2": "Place Indira Gandhi",
      "footer-address-3": "92230 Gennevilliers",
      "footer-email": "Email:",
      "footer-tel": "Tél: 01 23 45 67 89",
      "footer-copyright": "Tous droits réservés.",
    },
    en: {
      // Navbar
      "nav-link-1": "2026 Exhibition",
      "nav-link-2": "2025 Edition",
      "nav-link-3": "Our Team",

      // Hero section
      "hero-title": "2025 Edition",
      "hero-subtitle":
        "From February 15 to April 13, 2025, Trésors de Banlieues welcomed over 22,000 visitors for a unique celebration of contemporary urban art.",

      // Section Retour
      "section-title": "Exhibition Review",
      "section-text-1":
        "The 2025 edition of Trésors de Banlieues was a real success, bringing together artists, art lovers and curious people around a rich and diverse program. For two months, our exhibition space was transformed into a place of meetings, exchanges and artistic discoveries.",
      "section-text-2":
        "This edition highlighted the richness and diversity of contemporary urban art, through works that question our relationship to the city, identity and collective memory.",

      // Stats
      "stat-label-1": "Visitors",
      "stat-label-2": "Artists",
      "stat-label-3": "Days",

      // Thématiques
      "themes-title": "The 11 Themes",
      "themes-subtitle": "Discover the different facets of the exhibition through its main themes",

      // Thèmes individuels
      "theme-label": "Theme",
      "theme-1-title": "Childhood in the Suburbs",
      "theme-1-desc": "Exploration of memories and youth experiences in peripheral neighborhoods.",
      "theme-2-title": "Housing and Living Environment at the Heart of Social Inequalities",
      "theme-2-desc": "Exploration of multiple identities forged in the urban environment.",
      "theme-3-title": "From Churches to Cathedrals",
      "theme-3-desc": "A look at housing and living conditions in the suburbs.",
      "theme-4-title": 'Napoleon, former "little corporal"',
      "theme-4-desc": "Exploration of the shared history of suburban communities.",
      "theme-5-title": "1870-71, 14-18, 39-45, 46-54, 54-62: Numbers and Tears",
      "theme-5-desc": "Celebration of artistic expressions born in peripheral neighborhoods.",
      "theme-6-title": "Family, Peasant and Worker Memories of the Last Century",
      "theme-6-desc": "Exploration of movements and flows in urban space.",
      "theme-7-title": "The Bestiary of the Suburbs",
      "theme-7-desc": "A look at social ties and support networks in the suburbs.",
      "theme-8-title": "Impressionism in the Suburbs",
      "theme-8-desc": "Exploration of the mutations of peripheral urban landscapes.",
      "theme-9-title": "When Portraits Compose the Most Beautiful Adornment of the Suburbs",
      "theme-9-desc": "A look at environmental issues in peripheral neighborhoods.",
      "theme-10-title": "Decorative Arts and Art Furniture",
      "theme-10-desc":
        "Reflections and projections on the future of peripheral neighborhoods and their sustainable development.",
      "theme-11-title": "Theme 11",
      "theme-11-desc": "Description of theme 11.",

      // CTA
      "cta-title": "Ready for the 2026 edition?",
      "cta-text": "Don't miss the next edition of Trésors de Banlieues which promises to be even more spectacular.",
      "cta-button": "Discover the 2026 edition",

      // Footer
      "footer-title-1": "Trésors de Banlieues",
      "footer-text": "An urban art exhibition celebrating the creativity and cultural diversity of the suburbs.",
      "footer-links-title": "Quick Links",
      "footer-link-1": "2026 Exhibition",
      "footer-link-2": "2025 Edition",
      "footer-link-3": "Our Team",
      "footer-contact": "Contact",
      "footer-address-1": "Halle des Grésillons",
      "footer-address-2": "Place Indira Gandhi",
      "footer-address-3": "92230 Gennevilliers",
      "footer-email": "Email:",
      "footer-tel": "Phone: 01 23 45 67 89",
      "footer-copyright": "All rights reserved.",
    },
    es: {
      // Navbar
      "nav-link-1": "Exposición 2026",
      "nav-link-2": "Edición 2025",
      "nav-link-3": "Nuestro Equipo",

      // Hero section
      "hero-title": "Edición 2025",
      "hero-subtitle":
        "Del 15 de febrero al 13 de abril de 2025, Trésors de Banlieues recibió a más de 22.000 visitantes para una celebración única del arte urbano contemporáneo.",

      // Section Retour
      "section-title": "Revisión de la exposición",
      "section-text-1":
        "La edición 2025 de Trésors de Banlieues fue un verdadero éxito, reuniendo a artistas, amantes del arte y curiosos en torno a un programa rico y diverso. Durante dos meses, nuestro espacio de exposición se transformó en un lugar de encuentros, intercambios y descubrimientos artísticos.",
      "section-text-2":
        "Esta edición destacó la riqueza y diversidad del arte urbano contemporáneo, a través de obras que cuestionan nuestra relación con la ciudad, la identidad y la memoria colectiva.",

      // Stats
      "stat-label-1": "Visitantes",
      "stat-label-2": "Artistas",
      "stat-label-3": "Días",

      // Thématiques
      "themes-title": "Los 11 Temas",
      "themes-subtitle": "Descubre las diferentes facetas de la exposición a través de sus temas principales",

      // Thèmes individuels
      "theme-label": "Tema",
      "theme-1-title": "Una infancia en los suburbios",
      "theme-1-desc": "Exploración de recuerdos y experiencias juveniles en barrios periféricos.",
      "theme-2-title": "Vivienda y entorno de vida en el corazón de las desigualdades sociales",
      "theme-2-desc": "Exploración de identidades múltiples que se forjan en el entorno urbano.",
      "theme-3-title": "De Iglesias a Catedrales",
      "theme-3-desc": "Una mirada a la vivienda y las condiciones de vida en los suburbios.",
      "theme-4-title": 'Napoleón, ex "pequeño cabo"',
      "theme-4-desc": "Exploración de la historia compartida de las comunidades suburbanas.",
      "theme-5-title": "1870-71, 14-18, 39-45, 46-54, 54-62: números y lágrimas",
      "theme-5-desc": "Celebración de expresiones artísticas nacidas en barrios periféricos.",
      "theme-6-title": "Memorias familiares, campesinas y obreras del siglo pasado",
      "theme-6-desc": "Exploración de movimientos y flujos en el espacio urbano.",
      "theme-7-title": "El bestiario de los suburbios",
      "theme-7-desc": "Una mirada a los lazos sociales y las redes de apoyo en los suburbios.",
      "theme-8-title": "El impresionismo en los suburbios",
      "theme-8-desc": "Exploración de las mutaciones de los paisajes urbanos periféricos.",
      "theme-9-title": "Cuando los retratos componen el más bello adorno de los suburbios",
      "theme-9-desc": "Una mirada a los problemas ambientales en los barrios periféricos.",
      "theme-10-title": "Artes decorativas y muebles de arte",
      "theme-10-desc":
        "Reflexiones y proyecciones sobre el futuro de los barrios periféricos y su desarrollo sostenible.",
      "theme-11-title": "Tema 11",
      "theme-11-desc": "Descripción del tema 11.",

      // CTA
      "cta-title": "¿Listo para la edición 2026?",
      "cta-text": "No te pierdas la próxima edición de Trésors de Banlieues que promete ser aún más espectacular.",
      "cta-button": "Descubrir la edición 2026",

      // Footer
      "footer-title-1": "Trésors de Banlieues",
      "footer-text":
        "Una exposición de arte urbano que celebra la creatividad y la diversidad cultural de los suburbios.",
      "footer-links-title": "Enlaces Rápidos",
      "footer-link-1": "Exposición 2026",
      "footer-link-2": "Edición 2025",
      "footer-link-3": "Nuestro Equipo",
      "footer-contact": "Contacto",
      "footer-address-1": "Halle des Grésillons",
      "footer-address-2": "Place Indira Gandhi",
      "footer-address-3": "92230 Gennevilliers",
      "footer-email": "Email:",
      "footer-tel": "Tel: 01 23 45 67 89",
      "footer-copyright": "Todos los derechos reservados.",
    },
    ja: {
      // Navbar
      "nav-link-1": "2026年展示会",
      "nav-link-2": "2025年エディション",
      "nav-link-3": "私たちのチーム",

      // Hero section
      "hero-title": "2025年エディション",
      "hero-subtitle":
        "2025年2月15日から4月13日まで、「トレゾール・ド・バンリュー」は現代都市アートの特別な祭典に22,000人以上の訪問者を迎えました。",

      // Section Retour
      "section-title": "展示会レビュー",
      "section-text-1":
        "「トレゾール・ド・バンリュー」2025年エディションは、豊かで多様なプログラムを通じて、アーティスト、アート愛好家、好奇心旺盛な人々を集めた真の成功でした。2ヶ月間、私たちの展示スペースは、出会い、交流、芸術的発見の場に変わりました。",
      "section-text-2":
        "このエディションでは、都市、アイデンティティ、集合的記憶との関係を問いかける作品を通じて、現代都市アートの豊かさと多様性を強調しました。",

      // Stats
      "stat-label-1": "訪問者",
      "stat-label-2": "アーティスト",
      "stat-label-3": "日数",

      // Thématiques
      "themes-title": "11のテーマ",
      "themes-subtitle": "主要テーマを通じて展示会のさまざまな側面を発見する",

      // Thèmes individuels
      "theme-label": "テーマ",
      "theme-1-title": "郊外での子供時代",
      "theme-1-desc": "周辺地域での思い出と若者の経験の探求。",
      "theme-2-title": "社会的不平等の中心にある住宅と生活環境",
      "theme-2-desc": "都市環境で形成される複数のアイデンティティの探求。",
      "theme-3-title": "教会から大聖堂へ",
      "theme-3-desc": "郊外の住宅と生活条件に関する考察。",
      "theme-4-title": "ナポレオン、元「小さな伍長」",
      "theme-4-desc": "郊外コミュニティの共有された歴史の探求。",
      "theme-5-title": "1870-71、14-18、39-45、46-54、54-62：数字と涙",
      "theme-5-desc": "周辺地域で生まれた芸術表現の祝福。",
      "theme-6-title": "前世紀の家族、農民、労働者の記憶",
      "theme-6-desc": "都市空間における移動と流れの探求。",
      "theme-7-title": "郊外の動物誌",
      "theme-7-desc": "郊外の社会的つながりとサポートネットワークに関する考察。",
      "theme-8-title": "郊外の印象派",
      "theme-8-desc": "周辺都市景観の変化の探求。",
      "theme-9-title": "肖像画が郊外の最も美しい装飾を構成するとき",
      "theme-9-desc": "周辺地域の環境問題に関する考察。",
      "theme-10-title": "装飾芸術と芸術家具",
      "theme-10-desc": "周辺地域の未来とその持続可能な発展に関する考察と予測。",
      "theme-11-title": "テーマ11",
      "theme-11-desc": "テーマ11の説明。",

      // CTA
      "cta-title": "2026年エディションの準備はできていますか？",
      "cta-text":
        "さらに壮観になることが約束されている「トレゾール・ド・バンリュー」の次回エディションをお見逃しなく。",
      "cta-button": "2026年エディションを発見する",

      // Footer
      "footer-title-1": "トレゾール・ド・バンリュー",
      "footer-text": "郊外の創造性と文化的多様性を祝う都市アート展。",
      "footer-links-title": "クイックリンク",
      "footer-link-1": "2026年展示会",
      "footer-link-2": "2025年エディション",
      "footer-link-3": "私たちのチーム",
      "footer-contact": "お問い合わせ",
      "footer-address-1": "アル・デ・グレジヨン",
      "footer-address-2": "インディラ・ガンジー広場",
      "footer-address-3": "92230 ジュヌヴィリエ",
      "footer-email": "メール：",
      "footer-tel": "電話：01 23 45 67 89",
      "footer-copyright": "全著作権所有。",
    },
  }

  // Si la langue n'est pas dans notre dictionnaire, ne rien faire
  if (!translations[lang]) return

  // 1. Traduire la navbar
  const navLinks = document.querySelectorAll(".navbar-menu .nav-link")
  if (navLinks.length >= 1) navLinks[0].textContent = translations[lang]["nav-link-1"]
  if (navLinks.length >= 2) navLinks[1].textContent = translations[lang]["nav-link-2"]
  if (navLinks.length >= 3) navLinks[2].textContent = translations[lang]["nav-link-3"]

  // 2. Traduire la section hero
  const heroTitle = document.querySelector(".hero-title")
  const heroSubtitle = document.querySelector(".hero-subtitle")
  if (heroTitle) heroTitle.textContent = translations[lang]["hero-title"]
  if (heroSubtitle) heroSubtitle.textContent = translations[lang]["hero-subtitle"]

  // 3. Traduire les sections de contenu
  const sectionTitles = document.querySelectorAll(".section-title")
  sectionTitles.forEach((title) => {
    title.textContent = translations[lang]["section-title"]
  })

  const sectionTexts = document.querySelectorAll(".section-text")
  if (sectionTexts.length >= 1) sectionTexts[0].textContent = translations[lang]["section-text-1"]
  if (sectionTexts.length >= 2) sectionTexts[1].textContent = translations[lang]["section-text-2"]

  // 4. Traduire les statistiques
  const statLabels = document.querySelectorAll(".stat-label")
  if (statLabels.length >= 1) statLabels[0].textContent = translations[lang]["stat-label-1"]
  if (statLabels.length >= 2) statLabels[1].textContent = translations[lang]["stat-label-2"]
  if (statLabels.length >= 3) statLabels[2].textContent = translations[lang]["stat-label-3"]

  // 5. Traduire la section des thèmes
  const themesTitle = document.querySelector(".section.bg-beige-dark .section-title")
  const themesSubtitle = document.querySelector(".section.bg-beige-dark .section-text")
  if (themesTitle) themesTitle.textContent = translations[lang]["themes-title"]
  if (themesSubtitle) themesSubtitle.textContent = translations[lang]["themes-subtitle"]

  // 6. Traduire les thèmes individuels dans le slider
  const sliderItems = document.querySelectorAll(".slider .list .item")
  sliderItems.forEach((item, index) => {
    const themeNumber = index + 1
    const themeLabel = item.querySelector(".content p:first-child")
    const themeTitle = item.querySelector(".content h2")
    const themeDesc = item.querySelector(".content p:last-child")

    if (themeLabel) themeLabel.textContent = translations[lang]["theme-label"]
    if (themeTitle)
      themeTitle.textContent = translations[lang][`theme-${themeNumber}-title`] || translations[lang][`theme-11-title`]
    if (themeDesc)
      themeDesc.textContent = translations[lang][`theme-${themeNumber}-desc`] || translations[lang][`theme-11-desc`]
  })

  // 7. Traduire les miniatures du slider
  const thumbnailItems = document.querySelectorAll(".slider .thumbnail .item")
  thumbnailItems.forEach((item, index) => {
    const themeNumber = index + 1
    const themeTitle = item.querySelector(".content")

    if (themeTitle)
      themeTitle.textContent = translations[lang][`theme-${themeNumber}-title`] || translations[lang][`theme-11-title`]
  })

  // 8. Traduire la section CTA
  const ctaTitle = document.querySelector(".cta-title")
  const ctaText = document.querySelector(".cta-text")
  const ctaButton = document.querySelector(".btn-white")
  if (ctaTitle) ctaTitle.textContent = translations[lang]["cta-title"]
  if (ctaText) ctaText.textContent = translations[lang]["cta-text"]
  if (ctaButton) ctaButton.textContent = translations[lang]["cta-button"]

  // 9. Traduire le footer
  const footerTitle = document.querySelector(".footer-title")
  const footerText = document.querySelector(".footer-text")
  const footerLinksTitle = document.querySelector(".footer-links").previousElementSibling
  const footerLinks = document.querySelectorAll(".footer-link")
  const footerContact = document.querySelector(".footer-address").previousElementSibling
  const footerAddressItems = document.querySelectorAll(".footer-address p")
  const footerCopyright = document.querySelector(".footer-bottom p")

  if (footerTitle) footerTitle.textContent = translations[lang]["footer-title-1"]
  if (footerText) footerText.textContent = translations[lang]["footer-text"]
  if (footerLinksTitle) footerLinksTitle.textContent = translations[lang]["footer-links-title"]

  if (footerLinks.length >= 1) footerLinks[0].textContent = translations[lang]["footer-link-1"]
  if (footerLinks.length >= 2) footerLinks[1].textContent = translations[lang]["footer-link-2"]
  if (footerLinks.length >= 3) footerLinks[2].textContent = translations[lang]["footer-link-3"]

  if (footerContact) footerContact.textContent = translations[lang]["footer-contact"]

  if (footerAddressItems.length >= 1) footerAddressItems[0].textContent = translations[lang]["footer-address-1"]
  if (footerAddressItems.length >= 2) footerAddressItems[1].textContent = translations[lang]["footer-address-2"]
  if (footerAddressItems.length >= 3) footerAddressItems[2].textContent = translations[lang]["footer-address-3"]

  // Traiter l'email et le téléphone séparément car ils contiennent des balises
  if (footerAddressItems.length >= 4) {
    const emailText = footerAddressItems[3].textContent
    if (emailText.includes("Email")) {
      footerAddressItems[3].innerHTML = footerAddressItems[3].innerHTML.replace(
        "Email",
        translations[lang]["footer-email"],
      )
    }
  }

  if (footerAddressItems.length >= 5) {
    const telText = footerAddressItems[4].textContent
    if (telText.includes("Tél")) {
      footerAddressItems[4].textContent = translations[lang]["footer-tel"]
    }
  }

  if (footerCopyright) {
    const year = new Date().getFullYear()
    footerCopyright.innerHTML = `&copy; <span id="current-year">${year}</span> Trésors de Banlieues. ${translations[lang]["footer-copyright"]}`
  }

  // Effet visuel pour indiquer que la traduction est terminée
  document.body.style.transition = "opacity 0.3s ease"
  document.body.style.opacity = "0.5"
  setTimeout(() => {
    document.body.style.opacity = "1"
  }, 300)
}

