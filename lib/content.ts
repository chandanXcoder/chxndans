// All site copy and data lives here. Edit this file to update the portfolio.
// Items marked TODO are placeholders — replace them with your real links.

export const site = {
  name: "Chandan",
  fullName: "Chandan Verma",
  photo: "/chandan.webp",
  role: "Full-Stack Web & Mobile Developer",
  email: "chaandanverma@gmail.com",
  phone: "+91 81030 77970",
  phoneHref: "tel:+918103077970",
  whatsapp: "https://wa.me/918103077970",
  location: "Bareilly, India",
  available: true,
  socials: {
    github: "https://github.com/chandanXcoder",
    linkedin: "https://www.linkedin.com/in/chandan-verma-5b3b0337b/",
    playStore:
      "https://play.google.com/store/apps/details?id=com.invertismess.chandan",
    instagram: "#", // TODO
    whatsapp: "https://wa.me/918103077970",
  },
};


export const hero = {
  eyebrow: "Full-stack web & mobile developer · Freelancer",
  lines: ["I build products", "that actually"],
  accent: "ship.", // highlighted word at the end of the last line
  sub: "From Play Store apps to news platforms and client e-commerce, I turn ideas into live, production-ready software with React, Next.js, Node.js and Flutter.",
  primaryCta: { label: "View my work", href: "/work" },
  secondaryCta: { label: "Let's talk", href: "/contact" },
};

export const stats = [
  { value: "99-day", label: "GitHub commit streak" },
  { value: "800+", label: "contributions in a year" },
  { value: "Top 6", label: "Hack Bhoomi (SIH internal)" },
  { value: "Live", label: "on Google Play Store" },
  { value: "4+", label: "shipped real-world products" },
  { value: "TEDx", label: "co-host at Invertis University" },
];

export const about = {
  label: "Who I am",
  statement:
    "I'm Chandan Verma, a full-stack web and mobile developer and B.Tech Computer Science student at Invertis University. I design, build and ship production software, with a focus on performance, clean code and real-world impact.",
  paragraphs: [
    "I've delivered products end to end: Invertis Mess, an Android app live on Google Play for hostel students; Zoera Jewels, a client e-commerce store with PhonePe, Paytm and Ekart integrations; and Today India Times, a bilingual digital news portal.",
    "I work across React, Next.js, TypeScript, Node.js, Flutter, Firebase and Supabase, and I own the full lifecycle: requirements, UI, APIs, databases, deployment and support.",
    "Beyond client work, I'm a core member of the I-Tech Technical Club, where I help run workshops and hackathons, and I co-hosted TEDx Invertis University. I'm open to internships, freelance projects and full-time roles.",
  ],
  facts: [
    { k: "Based in", v: "Bareilly, India" },
    { k: "Education", v: "B.Tech CSE, Invertis University" },
    { k: "Focus", v: "Full-stack web & mobile apps" },
    { k: "Status", v: "Open to internships & freelance" },
  ],
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  role: string;
  challenge: string;
  outcome: string;
  highlights: string[];
  metrics: { value: string; label: string }[];
  stack: string[];
  link?: { label: string; href: string };
  image?: string; // screenshot in /public/projects
  site?: string; // address shown in the screenshot's browser bar
  accent: string; // gradient used for the visual
};

