// English. Shape must stay identical to id.mjs — tests enforce it.

export default {
  common: {
    skip: 'Skip to main content',
    navLabel: 'Main navigation',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    currentLanguage: 'Current language',
    statusPrefix: 'Status',
    status: {
      live: 'Live',
      building: 'In development',
      validating: 'In validation',
      planned: 'Planned',
      method: 'Working framework',
      draft: 'Draft',
    },
    learnMore: 'Learn more',
    ogAlt: 'The AVERLYNT logo on a carbon background with a teal route line',
    map: {
      label: 'AVERLYNT ecosystem map: four connected capabilities',
      caption: 'Route-Frame: four capabilities, one working path.',
    },
    cta: {
      title: 'Start with one real need.',
      text: 'Tell us about the problem you want solved. We read every message as input for validating the next product.',
      primary: 'Contact AVERLYNT',
      secondary: 'Read our principles',
    },
  },

  nav: {
    home: 'Home',
    platform: 'Platform',
    capabilities: 'Capabilities',
    how: 'How it works',
    about: 'About',
    contact: 'Contact',
    start: 'Get started',
    signIn: 'Sign in',
    account: 'Account',
    repo: 'GitHub repository',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
  },

  footer: {
    tagline: 'An independent digital ecosystem connecting AI, automation, SaaS and digital commerce in one working path.',
    statusLine: 'The brand and website foundation is running. The first product is still being validated.',
    ecosystem: 'Ecosystem',
    capabilities: 'Capabilities',
    brand: 'AVERLYNT',
    legal: 'Legal',
    rights: 'All rights reserved.',
    origin: 'Built in Indonesia, prepared for a global market.',
  },

  capabilities: {
    ai: {
      name: 'AI',
      role: 'Understand context',
      summary: 'Intelligence for reading context, summarising information and supporting decisions. People stay in control.',
      status: 'validating',
      title: 'AI that helps you understand, without replacing judgement.',
      lede: 'The AI capability at AVERLYNT is aimed at reading context, organising information and supporting decisions in real work.',
      metaTitle: 'AI capability',
      metaDescription: 'The direction of the AVERLYNT AI capability: reading context, summarising information and supporting decisions, including benefits, limits and example uses.',
      description: [
        'AI is the understanding layer of the AVERLYNT ecosystem. Its role is to turn scattered information, such as notes, customer questions or operational data, into summaries and suggestions someone can act on.',
        'We treat AI as an assistant whose work can always be checked. Every output is designed to be reviewed by a person before it affects customers, money or important decisions.',
      ],
      benefits: [
        'Speeds up reading, summarising and first drafts.',
        'Helps surface patterns in more information than anyone can read line by line.',
        'Gives small teams a consistent starting point so they can move faster.',
      ],
      limits: [
        'AI models can be wrong, and can sound confident while wrong. Outputs need human review.',
        'Output quality depends on the quality of the data and context provided.',
        'No AVERLYNT AI feature is available to the public yet. This page describes a direction, not a finished product.',
        'Using third-party models can carry costs and privacy considerations that must be assessed case by case.',
      ],
      useCases: [
        { title: 'Customer conversation summaries', text: 'Summarising frequent questions so a business owner knows what most needs an answer.' },
        { title: 'Product content drafts', text: 'Drafting product descriptions from existing specifications, edited by a person before publishing.' },
        { title: 'Early opportunity research', text: 'Collecting and grouping research material as a starting point for discussion, not as a final conclusion.' },
      ],
      connects: 'AI provides understanding. Automation runs the next step, SaaS gives it a place to work, and Digital Commerce takes the result to market.',
    },
    automation: {
      name: 'Automation',
      role: 'Run the flow',
      summary: 'Repeatable workflows that run consistently, with clear control points that are easy to inspect.',
      status: 'validating',
      title: 'Repeatable work that runs consistently.',
      lede: 'Automation at AVERLYNT means designing workflows with a clear trigger, clear steps and a clear owner when an exception occurs.',
      metaTitle: 'Automation capability',
      metaDescription: 'The direction of the AVERLYNT Automation capability: consistent, controlled, repeatable workflows, including benefits, limits and example uses.',
      description: [
        'Automation is the execution layer. It takes steps that are already well understood and runs them repeatedly without relying on someone remembering.',
        'A good workflow starts as a manual process that already works. We do not automate a process nobody understands, because that only makes mistakes faster.',
      ],
      benefits: [
        'Reduces repetitive manual work that is easy to miss.',
        'Makes a process run the same way every time.',
        'Leaves a trail that can be inspected: what ran, when, and what happened.',
      ],
      limits: [
        'Automation is only as good as the process behind it. A messy process stays messy, just faster.',
        'Exceptions still need a human decision.',
        'No AVERLYNT automated workflow is available to the public today.',
        'Integrations depend on the access and limits of the other services involved.',
      ],
      useCases: [
        { title: 'Order follow-up', text: 'Sending confirmations and reminders in sequence after an order arrives, without anyone tracking each one.' },
        { title: 'Daily operations recap', text: 'Gathering key figures out of several sources into one summary at the same time each day.' },
        { title: 'Request routing', text: 'Forwarding incoming requests to the right person based on agreed rules.' },
      ],
      connects: 'Automation relies on understanding provided by AI, runs inside SaaS products, and keeps Digital Commerce operations tidy.',
    },
    saas: {
      name: 'SaaS',
      role: 'Ship as product',
      summary: 'Focused software that gives work a home: one problem, one clear product.',
      status: 'validating',
      title: 'Focused software for a clear problem.',
      lede: 'SaaS at AVERLYNT means software built for one validated problem, not a collection of features trying to serve everyone.',
      metaTitle: 'SaaS capability',
      metaDescription: 'The direction of the AVERLYNT SaaS capability: focused software for a validated problem, including benefits, limits and example uses.',
      description: [
        'SaaS is the product layer. It is where understanding provided by AI and flows built by Automation are packaged into something people can open, use and rely on every day.',
        'The first AVERLYNT SaaS product has not been defined. We would rather validate the problem first than announce a name and features nobody can use.',
      ],
      benefits: [
        'Gives a piece of work one clear home instead of spreading it across many tools.',
        'Works in a browser without a complicated installation.',
        'Can grow step by step as proven needs appear.',
      ],
      limits: [
        'No AVERLYNT SaaS product has launched. Its name, features and pricing have not been decided.',
        'A focused product will not fit every need. This is deliberate.',
        'An AVERLYNT account currently stores only a basic identity and does not unlock any product feature.',
      ],
      useCases: [
        { title: 'A workspace for one process', text: 'One compact application for one important process, such as order records for a small business.' },
        { title: 'Operations dashboard', text: 'A simple view showing how the business is doing today without opening many sources.' },
        { title: 'Internal team tool', text: 'A small tool replacing a spreadsheet that has become too complicated to maintain.' },
      ],
      connects: 'SaaS is home to AI as well as Automation, and it is the form offered to buyers through Digital Commerce.',
    },
    commerce: {
      name: 'Digital Commerce',
      role: 'Reach the market',
      summary: 'The ability to package value into an offer, sell it digitally and run the operation behind it.',
      status: 'validating',
      title: 'Turning value into digital business activity.',
      lede: 'Digital Commerce at AVERLYNT covers packaging an offer, reaching buyers and running sales operations digitally.',
      metaTitle: 'Digital Commerce capability',
      metaDescription: 'The direction of the AVERLYNT Digital Commerce capability: packaging offers, reaching buyers and running digital sales operations step by step.',
      description: [
        'Digital Commerce is the market layer. It makes sure something valuable actually reaches a buyer: clearly packaged, easy to find and possible to purchase.',
        'We see commerce as a complete operation, starting at the offer and continuing through service after purchase, not only a payment page.',
      ],
      benefits: [
        'Helps package a product or service into an offer people understand.',
        'Opens a digital sales path that can be measured and improved.',
        'Connects sales to operations so growth does not add chaos.',
      ],
      limits: [
        'AVERLYNT does not process payments and does not sell any product yet.',
        'Sales outcomes depend on the product, the market and execution. There is no revenue promise.',
        'Payments, tax and consumer protection carry rules to meet before selling begins.',
      ],
      useCases: [
        { title: 'Digital product offer', text: 'Packaging expertise or a tool into a digital product, presented on a clear offer page.' },
        { title: 'Simple online catalogue', text: 'Presenting products in a tidy, informative way so potential buyers can decide faster.' },
        { title: 'Post-purchase operations', text: 'Preparing confirmation, delivery and service flows so the buyer experience stays consistent.' },
      ],
      connects: 'Digital Commerce takes the results of AI, Automation plus SaaS to market, then returns buyer feedback as input for improvement.',
    },
  },

  steps: {
    discover: {
      name: 'Discover',
      local: 'Find the need',
      summary: 'Understand the problem, the context and the outcome wanted.',
      detail: 'We start by talking and observing: who has the problem, how often, and what happens if nothing changes.',
      output: 'A clear problem statement.',
    },
    validate: {
      name: 'Validate',
      local: 'Test assumptions',
      summary: 'Confirm the problem is real before building anything.',
      detail: 'Assumptions are tested in the cheapest way still honest, such as interviews, a manual trial or a simple offer page.',
      output: 'A decision to continue, change direction or stop.',
    },
    design: {
      name: 'Design',
      local: 'Design the system',
      summary: 'Shape the flow, the roles and the limits of the solution.',
      detail: 'The solution is designed as a system: which parts need AI, which only need automating, and which stay in human hands.',
      output: 'A flow design plus a defined scope.',
    },
    build: {
      name: 'Build',
      local: 'Build in steps',
      summary: 'Build the smallest version of real use.',
      detail: 'Building happens in increments, tested at each step, so every version can be used and judged.',
      output: 'A working, tested version.',
    },
    operate: {
      name: 'Operate',
      local: 'Put it to work',
      summary: 'Run the solution in day-to-day work.',
      detail: 'The solution is used under real conditions and clear control: who monitors, what is recorded, and when a person takes over.',
      output: 'A running, monitored operation.',
    },
    improve: {
      name: 'Improve',
      local: 'Make it better',
      summary: 'Learn through use, then improve the next step.',
      detail: 'Usage data plus feedback is collected to decide what to fix, add or remove.',
      output: 'A prioritised list of improvements.',
    },
  },

  pages: {
    home: {
      title: 'AVERLYNT — AI, Automation, SaaS and Digital Commerce',
      description: 'AVERLYNT is an independent digital ecosystem connecting AI, automation, SaaS and digital commerce to turn ideas into systems that work.',
      eyebrow: 'Independent digital ecosystem',
      h1: 'Turn ideas into systems that work.',
      lede: 'AVERLYNT connects AI, automation, SaaS and digital commerce in one working path, so a business need can move all the way to real operations.',
      primary: 'Explore the platform',
      secondary: 'See how it works',
      note: 'The foundation is being built. The first product is still in validation.',
      value: {
        label: 'Core value',
        title: 'One path, not a pile of tools.',
        intro: 'Many businesses own good tools they cannot connect. AVERLYNT is designed so each capability strengthens the others.',
        items: [
          { title: 'Start at the need', text: 'Every piece of work begins with a real business problem, not a technology trend or a feature list.' },
          { title: 'Connected early', text: 'Understanding, execution, product and market are designed as one system, so nothing has to be bolted together later.' },
          { title: 'Built in stages', text: 'Capabilities are introduced once validated. If something does not exist yet, we say so.' },
        ],
      },
      capabilities: {
        label: 'Four capabilities',
        title: 'Four capabilities, one ecosystem.',
        intro: 'Each one has a clear role. Together they form a path leading to market.',
      },
      how: {
        label: 'How it works',
        title: 'From need to improvement.',
        intro: 'These six stages form our working framework. Today they run manually; they have not been built into an automated system.',
        link: 'Read every stage',
      },
      useCases: {
        label: 'Example applications',
        title: 'Who may find this direction relevant.',
        intro: 'Three sketches of the kinds of need we want to serve.',
        items: [
          { who: 'Small business owners', title: 'Tidier operations', text: 'Reducing repetitive work such as order recaps and customer follow-up, so time goes back to what matters.' },
          { who: 'Digital product founders', title: 'Idea to first version', text: 'Validating the problem, defining the scope, then building the smallest version worth testing in the market.' },
          { who: 'Creators and solo operators', title: 'Expertise into an offer', text: 'Packaging expertise into a digital product, backed by a sales path you can measure.' },
        ],
        note: 'Every example above is illustrative. None is a case study, a testimonial or a result achieved for a real client.',
      },
      status: {
        label: 'Development status',
        title: 'What exists, what does not.',
        intro: 'We draw a firm line between what is running today and what is still planned.',
        items: [
          { title: 'Brand and website foundation', text: 'The visual identity, the bilingual website and the documentation are publicly available.', status: 'live' },
          { title: 'AVERLYNT account', text: 'Sign-in and sign-up work today. An account does not unlock any product feature yet.', status: 'live' },
          { title: 'Four capabilities', text: 'The direction for AI, Automation, SaaS plus Digital Commerce is defined. None has shipped as a product.', status: 'validating' },
          { title: 'First commercial product', text: 'Its name, features and pricing have not been decided. The decision waits on validating real needs.', status: 'validating' },
          { title: 'Contact form and official email', text: 'Not available yet. For now, contact happens through GitHub.', status: 'planned' },
        ],
      },
    },

    platform: {
      title: 'Platform',
      description: 'How AI, automation, SaaS and digital commerce connect inside the AVERLYNT ecosystem, including the principles and limits in place today.',
      eyebrow: 'Platform',
      h1: 'Four capabilities designed as one system.',
      lede: 'The AVERLYNT platform is not one large application. It is a way of arranging understanding, execution, product and market so they strengthen each other.',
      model: {
        label: 'Ecosystem model',
        title: 'Route-Frame: a path inside a frame.',
        intro: 'Each capability is a node. The value comes through the route connecting those nodes.',
        paragraphs: [
          'AI reads context and produces understanding. Automation turns it into steps running repeatedly. SaaS gives both a product form people can use every day. Digital Commerce takes the product to market.',
          'The route does not stop at the market. Buyer feedback returns as new context for AI, so the system keeps improving. It is why our map is a loop, not a straight line.',
        ],
      },
      links: {
        label: 'How capabilities connect',
        title: 'How one capability strengthens another.',
        intro: 'The four main connections in the ecosystem.',
        to: 'to',
        items: [
          { from: 'ai', to: 'automation', text: 'Understanding sets the step. What AI reads becomes the trigger and input of an automated flow.' },
          { from: 'automation', to: 'saas', text: 'A proven flow is packaged as a product feature, so it can be used without technical help.' },
          { from: 'saas', to: 'commerce', text: 'A clear product can be offered, sold and supported through digital channels.' },
          { from: 'commerce', to: 'ai', text: 'Buyer feedback and behaviour become new context to understand and improve on.' },
        ],
      },
      principles: {
        label: 'Design principles',
        title: 'Principles keeping the platform on course.',
        items: [
          { title: 'People stay in control', text: 'AI and automation assist. Decisions carrying real impact stay in human hands.' },
          { title: 'Modular', text: 'Each capability can be used alone, then connected once the need is proven.' },
          { title: 'Lowest possible starting cost', text: 'Infrastructure is chosen so work can start at no cost, then scale once a real need appears.' },
          { title: 'Open about limits', text: 'Every capability is written up alongside its limits, so expectations stay reasonable.' },
        ],
      },
      boundaries: {
        label: 'Current limits',
        title: 'What the platform does not include yet.',
        intro: 'To avoid any misunderstanding, here is what is not available.',
        items: [
          'No dashboard, application or programming interface is open to the public.',
          'No active integration exists beyond the account sign-in service.',
          'No AI agent or automated workflow runs on behalf of users.',
          'No pricing, plans or payment process exists.',
        ],
      },
    },

    capabilities: {
      title: 'Capabilities',
      description: 'The four core AVERLYNT capabilities: AI, Automation, SaaS and Digital Commerce. Each page covers a description, benefits, limits and example uses.',
      eyebrow: 'Capabilities',
      h1: 'The four core AVERLYNT capabilities.',
      lede: 'Each capability is described plainly: its role, its benefits, its limits and reasonable example uses.',
      list: {
        label: 'Capability list',
        title: 'Choose a capability to read the detail.',
        intro: 'All four are in validation. None has shipped as a product.',
      },
      note: 'Capabilities describe the direction AVERLYNT is developing in. Feature availability will be announced on this page once something has actually shipped.',
    },

    capability: {
      statusNote: 'This capability is still being validated and is not available as a product.',
      description: { label: 'Description', title: 'What this capability does.' },
      benefits: { label: 'Benefits', title: 'The benefits we aim for.' },
      limits: { label: 'Limits', title: 'Limits worth knowing.' },
      useCases: { label: 'Example uses', title: 'Reasonable example uses.' },
      useCasesNote: 'Examples are illustrative and not available as features.',
      connects: { label: 'Connections', title: 'How it relates to other capabilities.' },
    },

    how: {
      title: 'How it works',
      description: 'The six AVERLYNT working stages: Discover, Validate, Design, Build, Operate and Improve, including a plain account of what runs today.',
      eyebrow: 'How it works',
      h1: 'Six stages leading a need to improvement.',
      lede: 'This framework keeps everything we build grounded in a real need, and keeps it improving after it is in use.',
      outputLabel: 'Output: ',
      flow: {
        label: 'Workflow',
        title: 'Every stage has a clear output.',
        intro: 'The next stage only begins once the previous output exists.',
      },
      honesty: {
        label: 'Where things stand',
        title: 'How much of the flow runs today.',
        intro: 'The flow above is a working method, not a finished automated system.',
        items: [
          { title: 'Six working stages', text: 'Used as the framework for building AVERLYNT itself, including the website you see here. Run manually.', status: 'method' },
          { title: 'Automation between stages', text: 'Does not exist yet. Moving on to the next stage is still done by people.', status: 'planned' },
          { title: 'Self-serve tooling', text: 'No tool exists yet for someone to run the flow alone.', status: 'planned' },
        ],
      },
    },

    about: {
      title: 'About',
      description: 'The identity, principles and direction of AVERLYNT as an independent digital brand starting in Indonesia, including downloadable brand assets.',
      eyebrow: 'About',
      h1: 'An independent brand for building real digital systems.',
      lede: 'AVERLYNT starts in Indonesia on a course ready to extend to a global market. We are building its foundation in the open, step by step.',
      identity: {
        label: 'Identity',
        title: 'Who AVERLYNT is today.',
        paragraphs: [
          'AVERLYNT is an independent digital brand at an early stage. Today it consists of a brand identity, the website you see here and a product direction under validation.',
          'We have no grand story to sell. No customers, growth figures or awards exist to display, so we display none.',
          'What we do have is a clear direction: connecting AI, automation, SaaS and digital commerce into one ecosystem helping ideas become systems that work.',
        ],
      },
      principles: {
        label: 'Principles',
        title: 'The principles we hold to.',
        items: [
          { title: 'Honest about status', text: 'What runs is called running. What is still a plan is called a plan.' },
          { title: 'Precise', text: 'Every decision, down to each word or line, needs a reason.' },
          { title: 'Independent', text: 'The identity, language and product direction are built in-house, not copied off another brand.' },
          { title: 'Incremental', text: 'Build a little, test each step, then continue.' },
          { title: 'Lean early on', text: 'Start without infrastructure cost for as long as possible, then invest once the need is proven.' },
          { title: 'Indonesia first', text: 'Indonesian is the primary language of the website. English is available for global reach.' },
        ],
      },
      not: {
        label: 'Claim limits',
        title: 'What we do not claim.',
        items: [
          'We do not claim to have customers, partners or testimonials.',
          'We do not claim user numbers, revenue or performance figures.',
          'We do not claim the AVERLYNT name has been filed as a trademark or has passed legal clearance.',
          'We do not claim compliance against any particular standard or regulation.',
        ],
      },
      brand: {
        label: 'Brand assets',
        title: 'The AVERLYNT logo.',
        intro: 'The AVERLYNT symbol is a letter A drawn as a frame, crossed by a route line ending in a single signal node.',
        download: 'Download SVG',
        note: 'The AVERLYNT name and logo have not been filed as a trademark and have not been through legal clearance. Full usage guidance lives in the DESIGN.md file in the repository.',
        assets: {
          symbol: 'AVERLYNT symbol',
          horizontal: 'Horizontal logo for dark backgrounds',
          stacked: 'Stacked logo for dark backgrounds',
          horizontalLight: 'Horizontal logo for light backgrounds',
        },
      },
    },

    contact: {
      title: 'Contact',
      description: 'How to reach AVERLYNT today. One contact channel is live through GitHub, while an official email address and a contact form are still planned.',
      eyebrow: 'Contact',
      h1: 'Contact AVERLYNT.',
      lede: 'We are validating the first product. Hearing about what you need is the most valuable input we can get right now.',
      channels: {
        label: 'Contact channels',
        title: 'Channels available today.',
        intro: 'Only one channel is live. We show the others as they stand, so their status is clear.',
        cta: 'Open GitHub Issues',
        items: [
          { title: 'GitHub Issues', text: 'Write your question or need as an issue in the AVERLYNT repository. A GitHub account is required, and issues can be read publicly.', status: 'live' },
          { title: 'Official email', text: 'An official email address has not been set up yet. We do not publish an address nobody monitors.', status: 'planned' },
          { title: 'Contact form', text: 'A form has not been set up yet, because storing and delivering messages has not been built. We do not show a form sending nothing.', status: 'planned' },
        ],
      },
      notice: 'GitHub Issues is public. Do not post personal data, passwords or confidential business information there.',
      prepare: {
        label: 'Before you write',
        title: 'Information helping us understand what you need.',
        items: [
          'The problem you want solved, in one or two sentences.',
          'Who experiences it, and how often.',
          'How you handle it today.',
          'The outcome you expect once the problem is solved.',
        ],
      },
    },

    account: {
      title: 'Account',
      description: 'Sign in or create an AVERLYNT account. Authentication is handled by Clerk, and an account currently stores only a basic identity without product features.',
      eyebrow: 'Account',
      h1: 'AVERLYNT account.',
      lede: 'An account is the foundation for products to come. Today it only lets you sign in and manage a basic identity.',
      loading: 'Checking session…',
      signedOut: {
        title: 'Sign in or create an account',
        text: 'Sign-in happens on a secure page run by Clerk at accounts.averlynt.biz.id. Once finished, you return here.',
        signIn: 'Sign in',
        signUp: 'Create account',
      },
      signedIn: {
        title: 'You are signed in',
        name: 'Name',
        email: 'Email',
        session: 'Session',
        checking: 'Verifying on the server…',
        verified: 'Verified by the server',
        unverified: 'Could not be verified by the server',
        manage: 'Manage account',
        signOut: 'Sign out',
        note: 'No product feature, subscription or payment is connected to the account yet.',
      },
      unavailable: {
        title: 'Sign-in only works on the main domain',
        text: 'You opened a preview address. Authentication is only active on averlynt.biz.id.',
        cta: 'Open on averlynt.biz.id',
      },
      error: {
        title: 'The sign-in service could not load',
        text: 'Check your connection, then reload the page. If the problem continues, reach us through the Contact page.',
      },
      notice: 'Account data is stored by Clerk as the authentication provider. Details are described in the draft Privacy Policy.',
    },

    legal: {
      eyebrow: 'Legal',
      updated: 'Last updated 26 November 2026.',
      draft: 'This document is a draft. It describes current practice on the website, has not been reviewed by legal counsel, and is not a statement of compliance against any regulation.',
    },

    privacy: {
      title: 'Privacy Policy',
      description: 'The draft AVERLYNT Privacy Policy: what data the website processes, which service providers are involved, and the limits of a document still in draft.',
      h1: 'Privacy Policy',
      lede: 'A short explanation of the data processed when you use the website.',
      sections: [
        {
          title: 'Scope',
          paragraphs: ['This document applies to the website averlynt.biz.id. The website contains brand information and an account sign-in service. No paid product exists yet.'],
        },
        {
          title: 'Data processed',
          paragraphs: [
            'If you only read the website, we ask for no personal data. The website carries no advertising trackers or third-party analytics, and fonts load directly off its own server.',
            'If you create an account or sign in, our authentication provider processes basic identity data such as your name, email address and profile photo supplied by the sign-in method you choose.',
          ],
        },
        {
          title: 'Cookies',
          paragraphs: ['The website only uses cookies needed to keep you signed in. Those cookies are set by the authentication service when you sign in.'],
        },
        {
          title: 'Service providers',
          paragraphs: [
            'The website is hosted on Cloudflare, which may log technical data such as IP addresses for content delivery and security.',
            'Authentication is handled by Clerk. Your account data is stored in Clerk systems and is subject to their privacy policy.',
            'If you reach us through GitHub Issues, your data is processed by GitHub under their policies.',
          ],
        },
        {
          title: 'Choices you have',
          paragraphs: ['You can ask for account deletion through the Contact page. Because the document is still a draft, a formal procedure for data requests has not been defined.'],
        },
        {
          title: 'Changes',
          paragraphs: ['This document will be updated when the product or the way data is processed changes. The update date appears near the top of the page.'],
        },
      ],
    },

    terms: {
      title: 'Terms of Service',
      description: 'The draft AVERLYNT Terms of Service: the status of the website, account use, intellectual property and limits of liability at an early stage.',
      h1: 'Terms of Service',
      lede: 'Basic terms for using the website at an early stage.',
      sections: [
        {
          title: 'Service status',
          paragraphs: ['The website is the AVERLYNT brand foundation. No paid product or service is offered yet, so no commercial agreement arises through using it.'],
        },
        {
          title: 'Using the website',
          paragraphs: ['You may read and share the content here. You may not use it for unlawful purposes or attempt to disrupt its operation.'],
        },
        {
          title: 'Accounts',
          paragraphs: ['You are responsible for keeping your sign-in method secure. An account currently gives access to no product feature, and we may change or discontinue the account service during the early stage.'],
        },
        {
          title: 'Intellectual property',
          paragraphs: ['The AVERLYNT name, logo and content belong to the operator of AVERLYNT. The name and logo have not been filed as a trademark. The fonts in use are licensed under the SIL Open Font License.'],
        },
        {
          title: 'No warranty',
          paragraphs: ['Information on the website is provided as is and describes a development direction. It is not a promise of feature availability, schedule or any particular outcome.'],
        },
        {
          title: 'Changes',
          paragraphs: ['These terms will be updated before the first product launches. The update date appears near the top of the page.'],
        },
      ],
    },

    notFound: {
      label: 'Page not found',
      title: 'Page not found',
      text: 'The address you opened is not available or has been moved.',
      cta: 'Back to home',
    },
  },
};
