# Oud Alnood | Luxury Fragrance Boutique

A premium, multi-platform e-commerce experience for **Oud Alnood**, a luxury artisanal perfume brand based in Kuala Lumpur.

## 🌟 Features

- **Luxury Boutique UI**: Clean, sleek, and minimalist design with Glassmorphism 2.0 aesthetics.
- **Bilingual Experience**: Full support for English and Arabic with automated RTL/LTR layout switching.
- **Multi-Platform Ordering**: Seamless integration with Shopee, Grab, Lalamove, and J&T Express.
- **Wholesale Channel**: Dedicated bulk ordering mode with dynamic pricing logic.
- **Editorial Journal**: A high-end storytelling platform for brand heritage and perfume artistry.
- **Testimonial Carousel**: Interactive, gesture-enabled customer stories from a global audience.

## 🛠 Tech Stack

- **Core**: React 19, Vite 8, React Router 7
- **Styling**: Vanilla CSS (Custom tokens)
- **Animations**: Framer Motion 12
- **Icons**: Lucide React

## 🚀 Deployment

### GoDaddy / cPanel (oudalanood.com)

The browser MIME errors (`text/html` instead of CSS/JS) happen when **`dist/assets/` is not on the server**. The host then serves `index.html` for `/assets/*.js` and `/assets/*.css`.

1. Build locally (Node 20+): `npm run build:deploy`
2. Upload **everything inside `dist/`** to `public_html` (not only `index.html`):
   - `index.html`
   - `.htaccess`
   - `assets/` (required — hashed `.js` and `.css`)
   - `images/`, `favicon.svg`, `icons.svg`
3. Or upload one zip: `npm run pack:deploy` → upload and extract `oudalanood-deploy.zip` in `public_html`

After each release, replace the whole `assets/` folder (filenames change every build).

### Render (static site)

- **Build Command**: `npm install; npm run build`
- **Publish Directory**: `dist`
