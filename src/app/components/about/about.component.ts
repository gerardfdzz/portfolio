import { Component, inject } from '@angular/core';
import { PortfolioDataService } from '../../models/portfolio-data.service';
import { I18nService } from '../../models/i18n.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  i18n = inject(I18nService);
  readonly education = inject(PortfolioDataService).education;
}
