// Script spécifique pour la page équipe
document.addEventListener("DOMContentLoaded", () => {
  // Configuration du slider
  const slider = document.getElementById("team-slider")
  const prevBtn = document.getElementById("team-prev")
  const nextBtn = document.getElementById("team-next")
  const dotsContainer = document.getElementById("team-dots")

  if (!slider || !prevBtn || !nextBtn || !dotsContainer) return

  const cards = slider.querySelectorAll(".team-card")
  const cardCount = cards.length
  let currentPosition = 0
  let slidesToShow = getSlidesToShow()
  let maxPosition = Math.max(0, cardCount - slidesToShow)

  // Initialisation
  function init() {
    // Créer les points de navigation
    createDots()

    // Mettre à jour l'affichage initial
    updateSlider()

    // Ajouter les écouteurs d'événements
    prevBtn.addEventListener("click", goToPrev)
    nextBtn.addEventListener("click", goToNext)

    // Écouteur pour le redimensionnement de la fenêtre
    window.addEventListener("resize", handleResize)
  }

  // Créer les points de navigation
  function createDots() {
    dotsContainer.innerHTML = ""
    const totalDots = Math.ceil(cardCount / slidesToShow)

    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement("button")
      dot.classList.add("team-slider-dot")
      if (i === 0) dot.classList.add("active")
      dot.setAttribute("aria-label", `Groupe ${i + 1}`)
      dot.dataset.index = i

      dot.addEventListener("click", () => {
        goToSlide(i * slidesToShow)
      })

      dotsContainer.appendChild(dot)
    }
  }

  // Obtenir le nombre de slides à afficher en fonction de la largeur de l'écran
  function getSlidesToShow() {
    if (window.innerWidth >= 1024) return 3
    if (window.innerWidth >= 640) return 2
    return 1
  }

  // Gérer le redimensionnement de la fenêtre
  function handleResize() {
    const newSlidesToShow = getSlidesToShow()

    if (newSlidesToShow !== slidesToShow) {
      slidesToShow = newSlidesToShow
      maxPosition = Math.max(0, cardCount - slidesToShow)

      // Ajuster la position actuelle si nécessaire
      if (currentPosition > maxPosition) {
        currentPosition = maxPosition
      }

      // Recréer les points de navigation
      createDots()

      // Mettre à jour l'affichage
      updateSlider()
    }
  }

  // Mettre à jour l'affichage du slider
  function updateSlider() {
    // Calculer le pourcentage de déplacement
    const translateValue = -(currentPosition * (100 / slidesToShow))
    slider.style.transform = `translateX(${translateValue}%)`

    // Mettre à jour l'état des boutons
    prevBtn.disabled = currentPosition <= 0
    nextBtn.disabled = currentPosition >= maxPosition

    // Mettre à jour les points actifs
    updateDots()
  }

  // Mettre à jour les points de navigation
  function updateDots() {
    const dots = dotsContainer.querySelectorAll(".team-slider-dot")
    const activeDotIndex = Math.floor(currentPosition / slidesToShow)

    dots.forEach((dot, index) => {
      if (index === activeDotIndex) {
        dot.classList.add("active")
      } else {
        dot.classList.remove("active")
      }
    })
  }

  // Aller au slide précédent
  function goToPrev() {
    if (currentPosition > 0) {
      currentPosition--
      updateSlider()
    }
  }

  // Aller au slide suivant
  function goToNext() {
    if (currentPosition < maxPosition) {
      currentPosition++
      updateSlider()
    }
  }

  // Aller à un slide spécifique
  function goToSlide(position) {
    currentPosition = Math.max(0, Math.min(position, maxPosition))
    updateSlider()
  }

  // Effet d'agrandissement au survol
  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      // Réduire légèrement les autres cartes
      cards.forEach((c) => {
        if (c !== card) {
          c.style.transform = "scale(0.95)"
          c.style.opacity = "0.8"
        }
      })
    })

    card.addEventListener("mouseleave", () => {
      // Restaurer toutes les cartes
      cards.forEach((c) => {
        c.style.transform = ""
        c.style.opacity = ""
      })
    })
  })

  // Initialiser le slider
  init()

  // Animation des cartes d'équipe au scroll
  const teamCards = document.querySelectorAll(".team-card")

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  teamCards.forEach((card) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    observer.observe(card)
  })

  // Effet de survol amélioré pour les cartes
  teamCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      // Ajouter un effet de lumière plus prononcé
      const imageOverlay = card.querySelector(".team-card-image::before")
      if (imageOverlay) {
        imageOverlay.style.opacity = "1"
      }
    })

    card.addEventListener("mouseleave", () => {
      // Réduire l'effet de lumière
      const imageOverlay = card.querySelector(".team-card-image::before")
      if (imageOverlay) {
        imageOverlay.style.opacity = "0.7"
      }
    })
  })

  // Animation des icônes de valeurs
  const valueIcons = document.querySelectorAll(".value-icon")

  valueIcons.forEach((icon) => {
    icon.addEventListener("mouseenter", () => {
      icon.style.transform = "scale(1.1) rotate(5deg)"
    })

    icon.addEventListener("mouseleave", () => {
      icon.style.transform = "scale(1) rotate(0deg)"
    })
  })

  // Initialiser le widget de traduction
  initTranslationWidget()
})

