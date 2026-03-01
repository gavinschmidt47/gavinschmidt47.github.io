# Copilot Instructions: Gavin Schmidt Portfolio

## Project Overview
Static portfolio website hosted on GitHub Pages (gavinschmidt47.github.io) showcasing game development projects, music, and professional experience. Pure HTML/CSS/JS with no build tools, frameworks, or package managers—this is intentional for simplicity and GitHub Pages compatibility.

## Architecture

### Page Types & Structure
- **Landing page** ([index.html](../index.html)): Hero section with headshot, About, Skills (with icon grid), Featured Projects, Contact sections
- **Projects hub** ([projects.html](../projects.html)): List of game projects with inline metadata (team size, role, time, engine) in `.Info-Grid .container` divs
- **Project detail pages** (7 total): Deep-dive showcases with hero sections, technical highlights, code snippets (Prism.js), team credits, and developer reflections
  - [CampfireCryptid.html](../CampfireCryptid.html) - Winner badge styling, game jam focus
  - [Fearosis.html](../Fearosis.html) - Mobile game, A* pathfinding showcase
  - [Reconnection.html](../Reconnection.html) - Unreal C++ project
  - [Deadtective.html](../Deadtective.html) - Purple horror theme
  - [ReactiveSkies.html](../ReactiveSkies.html) - Sky blue theme, API integration
  - [SolarScavenger.html](../SolarScavenger.html) - Dying sun gradient theme, FIEA Game Jam 2026, **includes autoplay gameplay video**
  - [COLDSNAP.html](../COLDSNAP.html) - Frozen blue gradient, contract composition work, music showcase section
- **Resume page** ([resume.html](../resume.html)): Embeds PDF via `<embed>` tag, points to `Media/Schmidt, Gavin_Resume.pdf`
- **Music page** ([music.html](../music.html)): Audio players for original game compositions + Spotify embed. **Songs must be listed in alphabetical order by title**

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
- **Lightbox**: Every detail page and projects.html must include `<script src="lightbox.js"></script>` before `</body>`. The script auto-attaches a click-to-expand lightbox to every `<img>` inside `<main>` — no extra markup or attributes needed. Never omit this script from detail pages.

### Project Entry Style Guide
All project entries must follow consistent conventions across [projects.html](../projects.html), [index.html](../index.html) featured cards, and detail pages:

**Role Title Conventions:**
- Use **"Lead Engineer"** for lead programming roles (never "Lead Programmer" or "Programming Lead")
- Use **"Gameplay Engineer"** for individual contributor programming roles (never "Programmer")
- Use **"Producer & Lead Engineer"** when holding both producer and lead engineering roles
- Use **"Gameplay Engineer & Composer"** or **"Lead Engineer & Composer"** when also composing music
- Use **"Contract Composer"** or **"Composer"** for composition-only roles
- Use **"Creator"** for solo projects without team context
- **Consistency requirement:** Role titles must match exactly between projects.html, index.html featured cards, and the project's detail page

**projects.html Entry Structure:**
Each `<li class="Project">` must contain:
1. **Image**: `<img src="Media/Pieces/{ProjectName}/">` with descriptive alt text
2. **Info-Grid with two containers**:
   - **First container**: Project description (2-3 paragraphs), Key Technical Contributions bulleted list with `<strong>` feature names
   - **Second container**: Four Info-Sections with inline SVG icons:
     - Team Size (users icon) or "Studio: {Name}" for contract work
     - Team Role (layers icon) using standard role titles above
     - Time (clock icon) - use "X months (WIP)" for in-progress, "X hours/days" for jams, specific date ranges for contract work
     - Engine (gamepad icon) with "Learn More" button inside this final Info-Section div

**Button Placement Rule:**
The `<a href="{Project}.html" class="button">Learn More</a>` button **must be inside the last Info-Section div** (the Engine section), not outside the container. This ensures consistent styling and layout.

**index.html Featured Cards:**
- Use same role titles as projects.html and detail pages
- Keep descriptions concise (1-2 sentences max)
- Include 2-4 relevant tags (engine, genre, key feature)
- Winner badges use `.featured-card-winner` class with `.featured-badge` element

**Detail Page Consistency:**
- Role mentioned in hero section `project-info-bar` must match projects.html and index.html
- Role mentioned in "Project Overview" or introduction paragraphs must match
- Team credits section should use consistent role titles

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
- **Canonical Info-Section SVGs**: Always use the exact shapes below — never substitute alternative icons:
  - **Team/Studio** (users): `<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>`
  - **Role** (layers): `<polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline>`
  - **Time** (clock): `<circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>`
  - **Engine** (gamepad): `<rect x="3" y="8" width="18" height="8" rx="2" ry="2"></rect><circle cx="8" cy="12" r="1"></circle><circle cx="16" cy="12" r="1"></circle><rect x="6" y="6" width="2" height="2"></rect><rect x="16" y="6" width="2" height="2"></rect>`
  - All four use `viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"`
- **Prism.js**: For code syntax highlighting, load `prism-okaidia.min.css` + language component in `<head>`, wrap code in `<details><summary>` pattern

### Common Maintenance Tasks
- **Update resume**: Replace `Media/Schmidt, Gavin_Resume.pdf` with new version (filename must match exactly)
- **Add new music track**: Add `<audio>` element to [music.html](../music.html) following existing pattern, maintaining alphabetical order by song title
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
- **No em-dashes**: Never use em-dashes (—) in any content. Use colons, periods, commas, or semicolons instead for clarity and readability
- **Mobile menu refactoring**: Inline scripts at bottom of each page should be replaced with `<script src="header.js"></script>` - [header.js](../header.js) contains the proper centralized logic
- **Resume updates**: Only the PDF file needs to be replaced; [resume.html](../resume.html) uses `<embed>` tag pointing to static path
- **Background styling**: Each project detail page uses `.{project}-page .static-background` CSS rule for unique backgrounds (images or gradients)
- **Code examples**: Always use `<details><summary>` collapsible pattern with Prism.js syntax highlighting (see [CampfireCryptid.html](../CampfireCryptid.html) lines 210-350 for example)
