// All copy across the site in EN / FR / PT
// EN = native tech / growth vocabulary (Growth Ops, AI-driven, ROI, end-to-end)
// FR = refined corporate (Optimisation, Architectures, Partenariats stratégiques B2B)
// PT = direct, founder-voice (clean PT-PT)

const en = {
  nav: {
    experience: 'Experience',
    skills: 'Skills',
    project: 'Project',
    contact: 'Contact'
  },
  hero: {
    eyebrow: 'Portfolio · 2026',
    seeWork: 'See Work',
    contact: 'Contact',
    blocks: [
      {
        title: 'Rui Moreira',
        subtitle: 'Just a guy obsessed with what AI can actually do',
        description:
          'Marketing specialist focused on turning technical curiosity into a competitive advantage. I translate the latest AI innovations into tangible results and optimized processes.'
      },
      {
        title: 'Vision Without Borders',
        subtitle: 'Italy · France · Poland',
        description:
          'Three international experiences that shaped an adaptable, multicultural mindset. Proven ability to operate and scale businesses across different European contexts.'
      },
      {
        title: 'Multilingual',
        subtitle: 'Fluent in 3 Languages',
        description:
          'Native Portuguese, with professional proficiency in English and Spanish (B2). Basic knowledge of Italian and French (A1).',
        flags: [
          { code: 'pt', label: 'PT', level: 'Native' },
          { code: 'gb', label: 'EN', level: 'B2' },
          { code: 'es', label: 'ES', level: 'B2' }
        ]
      },
      {
        title: "I Ship, I Don't Slide",
        subtitle: 'Strategy means nothing without code in production',
        description:
          "I'm a marketer who learned to code because waiting for engineering was killing every idea. Today I prototype, launch and iterate the same week."
      }
    ]
  },
  experience: {
    headingLeft: "Where I've been",
    headingRight: 'working',
    subtitle:
      'Over the last two years I built product, closed partnerships, and automated everything I could. Automotive, social impact, and AI.',
    items: [
      {
        role: 'Founder',
        company: 'ImportaSeguro',
        tag: 'Side Project',
        url: 'importaseguro.pt',
        period: 'JAN 2026 — PRESENT',
        intro:
          'Platform that imports cars from Europe to Portugal. Scrapes listings, calculates real costs (ISV, IUC, logistics) and returns the proposal as a PDF. The process used to take a dealership 30 minutes. Now it takes 10 seconds.',
        bullets: [
          'Built the entire business from scratch: market research, concept, code, marketing and sales.',
          'Built a content pipeline on LinkedIn and Instagram that uses LLMs and agents to generate market reports, carousels and educational posts without manual intervention.',
          'Closed partnerships with German dealerships to source vehicles for the Portuguese market.'
        ]
      },
      {
        role: 'Business Development & Marketing',
        company: 'Impactrip (B Corp)',
        url: 'impactrip.com',
        program: 'AICEP — INOV Contacto Programme',
        period: 'DEC 2024 — NOV 2025',
        bullets: [
          'Managed international partnerships from Rome and coordinated volunteer projects on the ground.',
          "Built the brand's B2B positioning and digital communications plan."
        ]
      }
    ]
  },
  skills: {
    headingLeft: 'The stack',
    headingRight: 'I use',
    subtitle: 'Tools I work with regularly. Hover any icon.',
    centerIdle: 'Skills',
    inner: [
      'B2B Development — Strategy',
      'International Partnerships',
      'Process Automation',
      'Growth Ops — Performance'
    ],
    middle: [
      'Playwright — Scraping',
      'Remotion — Video in code',
      'ALTAIR — Database',
      'Figma — Design',
      'Excel — Financial Modeling',
      'Meta Ads — Paid Social',
      'Google Ads — Paid Search',
      'Content Creation — Multi-format'
    ],
    outer: [
      'n8n — Workflow Automation',
      'Cursor — AI Editor',
      'Claude Code — Pair Programming',
      'Nano Banana — Image Generation',
      'Google Flow — AI Video',
      'Suno — AI Music',
      'ElevenLabs — AI Voice',
      'DeepSeek — Open-source LLM',
      'Perplexity — AI Search',
      'HiggsField — AI Video',
      'Manus.ai — AI Agent',
      'OpenAI — GPT & APIs'
    ]
  },
  projects: {
    eyebrow: 'Featured Projects',
    headingLeft: 'Things',
    headingRight: "I've built.",
    subtitle:
      'Three areas of work: technical automation, social innovation, and generative AI applied to commercial operations.',
    cards: [
      {
        badge: 'AI & Scraping',
        headline: 'Car import simulator',
        subhead: 'Pick a mobile.de listing and get the total cost in Portugal. In ten seconds.',
        bullets: [
          { strong: 'Automated scraping', text: 'Pulls data from mobile.de — CO₂, displacement, base price — with no manual intervention.' },
          { strong: 'AT-compliant', text: 'Cross-checks the data against the official ISV and IUC tables, including age-based depreciation coefficients.' },
          { strong: 'Real total cost', text: 'Adds logistics, customs fees and commercial margin. Returns a number the client can trust.' }
        ],
        stack: ['Node.js', 'Playwright', 'Custom math engine'],
        highlights: ['Data link', 'AT Compliance', 'Cost in seconds'],
        metrics: [
          { value: '30min → 10s', label: 'Time saved' },
          { value: '100%', label: 'Compliant with official tables' }
        ],
        ctaLabel: 'Visit Project'
      },
      {
        badge: 'Strategy & Impact',
        headline: 'Projetoes — Social support, digital infrastructure',
        subhead: 'Helping launch a shelter for women in vulnerable situations.',
        bullets: [
          { strong: 'Funding applications', text: 'Identified and submitted applications to European and national funds to sustain the project.' },
          { strong: 'International partnerships', text: 'Connected the initiative to foreign organisations to exchange best practices and shared energy.' },
          { strong: 'Digital roadmap', text: 'Designed the online presence so the work can be visible and replicable.' }
        ],
        stack: ['EU Funds', 'Stakeholder management', 'Digital strategy'],
        highlights: ['EU Funding', 'International Partnerships', 'Digital Roadmap'],
        metrics: [
          { value: 'Social Focus', label: 'Mission' },
          { value: 'B Corp Standards', label: 'Framework' }
        ],
        ctaLabel: 'Visit Project'
      },
      {
        badge: 'AI Automation',
        headline: 'Commercial proposal engine',
        subhead: 'Raw data in. A client-ready proposal PDF out.',
        bullets: [
          { strong: 'LLM structuring', text: 'Multiple real listings enter the pipeline and the models organise everything into a comparative table.' },
          { strong: 'Auto generation', text: 'Node.js plus PDFKit produces the document with the branding already applied — no one opens Word.' },
          { strong: 'Transparent costs', text: 'Clients see the full breakdown and compare cars side by side before deciding.' }
        ],
        stack: ['Claude API', 'Node.js', 'PDFKit', 'Multi-agent'],
        highlights: ['Scraping + LLM', 'PDFKit Automation', 'Branded UI'],
        metrics: [
          { value: 'Multi-Agent', label: 'Architecture' },
          { value: 'Instant PDF', label: 'Output' }
        ],
        ctaLabel: 'Request Demo'
      }
    ]
  },
  contact: {
    eyebrow: "Let's build",
    headingTop: 'Ready to let',
    headingBottom: 'AI work for you?',
    description:
      'Available for full-time roles, strategic consulting and technical partnerships. If your business still runs on manual tasks and copy-paste, my goal is simple: give you back your time and multiply your results.',
    cta: "Let's Connect",
    locationCity: 'Based in Paris',
    locationSub: 'Available for projects across Europe · Remote · Hybrid'
  },
  footer: {
    left: '© 2026 Rui Moreira',
    right: 'Growth Operations & AI Automation'
  }
}

