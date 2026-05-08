import { Component, HostListener, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService, Lang } from '../../models/i18n.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  i18n = inject(I18nService);
  scrolled = signal(false);
  menuOpen = signal(false);
  langMenuOpen = signal(false);

  get navLinks() {
    const t = this.i18n.t();
    if (!t) return [
      { label: 'About',      href: '#about' },
      { label: 'Experience', href: '#experience' },
      { label: 'Skills',     href: '#skills' },
      { label: 'Contact',    href: '#contact' },
    ];
    return [
      { label: t.nav.about,      href: '#about' },
      { label: t.nav.experience, href: '#experience' },
      { label: t.nav.skills,     href: '#skills' },
      { label: t.nav.contact,    href: '#contact' },
    ];
  }

  @HostListener('window:scroll')
  onScroll() { this.scrolled.set(window.scrollY > 40); }

  @HostListener('document:click', ['$event'])
  onDocClick(e: Event) {
    if (!(e.target as HTMLElement).closest('.lang-switcher')) {
      this.langMenuOpen.set(false);
    }
  }

  toggleMenu()     { this.menuOpen.update(v => !v); }
  closeMenu()      { this.menuOpen.set(false); this.langMenuOpen.set(false); }
  toggleLangMenu() { this.langMenuOpen.update(v => !v); }

  setLang(code: Lang) {
    this.i18n.setLang(code);
    this.langMenuOpen.set(false);
    this.menuOpen.set(false);
  }
}
