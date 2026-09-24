export type ServiceSlug =
  | "custom-development"
  | "ecommerce"
  | "design-studio"
  | "social-media-marketing"
  | "seo";

export interface TitleText {
  title: string;
  text: string;
}

export interface QA {
  q: string;
  a: string;
}

export interface Link {
  label: string;
  href: string;
}

export interface NavItem extends Link {
  dropdown?: boolean;
}

export interface Company {
  name: string;
  email: string;
  phones: string[];
  address: string;
  addressShort: string;
  mapsUrl: string;
  markets: string[];
  logo: string;
}

export interface Service {
  slug: ServiceSlug;
  route: string;
  number: string;
  title: string;
  accent: string;
  tagline: string;
  lead: string;
  menuLine: string;
  homeCardText: string;
  included: TitleText[];
  faqs: QA[];
  faqTitle: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  initials: string;
  quote: string;
}

export interface HomeContent {
  heroRotatingWords: string[];
  heroSub: string;
  intro: string;
  introHighlightWords: string[];
  facts: { value: string; label: string; text: string }[];
  platforms: string[];
  process: (TitleText & { chips: string[] })[];
  faqs: QA[];
  hero: {
    meta: string;
    titleLead: string;
    ctaPrimary: string;
    ctaSecondary: string;
    scrollHint: string;
    status: string;
    chips: { slug: ServiceSlug; label: string }[];
  };
  sections: {
    intro: { label: string; link: string };
    services: { label: string; title: string; titleAccent: string; text: string };
    platforms: { label: string[] };
    process: {
      label: string;
      title: string;
      titleAccent: string;
      finalLabel: string;
      finalTitle: string;
      finalCta: string;
    };
    faq: { label: string; title: string; link: string };
  };
  bento: {
    feed: { badge: string; event: string; time: string }[];
    seoQuery: string;
    seoDomain: string;
    seoTag: string;
  };
}

export interface TeamMember {
  name: string;
  ini: string;
  role: string;
  bio: string;
  /** Optional until the owner supplies them; icons render as inert placeholders without them. */
  linkedin?: string;
  email?: string;
  photo?: string;
}

export interface PageHeroCopy {
  crumb: string;
  title: string;
  titleAccent: string;
  lead: string;
}

export interface AboutContent {
  mission: string;
  vision: string;
  story: string;
  values: TitleText[];
  team: TeamMember[];
  page: {
    hero: PageHeroCopy & { ctaPrimary: string; ctaSecondary: string; coreLabel: string; foundingYear: string };
    story: { label: string; title: string; today: string };
    missionLabel: string;
    visionLabel: string;
    team: { label: string; title: string; titleAccent: string; text: string; photoPlaceholder: string };
    values: { label: string; title: string };
  };
}

interface FieldCopy {
  label: string;
  placeholder: string;
}

export interface ContactPageContent {
  hero: PageHeroCopy;
  form: {
    eyebrow: string;
    title: string;
    fields: {
      name: FieldCopy;
      email: FieldCopy;
      phone: FieldCopy;
      service: { label: string; default: string };
      message: FieldCopy;
    };
    consent: string;
    consentLink: string;
    submit: string;
    sending: string;
    errors: { name: string; email: string; phone: string; message: string; generic: string };
    success: { title: string; text: string; again: string };
  };
  info: { email: string; phone: string; office: string; hours: string; hoursValue: string };
  map: { label: string; title: string; sub: string; link: string; embedQuery: string };
  faqBanner: { title: string; text: string; cta: string };
}

export interface FaqItem extends QA {
  category: string;
}

export interface FaqPageContent {
  categories: string[];
  items: FaqItem[];
  page: {
    hero: PageHeroCopy & { searchLabel: string; searchPlaceholder: string };
    browseLabel: string;
    topicsLabel: string;
    askCard: { title: string; text: string; link: string };
    empty: { title: string; text: string; cta: string };
  };
}

export interface LegalSection {
  id: string;
  heading: string;
  paragraphs: string[];
}

export interface LegalDoc {
  title: string;
  crumb: string;
  lead: string;
  /** Last-updated date, e.g. "[DATE]" until the owner confirms it. */
  updated: string;
  sections: LegalSection[];
}

