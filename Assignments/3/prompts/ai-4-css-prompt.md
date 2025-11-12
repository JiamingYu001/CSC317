**User:**
I have attached an html file for a student's website/portfolio. I need you to make a CSS file for the style of the webpage, I want it to mimic the windows xp style as much as possible.
Color Scheme: The main colors should be blue and white, a secondary color can be a light grayish blue.
Typography style: Should use Tahoma font and be as similar to windows xp as possible.
Layout: Add the profile picture and name to the top left of the page. The introduction for the person and the list of skills should be in different boxes.
Design elements: Could you add minimize and close designs on the boxes as if to imitates windows.

**AI:**
Perfect — I can create a Windows XP–inspired CSS stylesheet for this HTML portfolio.
It’ll include:

Color scheme: Classic XP blue (#245EDC) and white, with light gray-blue highlights (#BFD4F2).

Font: Tahoma, sans-serif.

Layout: Profile picture and name at top-left.

Window-style boxes for Biography and Skills, each with a “title bar” and minimize / close buttons.

Soft shadows and beveled edges for that XP look.

Here’s the complete CSS file (styles/styles.css):

``` css
/* ==============================
   Windows XP Inspired Portfolio
   Author: ChatGPT (GPT-5)
   ============================== */

body {
    font-family: Tahoma, sans-serif;
    background-color: #BFD4F2;
    color: #000;
    margin: 0;
    padding: 0;
}

.container {
    width: 80%;
    margin: 0 auto;
}

/* ===== Header ===== */
.site-header {
    display: flex;
    align-items: center;
    background: linear-gradient(to bottom, #245EDC 0%, #1B4DA0 100%);
    color: white;
    padding: 10px 20px;
    border-bottom: 2px solid #0A2B8F;
    box-shadow: inset 0 -1px 0 #fff;
}

.site-header .avatar {
    width: 80px;
    height: 80px;
    border: 2px solid #fff;
    border-radius: 6px;
    margin-right: 15px;
}

.site-header .site-title {
    font-size: 1.8em;
    font-weight: bold;
    text-shadow: 1px 1px #000;
}

/* ===== Main Sections ===== */
.section {
    background-color: #E7EDF8;
    border: 2px solid #9DB9EB;
    border-radius: 6px;
    margin: 20px 0;
    box-shadow: 2px 2px 5px rgba(0,0,0,0.2);
    position: relative;
}

/* ===== Title Bar ===== */
.section-title {
    margin: 0;
    padding: 5px 10px;
    background: linear-gradient(to bottom, #2D6FF0 0%, #1C5CB8 100%);
    color: white;
    font-weight: bold;
    border-bottom: 1px solid #0A2B8F;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

/* ===== Window Buttons ===== */
.section-title::after {
    content: "";
    display: flex;
    gap: 5px;
}

.section-title::after {
    content: "🗕  ❌";
    font-size: 0.9em;
    margin-left: auto;
    letter-spacing: 4px;
    color: #fff;
    text-shadow: 1px 1px #000;
}

/* ===== Section Content ===== */
.section-text,
.skills-grid,
.project,
.contact-list {
    padding: 15px;
}

.skills-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.skill-group {
    flex: 1 1 30%;
    background-color: #fff;
    border: 1px solid #AABBDD;
    border-radius: 4px;
    padding: 10px;
    box-shadow: inset 1px 1px #fff;
}

.skill-title {
    font-weight: bold;
    margin-bottom: 8px;
}

/* ===== Projects ===== */
.project {
    background-color: #fff;
    border: 1px solid #AABBDD;
    border-radius: 4px;
    margin-bottom: 15px;
    padding: 10px;
}

.project-title {
    color: #1B4DA0;
    font-weight: bold;
}

/* ===== Footer ===== */
.site-footer {
    background-color: #245EDC;
    color: white;
    text-align: center;
    padding: 10px 0;
    border-top: 2px solid #0A2B8F;
}

.site-footer a {
    color: #fff;
    text-decoration: none;
}

.site-footer a:hover {
    text-decoration: underline;
}

/* ===== Links ===== */
.link {
    color: #1B4DA0;
    text-decoration: none;
}

.link:hover {
    text-decoration: underline;
}

/* ===== Theme Switcher ===== */
.theme-switcher {
    margin: 30px auto;
    background: #E7EDF8;
    border: 2px solid #9DB9EB;
    border-radius: 6px;
    width: fit-content;
    padding: 10px 20px;
    text-align: center;
}

.theme-button {
    background: linear-gradient(to bottom, #F5F5F5, #D8D8D8);
    border: 1px solid #999;
    border-radius: 3px;
    margin: 4px;
    padding: 4px 10px;
    font-family: Tahoma;
    font-size: 0.9em;
    cursor: pointer;
}

.theme-button.active {
    border-color: #245EDC;
    background: linear-gradient(to bottom, #DDE8FF, #BFD4F2);
}
