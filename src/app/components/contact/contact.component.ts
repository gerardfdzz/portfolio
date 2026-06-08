import { Component, inject } from '@angular/core';
import { I18nService } from '../../core/services/i18n.service';
import { PORTFOLIO_CONFIG } from '../../core/config';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  i18n = inject(I18nService);
  readonly year = new Date().getFullYear();

  readonly contactLinks = [
    {
      icon: 'email',
      value: PORTFOLIO_CONFIG.email,
      href: `mailto:${PORTFOLIO_CONFIG.email}`,
    },
    {
      icon: 'linkedin',
      value: '/in/gerardfernandezgarcia',
      href: PORTFOLIO_CONFIG.linkedin,
    },
    {
      icon: 'location',
      value: 'Barcelona, Spain',
      href: null,
    },
    {
      icon: 'github',
      value: 'github.com/gerardfdzz',
      href: PORTFOLIO_CONFIG.github,
    },
  ];
}