export const projects: Project[] = [
  {
    slug: "today-india-times",
    title: "Today India Times",
    category: "News Media, India",
    year: "2026", // TODO: confirm year
    summary:
      "A full-featured digital news portal, Truth · Speed · Integrity, covering India and the world with a live breaking-news ticker and English/Hindi editions.",
    role: "Design, development & deployment",
    challenge:
      "News readers bounce in seconds if a page is slow or cluttered. The site had to load instantly on any phone, stay easy to scan, and let new stories go live the moment they break.",
    outcome:
      "A newspaper-grade site with 15+ sections, reporter bylines, a live breaking ticker and ad slots, so readers can scan the day's news quickly on any screen.",
    highlights: [
      "15+ sections: India, States, Cities, Politics, Crime, Business, Education, Sports, Tech and more",
      "Breaking-news ticker, Latest feed, live date/clock and English/Hindi language switch",
      "Reader sign-in, notifications, search and built-in advertisement slots",
    ],
    metrics: [
      { value: "15+", label: "news sections" },
      { value: "EN / हिं", label: "bilingual" },
      { value: "Live", label: "breaking ticker" },
    ],
    stack: ["Next.js", "React", "Tailwind CSS", "Node.js", "Vercel"], // TODO: confirm stack
    link: { label: "Visit site", href: "https://todayindiatimes.vercel.app" },
    image: "/projects/today-india-times.webp",
    site: "todayindiatimes.vercel.app",
    accent: "from-rose-200 via-red-500 to-red-800",
  },
  {
    slug: "invertis-mess",
    title: "Invertis Mess",
    category: "EdTech App, India",
    year: "2025",
    summary:
      "The official smart mess management app for Invertis University hostel students: daily menus, push reminders and real-time feedback in one clean app.",
    role: "Design, development & publishing",
    challenge:
      "Students had no simple way to check what the mess was serving or get updates in time, which meant notice boards and word of mouth.",
    outcome:
      "The app is live on the Google Play Store. Students get the menu and announcements on their phones, and the mess team updates them instantly through Firebase.",
    highlights: [
      "Full weekly menu for 4 meal types, with veg tags and meal timings",
      "Push reminders, important notices and real-time feedback, powered by Firebase",
      "Live on the Google Play Store, with a companion website and a built-in mini game",
    ],
    metrics: [
      { value: "Live", label: "on Play Store" },
      { value: "4", label: "meal types daily" },
      { value: "Free", label: "for every student" },
    ],
    stack: ["Flutter", "Dart", "Firebase", "Next.js", "Android Studio"],
    link: {
      label: "Get it on Play Store",
      href: "https://play.google.com/store/apps/details?id=com.invertismess.chandan",
    },
    image: "/projects/invertis-mess.webp",
    site: "invertismess.vercel.app",
    accent: "from-lime-300 via-emerald-400 to-teal-600",
  },
  {
    slug: "zoera-jewels",
    title: "Zoera Jewels",
    category: "E-commerce, India",
    year: "2025",
    summary:
      "A full-stack e-commerce store for an 18K gold-plated, anti-tarnish jewellery brand, from catalogue to checkout to doorstep.",
    role: "Full-stack development for a client",
    challenge:
      "A growing jewellery brand needed more than a catalogue. It needed a store that takes payments in the ways Indian customers prefer and ships orders without manual work.",
    outcome:
      "A complete store that handles the full journey from browsing to payment to delivery, with PhonePe/Paytm checkout and Ekart shipping built in.",
    highlights: [
      "Collections, search, wishlist and cart, with sale banners and an offers ticker",
      "PhonePe and Paytm payments plus Cash on Delivery",
      "Ekart logistics API for automated shipping, plus WhatsApp chat support",
    ],
    metrics: [
      { value: "2", label: "payment gateways" },
      { value: "Ekart", label: "logistics API" },
      { value: "Full-stack", label: "client delivery" },
    ],
    stack: ["Next.js", "Node.js", "MongoDB", "PhonePe", "Paytm", "Ekart API"],
    link: { label: "Visit store", href: "https://zoerajewels.in" },
    image: "/projects/zoera-jewels.webp",
    site: "zoerajewels.in",
    accent: "from-yellow-200 via-amber-400 to-yellow-700",
  },
];

