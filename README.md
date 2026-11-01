# Chandan — portfolio

Personal portfolio of **Chandan Verma**, full-stack web & mobile developer. A Next.js site with a
built-in backend: the contact, book-a-call and book-a-project forms save to `data/*.json`, show up in a
password-protected admin panel at `/admin`, and (optionally) send you an email alert.

## Features

- **Portfolio pages:** home, work (with per-project pages), services (with per-service pages), about
  (experience, skills, achievements, clubs), contact (book a call, book a project, FAQ)
- **Animations:** GSAP scroll effects, Lenis smooth scrolling, illustrated scenes for each page
- **Forms backed by server actions:** messages and bookings are written to JSON files; call slots
  (IST) that are already booked can't be booked again
- **Admin panel** (`/admin`): dashboard with activity chart and status breakdowns, inbox for messages
  (new / read / archived), and bookings (pending / confirmed / done / cancelled) with filters
- **Email alerts** for new messages and bookings via SMTP (optional)
- **SEO:** sitemap, robots, Open Graph image, real 404s for unknown project/service slugs (`proxy.ts`)

## Tech stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · GSAP · Lenis · Nodemailer

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000. Admin panel: http://localhost:3000/admin/login

| Command         | What it does               |
| --------------- | -------------------------- |
| `npm run dev`   | Start the dev server       |
| `npm run build` | Production build           |
| `npm start`     | Serve the production build |
| `npm run lint`  | Run ESLint                 |

## Environment (`.env.local`)

```bash
# Admin panel login (required)
ADMIN_PASSWORD=choose-a-strong-password
ADMIN_SECRET=long-random-string        # e.g. `openssl rand -hex 32`

# Public URL, used in SEO and links in alert emails
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Email alerts for new messages/bookings (optional; skipped if missing)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=you@gmail.com
SMTP_PASS=your-16-char-app-password
NOTIFY_TO=you@gmail.com                # defaults to site.email in lib/content.ts
```

**Gmail App Password:** turn on 2-Step Verification on your Google account, then go to
https://myaccount.google.com/apppasswords, create one, and paste it (without spaces) as `SMTP_PASS`.

## Editing content

All site copy and data (name, contact details, socials, hero text, stats, projects, services,
experience, etc.) lives in **`lib/content.ts`**. Items marked `TODO` there are placeholders.
Images go in `public/` (`public/projects/`, `public/clubs/`, `public/events/<event>/`).

## Project structure

```
app/                 Routes (App Router)
  actions.ts         Server actions for the public forms
  admin/             Admin panel: dashboard, messages, bookings, login, actions
  about/ contact/ services/ work/
components/          UI sections, forms, illustrations, admin components
lib/
  content.ts         All site copy and data
  store.ts           JSON file storage, booking slots
  auth.ts            Admin login cookie
  notify.ts          Email alerts
  site-url.ts        Public site URL
proxy.ts             404s for unknown /work and /services slugs
data/                messages.json, bookings.json (created at runtime, git-ignored)
```

## Deploy on a VPS

```bash
git clone <repo> chandan && cd chandan
# create .env.local as above
npm ci && npm run build
npm i -g pm2
pm2 start npm --name chandan -- start   # serves on port 3000
pm2 save && pm2 startup
```

Put Nginx in front (`proxy_pass http://127.0.0.1:3000;`) and add HTTPS with Certbot. HTTPS is required:
the admin login cookie is `secure` in production.

**Updating:** `git pull && npm ci && npm run build && pm2 restart chandan`

### Your data

Messages and bookings live in `data/messages.json` and `data/bookings.json` inside the app folder
(git-ignored). Never delete that folder during deploys. Back it up daily with a cron entry:

```bash
0 3 * * * tar czf ~/backups/data-$(date +\%F).tgz -C /path/to/chandan data
```

> Serverless hosts like Vercel don't keep written files, so use a VPS (or swap `lib/store.ts` for a database).
