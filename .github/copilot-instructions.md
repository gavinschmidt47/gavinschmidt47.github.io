# Copilot Instructions: Gavin Schmidt Portfolio

## Project Overview
Static portfolio website hosted on GitHub Pages (gavinschmidt47.github.io) showcasing game development projects, music, and professional experience. Pure HTML/CSS/JS with no build tools, frameworks, or package managers—this is intentional for simplicity and GitHub Pages compatibility.

## Architecture

### Page Types & Structure
- **Landing page** ([index.html](../index.html)): Hero section with headshot, About, Skills (with icon grid), Featured Projects, Contact sections
- **Projects hub** ([projects.html](../projects.html)): List of game projects with inline metadata (team size, role, time, engine) in `.Info-Grid .container` divs
- **Project detail pages** (6 total): Deep-dive showcases with hero sections, technical highlights, code snippets (Prism.js), team credits, and developer reflections
  - [CampfireCryptid.html](../CampfireCryptid.html) - Winner badge styling, game jam focus
  - [Fearosis.html](../Fearosis.html) - Mobile game, A* pathfinding showcase
  - [Reconnection.html](../Reconnection.html) - Unreal C++ project
  - [Deadtective.html](../Deadtective.html) - Purple horror theme
  - [ReactiveSkies.html](../ReactiveSkies.html) - Sky blue theme, API integration
  - [SolarScavenger.html](../SolarScavenger.html) - Dying sun gradient theme, FIEA Game Jam 2026, **includes autoplay gameplay video**
- **Resume page** ([resume.html](../resume.html)): Embeds PDF via `<embed>` tag, points to `Media/Schmidt, Gavin_Resume.pdf`
- **Music page** ([music.html](../music.html)): Audio players for original game compositions + Spotify embed

### Global Components
- **Header/Navigation**: Identical structure across all pages (lines 25-67 in most files) with brand name, subtitle, and 5 nav items (Home, Projects, Music, Contact, Resume)
- **Mobile hamburger menu**: **Currently duplicated inline** at bottom of each page - should be replaced with [header.js](../header.js) import for centralized management
- **Static backgrounds**: Per-page backgrounds via `.static-background` div + CSS `.{page-class}-page .static-background` rules (see [styles.css](../styles.css) lines 9-42)
- **Footer**: Consistent copyright + nav links across all pages

## Key Conventions

### HTML Patterns
- **Every page starts with identical Google Analytics snippet** (lines 4-12) using tracking ID `G-C47TXLXECX`
- **Page-specific body classes**: `<body class="{project}-page">` for background styling (e.g., `fearosis-page`, `campfire-page`)
- **Meta viewport**: Always includes `shrink-to-fit=no` on detail pages for mobile consistency
- **Navigation uses emoji icons** (🏠, 🎮, 🎵, 📧, 📄) alongside text labels for visual interest
- **Project info uses inline SVG icons** for team size, role, time, engine (see [projects.html](../projects.html) lines 71-115)
- **Prism.js integration**: Detail pages load `prism-okaidia.min.css` + language-specific component (`prism-csharp.min.js` or `prism-cpp.min.js`)
- **Code examples in collapsible `<details>`**: Code wrapped in `<pre><code class="language-csharp">` for syntax highlighting
- **Gameplay videos**: Use `<video autoplay loop muted playsinline>` with MP4/WebM sources in `.video-container-gameplay` divs (see [SolarScavenger.html](../SolarScavenger.html) for reference implementation)

### CSS Architecture
- **Color scheme**: Primary dark blue (`#00072D`), light blue accent (`#ADD8E6`), gradient header (`135deg, #00072D → #1a1a3e`)
- **Project-specific theming**: Each detail page has custom gradient/colors (Fearosis = purple, Reconnection = pink, ReactiveSkies = blue, Deadtective = dark purple, Campfire = orange, SolarScavenger = dying sun gradient with purple-to-orange)
- **Header**: Sticky positioned (`position: sticky; top: 0`), flexbox with brand left, nav right
- **Mobile-first responsive**: Hamburger menu appears at `max-width: 768px`, overlay pattern for mobile nav
- **Section styling**: White background cards with `box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07)` and `border-radius: 12px` (note: some legacy `border-radius: 0` exists)
- **Class naming**: Descriptive with project prefixes (`.fearosis-showcase`, `.campfire-showcase`) and BEM-like patterns (`.hero-section`, `.feature-card`, `.nav-link-highlight`)
- **Video containers**: `.video-container-gameplay` for autoplay videos - max-width 900px, centered, with dramatic shadows and rounded corners

