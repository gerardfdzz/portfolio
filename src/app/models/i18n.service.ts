import { Injectable, signal } from '@angular/core';

export type Lang = 'en' | 'ca' | 'es';

export interface ExperienceTranslation {
  role: string;
  period: string;
  duration: string;
  description: string;
}

export interface SkillCategoryTranslation {
  name: string;
}

export interface EducationTranslation {
  degree: string;
}

export interface Translations {
  nav: {
    about: string;
    experience: string;
    skills: string;
    contact: string;
    hireMe: string;
  };
  hero: {
    available: string;
    role: string;
    bio: string;
    viewExperience: string;
    getInTouch: string;
    stats: { value: string; label: string }[];
  };
  about: {
    label: string;
    titleLine1: string;
    titleLine2: string;
    p1: string;
    p2: string;
    p3: string;
    linkedinLabel: string;
    emailLabel: string;
    educationTitle: string;
    values: { icon: string; name: string; desc: string }[];
  };
  experience: {
    label: string;
    title: string;
    currentBadge: string;
    tabBadgeCurrent: string;
    items: Record<string, ExperienceTranslation>;
  };
  skills: {
    label: string;
    title: string;
    fullListLabel: string;
    tiers: { expert: string; proficient: string; familiar: string };
    categories: Record<string, SkillCategoryTranslation>;
  };
  projects: {
    label: string;
    title: string;
    statusLive: string;
    statusWip: string;
    liveDemo: string;
  };
  contact: {
    label: string;
    titleLine1: string;
    titleLine2: string;
    bio: string;
    ctaTitle: string;
    ctaText: string;
    ctaTags: string[];
    sendEmail: string;
    links: { label: string; desc: string }[];
    footer: string;
  };
  education: {
    items: EducationTranslation[];
  };
}

const cache: Partial<Record<Lang, Translations>> = {};

@Injectable({ providedIn: 'root' })
export class I18nService {
  private _lang = signal<Lang>(this.getInitialLang());
  private _translations = signal<Translations | null>(null);

  readonly lang = this._lang.asReadonly();
  readonly t = this._translations.asReadonly();

  readonly languages: { code: Lang; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'ca', label: 'CA' },
    { code: 'es', label: 'ES' },
  ];

  constructor() {
    this.loadTranslations(this._lang());
  }

  async setLang(lang: Lang) {
    this._lang.set(lang);
    localStorage.setItem('portfolio-lang', lang);
    document.documentElement.lang = lang;
    await this.loadTranslations(lang);
  }

  private async loadTranslations(lang: Lang) {
    if (cache[lang]) {
      this._translations.set(cache[lang]!);
      return;
    }
    try {
      const res = await fetch(`assets/i18n/${lang}.json`);
      const data: Translations = await res.json();
      cache[lang] = data;
      this._translations.set(data);
    } catch (e) {
      console.error(`[i18n] Failed to load translations for "${lang}"`, e);
    }
  }

  private getInitialLang(): Lang {
    const stored = localStorage.getItem('portfolio-lang') as Lang;
    if (stored && ['en', 'ca', 'es'].includes(stored)) return stored;
    const browser = navigator.language.slice(0, 2).toLowerCase();
    if (browser === 'ca') return 'ca';
    if (browser === 'es') return 'es';
    return 'en';
  }
}
