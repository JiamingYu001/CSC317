**User:**
Ive attached a HTML file of a student profile webpage. 
Please make a CSS file using a darker color palette that focuses on contrasting colors. 

Color scheme: Black/gray and white 
Typography style: something aesthetically pleasing and easy to read. 
Layout: I want the webpage to be separated into 3 sections, 2 boxes split down the middle on the top-half of the page and the bottom half to be split into separate boxes. I want the profile to be in the top left box, not too big, not too small with name and biography under it. The top right box should be skills and experience. I want the bottom half of the page to be split into sections for 3 projects and make sure they are evenly spaced out. I would like the profile to have a white background while the skills and experience to have a black background while the text is white. Design Element: please give the profile picture some simple animation, to make it stand out. 
Do not make any changes to the HTML file at all.


**AI:**
I made you a drop-in replacement CSS (dark palette, high contrast, clean typography, responsive grid) that:

Lays the page out as two top boxes (Profile left, Skills/Experience right) and a bottom half for three evenly spaced project cards.

Keeps the Profile area on a white card (with your avatar subtly animated so it stands out) and Skills/Experience on a black card with white text.



``` css
/* ===============================
   Hand-written Dark Theme (Grid)
   Layout: Top row = Profile (L) + Skills (R)
           Bottom half = 3 project cards
   Palette: Black/Gray & White (high contrast)
   Typography: System UI + Inter/Segoe/Roboto fallback
   Responsive: Mobile → Tablet → Desktop
   ================================= */

/* ---------- CSS Variables (Theme) ---------- */
:root {
  --bg: #0d0f12;           /* page background (near-black) */
  --text: #e8eaf0;         /* primary text (near-white)    */
  --muted: #a3a9b6;        /* secondary text               */
  --card: #ffffff;         /* white card (profile area)    */
  --card-ink: #0e1013;     /* ink on white cards           */
  --card-contrast: #0b0b0d;/* black card (skills)          */
  --border: #1e222a;       /* subtle borders on dark       */
  --accent: #8ab4ff;       /* links/focus accent           */

  --radius: 14px;
  --shadow-1: 0 6px 18px rgba(0,0,0,.25);
  --shadow-2: 0 10px 30px rgba(0,0,0,.35);

  --maxw: 1100px;
  --gap: 24px;

  --sans: ui-sans-serif, system-ui, -apple-system, "Segoe UI",
          Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji",
          "Segoe UI Emoji", "Segoe UI Symbol", Inter, sans-serif;
}

/* ---------- Page Shell ---------- */
html, body {
  height: 100%;
}
body.site {
  margin: 0;
  background: radial-gradient(1200px 800px at 70% -10%,
              rgba(138,180,255,.08), transparent 60%) , var(--bg);
  color: var(--text);
  font-family: var(--sans);
  line-height: 1.55;
  letter-spacing: .2px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Constrain inner content */
.container {
  width: 100%;
  max-width: var(--maxw);
  margin-inline: auto;
  padding-inline: 16px;
}

/* ---------- Global Type & Links ---------- */
h1, h2, h3 {
  margin: 0 0 .4em 0;
  line-height: 1.25;
}
h1.site-title { font-size: clamp(1.6rem, 2.2vw + 1rem, 2.4rem); color: var(--card-ink); }
h2.section-title { font-size: clamp(1.2rem, 1.2vw + .9rem, 1.6rem); }
p, li { color: var(--text); }
a.link { color: var(--accent); text-decoration: none; }
a.link:hover, a.link:focus { text-decoration: underline; outline: none; }
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-radius: 6px;
}

/* =========================================================
   GRID LAYOUT (No HTML edits)
   We place header + bio on the left "Profile" card visually,
   skills on the right, projects spanning the bottom row.
   ========================================================= */
.site-main > .container {
  display: grid;
  gap: var(--gap);
}

@media (min-width: 980px) {
  .site-main > .container {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "profile skills"
      "projects projects";
    align-items: start;
  }
}

/* ---------- PROFILE (white card) ---------- */
/* Put header (avatar + name) and the bio together visually as one card */
.site-header {
  grid-area: profile;
  background: var(--card);
  color: var(--card-ink);
  box-shadow: var(--shadow-1);
  border-radius: var(--radius);
  border: 1px solid #e7e9ee;
  margin: 24px auto 0; /* small top margin so it breathes on mobile */
}

.header-inner {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 16px;
  padding: 22px 20px;
}

/* Avatar: subtle, classy animation so it stands out */
.avatar {
  width: clamp(96px, 10vw + 60px, 140px);
  height: clamp(96px, 10vw + 60px, 140px);
  border-radius: 50%;
  display: block;
  border: 3px solid #e6e9f2;
  box-shadow: 0 4px 16px rgba(0,0,0,.12);
  transform: translateZ(0); /* enable GPU compositing */
  animation: float 4s ease-in-out infinite;
  transition: filter .3s ease, transform .25s ease;
  background: #fff;
  object-fit: cover;
}
.avatar:hover {
  filter: saturate(1.08) drop-shadow(0 10px 20px rgba(0,0,0,.18));
  transform: translateY(-2px);
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

/* Fuse the bio section visually under the header card */
.section.bio {
  grid-area: profile;
  background: var(--card);
  color: var(--card-ink);
  border: 1px solid #e7e9ee;
  border-top: none;                 /* merges with header above */
  border-radius: 0 0 var(--radius) var(--radius);
  box-shadow: var(--shadow-1);
  padding: 18px 20px 22px;
  margin-top: -12px;                /* slight overlap to feel like one box */
}
.section.bio .section-title { color: var(--card-ink); }
.section.bio .section-text { color: #22252b; }

/* ---------- SKILLS & EXPERIENCE (black card, white text) ---------- */
.section.skills {
  grid-area: skills;
  background: var(--card-contrast);
  color: #fff;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-2);
  padding: 22px 20px;
}
.section.skills .section-title,
.section.skills .skill-title,
.section.skills .list,
.section.skills .list-item { color: #fff; }

/* Skills layout inside the card */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(180px,1fr));
  gap: 14px;
  margin-top: 14px;
}
@media (max-width: 900px) {
  .skills-grid { grid-template-columns: repeat(2, minmax(180px,1fr)); }
}
@media (max-width: 640px) {
  .skills-grid { grid-template-columns: 1fr; }
}
.skill-group {
  background: rgba(255,255,255,.04);
  border: 1px solid rgba(255,255,255,.14);
  border-radius: 12px;
  padding: 14px 16px;
  transition: transform .2s ease, box-shadow .2s ease, border-color .25s ease;
}
.skill-group:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 24px rgba(0,0,0,.45);
  border-color: rgba(255,255,255,.3);
}
.skill-title {
  margin-bottom: 8px;
  font-weight: 600;
}
.skills .list { list-style: none; padding: 0; margin: 0; }
.skills .list-item { padding: 4px 0; opacity: .95; }

/* ---------- PROJECTS (bottom half: 3 cards) ---------- */
.section.projects {
  grid-area: projects;
  background: transparent;
  border-radius: var(--radius);
  padding: 10px 0 30px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr)); /* three even columns */
  gap: var(--gap);
  align-items: start;
}
.section.projects .section-title {
  grid-column: 1 / -1;           /* title spans all columns */
  text-align: center;
  color: var(--text);
  margin-bottom: 8px;
}

/* Each .project article becomes a card in the 3-col grid */
.project {
  background: #121418;
  border: 1px solid var(--border);
  border-radius: 12px;
  box-shadow: var(--shadow-1);
  padding: 16px 18px;
  transition: transform .2s ease, box-shadow .2s ease, border-color .25s ease;
}
.project:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-2);
  border-color: #2b313c;
}
.project-title { margin-bottom: 6px; }
.project-summary { color: var(--muted); }
.project-details summary {
  cursor: pointer;
  color: var(--accent);
  margin-top: 6px;
}
.project-links { margin-top: 10px; }

/* Responsive columns for projects */
@media (max-width: 980px) {
  .section.projects { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 640px) {
  .section.projects { grid-template-columns: 1fr; }
}

/* ---------- Footer ---------- */
.site-footer {
  border-top: 1px solid var(--border);
  background: #0b0d10;
  margin-top: 20px;
  padding: 28px 0;
}
.site-footer .section-title { text-align: center; }
.contact-list {
  list-style: none;
  display: flex;
  gap: 20px;
  justify-content: center;
  padding: 0;
  margin: 10px 0 0;
}
.contact-list .list-item a {
  font-weight: 600;
  text-decoration: none;
  color: var(--accent);
}
.contact-list .list-item a:hover { text-decoration: underline; }

/* ---------- Theme Switcher (kept, restyled for dark) ---------- */
.theme-switcher {
  position: fixed;
  right: 20px;
  bottom: 20px;
  background: #0f1216;
  color: var(--text);
  border: 1px solid var(--border);
  border-radius: 10px;
  box-shadow: var(--shadow-1);
  padding: 10px;
  z-index: 999;
}
.theme-switcher h3 {
  margin: 0 0 8px 0;
  font-size: 14px;
  color: var(--text);
}
.theme-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.theme-button {
  background: #161a20;
  color: var(--text);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 6px 10px;
  font-size: 12px;
  cursor: pointer;
  transition: transform .15s ease, background .2s ease, border-color .2s ease;
}
.theme-button:hover { transform: translateY(-2px); }
.theme-button.active {
  background: var(--accent);
  color: #0b0b0d;
  border-color: transparent;
}

/* ---------- Small Polish ---------- */
.list { list-style: none; padding: 0; margin: 0; }
.section { backdrop-filter: saturate(1.05); }