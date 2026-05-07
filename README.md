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
│   │   ├── navbar/       # Fixed navigation with scroll detection
│   │   ├── hero/         # Landing section with canvas particle system
│   │   ├── about/        # Bio, education, values
│   │   ├── experience/   # Interactive work history timeline
│   │   ├── skills/       # Skill bars by category
│   │   └── contact/      # Contact info and CTA
│   └── models/
│       ├── portfolio.model.ts        # TypeScript interfaces
│       └── portfolio-data.service.ts # All portfolio data
├── styles.scss            # Global styles & CSS variables
└── index.html
```

## Customization

All portfolio content is in `src/app/models/portfolio-data.service.ts` — edit that file to update your experience, skills, and education without touching any HTML.

## Deployment

Works with any static host:
- **Vercel**: `vercel --prod`
- **Netlify**: Drag & drop `dist/portfolio/browser/`
- **GitHub Pages**: Use `ng deploy` with `angular-cli-ghpages`

## License

MIT