// Widget de traduction - Code simplifié
function initTranslationWidget() {
  // Ajouter le widget de traduction à la navbar s'il n'existe pas déjà
  const navbarMenu = document.querySelector(".navbar-menu")
  if (!navbarMenu.querySelector(".translation-widget")) {
    const translationWidget = document.createElement("div")
    translationWidget.className = "translation-widget"
    translationWidget.innerHTML = `
    <div class="planet">
      <div class="orbit">
        <div class="satellite"></div>
      </div>
    </div>
    <div class="language-options">
      <div class="language-option" data-lang="fr">
        <img src="https://flagcdn.com/w20/fr.png" alt="Français">
        <span>Français</span>
      </div>
      <div class="language-option" data-lang="en">
        <img src="https://flagcdn.com/w20/gb.png" alt="English">
        <span>English</span>
      </div>
      <div class="language-option" data-lang="es">
        <img src="https://flagcdn.com/w20/es.png" alt="Español">
        <span>Español</span>
      </div>
      <div class="language-option" data-lang="ja">
        <img src="https://flagcdn.com/w20/jp.png" alt="日本語">
        <span>日本語</span>
      </div>
    </div>
  `
    navbarMenu.appendChild(translationWidget)
  }

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
    translateEquipePage(lang)

    // Retirer l'indicateur de chargement
    document.body.removeChild(loadingIndicator)

    // Mettre à jour l'attribut lang de la page
    document.documentElement.lang = lang
  }, 1000)
}

