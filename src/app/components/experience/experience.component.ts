import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../models/portfolio-data.service';
import { Experience } from '../../models/portfolio.model';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent {
  experiences = this.data.experiences;
  activeId = signal(this.data.experiences[0].id);

  constructor(private data: PortfolioDataService) {}

  get activeExperience(): Experience {
    return this.experiences.find(e => e.id === this.activeId())!;
  }

  setActive(id: string) {
    this.activeId.set(id);
  }
}
