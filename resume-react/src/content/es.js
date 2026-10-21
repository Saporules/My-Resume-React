// Spanish copy — faithful translation of en.js
const es = {
  meta: {
    title: 'Asaf Lopez — Senior Frontend Engineer y Software Architect',
    description:
      'Senior Frontend Engineer, Software Architect y AI Engineer con más de 13 años modernizando plataformas web empresariales. Angular, React, TypeScript. Trabajo remoto con EE. UU., Europa y LATAM.',
  },
  nav: {
    work: 'Experiencia',
    skills: 'Habilidades',
    about: 'Perfil',
    contact: 'Contacto',
    downloadCv: 'Descargar CV',
    langToggleLabel: 'View in English',
    themeToggleLabel: 'Modo oscuro',
  },
  hero: {
    titles: ['Senior Frontend Engineer', 'Software Architect', 'AI Engineer'],
    location: 'San Luis Potosí, MX · Remoto EE. UU. / Europa / LATAM',
    hook: 'Me encargo de la migración que nadie quiere tomar — y la llevo hasta producción.',
    ctaTalk: 'Hablemos',
    ctaCv: 'Descargar CV',
    photoAlt: 'Retrato de Asaf Lopez',
    stats: [
      { value: '13+', label: 'años construyendo para la web' },
      { value: '2', label: 'plataformas entregadas desde cero en 5 meses' },
      { value: '20×', label: 'revisiones de código más rápidas con IA' },
    ],
  },
  summary: {
    label: 'Resumen',
    text: 'Ingeniero de software senior con más de 13 años construyendo y modernizando aplicaciones web para clientes empresariales de banca, biotecnología y gestión patrimonial. Especialista en Angular, React y TypeScript, con experiencia migrando y modernizando sistemas legacy en plataformas empresariales en producción. Actualmente CTO interino en una consultora de IA, convirtiendo prototipos generados con IA en software de producción mantenible, con arquitectura real, CI/CD y DevOps. Reconocido por asumir los problemas difíciles y ambiguos — la migración que nadie quiere tomar, el código legacy que no se puede tocar — y por trabajar eficazmente en inglés con equipos distribuidos.',
  },
  experience: {
    label: 'Experiencia',
    items: [
      {
        company: 'SoberanIA',
        location: 'Madrid, España (remoto)',
        title: 'Software Architect / CTO interino · AI Engineering',
        dates: 'Mar 2026 – Presente',
        context: 'Soluciones de IA para empresas privadas de los sectores legal, contable y salud.',
        bullets: [
          'Responsable de la arquitectura técnica y del modelo operativo de desarrollo; lidero un equipo de ingeniería de 3 personas y conduzco la contratación, evaluación de candidatos y composición del equipo.',
          'Entregué 2 plataformas para clientes desde cero en los primeros 5 meses, en los sectores legal/contable y salud.',
          'Introduje el desarrollo AI spec-driven y AI harness para eliminar retrabajo y alucinaciones del modelo, llevando la salida de la IA de demos funcionales a software de producción con mantenimiento, DevOps y CI/CD.',
          'Definí el stack y los estándares de frontend completos y los integré con la infraestructura existente de modelos y agentes de IA.',
        ],
      },
      {
        company: 'The Web Factory',
        location: 'Guadalajara, México',
        title: 'Full-Stack Developer y operación de servidores · Escalation Engineer',
        dates: 'Oct 2025 – Mar 2026',
        context: 'Agencia web con 5–6 cuentas de clientes simultáneas.',
        bullets: [
          'Punto de escalamiento para problemas de frontend y backend que el resto del equipo no podía resolver, en 5–6 cuentas de clientes simultáneas.',
          'Administré un VPS Linux con ~100 sitios en producción (Apache, nginx, PHP): limpieza de malware tras ataques, migraciones de servidor e incidentes de recuperación de datos.',
          'Diagnostiqué y corregí defectos complejos de JavaScript y CSS — comportamiento de animaciones, fallas de layout con posición fija y renderizado entre navegadores.',
        ],
      },
      {
        company: 'Globant',
        location: 'Ciudad de México, México',
        title: 'Senior Frontend Developer',
        dates: '2017 – 2025',
        context:
          'Ocho años entregando programas de modernización para clientes estadounidenses de escala Fortune en finanzas, biotecnología y banca, trabajando a diario en inglés con equipos distribuidos en las costas este y oeste de EE. UU., India y Suecia.',
        bullets: [],
        engagements: [
          {
            client: 'Compañía global de biotecnología y farmacéutica (NDA)',
            bullets: [
              'Migré 2 de los 4 micro-frontends de una aplicación empresarial compleja de Angular 17 a Angular 19 en ~2 meses sin caídas en producción, resolviendo conflictos profundos de dependencias.',
              'Completé solo la fase final de la migración cuando el resto del equipo salió del proyecto, manteniendo la responsabilidad total de la entrega.',
              'Introduje herramientas de IA para análisis de código archivo por archivo, reduciendo un ciclo de revisión de un día completo a ~20 minutos — una reducción de aproximadamente 20x.',
              'Escribí la documentación de migración usada como referencia del programa.',
            ],
          },
          {
            client: 'Plataforma estadounidense de retiro y gestión patrimonial — proveedor nacional líder (NDA)',
            bullets: [
              'Mantuve y amplié funcionalidades centrales durante una gran fusión de plataformas tras la adquisición entre dos compañías de servicios financieros.',
              'Integré componentes existentes de Backbone.js/jQuery en un entorno moderno de React bajo la restricción de no modificar el código legacy — una modernización strangler-fig que mantuvo ambos sistemas funcionando en paralelo sin reescribirlos.',
            ],
          },
          {
            client: 'Banco de inversión global — Tier 1, mercado de EE. UU. (NDA)',
            bullets: [
              'Construí un módulo de hipotecas con formularios interactivos de varios pasos y visualizaciones de datos en Angular para el mercado estadounidense.',
              'Diseñé y lancé un A/B test que segmentaba usuarios por edad y nivel patrimonial mediante un cuestionario con sliders, mostrando contenido diferenciado y midiendo el impacto en conversión; implementado con Google Tag Manager y feature flags.',
              'Corregí defectos visuales y de renderizado en la aplicación híbrida iOS/Android (Ionic), mejorando la calidad en las versiones siguientes.',
            ],
          },
        ],
      },
    ],
  },
  skills: {
    label: 'Habilidades',
    groups: [
      { name: 'Base', items: ['TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'SCSS'] },
      { name: 'Frameworks y librerías', items: ['Angular (hasta v19)', 'React', 'Svelte', 'Vue', 'Ionic', 'Backbone.js', 'jQuery'] },
      { name: 'Estado y datos', items: ['RxJS', 'NgRx', 'Redux', 'REST APIs'] },
      { name: 'Arquitectura', items: ['Micro-frontends', 'Modernización legacy / integración strangler-fig', 'Sistemas de diseño de componentes', 'Arquitectura SPA'] },
      { name: 'UI y calidad', items: ['Tailwind CSS', 'Material UI', 'Bootstrap', 'Accesibilidad (WCAG)', 'Internacionalización / localización (i18n)'] },
      { name: 'AI Engineering', items: ['AI spec-driven development', 'AI harness development', 'Orquestación de flujos de agentes', 'Claude', 'Cursor', 'Antigravity'] },
      { name: 'DevOps e infraestructura', items: ['Docker', 'Node.js', 'Webpack', 'Git', 'Git Flow', 'GitHub Actions (CI/CD)', 'Administración de VPS Linux', 'Apache', 'nginx', 'Entornos PHP', 'Respuesta a incidentes y recuperación de datos'] },
      { name: 'Testing', items: ['Jest', 'Jasmine', 'Karma'] },
      { name: 'Analítica y experimentación', items: ['Google Tag Manager', 'Feature flags', 'A/B testing'] },
      { name: 'CMS', items: ['WordPress (temas y plantillas a medida)'] },
      { name: 'Metodologías', items: ['Agile', 'Scrum', 'Kanban', 'Code review', 'Mentoría técnica'] },
      { name: 'Conocimiento práctico', items: ['Vite', 'Kubernetes', 'Storybook', 'Testing Library', 'Playwright', 'Python'] },
    ],
  },
  leadership: {
    label: 'Liderazgo',
    bullets: [
      'Mentoré a 3 desarrolladores semi-senior; los 3 subieron de nivel.',
      'Contrato y evalúo candidatos de ingeniería; armo equipos de proyecto.',
      'Inglés de trabajo diario con stakeholders de EE. UU., Europa e India; experiencia traduciendo restricciones técnicas para audiencias no técnicas y mediando entre diseño, ingeniería y negocio.',
    ],
  },
  earlier: {
    label: 'Trayectoria y formación',
    roles: [
      {
        company: 'OMAKASE Tech & Design',
        title: 'Frontend & Mobile Developer / Project Manager',
        dates: '2015 – 2017',
        text: 'Consultora independiente para pequeñas y medianas empresas. Construí sitios informativos, e-commerce y landing pages en WordPress; publiqué aplicaciones Android e iOS con Ionic. Responsable del levantamiento de requerimientos, la gestión de proyectos y la relación con clientes.',
      },
      {
        company: 'MG Radio',
        title: 'Frontend Developer',
        dates: '2014 – 2015',
        text: 'Construí sitios WordPress y plantillas a medida con implementación de UI pixel-perfect a partir de diseños gráficos.',
      },
      {
        company: 'Niumedia',
        title: 'Web & Mobile Developer',
        dates: '2012 – 2014',
        text: 'Primer trabajo profesional. Angular e Ionic para web y móvil; desarrollo de sitios WordPress.',
      },
    ],
    educationLabel: 'Formación',
    education: {
      institution: 'Universidad Politécnica de San Luis Potosí',
      degree: 'Ingeniería en Tecnologías de la Información',
      date: 'Dic 2014',
    },
    languagesLabel: 'Idiomas',
    languages: 'Español (nativo) · Inglés (C1 profesional; certificado Cambridge FCE B2)',
  },
  contact: {
    heading: '¿Te interesa mi perfil o quieres ayuda con tu startup o proyecto?',
    nameLabel: 'Nombre',
    emailLabel: 'Correo',
    messageLabel: 'Mensaje',
    send: 'Enviar mensaje',
    sending: 'Enviando…',
    success: 'Gracias — tu mensaje va en camino. Te responderé pronto.',
    error: 'Algo salió mal y tu mensaje no se envió.',
    fallback: 'Escríbeme directamente',
    requiredError: 'Este campo es obligatorio.',
    emailError: 'Escribe un correo válido.',
    directLabel: 'O contáctame directamente',
  },
  footer: {
    rights: 'Diseñado y construido por Asaf Lopez',
    faith: 'Jesus is King ✝︎',
  },
};

export default es;
