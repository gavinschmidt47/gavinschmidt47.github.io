# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static portfolio website hosted on GitHub Pages (gavinschmidt47.github.io). Pure HTML/CSS/JS with no build tools, frameworks, or package managers. Deployment: push to `main` branch and GitHub Pages auto-deploys within 1-2 minutes.

## Development

No build step. Open files directly in browser or use Live Server for hot reload. Test responsive design at `768px` and `480px` breakpoints for hamburger menu behavior.

## Architecture

### Page Types
- **Landing page** (`index.html`): Hero, About, Skills, Featured Projects, Contact
- **Projects hub** (`projects.html`): Game project list with `.Info-Grid .container` metadata entries
- **Project detail pages** (7 total): `CampfireCryptid.html`, `Fearosis.html`, `Reconnection.html`, `Deadtective.html`, `ReactiveSkies.html`, `SolarScavenger.html`, `COLDSNAP.html`
- **Music page** (`music.html`): Audio players + Spotify embed. Songs must be listed alphabetically by title.
- **Resume page** (`resume.html`): Embeds `Media/Schmidt, Gavin_Resume.pdf` via `<embed>` tag

### Global Components
- **Header/Nav**: Identical structure across all pages with 5 nav items (🏠 Home, 🎮 Projects, 🎵 Music, 📧 Contact, 📄 Resume)
- **Mobile hamburger menu**: Logic lives in `header.js`. Currently duplicated inline at bottom of each page — should be replaced with `<script src="header.js"></script>` on all pages.
- **Static backgrounds**: Per-page via `.static-background` div + `.{page-class}-page .static-background` CSS rules (styles.css lines 9-42)
- **Lightbox**: Every detail page and `projects.html` must include `<script src="lightbox.js"></script>` before `</body>`. Auto-attaches to every `<img>` inside `<main>`.

### Key Files
- `styles.css`: ALL styling (2600+ lines), organized by section comments like `/* MODERN HEADER STYLES */`
- `header.js`: Centralized mobile nav logic (overlay, escape key, smooth scroll with sticky header offset)
- `memories/repo/project-repos.md`: Repository references for pulling live code into project pages

## HTML Conventions

- **Every page**: Google Analytics snippet (lines 4-12), tracking ID `G-C47TXLXECX`
- **Body class**: `<body class="{project}-page">` for background theming
- **Code examples**: Always use `<details><summary>` collapsible pattern with Prism.js (`prism-okaidia.min.css` + language component in `<head>`, `<pre><code class="language-csharp">`)
- **Gameplay videos**: `<video autoplay loop muted playsinline>` with MP4/WebM in `.video-container-gameplay` divs
- **Back to Projects**: Every detail page must end `<main>` with `<section class="back-to-projects"><a href="projects.html" class="btn btn-primary">← Back to All Projects</a></section>`

## Source Code Protection

For projects intended for commercial release (Steam, itch.io): use **architecture skeleton pattern** — show real class/function signatures with implementation bodies replaced by rich inline comments explaining algorithm, data flow, and design. `<details>` summary should use concept names (e.g. "Attack Resolution Logic"), not filenames. For school/jam projects, full source is fine. **When unsure if a project is commercial, ask before writing any code blocks.**

## Project Entry Style Guide

### Role Title Conventions (must be consistent across projects.html, index.html, and detail pages)
- Lead programming: **"Lead Engineer"**
- Individual contributor programming: **"Gameplay Engineer"**
- Both roles: **"Producer & Lead Engineer"**
- Programming + composing: **"Gameplay Engineer & Composer"** or **"Lead Engineer & Composer"**
- Composition only: **"Contract Composer"** or **"Composer"**
- Solo: **"Creator"**

### projects.html Entry Structure
Each `<li class="Project">` contains an image, then an `Info-Grid` with:
- **First container**: Description (2-3 paragraphs) + Key Technical Contributions list with `<strong>` feature names
- **Second container**: Four Info-Sections with canonical inline SVGs (team/studio, role, time, engine)
- **Button**: `<a href="{Project}.html" class="button button-projectname">Learn More</a>` placed **outside** both containers but inside `Info-Grid`, as a direct sibling after the second container