### Asset Organization
- **Media/** stores all images, icons, PDFs at root level (e.g., `Headshot.JPG`, skill icons like `unity.png`, `vscode.png`)
- **Media/Pieces/{ProjectName}/** contains project-specific assets (CampfireCryptid/, Fearosis/, Reconnection/, etc.)
- **Pieces/** appears to be legacy music assets folder—audio files for music page compositions
- **Resume PDF**: `Media/Schmidt, Gavin_Resume.pdf` (update this file to update resume)

## Development Workflow

### Testing & Preview
- **No build step required** - this is pure HTML/CSS/JS, directly deployable to GitHub Pages
- Open files directly in browser or use Live Server extension for hot reload during development
- Test responsive design at mobile breakpoints (768px, 480px) to verify hamburger menu behavior
- **Deployment**: Push to `main` branch → GitHub Pages auto-deploys (typically within 1-2 minutes)
- Verify Google Analytics tracking in browser console if debugging analytics issues

### Adding New Projects
1. **Create detail page**: Copy structure from [CampfireCryptid.html](../CampfireCryptid.html) or [Fearosis.html](../Fearosis.html) as template
2. **Add project-specific body class**: `<body class="yourproject-page">` for custom background styling
3. **Update projects hub**: Add new `<li class="Project">` entry to [projects.html](../projects.html) inside `<ul class="projects-list">` (around line 67)
4. **Create asset folder**: Make `Media/Pieces/YourProject/` directory for images/media
5. **Add CSS theming**: Define `.yourproject-page .static-background` rule in [styles.css](../styles.css) (lines 9-42) + `.yourproject-showcase` styles if using showcase layout
6. **Update featured projects** (optional): Add to [index.html](../index.html) `.featured-grid` section (lines 394-480) if highlighting on homepage

### Styling New Components
- **Add styles to [styles.css](../styles.css)** - no CSS modules, preprocessors, or separate files
- Use existing color variables/patterns: check `.main-header` (line 135), `.hero-section` (line 358), `.btn-primary` (line 457) for reference
- **Mobile responsiveness**: Test hamburger menu doesn't conflict with new content; add breakpoints at `@media (max-width: 768px)` and `@media (max-width: 480px)`
- **SVG icons**: Inline SVGs for UI elements (see project info icons), PNG/JPG for photos/screenshots
- **Prism.js**: For code syntax highlighting, load `prism-okaidia.min.css` + language component in `<head>`, wrap code in `<details><summary>` pattern

### Common Maintenance Tasks
- **Update resume**: Replace `Media/Schmidt, Gavin_Resume.pdf` with new version (filename must match exactly)
- **Add new music track**: Add `<audio>` element to [music.html](../music.html) following existing pattern (lines 110-180)
- **Modify navigation**: Update header HTML in ALL pages (search for `<header class="main-header">` - lines 25-67 typically)
- **Change contact info**: Update [index.html](../index.html) `#contact` section (lines 492-563)

## Critical Files & Dependencies

### Essential Files
- **[index.html](../index.html)**: Entry point - sets brand tone, visual identity, featured projects showcase
- **[styles.css](../styles.css)**: ALL styling (2600+ lines) - organized by section comments like `/* MODERN HEADER STYLES */`, `/* FEAROSIS PORTFOLIO STYLES */`
- **[header.js](../header.js)**: Centralized mobile navigation logic - use this instead of inline scripts
- **[projects.html](../projects.html)**: Project hub - maintain consistent `.Info-Grid` structure and inline SVG icons when adding projects
- **Media/Schmidt, Gavin_Resume.pdf**: Resume file embedded in [resume.html](../resume.html) - replace to update

### External Dependencies (CDN-hosted, no npm)
- **Google Analytics**: `gtag.js` with tracking ID `G-C47TXLXECX` - identical snippet on all pages (lines 4-12)
- **Prism.js**: Syntax highlighting on detail pages
  - Core: `https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js`
  - Theme: `prism-okaidia.min.css` (dark theme)
  - Language components: `prism-csharp.min.js` (Unity/C# projects) or `prism-cpp.min.js` (Unreal projects)
- **Spotify Embed**: iFrame embed on [music.html](../music.html) - artist profile display

### Mobile Navigation Critical Code
The hamburger menu logic exists in [header.js](../header.js) but is **currently duplicated inline** in `<script>` tags at the bottom of each page. This creates maintenance issues. Key behaviors to preserve:
- **Overlay**: Creates `.nav-overlay` div dynamically, toggles `.active` class
- **Menu toggle**: `.hamburger` button controls `.main-nav.active` state
- **Escape key**: Closes menu on `keydown` event
- **Smooth scroll**: Anchor links scroll with offset for sticky header
- **Refactoring needed**: Replace inline scripts with `<script src="header.js"></script>` on all pages for centralized maintenance

## Important Notes
- **No package manager**: This project intentionally avoids npm, yarn, webpack, etc. for GitHub Pages simplicity
- **Mobile menu refactoring**: Inline scripts at bottom of each page should be replaced with `<script src="header.js"></script>` - [header.js](../header.js) contains the proper centralized logic
- **Resume updates**: Only the PDF file needs to be replaced; [resume.html](../resume.html) uses `<embed>` tag pointing to static path
- **Background styling**: Each project detail page uses `.{project}-page .static-background` CSS rule for unique backgrounds (images or gradients)
- **Code examples**: Always use `<details><summary>` collapsible pattern with Prism.js syntax highlighting (see [CampfireCryptid.html](../CampfireCryptid.html) lines 210-350 for example)
