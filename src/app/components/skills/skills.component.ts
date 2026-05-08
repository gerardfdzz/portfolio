import {
  Component, inject, signal,
  ElementRef, OnDestroy, NgZone, effect, untracked
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../models/portfolio-data.service';
import { I18nService } from '../../models/i18n.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnDestroy {
  i18n  = inject(I18nService);
  private host = inject(ElementRef<HTMLElement>);
  private zone = inject(NgZone);

  readonly skillCategories = inject(PortfolioDataService).skillCategories;
  readonly visibleCards    = signal<Set<number>>(new Set());
  readonly animatedBars    = signal<Set<string>>(new Set());

  private cardObserver: IntersectionObserver | null = null;
  private barObserver:  IntersectionObserver | null = null;
  private initTimeout:  ReturnType<typeof setTimeout> | null = null;

  readonly allTech = [
    'Angular 17', 'TypeScript', 'NgRx', 'RxJS', 'Angular CDK',
    'SCSS', 'HTML5', 'CSS3', 'JavaScript', 'Java',
    'Cypress', 'Jasmine', 'TestRail',
    'Azure DevOps', 'GitFlow', 'Git', 'CI/CD',
    'Scrum', 'Agile', 'Cognigy'
  ];

  constructor() {
    effect(() => {
      const t = this.i18n.t();
      if (!t) return;

      untracked(() => {
        if (this.initTimeout) clearTimeout(this.initTimeout);
        this.initTimeout = setTimeout(() => {
          this.zone.runOutsideAngular(() => {
            this.disconnectObservers();
            this.setupCardObserver();
            this.setupBarObserver();
          });
        }, 50);
      });
    });
  }

  ngOnDestroy() {
    if (this.initTimeout) clearTimeout(this.initTimeout);
    this.disconnectObservers();
  }

  private disconnectObservers() {
    this.cardObserver?.disconnect();
    this.barObserver?.disconnect();
    this.cardObserver = null;
    this.barObserver  = null;
  }

  private setupCardObserver() {
    const cards = Array.from(
      this.host.nativeElement.querySelectorAll('[data-card-index]')
    ) as HTMLElement[];
    if (!cards.length) return;

    this.cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const idx = Number((entry.target as HTMLElement).dataset['cardIndex']);
          this.zone.run(() => {
            this.visibleCards.update(s => {
              const next = new Set(s);
              entry.isIntersecting ? next.add(idx) : next.delete(idx);
              return next;
            });
          });
        });
      },
      { threshold: 0.1 }
    );

    cards.forEach((card: HTMLElement) => this.cardObserver!.observe(card));
  }

  private setupBarObserver() {
    const items = Array.from(
      this.host.nativeElement.querySelectorAll('[data-bar-key]')
    ) as HTMLElement[];
    if (!items.length) return;

    this.barObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const el  = entry.target as HTMLElement;
          const key = el.dataset['barKey'] ?? '';

          const exitedAbove = !entry.isIntersecting && entry.boundingClientRect.top > 0;

          this.zone.run(() => {
            this.animatedBars.update(s => {
              const next = new Set(s);
              if (entry.isIntersecting) {
                next.add(key);
              } else if (exitedAbove) {
                next.delete(key);
              }
              return next;
            });
          });
        });
      },
      { threshold: 0.3 }
    );

    items.forEach((item: HTMLElement) => this.barObserver!.observe(item));
  }

  isCardVisible(idx: number):            boolean { return this.visibleCards().has(idx); }
  isBarAnimated(ci: number, si: number): boolean { return this.animatedBars().has(`${ci}-${si}`); }
  barKey(ci: number, si: number):        string  { return `${ci}-${si}`; }
}