const fr = {
  nav: {
    experience: 'Parcours',
    skills: 'Stack',
    project: 'Projets',
    contact: 'Contact'
  },
  hero: {
    eyebrow: 'Portfolio · 2026',
    seeWork: 'Voir les Projets',
    contact: 'Contact',
    blocks: [
      {
        title: 'Rui Moreira',
        subtitle: "Un passionné de ce que l'IA peut vraiment accomplir",
        description:
          "Spécialiste Marketing axé sur la transformation de la curiosité technique en avantage concurrentiel. Je traduis les dernières innovations en Intelligence Artificielle en résultats tangibles et processus optimisés."
      },
      {
        title: 'Vision Sans Frontières',
        subtitle: 'Italie · France · Pologne',
        description:
          "Trois expériences internationales qui ont forgé un état d'esprit adaptable et multiculturel. Capacité prouvée à opérer et faire grandir des entreprises dans différents contextes européens."
      },
      {
        title: 'Multilingue',
        subtitle: 'Maîtrise de 3 Langues',
        description:
          'Portugais natif, avec une maîtrise professionnelle de l’anglais et de l’espagnol (B2). Connaissances de base en italien et en français (A1).',
        flags: [
          { code: 'pt', label: 'PT', level: 'Natif' },
          { code: 'gb', label: 'EN', level: 'B2' },
          { code: 'es', label: 'ES', level: 'B2' }
        ]
      },
      {
        title: 'Je Livre, Pas de Slides',
        subtitle: "La stratégie ne vaut rien sans code en production",
        description:
          "Marketeur devenu développeur parce qu’attendre l’ingénierie tuait chaque idée. Aujourd’hui je prototype, je lance et j’itère dans la même semaine."
      }
    ]
  },
  experience: {
    headingLeft: "Là où j'ai",
    headingRight: 'travaillé',
    subtitle:
      "Ces deux dernières années, j'ai construit du produit, signé des partenariats et automatisé tout ce qui pouvait l'être. Automobile, impact social et IA.",
    items: [
      {
        role: 'Fondateur',
        company: 'ImportaSeguro',
        tag: 'Side Project',
        url: 'importaseguro.pt',
        period: 'JAN 2026 — AUJOURD’HUI',
        intro:
          "Plateforme qui importe des voitures d'Europe vers le Portugal. Elle extrait les annonces, calcule les coûts réels (ISV, IUC, logistique) et renvoie la proposition en PDF. Le processus prenait 30 minutes à un concessionnaire. Aujourd'hui, 10 secondes.",
        bullets: [
          "Construction complète de l'entreprise : étude de marché, conception, code, marketing et ventes.",
          "Mise en place d'un pipeline de contenu LinkedIn et Instagram qui utilise des LLMs et des agents pour générer rapports de marché, carrousels et posts éducatifs sans intervention manuelle.",
          'Partenariats commerciaux signés avec des concessionnaires allemands pour approvisionner le marché portugais.'
        ]
      },
      {
        role: 'Business Development & Marketing',
        company: 'Impactrip (B Corp)',
        url: 'impactrip.com',
        program: 'AICEP — Programme INOV Contacto',
        period: 'DÉC 2024 — NOV 2025',
        bullets: [
          'Gestion des partenariats internationaux depuis Rome et coordination de projets de volontariat sur le terrain.',
          "Construction du positionnement B2B de la marque et du plan de communication digitale."
        ]
      }
    ]
  },
  skills: {
    headingLeft: 'La stack',
    headingRight: "que j'utilise",
    subtitle: 'Outils avec lesquels je travaille régulièrement. Survolez un icône.',
    centerIdle: 'Skills',
    inner: [
      'B2B Development — Stratégie',
      'Partenariats Internationaux',
      'Automatisation des Processus',
      'Growth Ops — Performance'
    ],
    middle: [
      'Playwright — Scraping',
      'Remotion — Vidéo en code',
      'ALTAIR — Base de données',
      'Figma — Design',
      'Excel — Modélisation Financière',
      'Meta Ads — Social Payant',
      'Google Ads — Search Payant',
      'Content Creation — Multi-format'
    ],
    outer: [
      'n8n — Automatisation de flux',
      'Cursor — Éditeur IA',
      'Claude Code — Pair Programming',
      'Nano Banana — Génération d’image',
      'Google Flow — Vidéo IA',
      'Suno — Musique IA',
      'ElevenLabs — Voix IA',
      'DeepSeek — LLM open-source',
      'Perplexity — Recherche IA',
      'HiggsField — Vidéo IA',
      'Manus.ai — Agent IA',
      'OpenAI — GPT & APIs'
    ]
  },
  projects: {
    eyebrow: 'Projets en avant',
    headingLeft: 'Ce que',
    headingRight: 'j’ai construit.',
    subtitle:
      "Trois axes de travail : automatisation technique, innovation sociale et IA générative appliquée aux opérations commerciales.",
    cards: [
      {
        badge: 'IA & Scraping',
        headline: "Simulateur d'importation automobile",
        subhead: "Une annonce mobile.de en entrée, le coût total au Portugal en sortie. En dix secondes.",
        bullets: [
          { strong: 'Scraping automatisé', text: 'Extraction des données de mobile.de — CO₂, cylindrée, prix de base — sans intervention manuelle.' },
          { strong: 'Conforme AT', text: 'Croisement avec les tables officielles ISV et IUC, coefficients de dépréciation par âge inclus.' },
          { strong: 'Coût total réel', text: 'Logistique, taxes douanières et marge commerciale. Un chiffre sur lequel le client peut compter.' }
        ],
        stack: ['Node.js', 'Playwright', 'Moteur mathématique custom'],
        highlights: ['Lien → Données', 'Conformité AT', 'Coût en secondes'],
        metrics: [
          { value: '30min → 10s', label: 'Temps gagné' },
          { value: '100%', label: 'Conforme aux tables officielles' }
        ],
        ctaLabel: 'Voir le Projet'
      },
      {
        badge: 'Stratégie & Impact',
        headline: 'Projetoes — Soutien social, infrastructure digitale',
        subhead: "Accompagnement du lancement d'un foyer pour femmes en situation de vulnérabilité.",
        bullets: [
          { strong: 'Candidatures de financement', text: 'Identification et soumission de dossiers aux fonds européens et nationaux pour soutenir le projet.' },
          { strong: 'Partenariats internationaux', text: "Mise en relation de l’initiative avec des organisations étrangères pour échanger bonnes pratiques et énergies." },
          { strong: 'Roadmap digitale', text: 'Conception de la présence en ligne pour rendre le travail visible et réplicable.' }
        ],
        stack: ['Fonds UE', 'Stakeholder management', 'Stratégie digitale'],
        highlights: ['Fonds UE', 'Partenariats internationaux', 'Roadmap digitale'],
        metrics: [
          { value: 'Focus social', label: 'Mission' },
          { value: 'Standards B Corp', label: 'Cadre' }
        ],
        ctaLabel: 'Voir le Projet'
      },
      {
        badge: 'Automatisation IA',
        headline: 'Moteur de propositions commerciales',
        subhead: 'Données brutes en entrée. Un PDF prêt à envoyer au client en sortie.',
        bullets: [
          { strong: 'Structuration LLM', text: "Plusieurs annonces réelles entrent dans le pipeline et les modèles organisent tout dans un tableau comparatif." },
          { strong: 'Génération auto', text: 'Node.js et PDFKit produisent le document avec le branding déjà appliqué — personne n’ouvre Word.' },
          { strong: 'Coûts transparents', text: 'Le client voit la décomposition complète et compare les véhicules côte à côte avant de décider.' }
        ],
        stack: ['Claude API', 'Node.js', 'PDFKit', 'Multi-agent'],
        highlights: ['Scraping + LLM', 'Automatisation PDFKit', 'UI brandée'],
        metrics: [
          { value: 'Multi-agent', label: 'Architecture' },
          { value: 'PDF instantané', label: 'Output' }
        ],
        ctaLabel: 'Demander une démo'
      }
    ]
  },
  contact: {
    eyebrow: 'Construisons',
    headingTop: "Prêt à laisser",
    headingBottom: "l'IA travailler pour vous ?",
    description:
      "Disponible pour des postes en CDI, du conseil stratégique et des partenariats techniques. Si votre activité dépend encore de tâches manuelles et de copier-coller, mon objectif est simple : vous rendre votre temps et multiplier vos résultats.",
    cta: 'Discutons',
    locationCity: 'Basé à Paris',
    locationSub: "Disponible pour des projets dans toute l'Europe · Remote · Hybride"
  },
  footer: {
    left: '© 2026 Rui Moreira',
    right: 'Growth Operations & AI Automation'
  }
}

