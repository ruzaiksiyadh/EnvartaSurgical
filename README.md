# Envarta Surgical Website

Official website of **Envarta Surgical (Pvt) Ltd** — specialized surgical implant solutions for hospitals and surgical teams in Sri Lanka.

**Live site:** https://www.envartasurgical.com

This is a static, multi-page website built with plain **HTML, CSS and JavaScript**. There is no framework, no build step, no database and no backend. It is an informational site only: visitors can browse the company and its implant range and contact the team. There is no shop, cart, checkout, login or user accounts.

---

## Pages

| File | Page |
|---|---|
| `index.html` | Home |
| `about.html` | About Us (who we are, mission, vision, values) |
| `products.html` | Products (category filter, product cards, enquiry popup) |
| `services.html` | Services |
| `why-envarta.html` | Why Envarta (strengths and values) |
| `contact.html` | Contact details and inquiry form |

---

## Project structure

```
envarta-surgical-website/
├── index.html
├── about.html
├── products.html
├── services.html
├── why-envarta.html
├── contact.html
├── css/
│   └── style.css          # all styling and design tokens
├── js/
│   └── main.js            # navigation, scroll animation, product filter/popup, forms
├── images/
│   ├── logo.png           # full logo (transparent PNG)
│   ├── logo-icon.png      # icon-only mark, also used as the browser-tab favicon
│   ├── hero.jpg
│   ├── company-intro.jpg
│   ├── about.jpg
│   ├── services.jpg
│   ├── why-envarta.jpg
│   ├── category-cmf.jpeg
│   ├── category-spine.jpg
│   ├── category-trauma.jpeg
│   └── products/
│       ├── titanium-cranial-mesh.jpg
│       ├── titanium-mesh-patterns.jpg
│       ├── titanium-orbital-mesh.jpg
│       ├── titanium-fixation-system.jpg
│       ├── titanium-mandible-plate.jpg
│       ├── orthopedic-anatomical-plates.jpg
│       ├── orthopedic-plates-screws.jpg
│       ├── orthopedic-plate-set.jpg
│       ├── phdpe-facial-implants-1.jpg
│       └── phdpe-facial-implants-2.jpg
└── README.md
```

---

## Running the site locally

**Option 1 — Windows (included scripts)**
Double-click the `.bat` file in the project folder. It starts the PowerShell server (`serve.ps1`) and opens the site at `http://localhost:8080/`. Press `Ctrl+C` in the window to stop it.

**Option 2 — any static server**
From the project folder:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080/`.

You can also open `index.html` directly in a browser, but a local server is closer to how the site behaves online.

---

## Editing content

Every page is a normal HTML file — open it in any code editor and change the text directly. Each page repeats the same header (navigation) and footer, so if you change a phone number, email or menu item that appears in the footer or nav, update it on **all six pages**.

Things you will most likely edit:

- **Page text** — headings and paragraphs inside each `.html` file.
- **Products** — in `products.html`, each product is one `<div class="product-card" ...>` block. Update `data-name`, `data-cat`, `data-img` and the visible `<h3>` and `<img>` together. To add a product, copy an existing card inside the right category's `<div class="product-grid">`.
- **Colours and spacing** — design tokens are at the top of `css/style.css` under `:root`.
- **Behaviour** — `js/main.js`.

### Design tokens

| Token | Value | Use |
|---|---|---|
| `--navy` | `#0A1B33` | Dark sections, footer, headings |
| `--blue` | `#0F5FA6` | Primary brand blue |
| `--teal` | `#0C7C82` | Accents, gradient end |
| `--cyan` | `#3FC1D0` | Highlights on dark backgrounds |
| `--mist` | `#F2F6FA` | Light section backgrounds |

Fonts (loaded from Google Fonts): **Space Grotesk** for headings and **IBM Plex Sans** for body text.

---

## Images

Replace any image by saving a new file with the **exact same filename and extension** — no code changes needed. Recommended sizes:

- `hero.jpg` — about 1600 × 2000 px (portrait)
- Section images (`company-intro`, `about`, `services`, `why-envarta`) — about 1200 × 1500 px (4:5)
- Home category cards (`category-*`) and product photos — about 1200 × 900 px (4:3)

If an image fails to load, the page shows a labelled placeholder box with the expected file path, which makes missing files easy to spot.

**Case matters online.** Most web hosts (Linux) treat `Logo.png` and `logo.png` as different files, and `.jpg` and `.jpeg` as different extensions. Note that `category-cmf.jpeg` and `category-trauma.jpeg` use `.jpeg`, while `category-spine.jpg` uses `.jpg`.

---

## Contact and email behaviour

- Every **email link** on the site (navigation button, footer, contact page, call-to-action buttons) opens a **Gmail compose window** addressed to `envartasurgical@gmail.com` rather than the computer's default mail app.
- On the **Products** page, clicking a product opens a popup with an **Enquire About This Product** button. It opens Gmail with the subject `Inquiry – <product name>` and a message already naming that product.
- **Phone links** use `tel:` so they open the dialer on mobile.
- **Contact form** (`contact.html`) is set up to post to the [FormSubmit](https://formsubmit.co) service so enquiries arrive straight in the inbox. FormSubmit requires a **one-time activation**: after the first test submission, an activation email is sent to `envartasurgical@gmail.com` — click the link in it, otherwise submissions will not be delivered. Check the spam folder if it does not appear.

---

## Deployment

The site is hosted at **www.envartasurgical.com**. To update it:

1. Edit the files locally and test with the local server.
2. Upload the changed files to the hosting account, keeping the same folder structure (`css/`, `js/`, `images/`).
3. Make sure `index.html` is in the site root.
4. Hard-refresh the live site (`Ctrl+F5`) to bypass the browser cache.

---

## Known items still to finish

- **Contact form direct send.** The form markup in `contact.html` points to FormSubmit, but `js/main.js` was written earlier and still opens a Gmail compose window on submit. `main.js` and `style.css` need updating so that Send Inquiry submits in the background and shows the on-page success popup instead.
- **Social media links** in the footer (Facebook, LinkedIn, Instagram) are placeholders (`href="#"`) until real profile URLs are added.

---

## Company details

**Envarta Surgical (Pvt) Ltd**
4/11, Lake Road, Katukele, Kandy, Sri Lanka
Phone: +94 77 767 5844 · +94 81 222 8042
Email: envartasurgical@gmail.com
Business hours: 8:00 AM – 5:00 PM

&copy; 2016 EnvartaSurgical (Pvt) Ltd. All rights reserved.
