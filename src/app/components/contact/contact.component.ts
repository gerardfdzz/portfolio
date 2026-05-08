import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../models/i18n.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  i18n = inject(I18nService);
  readonly year = new Date().getFullYear();

  readonly contactLinks = [
    {
      icon: 'email',
      value: 'fernandezgarciagerard@gmail.com',
      href: 'mailto:fernandezgarciagerard@gmail.com',
    },
    {
      icon: 'linkedin',
      value: '/in/gerardfernandezgarcia',
      href: 'https://www.linkedin.com/in/gerardfernandezgarcia',
    },
    {
      icon: 'location',
      value: 'Barcelona, Spain',
      href: null,
    }
  ];
}
