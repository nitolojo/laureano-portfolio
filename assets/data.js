// Add a new project by adding an object here, then dropping matching
// image files into assets/images/projects/<slug>/
// (cover.jpg + as many gallery-N.jpg as you like — see README in that folder).
const PROJECTS = [
  {
    slug: 'denodo',
    accent: '#E30613',
    year: '2021—Now',
    yearEs: '2021—Hoy',
    filter: 'brand',
    title: 'Denodo',
    category: { en: 'Brand & Events', es: 'Marca y eventos' },
    role: { en: 'Graphic Designer → Marketing Manager', es: 'Diseñador gráfico → Marketing Manager' },
    summary: {
      en: 'Brand systems, trade show environments and multilingual design pipelines for a global data-management company.',
      es: 'Sistemas de marca, entornos de ferias y pipelines de diseño multilingüe para una empresa global de gestión de datos.'
    },
    description: {
      en: 'Graphic designer and visual strategist, driving Denodo\u2019s brand evolution across 30+ markets for five years. I work across brand strategy, immersive event design for conferences like Gartner and AWS, and AI-augmented production \u2014 building full-funnel visual systems for ABM, paid media and sales enablement, with a social-first eye sharpened by running a 120K+ content audience.',
      es: 'Diseñador gráfico y estratega visual, impulsando la evolución de marca de Denodo en más de 30 mercados durante cinco años. Trabajo en estrategia de marca, diseño de eventos inmersivos para conferencias como Gartner y AWS, y producción con IA — construyendo sistemas visuales de embudo completo para ABM, paid media y sales enablement, con una mirada social-first afilada por gestionar una audiencia de creador de 120K+.'
    },
    cover: 'assets/images/projects/denodo/cover.jpg',
    gallery: [
      'assets/images/projects/denodo/gallery-1.jpg',
      'assets/images/projects/denodo/gallery-2.jpg',
      'assets/images/projects/denodo/gallery-3.jpg'
    ]
  },
  {
    slug: 'goodtings',
    accent: '#4AED80',
    year: '2026',
    yearEs: '2026',
    filter: 'product',
    title: 'goodtings.',
    category: { en: 'Product & Brand — Founder', es: 'Producto y marca — Founder' },
    role: { en: 'Solo designer & founder', es: 'Diseñador y founder en solitario' },
    summary: {
      en: 'An iOS manifestation and journaling app, now also on Meta Ray-Ban Display. Designed, built and shipped solo: brand, product, site and launch content.',
      es: 'Una app de manifestación y journaling para iOS, ahora también en Meta Ray-Ban Display. Diseñada, construida y publicada en solitario: marca, producto, web y contenido de lanzamiento.'
    },
    description: {
      en: 'goodtings. is an iOS app for manifestation and journaling, designed, built and shipped solo \u2014 from the brand system to every screen. It blends soft, intentional visuals with daily rituals like affirmations and milestone tracking, making the everyday practice of journaling feel calm and habit-forming. Version 1.1 brought a redesigned pulse feed and a three-tab profile with BIG tings and achievements, and goodtings. now also runs on Meta Ray-Ban Display as a web app synced with the iPhone app.',
      es: 'goodtings. es una app de iOS para manifestación y journaling, diseñada, construida y publicada en solitario — desde el sistema de marca hasta cada pantalla. Combina una estética suave e intencional con rituales diarios como afirmaciones y seguimiento de hitos, haciendo que journalear se sienta tranquilo y fácil de mantener como hábito. La versión 1.1 trajo un pulse rediseñado y un perfil en tres pestañas con BIG tings y logros, y goodtings. ya funciona también en las Meta Ray-Ban Display como web app sincronizada con la app de iPhone.'
    },
    link: 'https://goodtings.app/',
    cover: 'assets/images/projects/goodtings/cover-2.jpg',
    gallery: [
      'assets/images/projects/goodtings/gallery-1.jpg',
      'assets/images/projects/goodtings/gallery-5.jpg',
      'assets/images/projects/goodtings/gallery-2.jpg',
      'assets/images/projects/goodtings/gallery-3.jpg',
      'assets/images/projects/goodtings/gallery-4.jpg'
    ]
  },
  {
    slug: 'content',
    accent: '#FF5A36',
    year: 'Ongoing',
    yearEs: 'Activo',
    filter: 'content',
    title: { en: 'Content', es: 'Contenido' },
    category: { en: '@laureanolojo — 125K+', es: '@laureanolojo — 125K+' },
    role: { en: 'Creator & designer', es: 'Creador y diseñador' },
    summary: {
      en: 'Lifestyle, travel and tech content built alongside a design career, plus the graphic system behind it.',
      es: 'Contenido de lifestyle, viajes y tecnología en paralelo a una carrera de diseño, y el sistema gráfico detrás.'
    },
    description: {
      en: 'A creator identity built in parallel to my design work, across TikTok and Instagram to a combined audience of 125K+. Past brand partnerships include L\u2019Or\u00e9al, Oclean and Arkopharma, and recent output includes travel content from a trip to Mauritius \u2014 all supported by story and feed graphics in my own consistent visual system.',
      es: 'Una identidad de creador construida en paralelo a mi trabajo de diseño, en TikTok e Instagram para una audiencia combinada de 125K+. Entre las colaboraciones de marca están L\u2019Or\u00e9al, Oclean y Arkopharma, y el trabajo reciente incluye contenido de viaje desde Mauricio \u2014 todo con gráficas de stories y feed en mi propio sistema visual.'
    },
    cover: 'assets/images/projects/content/cover-2.jpg',
    gallery: [
      'assets/images/projects/content/gallery-1.jpg',
      'assets/images/projects/content/gallery-2.jpg'
    ]
  }
];
