import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../models/portfolio-data.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {
  skillCategories = this.data.skillCategories;

  readonly allTech = [
    'Angular 17', 'TypeScript', 'NgRx', 'RxJS', 'Angular CDK',
    'SCSS', 'HTML5', 'CSS3', 'JavaScript', 'Java',
    'Cypress', 'Jasmine', 'TestRail',
    'Azure DevOps', 'GitFlow', 'Git', 'CI/CD',
    'Scrum', 'Agile', 'Cognigy'
  ];

  constructor(private data: PortfolioDataService) {}
}
