export type Locale = 'ru' | 'en';

export type ServiceBranch = 'polstan' | 'real-vibe' | 'shared';

export type ServiceUseCase = {
  title: string;
  description: string;
};

export type ServiceOffer = {
  id: string;
  title: string;
  priceLabel: string;
  description: string;
};

export type ServicePackage = {
  id: string;
  slug: string;
  title: string;
  cardTitle: string;
  cardBenefit: string;
  description: string;
  deliverables: string[];
  idealFor: string;
  priceLabel: string;
  cta: string;
  media: string;
  branch: ServiceBranch;
  useCases: ServiceUseCase[];
  formats: string[];
  whatYouGet: string[];
  offers?: ServiceOffer[];
};

export type DropProduct = {
  id: string;
  title: string;
  type: string;
  media: string;
  status: string;
  availabilityLabel: string;
  cta: string;
};

export type LeadIntent = {
  locale: Locale;
  source: string;
  selectedOffering: string;
  selectedOfferings?: Array<{
    title: string;
    priceLabel?: string;
  }>;
  name: string;
  contact: string;
  message: string;
  budgetRange: string;
  timeline: string;
  roistatVisit?: string;
};

export type SiteContent = {
  locale: Locale;
  meta: {
    title: string;
    description: string;
  };
  nav: {
    home: string;
    services: string;
    drops: string;
    contact: string;
  };
  hero: {
    name: string;
    role: string;
    body: string;
    primaryCta: string;
    secondaryCta: string;
    status: string;
  };
  servicesIntro: {
    title: string;
    body: string;
  };
  services: ServicePackage[];
  proof: {
    title: string;
    body: string;
    points: string[];
  };
  dropsIntro: {
    title: string;
    body: string;
  };
  drops: DropProduct[];
  contact: {
    title: string;
    body: string;
    telegramCta: string;
    submitCta: string;
    success: string;
    fields: {
      selectedOffering: string;
      name: string;
      contact: string;
      budgetRange: string;
      timeline: string;
      message: string;
    };
    placeholders: {
      name: string;
      contact: string;
      message: string;
    };
    options: {
      budget: string[];
      timeline: string[];
    };
  };
};
