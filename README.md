# Chandan — portfolio

Next.js portfolio with a built-in backend: the contact, book-a-call and book-a-project forms save to
`data/*.json`, show up in a password-protected admin panel at `/admin`, and (optionally) email you.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000. Admin panel: http://localhost:3000/admin/login

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
