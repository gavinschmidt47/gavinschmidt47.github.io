# Copilot Instructions: Gavin Schmidt Portfolio

## Project Overview
This is a static portfolio website hosted on GitHub Pages showcasing game development projects, music, and professional experience for Gavin Schmidt. The site features a modern, responsive design with a custom navigation system and individual project showcase pages.

## Architecture

### Page Types & Structure
- **Landing page** ([index.html](../index.html)): Modern hero section with brand header, Google Analytics integration
- **Projects hub** ([projects.html](../projects.html)): Grid/list of game projects with inline metadata (team size, role, time, engine)
- **Project detail pages** (e.g., [CampfireCryptid.html](../CampfireCryptid.html), [Fearosis.html](../Fearosis.html)): Deep-dive showcases with technical highlights, code snippets (using Prism.js), and media galleries
- **Resume page** ([resume.html](../resume.html)): Embeds PDF directly via `<embed>` tag
- **Music page** ([music.html](../music.html)): Portfolio of musical work

### Global Components
- **Header/Navigation**: Reusable header structure appears on all pages with consistent nav menu (`index.html`, `projects.html`, `music.html`, `resume.html`, `Contact` anchor)
- **Mobile hamburger menu** ([header.js](../header.js)): Vanilla JS toggle with overlay and keyboard support (Escape key closes menu)
- **Global styles** ([styles.css](../styles.css)): Single 2600+ line CSS file with modern gradient header, responsive grid layouts, and mobile-first breakpoints

## Key Conventions

### HTML Patterns
- Every page includes Google Analytics (`gtag.js`) in `<head>` with tracking ID `G-C47TXLXECX`
- Meta tags for Open Graph (title, description, image, URL) on landing page
- Navigation uses emoji icons (🏠, 🎮, 🎵, 📧, 📄) alongside text labels
- Project info sections use inline SVG icons for team size, role, time, engine
- Prism.js is loaded on project detail pages for code syntax highlighting (C# primarily)

### CSS Architecture
- **Color scheme**: Primary dark blue (`#00072D`), light blue accent (`#ADD8E6`), gradient header (`135deg, #00072D → #1a1a3e`)
- **Header**: Sticky positioning, flexbox layout with brand on left, nav on right
- **Mobile-first**: Hamburger menu appears at appropriate breakpoints, overlay pattern for mobile navigation
- **Section styling**: Cards use `box-shadow: 0 0 10px rgba(0, 0, 0, 0.1)` and `border-radius: 8px`
- Class naming: BEM-like with descriptive names (`.hero-section`, `.feature-card`, `.Info-Grid`, `.nav-link-highlight`)

### Asset Organization
- **Media/** stores all images, icons, and PDFs
  - **Media/Pieces/** contains project-specific assets in subfolders (CampfireCryptid/, Fearosis/, etc.)
  - Root-level Media/ has profile photos, skill icons (unity.png, vscode.png, etc.)
- **Pieces/** appears to be legacy or alternative media structure - clarify usage if adding new projects

## Development Workflow

### Testing & Preview
- No build step required - this is pure HTML/CSS/JS
- Open files directly in browser or use Live Server extension for hot reload
- Test responsive design at mobile breakpoints (hamburger menu behavior)
- Verify Google Analytics tracking in browser console if needed

### Adding New Projects
1. Create new HTML file named after project (e.g., `NewProject.html`)
2. Copy structure from existing project page (CampfireCryptid.html is good template)
3. Add project entry to [projects.html](../projects.html) in the `<ul>` under `#projects`
4. Create asset subfolder in `Media/Pieces/NewProject/`
5. Update metadata: team size, role, time, engine, link to detail page

### Styling New Components
- Add styles to [styles.css](../styles.css) - no CSS modules or preprocessors
- Use existing color variables/patterns (check `.main-header`, `.hero-section` for reference)
- Mobile responsiveness: test hamburger menu doesn't conflict with new content
- SVG icons: inline SVGs for UI elements, PNG/JPG for photos/screenshots

## Critical Files
- [index.html](../index.html): Entry point, sets brand tone and visual identity
- [styles.css](../styles.css): All styling, 2600+ lines, organized by section comments
- [header.js](../header.js): Mobile navigation logic - do not break overlay/escape key functionality
- [projects.html](../projects.html): Project hub - maintain consistent Info-Grid pattern when adding projects

## External Dependencies
- **Google Analytics**: gtag.js with tracking ID, present on all pages
- **Prism.js**: Syntax highlighting (Okaidia theme) on detail pages for code examples
- No package manager, no build tools, no frameworks - keep it simple

## Common Tasks
- **Update resume**: Replace `Media/Schmidt, Gavin_Resume.pdf` with new version
- **New project showcase**: Follow pattern in CampfireCryptid.html with hero section, overview, technical highlights, team info
- **Style tweaks**: Search styles.css by section comments (e.g., `/* MODERN HEADER STYLES */`)
- **Mobile menu issues**: Check [header.js](../header.js) - likely overlay toggle or event listener