### Canonical Info-Section SVGs
All use `viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"`:
- **Team/Studio** (users): `<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>`
- **Role** (layers): `<polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline>`
- **Time** (clock): `<circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>`
- **Engine** (gamepad): `<rect x="3" y="8" width="18" height="8" rx="2" ry="2"></rect><circle cx="8" cy="12" r="1"></circle><circle cx="16" cy="12" r="1"></circle><rect x="6" y="6" width="2" height="2"></rect><rect x="16" y="6" width="2" height="2"></rect>`

## CSS Architecture

- **Color scheme**: Primary dark blue (`#00072D`), light blue accent (`#ADD8E6`), gradient header (`135deg, #00072D → #1a1a3e`)
- **Project theming**: Each detail page has custom gradient colors (Fearosis = purple, Reconnection = pink, ReactiveSkies = blue, Deadtective = dark purple, Campfire = orange, SolarScavenger = dying sun purple-to-orange)
- **All styles go in `styles.css`**: no CSS modules, preprocessors, or separate files
- **Breakpoints**: `@media (max-width: 768px)` and `@media (max-width: 480px)`

## Steam Launch Pattern

### CSS Classes (defined in styles.css)
`.steam-launch-btn`, `.hero-steam-cta`, `.steam-soundtrack-cta`, `.steam-cta-text`, `.steam-card-btn`, `.steam-unlock-card`, `.music-unlock-tag`, `.music-steam-banner`, `.music-steam-banner-text`, `.music-steam-link`, `.coming-soon-badge`

### Phase 1: Coming Soon
- Add `.coming-soon-badge` to `.project-info-bar`; Steam button says "Wishlist on Steam"
- Soundtrack CTA: "Wishlist [Game] to get notified when the game releases with all [N] tracks."
- `music.html`: Add `.music-steam-banner` above `.music-featured-grid`; add `.music-steam-link` after each audio element
- Unreleased tracks: Use `.steam-unlock-card` dark variant with `.music-unlock-tag` pill badge; never show "Coming [date]"

### Phase 2: Released
- Remove `.coming-soon-badge`; change all Steam buttons to "Play [Game] on Steam" or "Get on Steam"
- Update soundtrack CTA to "Download [Game] to experience all [N] tracks in-game"
- Update prose to past tense

## Project Repository References

References stored in `memories/repo/project-repos.md`. Each entry format:
```
## {ProjectName}
- **repo**: {owner}/{repo}
- **branch**: {branch}
- **language**: {cpp|csharp|gdscript|...}
- **commercial**: {yes|no}
- **key_paths**: comma-separated globs for key source files
```

When fetching code: pull only files in `key_paths`; group output by logical concept, not by file; respect the `commercial` flag for skeleton vs. full source. If a fetch returns 404, inform the user and ask how to proceed — never fabricate code.

**Prism language class mapping:**
| language | Prism class | CDN component |
|---|---|---|
| cpp | language-cpp | prism-cpp.min.js |
| csharp | language-csharp | prism-csharp.min.js |
| gdscript | language-gdscript | prism-gdscript.min.js |
| javascript | language-javascript | (prism core) |

## External Dependencies (CDN, no npm)
- **Google Analytics**: `gtag.js`, ID `G-C47TXLXECX`
- **Prism.js**: core `https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js` + `prism-okaidia.min.css` + language component

## Asset Organization
- `Media/`: root-level images, icons, PDFs (e.g. `Headshot.JPG`, `Media/Schmidt, Gavin_Resume.pdf`)
- `Media/Pieces/{ProjectName}/`: project-specific assets
- `Pieces/`: legacy audio files for music page

## Important Rules
- **No em-dashes**: Never use — in any content. Use colons, commas, semicolons, or periods instead.
- **No invented data**: For research/data project pages, ask the user to provide specific numbers before writing content that references them.
- **Resume updates**: Only replace `Media/Schmidt, Gavin_Resume.pdf`; the HTML does not need to change.
- **Navigation changes**: Must be updated in ALL page headers (search for `<header class="main-header">`).
