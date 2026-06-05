import { Component, inject, computed } from '@angular/core';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { I18nService } from '../../core/services/i18n.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {
  i18n = inject(I18nService);
  private data = inject(PortfolioDataService);

  readonly skillCategories = this.data.skillCategories;

  readonly allTech = [
    'Angular 17', 'TypeScript', 'NgRx', 'RxJS', 'Angular CDK',
    'SCSS', 'HTML5', 'CSS3', 'JavaScript', 'Java',
    'Cypress', 'Jasmine', 'TestRail',
    'Azure DevOps', 'GitFlow', 'Git', 'CI/CD',
    'Scrum', 'Agile', 'Cognigy'
  ];

  /**
   * Compute tier groups from existing skill levels.
   * Expert >= 85, Proficient >= 70, Familiar < 70.
   */
  readonly skillTiers = computed(() => {
    const t = this.i18n.t();
    const cats = this.skillCategories();

    const expert: string[]     = [];
    const proficient: string[] = [];
    const familiar: string[]   = [];

    for (const cat of cats) {
      for (const skill of cat.skills) {
        if (skill.level >= 85)      expert.push(skill.name);
        else if (skill.level >= 70) proficient.push(skill.name);
        else                        familiar.push(skill.name);
      }
    }

    // Extras from allTech not already in any category
    const categorised = new Set(cats.flatMap(c => c.skills.map(s => s.name)));
    for (const tech of this.allTech) {
      if (!categorised.has(tech)) familiar.push(tech);
    }

    return [
      {
        key:    'expert',
        label:  t?.skills?.tiers?.expert ?? 'Expert',
        skills: expert,
      },
      {
        key:    'proficient',
        label:  t?.skills?.tiers?.proficient ?? 'Proficient',
        skills: proficient,
      },
      {
        key:    'familiar',
        label:  t?.skills?.tiers?.familiar ?? 'Familiar',
        skills: [...new Set(familiar)],
      },
    ].filter(tier => tier.skills.length > 0);
  });
}
