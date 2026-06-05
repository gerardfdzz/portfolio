import { Injectable, inject, computed } from '@angular/core';
import { I18nService } from './i18n.service';
import { Experience, SkillCategory, Education, Project } from '../models/portfolio.model';
import { PORTFOLIO_CONFIG } from '../config';

const EXPERIENCE_STATIC = [
  {
    id: 'vueling-mid',
    company: 'Vueling (via Capitole)',
    location: 'Viladecans, Barcelona',
    tags: ['Angular 17', 'NgRx', 'TypeScript', 'Jasmine', 'Cypress', 'TestRail', 'CI/CD', 'Angular CDK', 'Scrum', 'Agile'],
    highlight: true,
  },
  {
    id: 'vueling-junior',
    company: 'Vueling (via Capitole)',
    location: 'El Prat de Llobregat, Barcelona',
    tags: ['RPA', 'Cognigy', 'Conversational AI', 'Angular'],
  },
  {
    id: 'vueling-intern',
    company: 'Vueling IT University',
    location: 'Barcelona',
    tags: ['Angular', 'TypeScript', 'HTML/CSS'],
  },
  {
    id: 'isadata-2',
    company: 'ISA DATA S.L.',
    location: 'Barcelona',
    tags: ['Web Development', 'HTML', 'CSS', 'JavaScript'],
  },
  {
    id: 'isadata-1',
    company: 'ISA DATA S.L.',
    location: 'Barcelona',
    tags: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    id: 'everis',
    company: 'Everis (NTT Data)',
    location: 'Barcelona',
    tags: ['Development', 'Consulting'],
  },
];

const SKILL_CATEGORIES_STATIC = [
  {
    id: 'core',
    icon: '⚡',
    skills: [
      { name: 'Angular 17', level: 92 },
      { name: 'TypeScript',  level: 90 },
      { name: 'NgRx',        level: 85 },
      { name: 'RxJS',        level: 80 },
      { name: 'Angular CDK', level: 78 },
    ],
  },
  {
    id: 'styling',
    icon: '🎨',
    skills: [
      { name: 'SCSS/CSS',             level: 88 },
      { name: 'HTML5',                level: 92 },
      { name: 'Responsive Design',    level: 85 },
      { name: 'Accessibility (a11y)', level: 75 },
    ],
  },
  {
    id: 'testing',
    icon: '🧪',
    skills: [
      { name: 'Cypress',  level: 80 },
      { name: 'Jasmine',  level: 75 },
      { name: 'TestRail', level: 90 },
    ],
  },
  {
    id: 'tooling',
    icon: '🛠',
    skills: [
      { name: 'Azure DevOps', level: 95 },
      { name: 'GitFlow',      level: 90 },
      { name: 'CI/CD',        level: 92 },
      { name: 'Scrum/Agile',  level: 88 },
    ],
  },
];

const PROJECTS_STATIC: Project[] = [
  {
    id: 'portfolio',
    title: 'gerardfg.dev',
    description: 'This portfolio. Angular 17 standalone components, Signals-based state, HttpClient i18n (EN/CA/ES), canvas particle system, and SCSS design system. Deployed on Vercel with Vercel Analytics.',
    stack: ['Angular 17', 'TypeScript', 'Signals', 'SCSS', 'i18n', 'Vercel'],
    githubUrl: PORTFOLIO_CONFIG.github,
    liveUrl:   PORTFOLIO_CONFIG.domain,
    status:    'live',
    featured:  true,
  },
  {
    id: 'xeic-runners',
    title: 'XEIC Runners',
    description: 'Angular application for managing and visualising running race results. Features real-time leaderboards, participant management, and responsive design for both organisers and athletes.',
    stack:     ['Angular', 'TypeScript', 'SCSS'],
    githubUrl: undefined,
    liveUrl:   undefined,
    status:    'wip',
    featured:  true,
  },
];

const EDUCATION_STATIC = [
  { institution: 'IFP Grupo Planeta',  period: '2020 - 2021' },
  { institution: 'IFP Grupo Planeta',  period: '2018 - 2020' },
  { institution: "Col·legi Tecla Sala", period: '2016 - 2018' },
];

@Injectable({ providedIn: 'root' })
export class PortfolioDataService {
  private i18n = inject(I18nService);

  readonly experiences = computed<Experience[]>(() => {
    const t = this.i18n.t();
    return EXPERIENCE_STATIC.map(exp => {
      const tr = t?.experience?.items?.[exp.id];
      return {
        id:          exp.id,
        company:     exp.company,
        location:    exp.location,
        tags:        [...exp.tags],
        highlight:   exp.highlight ?? false,
        role:        tr?.role        ?? '',
        period:      tr?.period      ?? '',
        duration:    tr?.duration    ?? '',
        description: tr?.description ?? '',
      } satisfies Experience;
    });
  });

  readonly skillCategories = computed<SkillCategory[]>(() => {
    const t = this.i18n.t();
    return SKILL_CATEGORIES_STATIC.map(cat => ({
      name:  t?.skills?.categories?.[cat.id]?.name ?? cat.id,
      icon:  cat.icon,
      skills: cat.skills.map(s => ({
        name:     s.name,
        level:    s.level,
        category: t?.skills?.categories?.[cat.id]?.name ?? cat.id,
      })),
    }) satisfies SkillCategory);
  });

  readonly projects = computed<Project[]>(() => PROJECTS_STATIC);

  readonly education = computed<Education[]>(() => {
    const t = this.i18n.t();
    return EDUCATION_STATIC.map((edu, i) => ({
      institution: edu.institution,
      period:      edu.period,
      degree:      t?.education?.items?.[i]?.degree ?? '',
    }) satisfies Education);
  });
}
