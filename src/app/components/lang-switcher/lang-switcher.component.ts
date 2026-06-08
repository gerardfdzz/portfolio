import { Component, inject } from '@angular/core';
import { I18nService, Lang } from '../../core/services/i18n.service';

@Component({
  selector: 'app-lang-switcher',
  standalone: true,
  imports: [],
  templateUrl: './lang-switcher.component.html',
  styleUrls: ['./lang-switcher.component.scss'],
})
export class LangSwitcherComponent {
  i18n = inject(I18nService);

  setLang(code: Lang) {
    this.i18n.setLang(code);
  }
}