export const skills = [
  {
    title: "Frontend",
    blurb: "Fast, accessible and animated interfaces.",
    items: ["React.js", "Next.js", "JavaScript", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Backend & Database",
    blurb: "APIs, auth, payments and data that scale.",
    items: ["Node.js", "Express.js", "Firebase", "Supabase", "MongoDB"],
  },
  {
    title: "Mobile",
    blurb: "Cross-platform apps shipped to real stores.",
    items: ["Flutter", "Dart", "Firebase", "Play Store publishing"],
  },
  {
    title: "Tools & Deployment",
    blurb: "From commit to production, every day.",
    items: ["Git", "GitHub", "VS Code", "Android Studio", "Vercel"],
  },
];

export const experience = [
  {
    period: "2024 — Now",
    role: "Freelance Full-Stack Developer",
    org: "Independent",
    points: [
      "Deliver production websites and apps for clients, including a full e-commerce platform with payments and logistics.",
      "Own the full cycle: requirements, design, build, deployment and support.",
    ],
  },
  {
    period: "2024 — Now",
    role: "Core Member, Trainer & Event Organizer",
    org: "I-Tech Technical Club · Abhiruchi, Invertis University",
    points: [
      "Lead hands-on web development workshops for student members.",
      "Plan and run technical events, workshops and hackathons for the club.",
    ],
  },
  {
    period: "Events",
    role: "Co-host & Organizer",
    org: "TEDx Invertis University and campus events",
    points: [
      "Co-hosted TEDx at Invertis University.",
      "Helped organise Invertia 2026, Invertthon 2.0, LinkedIn Summit and AR/VR workshops.",
    ],
  },
  {
    period: "Consistency",
    role: "Open Source & Daily Building",
    org: "GitHub",
    points: [
      "Peak 99-day commit streak with 800+ contributions.",
      "Ship something small, every single day.",
    ],
  },
];

export const faqs = [
  {
    q: "Are you available for freelance work?",
    a: "Yes. I take on websites, web apps, mobile apps and MVPs. Send a short brief through the contact form and I'll reply within 24 hours.",
  },
  {
    q: "What kind of projects do you take on?",
    a: "Business websites, e-commerce stores with payments, dashboards, Flutter apps for Android/iOS, and hackathon-style prototypes that need to move fast.",
  },
  {
    q: "What does your process look like?",
    a: "A quick call to understand goals, a clear scope and timeline, weekly progress demos, then deployment and handover. You always see working software, not just updates.",
  },
  {
    q: "How long does a typical project take?",
    a: "A landing page or portfolio takes about 1–2 weeks. A full e-commerce site or app usually takes 4–8 weeks depending on features.",
  },
  {
    q: "Are you open to internships or full-time roles?",
    a: "Absolutely. I'm looking for internships and roles where I can ship real products with a strong team.",
  },
];

export const contact = {
  heading: "Got an idea? Let's build it.",
  sub: "Whether it's a startup MVP, a client store or a crazy hackathon prototype, I'd love to hear about it.",
  projectTypes: ["Website", "Web App", "Mobile App", "E-commerce", "Internship / Job", "Other"],
  budgets: ["< ₹10k", "₹10k – ₹30k", "₹30k – ₹80k", "₹80k+", "Not sure yet"],
};

export type Service = {
  slug: string;
  title: string;
  desc: string;
  intro: string;
  deliverables: { title: string; text: string }[];
  stack: string[];
  project?: string; // slug of a related project
};

export const services: Service[] = [
  {
    slug: "website-development",
    title: "Website Development",
    desc: "Fast, responsive business and portfolio sites built with Next.js and Tailwind CSS, ready to rank and convert.",
    intro:
      "Your website is often the first conversation you have with a customer. I build sites that load instantly, look sharp on every screen and are structured for search engines from day one.",
    deliverables: [
      { title: "Custom design", text: "A layout built around your brand and goals, not a recycled template." },
      { title: "Responsive build", text: "Pixel-perfect on phones, tablets and large desktops." },
      { title: "SEO foundations", text: "Clean markup, metadata, sitemaps and fast Core Web Vitals." },
      { title: "Easy updates", text: "Content kept in one place so changes don't need a developer." },
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
    project: "today-india-times",
  },
  {
    slug: "web-app-development",
    title: "Web App Development",
    desc: "Dashboards, portals and SaaS-style apps with authentication, databases and real-time data.",
    intro:
      "When a website needs to do real work, like logins, dashboards and live data, I build full web applications with a solid frontend, secure APIs and a database designed to grow.",
    deliverables: [
      { title: "Authentication", text: "Sign-up, login and role-based access for users and admins." },
      { title: "Dashboards", text: "Clear, fast admin panels to manage your data and content." },
      { title: "Real-time features", text: "Live updates, notifications and feeds via Firebase or Supabase." },
      { title: "Scalable architecture", text: "Code organised so new features are quick to add." },
    ],
    stack: ["Next.js", "React", "Node.js", "Supabase", "Firebase", "MongoDB"],
    project: "today-india-times",
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    desc: "Cross-platform Flutter apps for Android and iOS, from first screen to Play Store release.",
    intro:
      "One codebase, two platforms. I design and build Flutter apps that feel native, sync in real time and get published to the store, as I did with Invertis Mess.",
    deliverables: [
      { title: "Flutter app", text: "A single codebase for Android and iOS with native performance." },
      { title: "Firebase backend", text: "Auth, database, storage and push notifications set up for you." },
      { title: "Store publishing", text: "Play Store listing, screenshots, signing and release handled." },
      { title: "Updates & support", text: "Bug fixes and new versions after launch." },
    ],
    stack: ["Flutter", "Dart", "Firebase", "Android Studio"],
    project: "invertis-mess",
  },
  {
    slug: "ecommerce-stores",
    title: "E-commerce Stores",
    desc: "Complete online stores with catalogue, cart, PhonePe/Paytm payments and shipping integrations.",
    intro:
      "Selling online in India means UPI, wallets, cash on delivery and reliable shipping. I build stores that handle all of it, from product catalogue to the customer's doorstep.",
    deliverables: [
      { title: "Catalogue & cart", text: "Collections, search, wishlist, cart and offers." },
      { title: "Payments", text: "PhonePe, Paytm and Cash on Delivery integrated end to end." },
      { title: "Shipping", text: "Logistics APIs like Ekart for automated orders and tracking." },
      { title: "Admin panel", text: "Manage products, orders and customers in one place." },
    ],
    stack: ["Next.js", "Node.js", "MongoDB", "PhonePe", "Paytm", "Ekart API"],
    project: "zoera-jewels",
  },
  {
    slug: "backend-apis",
    title: "Backend & APIs",
    desc: "Node.js and Express APIs on MongoDB, Firebase or Supabase, built to be secure and scale.",
    intro:
      "A good product needs a reliable engine. I design REST APIs and databases that are secure, well-structured and ready to power your web and mobile apps.",
    deliverables: [
      { title: "REST APIs", text: "Clean, documented endpoints built with Node.js and Express." },
      { title: "Database design", text: "MongoDB, Firebase or Supabase schemas modelled for your data." },
      { title: "Integrations", text: "Payments, shipping, email and third-party services." },
      { title: "Security", text: "Validation, authentication and protected routes by default." },
    ],
    stack: ["Node.js", "Express.js", "MongoDB", "Firebase", "Supabase"],
    project: "zoera-jewels",
  },
  {
    slug: "ui-ux-landing-pages",
    title: "UI/UX & Landing Pages",
    desc: "Clean, modern interfaces and high-converting landing pages with smooth animations.",
    intro:
      "Launching a product or campaign? I design and build focused landing pages and interfaces with clear messaging, strong calls to action and smooth, modern motion.",
    deliverables: [
      { title: "Interface design", text: "Clean layouts and components that are easy to use." },
      { title: "Landing pages", text: "Conversion-focused pages for launches, events and ads." },
      { title: "Animations", text: "Scroll and hover effects with GSAP that feel premium." },
      { title: "Fast delivery", text: "A polished page live in days, not weeks." },
    ],
    stack: ["Next.js", "Tailwind CSS", "GSAP", "Figma"],
    project: "invertis-mess",
  },
  {
    slug: "iot-hackathon-prototypes",
    title: "IoT & Hackathon Prototypes",
    desc: "Hardware-connected systems with Raspberry Pi and ESP32, plus live web dashboards, built fast.",
    intro:
      "Need a working prototype for a hackathon, demo or pitch? I connect hardware like Raspberry Pi and ESP32 to live web dashboards, fast and demo-ready.",
    deliverables: [
      { title: "Hardware setup", text: "Raspberry Pi, ESP32 and sensors wired and programmed." },
      { title: "Live dashboard", text: "A web dashboard that streams sensor data in real time." },
      { title: "Rapid build", text: "Working prototypes built on hackathon timelines." },
      { title: "Demo ready", text: "Polished enough to present to judges and investors." },
    ],
    stack: ["Raspberry Pi", "ESP32", "Sensors", "Next.js", "Firebase"],
  },
  {
    slug: "deployment-maintenance",
    title: "Deployment & Maintenance",
    desc: "Vercel deployments, domains, performance fixes and ongoing support after launch.",
    intro:
      "Launch is just the start. I handle hosting, domains and performance, and I stay on hand for fixes and improvements so your product keeps running smoothly.",
    deliverables: [
      { title: "Deployment", text: "Hosting on Vercel with CI, previews and environment setup." },
      { title: "Domains & email", text: "Custom domains, DNS and SSL configured correctly." },
      { title: "Performance", text: "Speed audits and fixes for faster loads and better SEO." },
      { title: "Ongoing support", text: "Monthly updates, bug fixes and new features." },
    ],
    stack: ["Vercel", "Git", "GitHub", "Next.js"],
  },
];

export const process = [
  { title: "Discover", text: "A quick call to understand your goals, users and timeline." },
  { title: "Design", text: "Structure and look agreed before a single line of code." },
  { title: "Build", text: "Weekly demos of working software, so you always see progress." },
  { title: "Launch & support", text: "Deployment, handover and help after go-live." },
];

export const achievements = [
  { value: "99", unit: "days", title: "GitHub commit streak", text: "A peak streak of 99 days of daily commits." },
  { value: "800+", unit: "", title: "Contributions", text: "Over 800 GitHub contributions in a single year." },
  { value: "Top 6", unit: "", title: "Hack Bhoomi", text: "Placed in the top 6 at the internal Smart India Hackathon evaluation." },
  { value: "Live", unit: "", title: "Google Play Store", text: "Invertis Mess published and live for university students." },
  { value: "TEDx", unit: "", title: "Co-host", text: "Co-hosted TEDx Invertis University." },
  { value: "4+", unit: "events", title: "Major campus events", text: "Helped organise Invertia 2026, Invertthon 2.0, LinkedIn Summit and AR/VR workshops." },
];

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; external?: boolean }[];
};

export const nav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Overview", href: "/about" },
      { label: "Experience", href: "/about/experience" },
      { label: "Skills", href: "/about/skills" },
      { label: "Achievements", href: "/about/achievements" },
    ],
  },
  {
    label: "Work",
    href: "/work",
    children: [
      { label: "All projects", href: "/work" },
      ...projects.map((p) => ({ label: p.title, href: `/work/${p.slug}` })),
    ],
  },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "All services", href: "/services" },
      ...services.map((s) => ({ label: s.title, href: `/services/${s.slug}` })),
    ],
  },
  {
    label: "Contact",
    href: "/contact",
    children: [
      { label: "Start a project", href: "/contact" },
      { label: "FAQ", href: "/contact/faq" },
      { label: "WhatsApp", href: site.socials.whatsapp, external: true },
    ],
  },
];
