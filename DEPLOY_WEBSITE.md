# Main Website Storefront Deployment Commands & Guide

This file contains the complete step-by-step commands to deploy the Vite React Storefront Website (`/Users/gauravpawar/Desktop/perfume/perfume_ecommerce`) from GitHub to your Hostinger VPS serving `oudalanood.com` and `www.oudalanood.com`.

---

## DNS Adjustments in GoDaddy Panel

First, you must update the DNS records so requests for your website go to the new server instead of the old server:
1. Locate the **`A` record with name `@`** currently pointing to `192.124.249.28`.
2. Edit it and change the IP address to **`72.62.198.120`**.
3. Save the changes.

---

## Step 1: Clone the Website Repo on the VPS

Log into your VPS (or if you are already in the terminal), run this command to clone the website storefront codebase:

```bash
git clone https://github.com/juggernaut03/oud-al-anood.git /var/www/perfume-website
```

---

## Step 2: Install Dependencies & Build

```bash
# 1. Enter the website folder
cd /var/www/perfume-website

# 2. Install all development & production dependencies
npm install

# 3. Create the production environment variables file
nano .env
```

Paste this single environment variable pointing to your production API backend:

```env
VITE_API_BASE_URL=https://api.oudalanood.com
```

*Press `Ctrl+O` then `Enter` to save, and `Ctrl+X` to exit.*

Now, run the build script to generate the static files:

```bash
# 4. Build the project
npm run build
```

*(This compiles your react application and generates static assets inside `/var/www/perfume-website/dist/`)*

---

## Step 3: Configure Nginx to Serve the Storefront Website

```bash
# 1. Create a new Nginx configuration file
nano /etc/nginx/sites-available/perfume-website
```

Paste the following Nginx block. This directs requests for both the root domain `oudalanood.com` and the `www` subdomain to the built website:

```nginx
server {
    listen 80;
    server_name oudalanood.com www.oudalanood.com;

    root /var/www/perfume-website/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

*Press `Ctrl+O` then `Enter` to save, and `Ctrl+X` to exit.*

Now, enable the site and reload Nginx:

```bash
# 2. Link the site configuration to sites-enabled
ln -s /etc/nginx/sites-available/perfume-website /etc/nginx/sites-enabled/

# 3. Test configuration syntax (should report successful)
nginx -t

# 4. Restart Nginx to load configuration
systemctl restart nginx
```

---

## Step 4: Secure the Connection with SSL (Let's Encrypt)

Run Certbot to request a free SSL certificate for both domains (with and without `www`):

```bash
certbot --nginx -d oudalanood.com -d www.oudalanood.com
```

*(Enter your preferences when prompted. Certbot will automatically rewrite the Nginx config to use HTTPS and reload it.)*

---

## Step 5: Verification

Visit your browser at:
`https://oudalanood.com` or `https://www.oudalanood.com`

---

## Maintenance Cheatsheet

If you update the website in the future:
1. Push your changes to your GitHub repo.
2. SSH into the VPS: `ssh root@72.62.198.120`.
3. Pull updates, install packages, and rebuild:
   ```bash
   cd /var/www/perfume-website
   git pull
   npm install
   npm run build
   ```
   *(No Nginx or Certbot reload is needed for file changes, they serve instantly from `/dist`)*
