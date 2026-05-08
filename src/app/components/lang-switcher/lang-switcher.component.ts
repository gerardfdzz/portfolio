import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService, Lang } from '../../models/i18n.service';

@Component({
  selector: 'app-lang-switcher',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lang-switcher.component.html',
  styleUrls: ['./lang-switcher.component.scss']
})
export class LangSwitcherComponent {
  i18n = inject(I18nService);

  setLang(code: Lang) {
    this.i18n.setLang(code);
  }
}