const pt = {
  nav: {
    experience: 'Percurso',
    skills: 'Stack',
    project: 'Projetos',
    contact: 'Contacto'
  },
  hero: {
    eyebrow: 'Portfolio · 2026',
    seeWork: 'Ver Projetos',
    contact: 'Contacto',
    blocks: [
      {
        title: 'Rui Moreira',
        subtitle: 'Um obcecado pelo que a IA pode realmente fazer',
        description:
          'Especialista em Marketing focado em transformar curiosidade técnica em vantagem competitiva. Traduzo as últimas inovações em Inteligência Artificial em resultados tangíveis e processos otimizados.'
      },
      {
        title: 'Visão Sem Fronteiras',
        subtitle: 'Itália · França · Polónia',
        description:
          'Três experiências internacionais que moldaram uma mentalidade adaptável e multicultural. Capacidade comprovada de operar e escalar negócios em diferentes contextos europeus.'
      },
      {
        title: 'Multilingue',
        subtitle: 'Fluência em 3 Idiomas',
        description:
          'Português nativo, com competência profissional em Inglês e Espanhol (B2). Conhecimentos base de Italiano e Francês (A1).',
        flags: [
          { code: 'pt', label: 'PT', level: 'Nativo' },
          { code: 'gb', label: 'EN', level: 'B2' },
          { code: 'es', label: 'ES', level: 'B2' }
        ]
      },
      {
        title: 'Eu Entrego, Não Apresento Slides',
        subtitle: 'Estratégia não vale nada sem código em produção',
        description:
          'Sou um marketer que aprendeu a programar porque esperar pela engenharia matava todas as ideias. Hoje prototipo, lanço e itero na mesma semana.'
      }
    ]
  },
  experience: {
    headingLeft: 'Onde tenho',
    headingRight: 'trabalhado',
    subtitle:
      'Nos últimos dois anos construí produto, fechei parcerias e automatizei tudo o que se podia automatizar. Setor automóvel, impacto social e IA.',
    items: [
      {
        role: 'Founder',
        company: 'ImportaSeguro',
        tag: 'Side Project',
        url: 'importaseguro.pt',
        period: 'JAN 2026 — PRESENTE',
        intro:
          'Plataforma que importa carros da Europa para Portugal. Faz scraping de anúncios, calcula custos reais (ISV, IUC, logística) e devolve a proposta em PDF. O processo costumava demorar 30 minutos a um stand. Agora demora 10 segundos.',
        bullets: [
          'Construí o negócio inteiro do zero: pesquisa de mercado, conceito, código, marketing e venda.',
          'Montei um pipeline de conteúdo no LinkedIn e Instagram que usa LLMs e agentes para gerar relatórios de mercado, carrosséis e posts educativos sem intervenção manual.',
          'Fechei parcerias com stands na Alemanha para abastecer o mercado português.'
        ]
      },
      {
        role: 'Business Development & Marketing',
        company: 'Impactrip (B Corp)',
        url: 'impactrip.com',
        program: 'AICEP — Programa INOV Contacto',
        period: 'DEZ 2024 — NOV 2025',
        bullets: [
          'Geri parcerias internacionais a partir de Roma e coordenei projetos de voluntariado em terreno.',
          'Construí o posicionamento B2B da marca e o plano de comunicação digital.'
        ]
      }
    ]
  },
  skills: {
    headingLeft: 'A stack',
    headingRight: 'que uso',
    subtitle: 'Ferramentas com que trabalho frequentemente. Passa o rato em qualquer ícone.',
    centerIdle: 'Skills',
    inner: [
      'B2B Development — Estratégia',
      'Parcerias Internacionais',
      'Automação de Processos',
      'Growth Ops — Performance'
    ],
    middle: [
      'Playwright — Scraping',
      'Remotion — Vídeo em código',
      'ALTAIR — Base de Dados',
      'Figma — Design',
      'Excel — Modelos Financeiros',
      'Meta Ads — Paid Social',
      'Google Ads — Paid Search',
      'Content Creation — Multi-formato'
    ],
    outer: [
      'n8n — Automação de fluxos',
      'Cursor — Editor com IA',
      'Claude Code — Pair Programming',
      'Nano Banana — Geração de Imagem',
      'Google Flow — Vídeo com IA',
      'Suno — Música com IA',
      'ElevenLabs — Voz com IA',
      'DeepSeek — LLM open-source',
      'Perplexity — Pesquisa com IA',
      'HiggsField — Vídeo com IA',
      'Manus.ai — Agente IA',
      'OpenAI — GPT & APIs'
    ]
  },
  projects: {
    eyebrow: 'Projetos em destaque',
    headingLeft: 'Coisas',
    headingRight: 'que construí.',
    subtitle:
      'Três frentes de trabalho: automação técnica, inovação social e IA generativa aplicada a operações comerciais.',
    cards: [
      {
        badge: 'IA & Scraping',
        headline: 'Simulador de importação automóvel',
        subhead: 'Pega num anúncio do mobile.de e devolve o custo total em Portugal. Em dez segundos.',
        bullets: [
          { strong: 'Scraping automático', text: 'Extrai dados do mobile.de — CO₂, cilindrada, preço base — sem intervenção manual.' },
          { strong: 'Conforme com a AT', text: 'Cruza os dados com as tabelas oficiais de ISV e IUC, incluindo os coeficientes de depreciação por idade.' },
          { strong: 'Custo total real', text: 'Soma logística, taxas aduaneiras e margem comercial. Devolve um número em que o cliente pode confiar.' }
        ],
        stack: ['Node.js', 'Playwright', 'Motor matemático próprio'],
        highlights: ['Link → Dados', 'Conformidade AT', 'Custo em segundos'],
        metrics: [
          { value: '30min → 10s', label: 'Tempo poupado' },
          { value: '100%', label: 'Conforme com tabelas oficiais' }
        ],
        ctaLabel: 'Ver Projeto'
      },
      {
        badge: 'Estratégia & Impacto',
        headline: 'Projetoes — Apoio social, infraestrutura digital',
        subhead: 'Apoio no lançamento de uma casa de abrigo para mulheres em situação de vulnerabilidade.',
        bullets: [
          { strong: 'Candidaturas a financiamento', text: 'Identifiquei e submeti candidaturas a fundos europeus e nacionais para sustentar o projeto.' },
          { strong: 'Parcerias internacionais', text: 'Liguei a iniciativa a entidades estrangeiras para trocar boas práticas e troca de energias.' },
          { strong: 'Roadmap digital', text: 'Desenhei a presença online para que o trabalho seja visível e replicável.' }
        ],
        stack: ['Fundos UE', 'Stakeholder management', 'Estratégia digital'],
        highlights: ['Fundos UE', 'Parcerias internacionais', 'Roadmap digital'],
        metrics: [
          { value: 'Foco social', label: 'Missão' },
          { value: 'Padrão B Corp', label: 'Framework' }
        ],
        ctaLabel: 'Ver Projeto'
      },
      {
        badge: 'Automação com IA',
        headline: 'Motor de propostas comerciais',
        subhead: 'Dados em bruto entram. Sai um PDF de proposta pronto a enviar ao cliente.',
        bullets: [
          { strong: 'Estruturação com LLM', text: 'Vários anúncios reais entram no pipeline e os modelos organizam tudo numa tabela comparativa.' },
          { strong: 'Geração automática', text: 'Node.js mais PDFKit produz o documento já com o branding aplicado, sem ninguém abrir o Word.' },
          { strong: 'Custos transparentes', text: 'O cliente vê a decomposição completa e compara viaturas lado a lado antes de decidir.' }
        ],
        stack: ['Claude API', 'Node.js', 'PDFKit', 'Multi-agente'],
        highlights: ['Scraping + LLM', 'Automação PDFKit', 'UI com branding'],
        metrics: [
          { value: 'Multi-agente', label: 'Arquitetura' },
          { value: 'PDF instantâneo', label: 'Output' }
        ],
        ctaLabel: 'Pedir Demo'
      }
    ]
  },
  contact: {
    eyebrow: 'Vamos construir',
    headingTop: 'Pronto para deixar',
    headingBottom: 'a IA trabalhar por ti?',
    description:
      'Disponível para posições full-time, consultoria estratégica e parcerias técnicas. Se o teu negócio ainda depende de tarefas manuais e copy-paste, o meu objetivo é simples: devolver-te o tempo e multiplicar os teus resultados.',
    cta: 'Falar Comigo',
    locationCity: 'Baseado em Paris',
    locationSub: 'Disponível para projetos em toda a Europa · Remoto · Híbrido'
  },
  footer: {
    left: '© 2026 Rui Moreira',
    right: 'Growth Operations & AI Automation'
  }
}

export const translations = { EN: en, FR: fr, PT: pt }
export const LANGUAGES = ['EN', 'FR', 'PT']
export const DEFAULT_LANG = 'EN'
