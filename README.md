# Gerard Fernández García — Portfolio

Personal portfolio built with **Angular 17** (standalone components), TypeScript, and SCSS.

## Tech Stack

- Angular 17 (standalone components, signals)
- TypeScript (strict mode)
- SCSS (CSS custom properties / variables)
- Angular animations

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repo
git clone https://github.com/gerardfdzz/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start dev server
npm start
```

Open [http://localhost:4200](http://localhost:4200)

### Build for production

```bash
npm run build
```

Output in `dist/portfolio/`

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── navbar/           # Fixed navigation with scroll detection and language switcher
│   │   ├── hero/             # Landing section with canvas particle system
│   │   ├── about/            # Bio, education, values
│   │   ├── experience/       # Interactive work history timeline
│   │   ├── skills/           # Skill cards by category with animations
│   │   ├── contact/          # Contact info and CTA
│   │   └── lang-switcher/    # Standalone language selector component
│   └── models/
│       ├── portfolio.model.ts        # TypeScript interfaces
│       ├── portfolio-data.service.ts # Static portfolio data (skills, experience, links)
│       └── i18n.service.ts           # Translations service and Translations interface
├── assets/
│   └── i18n/
│       ├── en.json           # English translations
│       ├── es.json           # Spanish translations
│       └── ca.json           # Catalan translations
├── favicon.svg            # SVG favicon
├── styles.scss            # Global styles & CSS variables
└── index.html
```

## Customization

- **Content & translations**: edit the JSON files in `src/assets/i18n/` for each language.
- **Static data** (skills, links): edit `src/app/models/portfolio-data.service.ts`.
- **Adding a new language**: add a new JSON file in `src/assets/i18n/`, register the language code in `i18n.service.ts`, and add the option to the lang switcher.

## Deployment

Works with any static host:
- **Vercel**: `vercel --prod`
- **Netlify**: Drag & drop `dist/portfolio/browser/`
- **GitHub Pages**: Use `ng deploy` with `angular-cli-ghpages`

## License

MIT