// Fonction pour traduire la page équipe - COMPLÈTE ET INDÉPENDANTE
function translateEquipePage(lang) {
  // Dictionnaire de traduction pour la page équipe
  const translations = {
    fr: {
      // Navbar
      "nav-link-1": "Exposition 2026",
      "nav-link-2": "Édition 2025",
      "nav-link-3": "Notre Équipe",

      // Hero section
      "hero-title": "Notre Équipe",
      "hero-subtitle": "Découvrez les passionnés qui donnent vie à Trésors de Banlieues",

      // Team section
      "team-subtitle": "L'équipe derrière le projet",
      "team-title": "Collaborer avec les meilleurs talents",
      "team-description":
        "Notre équipe est composée de professionnels passionnés par l'art urbain et engagés dans la valorisation des talents des banlieues françaises.",

      // Team members
      "team-role-1": "Directrice Artistique",
      "team-role-2": "Commissaire d'Exposition",
      "team-role-3": "Responsable Communication",
      "team-role-4": "Coordinateur des Artistes",
      "team-role-5": "Responsable Logistique",
      "team-role-6": "Directeur des Partenariats",
      
      // Team member descriptions
      "team-desc-1": "Avec plus de 15 ans d'expérience dans le domaine de l'art contemporain, Sophie apporte sa vision unique et son expertise pour sélectionner les œuvres et créer une expérience immersive pour les visiteurs.",
      "team-desc-2": "Historien d'art spécialisé dans l'art urbain, Thomas conçoit le parcours de l'exposition et veille à la cohérence du propos artistique. Il est également l'auteur de plusieurs ouvrages sur le street art.",
      "team-desc-3": "Spécialiste des médias sociaux et de la communication culturelle, Amina gère la stratégie de communication de l'exposition et assure la visibilité du projet auprès du public et des médias.",
      "team-desc-4": "Ancien graffeur reconverti dans la médiation culturelle, Lucas fait le lien entre les artistes et l'équipe d'organisation. Il accompagne les créateurs tout au long du processus de création.",
      "team-desc-5": "Experte en gestion d'événements culturels, Julie coordonne tous les aspects logistiques de l'exposition, de la scénographie à l'accueil du public, en passant par la sécurité des œuvres.",
      "team-desc-6": "Avec son réseau étendu dans le monde culturel et entrepreneurial, Marc développe les partenariats stratégiques qui permettent à l'exposition de rayonner et de se développer chaque année.",

      // Values section
      "values-title": "Nos Valeurs",
      "values-subtitle": "Les principes qui guident notre travail et notre vision",
      "value-title-1": "Créativité",
      "value-desc-1":
        "Nous encourageons l'expression artistique sous toutes ses formes et valorisons l'innovation dans l'art urbain contemporain.",
      "value-title-2": "Inclusion",
      "value-desc-2":
        "Nous croyons en la diversité des voix et des perspectives, et nous nous engageons à créer un espace accessible à tous.",
      "value-title-3": "Communauté",
      "value-desc-3":
        "Nous travaillons en étroite collaboration avec les communautés locales pour créer des liens durables et significatifs à travers l'art.",

      // CTA
      "cta-title": "Rejoignez l'aventure",
      "cta-text": "Vous souhaitez collaborer avec notre équipe ou en savoir plus sur nos projets ?",
      "cta-button": "Rencontrer-nous",

      // Footer
      "footer-title": "Trésors de Banlieues",
      "footer-text": "Une exposition d'art urbain célébrant la créativité et la diversité culturelle des banlieues.",
      "footer-links-title": "Liens Rapides",
      "footer-link-1": "Exposition 2026",
      "footer-link-2": "Édition 2025",
      "footer-link-3": "Notre Équipe",
      "footer-contact": "Contact",
      "footer-address-1": "Centre d'Art Contemporain",
      "footer-address-2": "15 Avenue des Arts",
      "footer-address-3": "91190 Paris-Saclay",
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
      "hero-title": "Our Team",
      "hero-subtitle": "Discover the passionate people who bring Trésors de Banlieues to life",

      // Team section
      "team-subtitle": "The team behind the project",
      "team-title": "Collaborating with the best talents",
      "team-description":
        "Our team is composed of professionals passionate about urban art and committed to promoting the talents of French suburbs.",

      // Team members
      "team-role-1": "Artistic Director",
      "team-role-2": "Exhibition Curator",
      "team-role-3": "Communications Manager",
      "team-role-4": "Artists Coordinator",
      "team-role-5": "Logistics Manager",
      "team-role-6": "Partnerships Director",
      
      // Team member descriptions
      "team-desc-1": "With over 15 years of experience in contemporary art, Sophie brings her unique vision and expertise to select works and create an immersive experience for visitors.",
      "team-desc-2": "An art historian specializing in urban art, Thomas designs the exhibition path and ensures the coherence of the artistic message. He is also the author of several books on street art.",
      "team-desc-3": "A specialist in social media and cultural communication, Amina manages the exhibition's communication strategy and ensures the project's visibility to the public and media.",
      "team-desc-4": "A former graffiti artist who converted to cultural mediation, Lucas connects artists with the organizing team. He accompanies creators throughout the creation process.",
      "team-desc-5": "An expert in cultural event management, Julie coordinates all logistical aspects of the exhibition, from scenography to visitor reception and artwork security.",
      "team-desc-6": "With his extensive network in the cultural and entrepreneurial world, Marc develops strategic partnerships that allow the exhibition to shine and develop each year.",

      // Values section
      "values-title": "Our Values",
      "values-subtitle": "The principles that guide our work and vision",
      "value-title-1": "Creativity",
      "value-desc-1":
        "We encourage artistic expression in all its forms and value innovation in contemporary urban art.",
      "value-title-2": "Inclusion",
      "value-desc-2":
        "We believe in the diversity of voices and perspectives, and we are committed to creating a space accessible to all.",
      "value-title-3": "Community",
      "value-desc-3":
        "We work closely with local communities to create lasting and meaningful connections through art.",

      // CTA
      "cta-title": "Join the adventure",
      "cta-text": "Would you like to collaborate with our team or learn more about our projects?",
      "cta-button": "Meet us",

      // Footer
      "footer-title": "Trésors de Banlieues",
      "footer-text": "An urban art exhibition celebrating the creativity and cultural diversity of the suburbs.",
      "footer-links-title": "Quick Links",
      "footer-link-1": "2026 Exhibition",
      "footer-link-2": "2025 Edition",
      "footer-link-3": "Our Team",
      "footer-contact": "Contact",
      "footer-address-1": "Contemporary Art Center",
      "footer-address-2": "15 Avenue des Arts",
      "footer-address-3": "91190 Paris-Saclay",
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
      "hero-title": "Nuestro Equipo",
      "hero-subtitle": "Descubra a las personas apasionadas que dan vida a Trésors de Banlieues",

      // Team section
      "team-subtitle": "El equipo detrás del proyecto",
      "team-title": "Colaborando con los mejores talentos",
      "team-description":
        "Nuestro equipo está compuesto por profesionales apasionados por el arte urbano y comprometidos con la promoción de los talentos de los suburbios franceses.",

      // Team members
      "team-role-1": "Directora Artística",
      "team-role-2": "Comisario de Exposición",
      "team-role-3": "Responsable de Comunicación",
      "team-role-4": "Coordinador de Artistas",
      "team-role-5": "Responsable de Logística",
      "team-role-6": "Director de Alianzas",
      
      // Team member descriptions
      "team-desc-1": "Con más de 15 años de experiencia en arte contemporáneo, Sophie aporta su visión única y experiencia para seleccionar obras y crear una experiencia inmersiva para los visitantes.",
      "team-desc-2": "Historiador de arte especializado en arte urbano, Thomas diseña el recorrido de la exposición y asegura la coherencia del mensaje artístico. También es autor de varios libros sobre arte callejero.",
      "team-desc-3": "Especialista en redes sociales y comunicación cultural, Amina gestiona la estrategia de comunicación de la exposición y asegura la visibilidad del proyecto ante el público y los medios.",
      "team-desc-4": "Antiguo grafitero reconvertido en mediador cultural, Lucas conecta a los artistas con el equipo organizador. Acompaña a los creadores durante todo el proceso de creación.",
      "team-desc-5": "Experta en gestión de eventos culturales, Julie coordina todos los aspectos logísticos de la exposición, desde la escenografía hasta la recepción de visitantes y la seguridad de las obras.",
      "team-desc-6": "Con su extensa red en el mundo cultural y empresarial, Marc desarrolla alianzas estratégicas que permiten que la exposición brille y se desarrolle cada año.",

      // Values section
      "values-title": "Nuestros Valores",
      "values-subtitle": "Los principios que guían nuestro trabajo y visión",
      "value-title-1": "Creatividad",
      "value-desc-1":
        "Fomentamos la expresión artística en todas sus formas y valoramos la innovación en el arte urbano contemporáneo.",
      "value-title-2": "Inclusión",
      "value-desc-2":
        "Creemos en la diversidad de voces y perspectivas, y nos comprometemos a crear un espacio accesible para todos.",
      "value-title-3": "Comunidad",
      "value-desc-3":
        "Trabajamos estrechamente con las comunidades locales para crear conexiones duraderas y significativas a través del arte.",

      // CTA
      "cta-title": "Únete a la aventura",
      "cta-text": "¿Te gustaría colaborar con nuestro equipo o saber más sobre nuestros proyectos?",
      "cta-button": "Conócenos",

      // Footer
      "footer-title": "Trésors de Banlieues",
      "footer-text":
        "Una exposición de arte urbano que celebra la creatividad y la diversidad cultural de los suburbios.",
      "footer-links-title": "Enlaces Rápidos",
      "footer-link-1": "Exposición 2026",
      "footer-link-2": "Edición 2025",
      "footer-link-3": "Nuestro Equipo",
      "footer-contact": "Contacto",
      "footer-address-1": "Centro de Arte Contemporáneo",
      "footer-address-2": "15 Avenue des Arts",
      "footer-address-3": "91190 Paris-Saclay",
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
      "hero-title": "私たちのチーム",
      "hero-subtitle": "トレゾール・ド・バンリューに命を吹き込む情熱的な人々をご紹介します",

      // Team section
      "team-subtitle": "プロジェクトの背後にあるチーム",
      "team-title": "最高の才能との協力",
      "team-description":
        "私たちのチームは、都市アートに情熱を持ち、フランスの郊外の才能を促進することに尽力しているプロフェッショナルで構成されています。",

      // Team members
      "team-role-1": "アート・ディレクター",
      "team-role-2": "展示会キュレーター",
      "team-role-3": "コミュニケーション責任者",
      "team-role-4": "アーティスト・コーディネーター",
      "team-role-5": "物流責任者",
      "team-role-6": "パートナーシップ・ディレクター",
      
      // Team member descriptions
      "team-desc-1": "現代アートの分野で15年以上の経験を持つソフィーは、作品を選び、訪問者のために没入型の体験を作り出すために、彼女のユニークなビジョンと専門知識をもたらします。",
      "team-desc-2": "都市アートを専門とする美術史家のトーマスは、展示会のパスをデザインし、芸術的メッセージの一貫性を確保します。彼はまた、ストリートアートに関する複数の書籍の著者でもあります。",
      "team-desc-3": "ソーシャルメディアと文化的コミュニケーションの専門家であるアミナは、展示会のコミュニケーション戦略を管理し、プロジェクトの公共とメディアへの可視性を確保します。",
      "team-desc-4": "文化的仲介に転向した元グラフィティアーティストのルーカスは、アーティストと組織チームをつなぎます。彼は創作プロセス全体を通じてクリエイターに同行します。",
      "team-desc-5": "文化イベント管理の専門家であるジュリーは、舞台設計から訪問者の受け入れ、作品のセキュリティまで、展示会のすべての物流面を調整します。",
      "team-desc-6": "文化的および起業家的世界での広範なネットワークを持つマークは、展示会が輝き、毎年発展することを可能にする戦略的パートナーシップを開発します。",

      // Values section
      "values-title": "私たちの価値観",
      "values-subtitle": "私たちの仕事とビジョンを導く原則",
      "value-title-1": "創造性",
      "value-desc-1": "私たちはあらゆる形での芸術表現を奨励し、現代都市アートにおけるイノベーションを重視しています。",
      "value-title-2": "包括性",
      "value-desc-2": "私たちは声と視点の多様性を信じ、すべての人がアクセスできる空間を作ることに取り組んでいます。",
      "value-title-3": "コミュニティ",
      "value-desc-3": "私たちは地域社会と密接に協力して、アートを通じて永続的で意味のあるつながりを作り出しています。",

      // CTA
      "cta-title": "冒険に参加しましょう",
      "cta-text": "私たちのチームと協力したり、プロジェクトについてもっと知りたいですか？",
      "cta-button": "私たちに会う",

      // Footer
      "footer-title": "トレゾール・ド・バンリュー",
      "footer-text": "郊外の創造性と文化的多様性を祝う都市アート展。",
      "footer-links-title": "クイックリンク",
      "footer-link-1": "2026年展示会",
      "footer-link-2": "2025年エディション",
      "footer-link-3": "私たちのチーム",
      "footer-contact": "お問い合わせ",
      "footer-address-1": "現代アートセンター",
      "footer-address-2": "アート通り15番地",
      "footer-address-3": "91190 パリ・サクレー",
      "footer-email": "メール：",
      "footer-tel": "電話：01 23 45 67 89",
      "footer-copyright": "全著作権所有。",
    },
  }

  // Si la langue n'est pas dans notre dictionnaire, ne rien faire
  if (!translations[lang]) return

  // 1. Traduire la navbar
  
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

  // 3. Traduire la section équipe
  const teamSubtitle = document.querySelector(".team-subtitle")
  const teamTitle = document.querySelector(".team-title")
  const teamDescription = document.querySelector(".team-description")
  if (teamSubtitle) teamSubtitle.textContent = translations[lang]["team-subtitle"]
  if (teamTitle) teamTitle.textContent = translations[lang]["team-title"]
  if (teamDescription) teamDescription.textContent = translations[lang]["team-description"]

  // 4. Traduire les rôles et descriptions des membres de l'équipe
  const teamRoles = document.querySelectorAll(".team-card-role")
  const teamDescs = document.querySelectorAll(".team-card-description")
  
  teamRoles.forEach((role, index) => {
    const roleKey = `team-role-${index + 1}`
    if (translations[lang][roleKey]) {
      role.textContent = translations[lang][roleKey]
    }
  })
  
  teamDescs.forEach((desc, index) => {
    const descKey = `team-desc-${index + 1}`
    if (translations[lang][descKey]) {
      desc.textContent = translations[lang][descKey]
    }
  })

  // 5. Traduire la section valeurs
  const valuesTitle = document.querySelector(".values-section .section-title")
  const valuesSubtitle = document.querySelector(".values-section .section-text")
  if (valuesTitle) valuesTitle.textContent = translations[lang]["values-title"]
  if (valuesSubtitle) valuesSubtitle.textContent = translations[lang]["values-subtitle"]

  const valueTitles = document.querySelectorAll(".value-title")
  const valueDescriptions = document.querySelectorAll(".value-description")

  for (let i = 0; i < valueTitles.length; i++) {
    const titleKey = `value-title-${i + 1}`
    const descKey = `value-desc-${i + 1}`

    if (translations[lang][titleKey]) {
      valueTitles[i].textContent = translations[lang][titleKey]
    }

    if (translations[lang][descKey]) {
      valueDescriptions[i].textContent = translations[lang][descKey]
    }
  }

  // 6. Traduire la section CTA
  const ctaTitle = document.querySelector(".cta-title")
  const ctaText = document.querySelector(".cta-text")
  const ctaButton = document.querySelector(".cta-buttons .btn-white")

  if (ctaTitle) ctaTitle.textContent = translations[lang]["cta-title"]
  if (ctaText) ctaText.textContent = translations[lang]["cta-text"]
  if (ctaButton) ctaButton.textContent = translations[lang]["cta-button"]

  // 7. Traduire le footer
  const footerTitle = document.querySelector(".footer-title")
  const footerText = document.querySelector(".footer-text")
  const footerLinksTitle = document.querySelector(".footer-links").previousElementSibling
  const footerLinks = document.querySelectorAll(".footer-link")
  const footerContact = document.querySelector(".footer-address").previousElementSibling
  const footerAddressItems = document.querySelectorAll(".footer-address p")
  const footerCopyright = document.querySelector(".footer-bottom p")

  if (footerTitle) footerTitle.textContent = translations[lang]["footer-title"]
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
        translations[lang]["footer-email"]
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