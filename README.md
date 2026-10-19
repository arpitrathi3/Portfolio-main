# Arpit Rathi — Personal Portfolio Website

A modern, responsive, and interactive personal portfolio website for **Arpit Rathi**, Software Engineer.
Built with clean semantic HTML5, modern Vanilla CSS with a customized dark green & electric lime design system, and lightweight modular JavaScript.

---

## 🎨 Design System & Palette

- **Primary Background**: Deep forest green-black (`#07130F`)
- **Secondary Background**: Subtle deep forest (`#0D1F18`)
- **Accent Green**: Electric Lime (`#A3E635`)
- **Secondary Accent**: Spring Emerald (`#4ADE80`)
- **Primary Text**: Mint Ice White (`#F0FDF4`)
- **Secondary Text**: Soft Sage Grey (`#A7B8AE`)
- **Borders & Highlights**: Subtle translucent green glassmorphism with delicate neon glows

---

## 🚀 Key Features

1. **Sticky Glassmorphic Navigation Bar**:
   - Monogram logo badge (`AR`) + Arpit Rathi branding.
   - Smooth scrolling with active section indicator tracking.
   - Dynamic backdrop blur on scroll.
   - Fully responsive animated mobile drawer.

2. **Hero Section**:
   - Status badge: *"Software Engineer | Open to Opportunities"* (pulsing indicator).
   - Headline: *"Hi, I'm Arpit Rathi."* and *"Software Engineer Building Digital Experiences."*
   - Interactive Constellation background with subtle floating particle nodes on HTML5 Canvas.
   - Primary & Secondary CTAs with smooth scrolling.
   - Configurable GitHub & LinkedIn social links.
   - **Dedicated Blank Portrait Photo Slot**:
     - 4:5 portrait ratio (~380px frame) with glowing outline and corner accents.
     - **Intentionally blank placeholder** per your exact specification (no stock images, AI faces, or random avatars).
     - Includes a built-in drag-and-drop or click-to-preview feature allowing you to preview your local photo instantly in the browser before deploying.

3. **About Me Section**:
   - Professional narrative covering software engineering, continuous learning, curiosity, and problem-solving.
   - 3 highlight cards with line icons:
     - *Continuous Learning*
     - *Problem Solving*
     - *Building & Creating*

4. **Skills & Knowledge**:
   - Categorized cards with category filter buttons (*All*, *Languages*, *Web Tech*, *Tools & Workflow*, *Core CS*, *Emerging Tech*).
   - Minimalist line icons and hover lift effects.
   - Clearly structured editable placeholders (Python, C, JavaScript, HTML5, CSS3, Git, GitHub, Data Structures, Algorithms, etc.).

5. **Certifications & Learning**:
   - Dedicated card for **AI for Clinicians** with medical/AI neural icon, full description, and neutral *"Certificate Link Coming Soon"* status.
   - Clean `+ Add Next Certification` card for easy expansion.

6. **Featured Projects**:
   - 3 clean, reusable project card templates with tech tags, descriptions, GitHub repository link placeholders, and live demo link placeholders.

7. **Contact Me Section**:
   - Heading: *"Let's Build Something Great Together."*
   - Prominent email: `rathiarpit877@gmail.com`.
   - **Working "Copy Email" button** with automatic clipboard copy and toast feedback.
   - Clean contact form with validation and a direct `mailto:` dispatch mechanism.

8. **Footer**:
   - *"Designed & Built by Arpit Rathi"*, quick navigation links, social icons, dynamic current year, and a smooth back-to-top floating button.

---

## 🛠️ How to Customize

### 1. Adding Your Personal Photo
In [`index.html`](file:///y:/Main/Portfolio/index.html), locate the `#photo-frame` container:
- Place your image (e.g. `arpit-photo.jpg`) inside an `images/` folder.
- Change the `src` attribute of the image tag:
  ```html
  <img id="user-custom-photo" class="user-custom-photo" src="images/arpit-photo.jpg" style="display: block;" alt="Arpit Rathi">
  ```
- Remove or hide the `#photo-placeholder-content` container.

### 2. Social Profiles Configured
- **GitHub**: [https://github.com/arpitrathi3](https://github.com/arpitrathi3)
- **LinkedIn**: [https://www.linkedin.com/in/arpit-kumar-22517642a/](https://www.linkedin.com/in/arpit-kumar-22517642a/)
- **Email**: `rathiarpit877@gmail.com`

### 3. Adding Your Certificate Link
Locate the "AI for Clinicians" card in `index.html` and replace `href="#"` with your credential URL, changing the status badge from "Certificate Link Coming Soon" to "Verified Credential".

---

## 💻 Running Locally

You can open `index.html` directly in any web browser, or serve it using Python:
```bash
python -m http.server 8080 --directory y:\Main\Portfolio
```
Then visit `http://localhost:8080`.
