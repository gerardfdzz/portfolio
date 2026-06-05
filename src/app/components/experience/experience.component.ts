import { Component, inject, signal, computed } from '@angular/core';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { I18nService } from '../../core/services/i18n.service';
import { Experience } from '../../core/models/portfolio.model';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent {
  i18n     = inject(I18nService);
  private data = inject(PortfolioDataService);

  readonly experiences = this.data.experiences;

  activeId = signal(this.data.experiences()[0].id);

  readonly activeExperience = computed<Experience>(() =>
    this.experiences().find(e => e.id === this.activeId())!
  );

  setActive(id: string) {
    this.activeId.set(id);
  }
}
