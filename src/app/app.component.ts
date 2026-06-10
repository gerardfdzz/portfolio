import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ProjectsComponent } from './components/projects/projects.component';
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
    ProjectsComponent,
    SkillsComponent,
    ContactComponent,
  ],
  template: `
    <div class="noise-overlay"></div>
    <app-navbar />
    <main id="main-content">
      <app-hero />
      @defer (on idle) {
        <app-about />
      } @placeholder {
        <div style="min-height:600px"></div>
      }
      @defer (on idle) {
        <app-experience />
      } @placeholder {
        <div style="min-height:500px"></div>
      }
      @defer (on idle) {
        <app-projects />
      } @placeholder {
        <div style="min-height:400px"></div>
      }
      @defer (on idle) {
        <app-skills />
      } @placeholder {
        <div style="min-height:400px"></div>
      }
      @defer (on idle) {
        <app-contact />
      } @placeholder {
        <div style="min-height:400px"></div>
      }
    </main>
  `,
})
export class AppComponent {}
