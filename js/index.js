// Script spécifique à la page d'accueil (index.html)
document.addEventListener("DOMContentLoaded", () => {
  // Testimonials slider avec autoplay
  const testimonialSlider = document.getElementById("testimonials-slider")

  if (testimonialSlider) {
    const slides = testimonialSlider.querySelectorAll(".testimonial-slide")
    const dots = testimonialSlider.querySelectorAll(".dot")
    const prevBtn = testimonialSlider.querySelector(".prev")
    const nextBtn = testimonialSlider.querySelector(".next")
    let currentIndex = 0
    let isAnimating = false
    let autoplayInterval

    // Initialize slider
    function showSlide(index) {
      if (isAnimating) return
      isAnimating = true

      // Hide current slide
      slides[currentIndex].classList.remove("active")
      dots[currentIndex].classList.remove("active")

      // Show new slide
      currentIndex = index
      slides[currentIndex].classList.add("active")
      dots[currentIndex].classList.add("active")

      setTimeout(() => {
        isAnimating = false
      }, 600)
    }

    // Event listeners for dots
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        showSlide(index)
        resetAutoplay() // Réinitialiser l'autoplay après un clic
      })
    })

    // Event listeners for arrows
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        let newIndex = currentIndex - 1
        if (newIndex < 0) newIndex = slides.length - 1
        showSlide(newIndex)
        resetAutoplay() // Réinitialiser l'autoplay après un clic
      })
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        let newIndex = currentIndex + 1
        if (newIndex >= slides.length) newIndex = 0
        showSlide(newIndex)
        resetAutoplay() // Réinitialiser l'autoplay après un clic
      })
    }

    // Autoplay function
    function startAutoplay() {
      autoplayInterval = setInterval(() => {
        let newIndex = currentIndex + 1
        if (newIndex >= slides.length) newIndex = 0
        showSlide(newIndex)
      }, 5000) // Change slide every 5 seconds
    }

    // Reset autoplay
    function resetAutoplay() {
      clearInterval(autoplayInterval)
      startAutoplay()
    }

    // Start autoplay on page load
    startAutoplay()

    // Pause autoplay when hovering over the slider
    testimonialSlider.addEventListener("mouseenter", () => {
      clearInterval(autoplayInterval)
    })

    // Resume autoplay when mouse leaves the slider
    testimonialSlider.addEventListener("mouseleave", () => {
      startAutoplay()
    })
  }

  // Nouveau slider pour la Halle des Grésillons
  const fullWidthSlider = document.getElementById("full-width-slider")

  if (fullWidthSlider) {
    const slides = fullWidthSlider.querySelectorAll(".full-width-slide")
    const slidesContainer = fullWidthSlider.querySelector(".full-width-slides")
    const dots = document.querySelectorAll(".full-width-dot")
    const prevBtn = fullWidthSlider.querySelector(".prev")
    const nextBtn = fullWidthSlider.querySelector(".next")
    let currentIndex = 0
    let isAnimating = false
    let autoplayInterval

    // Initialize slider
    function showSlide(index) {
      if (isAnimating) return
      isAnimating = true

      // Update current index
      currentIndex = index

      // Update slides position
      slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`

      // Update dots
      dots.forEach((dot, i) => {
        if (i === currentIndex) {
          dot.classList.add("active")
        } else {
          dot.classList.remove("active")
        }
      })

      setTimeout(() => {
        isAnimating = false
      }, 500)
    }

    // Event listeners for dots
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        showSlide(index)
        resetAutoplay()
      })
    })

    // Event listeners for arrows
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        let newIndex = currentIndex - 1
        if (newIndex < 0) newIndex = slides.length - 1
        showSlide(newIndex)
        resetAutoplay()
      })
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        let newIndex = currentIndex + 1
        if (newIndex >= slides.length) newIndex = 0
        showSlide(newIndex)
        resetAutoplay()
      })
    }

    // Autoplay function
    function startAutoplay() {
      autoplayInterval = setInterval(() => {
        let newIndex = currentIndex + 1
        if (newIndex >= slides.length) newIndex = 0
        showSlide(newIndex)
      }, 4000) // Change slide every 4 seconds
    }

    // Reset autoplay
    function resetAutoplay() {
      clearInterval(autoplayInterval)
      startAutoplay()
    }

    // Start autoplay on page load
    startAutoplay()

    // Pause autoplay when hovering over the slider
    fullWidthSlider.addEventListener("mouseenter", () => {
      clearInterval(autoplayInterval)
    })

    // Resume autoplay when mouse leaves the slider
    fullWidthSlider.addEventListener("mouseleave", () => {
      startAutoplay()
    })
  }

  // Initialiser le widget de traduction
  initTranslationWidget()
})

// Widget de traduction - Code simplifié
function initTranslationWidget() {
  // Ajouter le widget de traduction à la navbar s'il n'existe pas déjà
  const navbarMenu = document.querySelector(".navbar-menu");
  if (!navbarMenu.querySelector(".translation-widget")) {
    const translationWidget = document.createElement("div");
    translationWidget.className = "translation-widget";
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
    `;
    navbarMenu.appendChild(translationWidget);
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
    translateIndexPage(lang)

    // Retirer l'indicateur de chargement
    document.body.removeChild(loadingIndicator)

    // Mettre à jour l'attribut lang de la page
    document.documentElement.lang = lang
  }, 1000)
}

