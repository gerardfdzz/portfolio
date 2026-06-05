import { Component, inject } from '@angular/core';
import { I18nService } from '../../models/i18n.service';
import { PortfolioDataService } from '../../models/portfolio-data.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  i18n     = inject(I18nService);
  readonly projects = inject(PortfolioDataService).projects;
}
