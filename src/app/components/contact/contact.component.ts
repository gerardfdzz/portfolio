import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  readonly year = new Date().getFullYear();
  readonly contactLinks = [
    {
      icon: 'email',
      label: 'Email',
      value: 'fernandezgarciagerard@gmail.com',
      href: 'mailto:fernandezgarciagerard@gmail.com',
      desc: 'Best way to reach me'
    },
    {
      icon: 'linkedin',
      label: 'LinkedIn',
      value: '/in/gerardfernandezgarcia',
      href: 'https://www.linkedin.com/in/gerardfernandezgarcia',
      desc: 'Professional network'
    },
    {
      icon: 'location',
      label: 'Location',
      value: 'Barcelona, Spain',
      href: null,
      desc: 'Open to remote & hybrid'
    }
  ];
}