// Fonction pour traduire la page d'accueil - COMPLÈTE ET INDÉPENDANTE
function translateIndexPage(lang) {
  // Dictionnaire de traduction pour la page d'accueil
  const translations = {
    'fr': {
      // Navbar
      'nav-link-1': 'Exposition 2026',
      'nav-link-2': 'Édition 2025',
      'nav-link-3': 'Notre Équipe',
      
      // Hero section
      'hero-title': 'Trésors de Banlieues 2026',
      'hero-subtitle': 'Du 15 Mars au 15 Juin 2026, découvrez la nouvelle édition des Trésors de Banlieues au cœur de Gennevilliers.',
      'hero-button': 'Découvrir l\'exposition',
      
      // Section Exposition
      'about-title': 'L\'Exposition',
      'about-text-1': 'Trésors de Banlieues est une exposition d\'art urbain qui célèbre la créativité et la diversité culturelle des banlieues françaises. Pour sa nouvelle édition 2026, l\'exposition prend une nouvelle dimension avec un espace de plus de 2000m² dédié à l\'art contemporain urbain.',
      'about-text-2': 'Cette année, nous mettons à l\'honneur les artistes émergents qui transforment nos paysages urbains en véritables galeries à ciel ouvert. Graffitis, street art, installations, photographies et performances vous attendent pour une expérience immersive unique.',
      'about-button': 'Voir l\'édition précédente',
      
      // Section Halle
      'halle-title': 'Découvrez la Halle des Grésillons',
      'halle-subtitle': 'Un espace exceptionnel pour une exposition d\'exception',
      
      // Section Lieu
      'location-title': 'Nouveau Lieu',
      'location-card-title': 'Gennevilliers',
      'location-address-title': 'Halle des Grésillons<br>Place Indira Gandhi<br>92230 Gennevilliers',
      'location-hours-title': 'Horaires:',
      'location-hours-text': 'Du mardi au dimanche: 10h - 19h<br>Nocturne le jeudi jusqu\'à 21h',
      'location-contact-title': 'Contact:',
      'location-contact-text': 'Tél: 01 23 45 67 89<br>Email:',
      
      // Section Halle détaillée
      'halle-detail-title': 'La Halle des Grésillons',
      'halle-detail-text-1': 'Située au cœur de Gennevilliers, la Halle des Grésillons est un espace culturel polyvalent qui accueillera l\'édition 2026 des Trésors de Banlieues. Cet ancien bâtiment industriel réhabilité offre une surface d\'exposition exceptionnelle de plus de 2000m².',
      'halle-detail-text-2': 'Avec son architecture caractéristique mêlant structures métalliques et grandes verrières, la Halle des Grésillons constitue un écrin idéal pour mettre en valeur les œuvres d\'art urbain. Sa configuration permet de créer des parcours immersifs et des espaces thématiques variés.',
      'halle-detail-text-3': 'Facilement accessible en transports en commun (RER C, Tramway T1), la Halle des Grésillons s\'inscrit dans une démarche de démocratisation culturelle, au plus près des habitants des quartiers populaires.',
      
      // Section Pré-inscription
      'registration-title': 'Pré-inscription',
      'registration-text': 'Inscrivez-vous dès maintenant pour recevoir une invitation à l\'inauguration de l\'exposition et bénéficier d\'un accès prioritaire.',
      'registration-name': 'Nom',
      'registration-email': 'Email',
      'registration-date': 'Date de visite souhaitée',
      'registration-date-select': 'Sélectionnez une période',
      'registration-date-march': 'Mars 2026',
      'registration-date-april': 'Avril 2026',
      'registration-date-may': 'Mai 2026',
      'registration-date-june': 'Juin 2026',
      'registration-button': 'S\'inscrire',
      
      // Section Témoignages
      'testimonials-title': 'Témoignages',
      'testimonials-subtitle': 'Découvrez ce que nos visiteurs ont pensé de l\'édition 2025',
      'testimonial-visitor': 'Visiteuse',
      'testimonial-art-lover': 'Amateur d\'art',
      'testimonial-teacher': 'Enseignante',
      
      // CTA
      'cta-title': 'Rejoignez l\'aventure Trésors de Banlieues',
      'cta-text': 'Découvrez l\'art urbain sous un nouveau jour et participez à cette célébration de la créativité contemporaine.',
      'cta-button': 'Rencontrer notre équipe',
      
      // Footer
      'footer-title': 'Trésors de Banlieues',
      'footer-text': 'Une exposition d\'art urbain célébrant la créativité et la diversité culturelle des banlieues.',
      'footer-links-title': 'Liens Rapides',
      'footer-link-1': 'Exposition 2026',
      'footer-link-2': 'Édition 2025',
      'footer-link-3': 'Notre Équipe',
      'footer-contact': 'Contact',
      'footer-address-1': 'Centre d\'Art Contemporain',
      'footer-address-2': '15 Avenue des Arts',
      'footer-address-3': '91190 Paris-Saclay',
      'footer-email': 'Email:',
      'footer-tel': 'Tél: 01 23 45 67 89',
      'footer-copyright': 'Tous droits réservés.'
    },
    'en': {
      // Navbar
      'nav-link-1': '2026 Exhibition',
      'nav-link-2': '2025 Edition',
      'nav-link-3': 'Our Team',
      
      // Hero section
      'hero-title': 'Trésors de Banlieues 2026',
      'hero-subtitle': 'From March 15 to June 15, 2026, discover the new edition of Trésors de Banlieues in the heart of Gennevilliers.',
      'hero-button': 'Discover the exhibition',
      
      // Section Exposition
      'about-title': 'The Exhibition',
      'about-text-1': 'Trésors de Banlieues is an urban art exhibition that celebrates the creativity and cultural diversity of French suburbs. For its new 2026 edition, the exhibition takes on a new dimension with a space of over 2000m² dedicated to contemporary urban art.',
      'about-text-2': 'This year, we are highlighting emerging artists who transform our urban landscapes into real open-air galleries. Graffiti, street art, installations, photographs and performances await you for a unique immersive experience.',
      'about-button': 'See previous edition',
      
      // Section Halle
      'halle-title': 'Discover the Halle des Grésillons',
      'halle-subtitle': 'An exceptional space for an exceptional exhibition',
      
      // Section Lieu
      'location-title': 'New Location',
      'location-card-title': 'Gennevilliers',
      'location-address-title': 'Halle des Grésillons<br>Place Indira Gandhi<br>92230 Gennevilliers',
      'location-hours-title': 'Hours:',
      'location-hours-text': 'Tuesday to Sunday: 10am - 7pm<br>Late night Thursday until 9pm',
      'location-contact-title': 'Contact:',
      'location-contact-text': 'Phone: 01 23 45 67 89<br>Email:',
      
      // Section Halle détaillée
      'halle-detail-title': 'The Halle des Grésillons',
      'halle-detail-text-1': 'Located in the heart of Gennevilliers, the Halle des Grésillons is a multipurpose cultural space that will host the 2026 edition of Trésors de Banlieues. This rehabilitated former industrial building offers an exceptional exhibition area of more than 2000m².',
      'halle-detail-text-2': 'With its characteristic architecture mixing metal structures and large glass roofs, the Halle des Grésillons is an ideal setting to showcase urban art works. Its configuration allows for the creation of immersive paths and varied thematic spaces.',
      'halle-detail-text-3': 'Easily accessible by public transport (RER C, Tramway T1), the Halle des Grésillons is part of a cultural democratization approach, close to the inhabitants of popular neighborhoods.',
      
      // Section Pré-inscription
      'registration-title': 'Pre-registration',
      'registration-text': 'Register now to receive an invitation to the exhibition opening and benefit from priority access.',
      'registration-name': 'Name',
      'registration-email': 'Email',
      'registration-date': 'Preferred visit date',
      'registration-date-select': 'Select a period',
      'registration-date-march': 'March 2026',
      'registration-date-april': 'April 2026',
      'registration-date-may': 'May 2026',
      'registration-date-june': 'June 2026',
      'registration-button': 'Register',
      
      // Section Témoignages
      'testimonials-title': 'Testimonials',
      'testimonials-subtitle': 'Discover what our visitors thought of the 2025 edition',
      'testimonial-visitor': 'Visitor',
      'testimonial-art-lover': 'Art lover',
      'testimonial-teacher': 'Teacher',
      
      // CTA
      'cta-title': 'Join the Trésors de Banlieues adventure',
      'cta-text': 'Discover urban art in a new light and participate in this celebration of contemporary creativity.',
      'cta-button': 'Meet our team',
      
      // Footer
      'footer-title': 'Trésors de Banlieues',
      'footer-text': 'An urban art exhibition celebrating the creativity and cultural diversity of the suburbs.',
      'footer-links-title': 'Quick Links',
      'footer-link-1': '2026 Exhibition',
      'footer-link-2': '2025 Edition',
      'footer-link-3': 'Our Team',
      'footer-contact': 'Contact',
      'footer-address-1': 'Contemporary Art Center',
      'footer-address-2': '15 Avenue des Arts',
      'footer-address-3': '91190 Paris-Saclay',
      'footer-email': 'Email:',
      'footer-tel': 'Phone: 01 23 45 67 89',
      'footer-copyright': 'All rights reserved.'
    },
    'es': {
      // Navbar
      'nav-link-1': 'Exposición 2026',
      'nav-link-2': 'Edición 2025',
      'nav-link-3': 'Nuestro Equipo',
      
      // Hero section
      'hero-title': 'Trésors de Banlieues 2026',
      'hero-subtitle': 'Del 15 de marzo al 15 de junio de 2026, descubra la nueva edición de Trésors de Banlieues en el corazón de Gennevilliers.',
      'hero-button': 'Descubrir la exposición',
      
      // Section Exposition
      'about-title': 'La Exposición',
      'about-text-1': 'Trésors de Banlieues es una exposición de arte urbano que celebra la creatividad y la diversidad cultural de los suburbios franceses. Para su nueva edición 2026, la exposición adquiere una nueva dimensión con un espacio de más de 2000m² dedicado al arte urbano contemporáneo.',
      'about-text-2': 'Este año, destacamos a los artistas emergentes que transforman nuestros paisajes urbanos en verdaderas galerías al aire libre. Graffiti, arte callejero, instalaciones, fotografías y performances te esperan para una experiencia inmersiva única.',
      'about-button': 'Ver edición anterior',
      
      // Section Halle
      'halle-title': 'Descubra la Halle des Grésillons',
      'halle-subtitle': 'Un espacio excepcional para una exposición excepcional',
      
      // Section Lieu
      'location-title': 'Nueva Ubicación',
      'location-card-title': 'Gennevilliers',
      'location-address-title': 'Halle des Grésillons<br>Place Indira Gandhi<br>92230 Gennevilliers',
      'location-hours-title': 'Horarios:',
      'location-hours-text': 'De martes a domingo: 10h - 19h<br>Jueves noche hasta las 21h',
      'location-contact-title': 'Contacto:',
      'location-contact-text': 'Tel: 01 23 45 67 89<br>Email:',
      
      // Section Halle détaillée
      'halle-detail-title': 'La Halle des Grésillons',
      'halle-detail-text-1': 'Situada en el corazón de Gennevilliers, la Halle des Grésillons es un espacio cultural polivalente que acogerá la edición 2026 de Trésors de Banlieues. Este antiguo edificio industrial rehabilitado ofrece una superficie de exposición excepcional de más de 2000m².',
      'halle-detail-text-2': 'Con su arquitectura característica que mezcla estructuras metálicas y grandes vidrieras, la Halle des Grésillons constituye un escenario ideal para valorizar las obras de arte urbano. Su configuración permite crear recorridos inmersivos y espacios temáticos variados.',
      'halle-detail-text-3': 'Fácilmente accesible en transporte público (RER C, Tranvía T1), la Halle des Grésillons se inscribe en un enfoque de democratización cultural, cerca de los habitantes de los barrios populares.',
      
      // Section Pré-inscription
      'registration-title': 'Pre-inscripción',
      'registration-text': 'Inscríbase ahora para recibir una invitación a la inauguración de la exposición y beneficiarse de acceso prioritario.',
      'registration-name': 'Nombre',
      'registration-email': 'Email',
      'registration-date': 'Fecha de visita preferida',
      'registration-date-select': 'Seleccione un período',
      'registration-date-march': 'Marzo 2026',
      'registration-date-april': 'Abril 2026',
      'registration-date-may': 'Mayo 2026',
      'registration-date-june': 'Junio 2026',
      'registration-button': 'Inscribirse',
      
      // Section Témoignages
      'testimonials-title': 'Testimonios',
      'testimonials-subtitle': 'Descubra lo que nuestros visitantes pensaron de la edición 2025',
      'testimonial-visitor': 'Visitante',
      'testimonial-art-lover': 'Amante del arte',
      'testimonial-teacher': 'Profesora',
      
      // CTA
      'cta-title': 'Únase a la aventura Trésors de Banlieues',
      'cta-text': 'Descubra el arte urbano bajo una nueva luz y participe en esta celebración de la creatividad contemporánea.',
      'cta-button': 'Conocer a nuestro equipo',
      
      // Footer
      'footer-title': 'Trésors de Banlieues',
      'footer-text': 'Una exposición de arte urbano que celebra la creatividad y la diversidad cultural de los suburbios.',
      'footer-links-title': 'Enlaces Rápidos',
      'footer-link-1': 'Exposición 2026',
      'footer-link-2': 'Edición 2025',
      'footer-link-3': 'Nuestro Equipo',
      'footer-contact': 'Contacto',
      'footer-address-1': 'Centro de Arte Contemporáneo',
      'footer-address-2': '15 Avenue des Arts',
      'footer-address-3': '91190 Paris-Saclay',
      'footer-email': 'Email:',
      'footer-tel': 'Tel: 01 23 45 67 89',
      'footer-copyright': 'Todos los derechos reservados.'
    },
    'ja': {
      // Navbar
      'nav-link-1': '2026年展示会',
      'nav-link-2': '2025年エディション',
      'nav-link-3': '私たちのチーム',
      
      // Hero section
      'hero-title': 'トレゾール・ド・バンリュー 2026',
      'hero-subtitle': '2026年3月15日から6月15日まで、ジュヌヴィリエの中心部で「トレゾール・ド・バンリュー」の新しいエディションをご覧ください。',
      'hero-button': '展示会を発見する',
      
      // Section Exposition
      'about-title': '展示会について',
      'about-text-1': '「トレゾール・ド・バンリュー」は、フランスの郊外の創造性と文化的多様性を祝うアーバンアート展です。2026年の新しいエディションでは、現代都市アートに捧げられた2000m²以上のスペースで新たな次元を迎えます。',
      'about-text-2': '今年は、都市の風景を本物の野外ギャラリーに変える新進アーティストに焦点を当てています。グラフィティ、ストリートアート、インスタレーション、写真、パフォーマンスなど、ユニークな没入型体験があなたを待っています。',
      'about-button': '前回のエディションを見る',
      
      // Section Halle
      'halle-title': 'アル・デ・グレジヨンを発見する',
      'halle-subtitle': '特別な展示会のための特別な空間',
      
      // Section Lieu
      'location-title': '新しい場所',
      'location-card-title': 'ジュヌヴィリエ',
      'location-address-title': 'アル・デ・グレジヨン<br>インディラ・ガンジー広場<br>92230 ジュヌヴィリエ',
      'location-hours-title': '営業時間:',
      'location-hours-text': '火曜日から日曜日: 10時 - 19時<br>木曜日は21時まで延長営業',
      'location-contact-title': '連絡先:',
      'location-contact-text': '電話: 01 23 45 67 89<br>メール:',
      
      // Section Halle détaillée
      'halle-detail-title': 'アル・デ・グレジヨン',
      'halle-detail-text-1': 'ジュヌヴィリエの中心部に位置するアル・デ・グレジヨンは、2026年の「トレゾール・ド・バンリュー」を開催する多目的文化スペースです。この改装された元工業ビルは、2000m²以上の例外的な展示スペースを提供します。',
      'halle-detail-text-2': '金属構造と大きなガラス屋根を組み合わせた特徴的な建築様式を持つアル・デ・グレジヨンは、都市アート作品を展示するための理想的な環境です。その構成により、没入型の経路と多様なテーマ空間を作り出すことができます。',
      'halle-detail-text-3': '公共交通機関（RER C、トラムT1）で簡単にアクセスできるアル・デ・グレジヨンは、人気のある地域の住民に近い文化の民主化アプローチの一部です。',
      
      // Section Pré-inscription
      'registration-title': '事前登録',
      'registration-text': '今すぐ登録して、展示会のオープニングへの招待状を受け取り、優先アクセスの特典を得ましょう。',
      'registration-name': '名前',
      'registration-email': 'メール',
      'registration-date': '希望訪問日',
      'registration-date-select': '期間を選択',
      'registration-date-march': '2026年3月',
      'registration-date-april': '2026年4月',
      'registration-date-may': '2026年5月',
      'registration-date-june': '2026年6月',
      'registration-button': '登録する',
      
      // Section Témoignages
      'testimonials-title': '感想',
      'testimonials-subtitle': '2025年エディションについての訪問者の感想をご覧ください',
      'testimonial-visitor': '訪問者',
      'testimonial-art-lover': 'アート愛好家',
      'testimonial-teacher': '教師',
      
      // CTA
      'cta-title': 'トレゾール・ド・バンリューの冒険に参加しましょう',
      'cta-text': '新しい視点で都市アートを発見し、この現代の創造性の祭典に参加しましょう。',
      'cta-button': '私たちのチームに会う',
      
      // Footer
      'footer-title': 'トレゾール・ド・バンリュー',
      'footer-text': '郊外の創造性と文化的多様性を祝う都市アート展。',
      'footer-links-title': 'クイックリンク',
      'footer-link-1': '2026年展示会',
      'footer-link-2': '2025年エディション',
      'footer-link-3': '私たちのチーム',
      'footer-contact': 'お問い合わせ',
      'footer-address-1': '現代アートセンター',
      'footer-address-2': 'アート通り15番地',
      'footer-address-3': '91190 パリ・サクレー',
      'footer-email': 'メール：',
      'footer-tel': '電話：01 23 45 67 89',
      'footer-copyright': '全著作権所有。'
    }
  };
  
  // Si la langue n'est pas dans notre dictionnaire, ne rien faire
  if (!translations[lang]) return;
  
  // 1. Traduire la navbar
  const navLinks = document.querySelectorAll('.navbar-menu .nav-link');
  if (navLinks.length >= 1) navLinks[0].textContent = translations[lang]['nav-link-1'];
  if (navLinks.length >= 2) navLinks[1].textContent = translations[lang]['nav-link-2'];
  if (navLinks.length >= 3) navLinks[2].textContent = translations[lang]['nav-link-3'];
  
  // 2. Traduire la section hero
  const heroTitle = document.querySelector('.hero-title');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  const heroButton = document.querySelector('.hero-buttons .btn-primary');
  if (heroTitle) heroTitle.textContent = translations[lang]['hero-title'];
  if (heroSubtitle) heroSubtitle.textContent = translations[lang]['hero-subtitle'];
  if (heroButton) heroButton.textContent = translations[lang]['hero-button'];
  
  // 3. Traduire la section exposition
  const aboutTitle = document.querySelector('#about .section-title');
  const aboutTexts = document.querySelectorAll('#about .section-text');
  const aboutButton = document.querySelector('#about .btn-primary');
  if (aboutTitle) aboutTitle.textContent = translations[lang]['about-title'];
  if (aboutTexts.length >= 1) aboutTexts[0].textContent = translations[lang]['about-text-1'];
  if (aboutTexts.length >= 2) aboutTexts[1].textContent = translations[lang]['about-text-2'];
  if (aboutButton) aboutButton.textContent = translations[lang]['about-button'];
  
  // 4. Traduire la section Halle des Grésillons
  const halleTitle = document.querySelector('.full-width-slider-section .section-title');
  const halleSubtitle = document.querySelector('.full-width-slider-section .section-text');
  if (halleTitle) halleTitle.textContent = translations[lang]['halle-title'];
  if (halleSubtitle) halleSubtitle.textContent = translations[lang]['halle-subtitle'];
  
  // 5. Traduire la section lieu
  const locationTitle = document.querySelector('.bg-beige-dark .section-title');
  const locationCardTitle = document.querySelector('.card-title');
  const infoItems = document.querySelectorAll('.info-item .info-text');
  if (locationTitle) locationTitle.textContent = translations[lang]['location-title'];
  if (locationCardTitle) locationCardTitle.textContent = translations[lang]['location-card-title'];
  
  // Adresse
  if (infoItems.length >= 1) infoItems[0].innerHTML = translations[lang]['location-address-title'];
  
  // Horaires
  if (infoItems.length >= 2) {
    const hoursText = infoItems[1];
    const strongElement = hoursText.querySelector('strong');
    if (strongElement) strongElement.textContent = translations[lang]['location-hours-title'];
    
    // Remplacer le texte après le strong
    const textNode = Array.from(hoursText.childNodes).find(node => node.nodeType === Node.TEXT_NODE && node.nodeValue.trim());
    if (textNode) {
      const newText = document.createElement('span');
      newText.innerHTML = '<br>' + translations[lang]['location-hours-text'];
      hoursText.replaceChild(newText, textNode);
    }
  }
  
  // Contact
  if (infoItems.length >= 3) {
    const contactText = infoItems[2];
    const strongElement = contactText.querySelector('strong');
    if (strongElement) strongElement.textContent = translations[lang]['location-contact-title'];
    
    // Remplacer le texte après le strong
    const textNode = Array.from(contactText.childNodes).find(node => node.nodeType === Node.TEXT_NODE && node.nodeValue.trim());
    if (textNode) {
      const newText = document.createElement('span');
      newText.innerHTML = '<br>' + translations[lang]['location-contact-text'];
      contactText.replaceChild(newText, textNode);
    }
  }
  
  // 6. Traduire la section Halle détaillée
  const halleDetailTitle = document.querySelector('.halle-title');
  const halleDetailTexts = document.querySelectorAll('.halle-text');
  if (halleDetailTitle) halleDetailTitle.textContent = translations[lang]['halle-detail-title'];
  if (halleDetailTexts.length >= 1) halleDetailTexts[0].textContent = translations[lang]['halle-detail-text-1'];
  if (halleDetailTexts.length >= 2) halleDetailTexts[1].textContent = translations[lang]['halle-detail-text-2'];
  if (halleDetailTexts.length >= 3) halleDetailTexts[2].textContent = translations[lang]['halle-detail-text-3'];
  
  // 7. Traduire la section pré-inscription
  const registrationTitle = document.querySelector('.registration-container .section-title');
  const registrationText = document.querySelector('.registration-container .section-text');
  const registrationLabels = document.querySelectorAll('.form-group label');
  const registrationSelect = document.querySelector('#visit-date');
  const registrationButton = document.querySelector('.registration-form .btn-primary');
  
  if (registrationTitle) registrationTitle.textContent = translations[lang]['registration-title'];
  if (registrationText) registrationText.textContent = translations[lang]['registration-text'];
  
  if (registrationLabels.length >= 1) registrationLabels[0].textContent = translations[lang]['registration-name'];
  if (registrationLabels.length >= 2) registrationLabels[1].textContent = translations[lang]['registration-email'];
  if (registrationLabels.length >= 3) registrationLabels[2].textContent = translations[lang]['registration-date'];
  
  if (registrationSelect) {
    const options = registrationSelect.querySelectorAll('option');
    if (options.length >= 1) options[0].textContent = translations[lang]['registration-date-select'];
    if (options.length >= 2) options[1].textContent = translations[lang]['registration-date-march'];
    if (options.length >= 3) options[2].textContent = translations[lang]['registration-date-april'];
    if (options.length >= 4) options[3].textContent = translations[lang]['registration-date-may'];
    if (options.length >= 5) options[4].textContent = translations[lang]['registration-date-june'];
  }
  
  if (registrationButton) registrationButton.textContent = translations[lang]['registration-button'];
  
  // 8. Traduire la section témoignages
  const testimonialsTitle = document.querySelector('.bg-beige-dark .section-title');
  const testimonialsSubtitle = document.querySelector('.bg-beige-dark .section-text');
  const testimonialRoles = document.querySelectorAll('.testimonial-role');
  
  if (testimonialsTitle && testimonialsTitle.textContent.includes('Témoignages')) {
    testimonialsTitle.textContent = translations[lang]['testimonials-title'];
  }
  
  if (testimonialsSubtitle && testimonialsSubtitle.textContent.includes('Découvrez')) {
    testimonialsSubtitle.textContent = translations[lang]['testimonials-subtitle'];
  }
  
  testimonialRoles.forEach(role => {
    if (role.textContent === 'Visiteuse') role.textContent = translations[lang]['testimonial-visitor'];
    if (role.textContent === 'Amateur d\'art') role.textContent = translations[lang]['testimonial-art-lover'];
    if (role.textContent === 'Enseignante') role.textContent = translations[lang]['testimonial-teacher'];
  });
  
  // 9. Traduire la section CTA
  const ctaTitle = document.querySelector('.cta-title');
  const ctaText = document.querySelector('.cta-text');
  const ctaButton = document.querySelector('.cta-buttons .btn-white');
  
  if (ctaTitle) ctaTitle.textContent = translations[lang]['cta-title'];
  if (ctaText) ctaText.textContent = translations[lang]['cta-text'];
  if (ctaButton) ctaButton.textContent = translations[lang]['cta-button'];
  
  // 10. Traduire le footer
  const footerTitle = document.querySelector('.footer-title');
  const footerText = document.querySelector('.footer-text');
  const footerLinksTitle = document.querySelector('.footer-links').previousElementSibling;
  const footerLinks = document.querySelectorAll('.footer-link');
  const footerContact = document.querySelector('.footer-address').previousElementSibling;
  const footerAddressItems = document.querySelectorAll('.footer-address p');
  const footerCopyright = document.querySelector('.footer-bottom p');
  
  if (footerTitle) footerTitle.textContent = translations[lang]['footer-title'];
  if (footerText) footerText.textContent = translations[lang]['footer-text'];
  if (footerLinksTitle) footerLinksTitle.textContent = translations[lang]['footer-links-title'];
  
  if (footerLinks.length >= 1) footerLinks[0].textContent = translations[lang]['footer-link-1'];
  if (footerLinks.length >= 2) footerLinks[1].textContent = translations[lang]['footer-link-2'];
  if (footerLinks.length >= 3) footerLinks[2].textContent = translations[lang]['footer-link-3'];
  
  if (footerContact) footerContact.textContent = translations[lang]['footer-contact'];
  
  if (footerAddressItems.length >= 1) footerAddressItems[0].textContent = translations[lang]['footer-address-1'];
  if (footerAddressItems.length >= 2) footerAddressItems[1].textContent = translations[lang]['footer-address-2'];
  if (footerAddressItems.length >= 3) footerAddressItems[2].textContent = translations[lang]['footer-address-3'];
  
  // Traiter l'email et le téléphone séparément car ils contiennent des balises
  if (footerAddressItems.length >= 4) {
    const emailText = footerAddressItems[3].textContent;
    if (emailText.includes('Email')) {
      footerAddressItems[3].innerHTML = footerAddressItems[3].innerHTML.replace('Email', translations[lang]['footer-email']);
    }
  }
  
  if (footerAddressItems.length >= 5) {
    const telText = footerAddressItems[4].textContent;
    if (telText.includes('Tél')) {
      footerAddressItems[4].textContent = translations[lang]['footer-tel'];
    }
  }
  
  if (footerCopyright) {
    const year = new Date().getFullYear();
    footerCopyright.innerHTML = `&copy; <span id="current-year">${year}</span> Trésors de Banlieues. ${translations[lang]['footer-copyright']}`;
  }
  
  // Effet visuel pour indiquer que la traduction est terminée
  document.body.style.transition = 'opacity 0.3s ease';
  document.body.style.opacity = '0.5';
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 300);
}