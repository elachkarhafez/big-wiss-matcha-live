# Big Wiss Matcha - Premium One-Page Website

Production-ready Next.js 14+ one-page site for **Big Wiss Matcha**, a founder-led premium matcha pop-up brand in Dearborn, Michigan.

## Stack
- Next.js App Router + TypeScript
- Tailwind CSS
- Framer Motion
- React Three Fiber + Drei
- Lucide React
- Resend (inquiry email delivery)

## Project Structure
```text
app/
  api/inquiry/route.ts
  globals.css
  layout.tsx
  page.tsx
components/
  3d/
  layout/
  motion/
  sections/
  ui/
hooks/
lib/
public/
  logo/
  images/
  videos/
types/
```

## Install and Run Locally
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy env template:
   ```bash
   cp .env.example .env.local
   ```
3. Add Resend + contact env values (see below).
4. Run dev server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000)

## Environment Variables (Resend)
Set these in `.env.local`:

```env
RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=
```

Notes:
- `CONTACT_FROM_EMAIL` must use a verified sender/domain in Resend.
- Inquiry submissions post to `/app/api/inquiry/route.ts`.
- Email subject format: `New Event Inquiry | [Full Name] | [Event Date]`.

## Assets
Current paths used by the site:
- Logo: `/public/logo/big-wiss-logo.jpeg`
- Founder action poster: `/public/images/big-wiss-action-poster.png`
- Video: `/public/videos/matcha-pov.mp4`

Note: if your local `matcha-pov.mp4` is a placeholder, replace it with the real clip before production launch.

To replace assets:
1. Keep the same file names and paths, or
2. Update references in:
   - `/components/layout/navbar.tsx`
   - `/components/layout/footer.tsx`
   - `/components/sections/hero.tsx`
   - `/components/sections/about.tsx`
   - `/components/sections/action-feature.tsx`
   - `/components/sections/media-wall.tsx`
   - `/lib/constants.ts`

## Edit Content Quickly
Most editable content lives in:
- `/lib/constants.ts`

You can update:
- Nav items
- Menu items
- Matcha levels + matcha of the week spotlight
- Event services/qualities
- Event package previews
- Seen-at strip labels
- Vibe cards
- Media items
- Media expansion categories
- Reaction wall placeholders
- Inquiry event shortcut chips
- Next available booking dates
- Social placeholders
- Location details

## Update Social Links
Edit `SOCIAL_LINKS` in:
- `/lib/constants.ts`

Replace `"#"` with your real URLs (Instagram, TikTok, YouTube).

## Inquiry Form Validation
- Client + server validation uses Zod in `/lib/validations.ts`
- Honeypot anti-spam field: `website`
- API formatting is centralized in `/lib/email.ts`

## Production Build
```bash
npm run build
npm run start
```

## Deploy to Vercel
1. Push this repo to GitHub.
2. In Vercel, click **Add New Project** and import the GitHub repo.
3. Framework preset: **Next.js** (auto-detected).
4. Add environment variables in Vercel Project Settings:
   - `RESEND_API_KEY`
   - `CONTACT_TO_EMAIL`
   - `CONTACT_FROM_EMAIL`
5. Deploy.

## Connect Custom Domain on Vercel
1. Open your project in Vercel.
2. Go to **Settings > Domains**.
3. Add your domain.
4. Update DNS records at your registrar per Vercel instructions.
5. Wait for SSL provisioning and DNS propagation.

## GitHub Quick Start
```bash
git init
git add .
git commit -m "Build premium Big Wiss Matcha one-page site"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```
