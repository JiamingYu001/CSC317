# AI-Generated CSS Style Prompt: Matrix Theme (Full Conversation)

**User:**\
I've attached an HTML file for a Student Profile webpage. Can you create
a CSS style file to that mimics the Matrix aesthetic?\
Color scheme: Green and black\
Typography style: As close to the matrix font as you can get\
Layout: The technical skills as 3 columns centered on the webpage, maybe
in a box for clarity. The two projects on top of each other. The footer
should have all links horizontally spaced.\
Design elements: Can you style the profile picture and give it some kind
of animation? Also include theme appropriate animations when hovering
over sections or pressing the button to expand the project details. The
HTML file will be used by multiple people, so I don't want to make any
changes to it.

------------------------------------------------------------------------

**Assistant:**\
Here's a complete Matrix-style CSS you can drop in as
`styles/styles.css` (no HTML edits needed). It uses neon greens on deep
black, a Matrix-ish monospace, a subtle "code rain" background, a
scanning/glitch effect for the avatar, 3-column centered skills, stacked
projects, and animated, theme-appropriate hovers + expanding details.

``` css
/* =========================
   MATRIX AESTHETIC THEME
   Works with your existing HTML structure
   ========================= */

/* Optional matrix-y fonts (safe fallbacks included) */
@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=VT323&display=swap');

:root {
  --bg: #020403;
  --panel: #06110b;
  --panel-2: #081a12;
  --text: #c3f7c7;
  --muted: #78e08f;
  --neon: #00ff9d;
  --grid: rgba(0, 255, 157, 0.08);
  --line: rgba(0, 255, 157, 0.18);
  --link: #8afba8;
  --link-hover: #b5ffd0;
  --shadow: 0 0 20px rgba(0, 255, 157, 0.15), 0 0 2px rgba(0, 255, 157, 0.35);
  --radius: 14px;
  --duration: 220ms;
}

*,
*::before,
*::after { box-sizing: border-box; }

html, body { height: 100%; }

body.site {
  margin: 0;
  color: var(--text);
  background: var(--bg);
  font-family: "Share Tech Mono", "VT323", Consolas, "Courier New", monospace;
  line-height: 1.6;
  background-image:
    repeating-linear-gradient( to bottom,
      rgba(0,255,157,0.05) 0px, rgba(0,255,157,0.05) 2px,
      transparent 2px, transparent 6px),
    linear-gradient(to right, var(--grid) 1px, transparent 1px),
    linear-gradient(to bottom, var(--grid) 1px, transparent 1px);
  background-size:
    100% 24px,
    40px 100%,
    100% 40px;
  animation: rain 12s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  body.site { animation: none; background-image: none; background-color: var(--bg); }
  .avatar::after, .section:hover, .project:hover, .theme-button:hover { transition: none; }
}

@keyframes rain {
  0%   { background-position: 0 0, 0 0, 0 0; }
  100% { background-position: 0 24px, 0 0, 0 0; }
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 24px;
}

/* Header */
.site-header {
  position: sticky;
  top: 0;
  z-index: 20;
  background: linear-gradient(180deg, rgba(0,0,0,0.75), rgba(0,0,0,0.35));
  border-bottom: 1px solid var(--line);
  backdrop-filter: blur(6px);
}

.header-inner {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 18px;
}

.site-title {
  margin: 0;
  font-size: clamp(28px, 5vw, 42px);
  letter-spacing: 1px;
  text-shadow: 0 0 6px rgba(0,255,157,0.5);
}

/* Avatar Animation */
.avatar {
  width: clamp(90px, 18vw, 140px);
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 12px;
  border: 1px solid var(--line);
  box-shadow: var(--shadow);
  position: relative;
  overflow: hidden;
}

.avatar::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0,255,157,0) 0%, rgba(0,255,157,0.15) 50%, rgba(0,255,157,0) 100%);
  mix-blend-mode: screen;
  animation: scan 3.6s ease-in-out infinite;
}

@keyframes scan {
  0%   { transform: translateY(-120%); opacity: 0.2; }
  50%  { transform: translateY(0%);    opacity: 0.35; }
  100% { transform: translateY(120%);  opacity: 0.2; }
}

.avatar:hover {
  box-shadow: 0 0 0 1px var(--neon), 0 0 24px rgba(0,255,157,0.3);
  transform: perspective(500px) rotateX(2deg) rotateY(-2deg);
  transition: transform var(--duration) ease, box-shadow var(--duration) ease;
}

/* Sections */
.section {
  background: linear-gradient(180deg, rgba(10,25,18,0.55), rgba(6,17,11,0.55));
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 22px;
  margin: 20px 0;
  box-shadow: 0 0 0 1px rgba(0,255,157,0.06) inset;
  transition: transform var(--duration) ease, box-shadow var(--duration) ease, border-color var(--duration) ease;
}

.section:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 0 1px var(--neon) inset, 0 0 24px rgba(0,255,157,0.15);
  border-color: rgba(0,255,157,0.35);
}

/* Skills */
.skills .skills-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  justify-items: center;
}

.skill-group {
  width: 100%;
  max-width: 300px;
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 0 0 1px rgba(0,255,157,0.06) inset;
}

.skill-group:hover {
  transform: translateY(-3px);
  box-shadow: 0 0 0 1px var(--neon) inset, 0 0 18px rgba(0,255,157,0.18);
}

/* Projects */
.projects .project {
  background: var(--panel-2);
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 18px;
  margin: 14px 0;
}

.projects .project:hover {
  transform: translateY(-3px);
  border-color: rgba(0,255,157,0.35);
  box-shadow: 0 0 0 1px var(--neon) inset, 0 0 22px rgba(0,255,157,0.18);
}

.project-details {
  border: 1px dashed rgba(0,255,157,0.25);
  border-radius: 10px;
  padding: 10px;
  background: rgba(0, 255, 157, 0.04);
}

.project-details[open] {
  background: rgba(0, 255, 157, 0.08);
  border-color: rgba(0,255,157,0.5);
}

/* Footer */
.site-footer {
  border-top: 1px solid var(--line);
  margin-top: 24px;
  background: linear-gradient(0deg, rgba(0,0,0,0.75), rgba(0,0,0,0.25));
}

.contact-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px 24px;
  justify-content: center;
}
```

**Notes:**\
- 3-column Technical Skills grid\
- Stacked projects with neon hover\
- Animated avatar scanline\
- Matrix green glow and "code rain" animation\
- Responsive design included
