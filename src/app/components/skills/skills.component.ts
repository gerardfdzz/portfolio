import { Component, inject } from '@angular/core';
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

  readonly allTech = [
    'Angular 17', 'TypeScript', 'NgRx', 'RxJS', 'Angular CDK',
    'SCSS', 'HTML5', 'CSS3', 'JavaScript', 'Java',
    'Cypress', 'Jasmine', 'TestRail',
    'Azure DevOps', 'GitFlow', 'Git', 'CI/CD',
    'Scrum', 'Agile', 'Cognigy'
  ];
}