export interface ServicePageExtras {
  "custom-development": {
    configuratorModules: string[];
    products: TitleText[];
    commits: { hash: string; type: string; message: string }[];
    copy: {
      hero: { code: string; title: string; titleAccent: string; ctaPrimary: string; ctaSecondary: string; tags: string[] };
      configurator: {
        label: string;
        title: string[];
        text: string;
        modulesLabel: string;
        selected: string;
        groupLabel: string;
        cta: string;
        hubLabel: string;
        hubTitle: string;
        defaults: string[];
      };
      products: { label: string; title: string; titleAccent: string; apps: string[] };
      process: { label: string; title: string; text: string; command: string; branch: string };
    };
  };
  ecommerce: {
    activityFeed: { badge: string; event: string; platform: string; time: string }[];
    channels: { n: string; k: string; d: string; f: string[] }[];
    listingHotspots: TitleText[];
    journey: TitleText[];
    copy: {
      hero: {
        title: string;
        titleLine2: string;
        titleAccent: string;
        lead: string;
        ctaPrimary: string;
        ctaSecondary: string;
        activityLabel: string;
        live: string;
      };
      channels: {
        label: string;
        title: string[];
        text: string;
        tablistLabel: string;
        kinds: Record<string, string>;
        storeName: string;
        storeNav: string[];
        storeBanner: string;
        price: string;
      };
      listing: { label: string; title: string; titleAccent: string };
      journey: { label: string; title: string };
    };
  };
  "design-studio": {
    palettes: { name: string; colors: string[] }[];
    typePairings: { name: string; display: string; body: string; weight: string }[];
    marks: string[];
    processLayers: TitleText[];
    copy: {
      hero: { meta: string; lines: string[]; selTag: string; cursorLabel: string; leadSuffix: string; cta: string };
      playground: {
        label: string;
        title: string;
        text: string;
        nameLabel: string;
        defaultName: string;
        paletteLabel: string;
        typeLabel: string;
        markLabel: string;
        posterLabel: string;
        posterTagline: string;
        cardLabel: string;
        emailPrefix: string;
        emailFallback: string;
      };
      disciplines: {
        label: string;
        title: string;
        titleAccent: string;
        text: string;
        tileTitles: string[];
        brief: { label: string; title: string; cta: string };
      };
      layers: { label: string; title: string; panelLabel: string };
    };
  };
  "social-media-marketing": {
    weekCalendar: { d: string; items: { t: string; k: string }[] }[];
    funnel: { stage: string; text: string; channels: string }[];
    copy: {
      hero: {
        title: string;
        titleLine2: string;
        titleAccent: string;
        leadSuffix: string;
        ctaPrimary: string;
        ctaSecondary: string;
        posts: string[];
        notifs: { follower: string; campaign: string; email: string; sms: string; adBadge: string };
      };
      channels: {
        label: string;
        title: string[];
        text: string;
        cards: string[];
        ad: { query: string; sponsored: string; domain: string; headline: string };
        sms: string[];
        email: { sender: string; rows: { subject: string; time: string }[] };
      };
      calendar: {
        label: string;
        title: string;
        titleAccent: string;
        filterLabel: string;
        filters: { t: string; k: string }[];
        note: string;
      };
      funnel: { label: string; title: string };
    };
  };
  seo: {
    auditChecks: string[];
    serpHotspots: (TitleText & { tag: string })[];
    pillars: TitleText[];
    growthMilestones: TitleText[];
    copy: {
      hero: {
        title: string;
        titleAccent: string;
        lead: string;
        ctaPrimary: string;
        ctaSecondary: string;
        query: string;
        you: string;
        others: string[];
        climbing: string;
      };
      audit: {
        label: string;
        title: string;
        text: string;
        note: string;
        urlLabel: string;
        urlDefault: string;
        run: string;
        running: string;
        again: string;
        checksLabel: string;
        msgIdle: string;
        msgRunning: string;
        msgDone: string;
      };
      serp: {
        label: string;
        title: string;
        titleAccent: string;
        breadcrumb: string;
        resultTitle: string;
        resultDesc: string;
        rating: string;
        localName: string;
        localMeta: string;
        dotLabel: string;
      };
      path: { label: string; title: string; yLabel: string; xLabel: string };
    };
  };
}

export interface CtaContent {
  eyebrow: string;
  title: string;
  titleAccent: string;
  ringText: string;
  ringLabel: string;
  emailLabel: string;
  phoneLabel: string;
  visitLabel: string;
}

export interface TestimonialsSectionContent {
  label: string;
  titleLines: string[];
  titleAccent: string;
  text: string;
}

export interface SiteContent {
  company: Company;
  nav: NavItem[];
  footer: { tagline: string; company: Link[]; legal: Link[]; copyright: string };
  cta: CtaContent;
  testimonialsSection: TestimonialsSectionContent;
  services: Service[];
  home: HomeContent;
  testimonials: Testimonial[];
  about: AboutContent;
  faqPage: FaqPageContent;
  contactPage: ContactPageContent;
  legal: { privacy: LegalDoc; terms: LegalDoc; refund: LegalDoc };
  legalShared: { crumb: string; updatedLabel: string; tocLabel: string };
  servicePageExtras: ServicePageExtras;
  servicePageShared: { crumbServices: string; faqLabel: string; faqLink: string; otherLabel: string };
  notFound: {
    code: string;
    crumb: string;
    title: string;
    titleAccent: string;
    lead: string;
    ctaPrimary: string;
    ctaSecondary: string;
    servicesLabel: string;
  };
  sharedProcessSteps: TitleText[];
  whyUs: TitleText[];
}
