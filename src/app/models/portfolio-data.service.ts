import { Injectable } from '@angular/core';
import { Experience, SkillCategory, Education } from '../models/portfolio.model';

@Injectable({ providedIn: 'root' })
export class PortfolioDataService {

  readonly experiences: Experience[] = [
    {
      id: 'vueling-mid',
      role: 'Mid Frontend Developer',
      company: 'Vueling (via Capitole)',
      period: 'Mar 2023 — Present',
      duration: '3+ years',
      location: 'Viladecans, Barcelona',
      description: 'Working within a product-focused team responsible for delivering commercial web solutions for one of Europe\'s leading airlines. Developing and optimizing ancillary services features with strong focus on performance, accessibility, and user experience. Integrated reusable components and built Angular CDK libraries to reduce duplication across the platform. Active participant in CI/CD pipelines, production deployments, and Agile/Scrum ceremonies.',
      tags: ['Angular 17', 'NgRx', 'TypeScript', 'Jasmine', 'Cypress', 'TestRail', 'CI/CD', 'Angular CDK', 'Scrum', 'Agile'],
      highlight: true
    },
    {
      id: 'vueling-junior',
      role: 'Junior CI & RPA Developer',
      company: 'Vueling (via Capitole)',
      period: 'Sep 2022 — Mar 2023',
      duration: '7 months',
      location: 'El Prat de Llobregat, Barcelona',
      description: 'Worked on Conversational Intelligence and Robotics Process Automation projects within the Vueling digital ecosystem. Supported automation workflows and contributed to the conversational layer using Cognigy.',
      tags: ['RPA', 'Cognigy', 'Conversational AI', 'Angular'],
    },
    {
      id: 'vueling-intern',
      role: 'Junior Frontend Angular Developer',
      company: 'Vueling IT University',
      period: 'Jun 2022 — Sep 2022',
      duration: '4 months',
      location: 'Barcelona',
      description: 'Onboarding into Vueling\'s tech stack through the IT University programme. Participated in the preparation and integration of multimedia materials into web applications following design team guidelines.',
      tags: ['Angular', 'TypeScript', 'HTML/CSS'],
    },
    {
      id: 'isadata-2',
      role: 'Development Intern',
      company: 'ISA DATA S.L.',
      period: 'Dec 2021 — Mar 2022',
      duration: '4 months',
      location: 'Barcelona',
      description: 'Full-stack web development internship. Collaborated on web application maintenance and new feature development.',
      tags: ['Web Development', 'HTML', 'CSS', 'JavaScript'],
    },
    {
      id: 'isadata-1',
      role: 'Web Development Intern',
      company: 'ISA DATA S.L.',
      period: 'Feb 2021 — Jun 2021',
      duration: '5 months',
      location: 'Barcelona',
      description: 'First professional web development experience. Contributed to development and maintenance of computer applications in web environments.',
      tags: ['HTML', 'CSS', 'JavaScript'],
    },
    {
      id: 'everis',
      role: 'Development Intern',
      company: 'Everis (NTT Data)',
      period: 'Feb 2020 — Mar 2020',
      duration: '2 months',
      location: 'Barcelona',
      description: 'Early career internship at a leading technology consulting firm. First exposure to enterprise development workflows.',
      tags: ['Development', 'Consulting'],
    }
  ];

  readonly skillCategories: SkillCategory[] = [
    {
      name: 'Core',
      icon: '⚡',
      skills: [
        { name: 'Angular 17', level: 92, category: 'Core' },
        { name: 'TypeScript', level: 90, category: 'Core' },
        { name: 'NgRx', level: 85, category: 'Core' },
        { name: 'RxJS', level: 80, category: 'Core' },
        { name: 'Angular CDK', level: 78, category: 'Core' },
      ]
    },
    {
      name: 'Styling',
      icon: '🎨',
      skills: [
        { name: 'SCSS/CSS', level: 88, category: 'Styling' },
        { name: 'HTML5', level: 92, category: 'Styling' },
        { name: 'Responsive Design', level: 85, category: 'Styling' },
        { name: 'Accessibility (a11y)', level: 75, category: 'Styling' },
      ]
    },
    {
      name: 'Testing',
      icon: '🧪',
      skills: [
        { name: 'Cypress', level: 80, category: 'Testing' },
        { name: 'Jasmine', level: 75, category: 'Testing' },
        { name: 'TestRail', level: 90, category: 'Testing' },
      ]
    },
    {
      name: 'Tooling',
      icon: '🛠',
      skills: [
        { name: 'Azure DevOps', level: 95, category: 'Tooling' },
        { name: 'GitFlow', level: 90, category: 'Tooling' },
        { name: 'CI/CD', level: 92, category: 'Tooling' },
        { name: 'Scrum/Agile', level: 88, category: 'Tooling' },
      ]
    }
  ];

  readonly education: Education[] = [
    {
      degree: 'CFGS — Web Application Development (DAW)',
      institution: 'IFP Grupo Planeta',
      period: '2020 – 2021'
    },
    {
      degree: 'CFGS — Multiplatform Application Development (DAM)',
      institution: 'IFP Grupo Planeta',
      period: '2018 – 2020'
    },
    {
      degree: 'Technological Baccalaureate',
      institution: 'Col·legi Tecla Sala',
      period: '2016 – 2018'
    }
  ];
}
