export type Locale = 'ru' | 'en';

export type ServicePackage = {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  idealFor: string;
  priceLabel: string;
  cta: string;
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
