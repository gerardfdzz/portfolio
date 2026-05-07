import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ContactComponent } from './components/contact/contact.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    ExperienceComponent,
    SkillsComponent,
    ContactComponent,
  ],
  template: `
    <div class="noise-overlay"></div>
    <app-navbar />
    <main>
      <app-hero />
      <app-about />
      <app-experience />
      <app-skills />
      <app-contact />
    </main>
  `
})
export class AppComponent {}
