// All site copy and data lives here. Edit this file to update the portfolio.
// Items marked TODO are placeholders — replace them with your real links.

export const site = {
  name: "Chandan",
  fullName: "Chandan Verma",
  // portrait; avatar is a head-and-shoulders crop of it
  photo: "/chandan-portrait.webp",
  avatar: "/chandan-face.webp",
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
  eyebrow: "Full-stack web & mobile developer",
  lines: ["I build products", "that actually"],
  accent: "ship.", // highlighted word at the end of the last line
  sub: "From Play Store apps to news platforms and client e-commerce, I turn ideas into live, production-ready software with React, Next.js, Node.js and Flutter.",
  primaryCta: { label: "View my work", href: "/work" },
  secondaryCta: { label: "Let's talk", href: "/contact" },
};

export const stats = [
  { value: "99-day", label: "GitHub commit streak" },
  { value: "1200+", label: "contributions in a year" },
  { value: "4th", label: "HackBhoomi 2.0 (SIH internal)" },
  { value: "Live", label: "on Google Play Store" },
  { value: "4+", label: "shipped real-world products" },
  { value: "TEDx", label: "co-host at Invertis University" },
];

export const about = {
  label: "Who I am",
  statement:
    "I'm Chandan Verma, a full-stack web and mobile developer and B.Tech Computer Science student at Invertis University. I design, build and ship production software, with a focus on performance, clean code and real-world impact.",
  paragraphs: [
    "I've delivered products end to end: Invertis Mess, an Android app live on Google Play for hostel students; Zoera Jewels, a client e-commerce store with PhonePe, Paytm and Ekart integrations; Today India Times, a bilingual digital news portal; and abhiरुचि, the official platform of Invertis University's Hobby Club.",
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
  tags: string[]; // kind of work, shown on the works slider
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
    tags: ["Web Design", "Web App", "News"],
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
    tags: ["Mobile App", "UX/UI", "Play Store"],
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
      { value: "Live", label: "zoerajewels.in" },
    ],
    stack: ["Next.js", "Node.js", "MongoDB", "PhonePe", "Paytm", "Ekart API"],
    tags: ["E-commerce", "Web Design", "Payments"],
    link: { label: "Visit store", href: "https://zoerajewels.in" },
    image: "/projects/zoera-jewels.webp",
    site: "zoerajewels.in",
    accent: "from-yellow-200 via-amber-400 to-yellow-700",
  },
  {
    slug: "abhiruchi",
    title: "abhiरुचि",
    category: "Student Community, Invertis University",
    year: "2026",
    summary:
      "The official website of abhiरुचि – The Hobby Club, the student organisation behind seven clubs and the biggest events at Invertis University.",
    role: "Full-stack development",
    challenge:
      "Seven clubs, hundreds of events and thousands of students had no single home. Club details, event updates and team information were scattered across posters and group chats.",
    outcome:
      "One live platform where students explore every club, follow upcoming and past events, meet the teams and sign in, while the core team manages content from an admin panel.",
    highlights: [
      "Pages for all 7 clubs: I-Tech, M-Factor, Panache, Rock On, Stride, Images and The Responsible Invertian",
      "Events with upcoming, past and timeline views, plus event proposal submission",
      "Teams directory filtered by club and position, and a photo gallery",
      "Email and Google sign-in with Firebase Auth, content stored in Firestore and images on Cloudinary",
    ],
    metrics: [
      { value: "7", label: "clubs on one platform" },
      { value: "15k+", label: "students reached" },
      { value: "Live", label: "abhruchi.vercel.app" },
    ],
    stack: ["Next.js", "React", "Firebase Auth", "Firestore", "Cloudinary", "Framer Motion", "Vercel"],
    tags: ["Web App", "Community", "Firebase"],
    link: { label: "Visit website", href: "https://abhruchi.vercel.app" },
    image: "/projects/abhiruchi.webp",
    site: "abhruchi.vercel.app",
    accent: "from-rose-200 via-red-500 to-orange-600",
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
  {
    title: "Event Management",
    blurb: "Stages, crowds and crews, from TEDx to 24-hour hackathons.",
    items: [
      "Event Logistics",
      "Team Leadership",
      "Stage Hosting",
      "Sound & AV Operations",
      "Speaker Coordination",
      "Public Relations",
      "Volunteer Management",
    ],
  },
];

export const experience = [
  {
    id: "freelance",
    period: "2024 — Now",
    role: "Freelance Full-Stack Developer",
    org: "Independent",
    points: [
      "Deliver production websites and apps for clients, including a full e-commerce platform with payments and logistics.",
      "Own the full cycle: requirements, design, build, deployment and support.",
    ],
  },
  {
    id: "clubs",
    period: "2025 — 2026",
    role: "Former Active Member & Event Organizer",
    org: "I-Tech Technical Club · abhiरुचि – The Hobby Club, Invertis University",
    points: [
      "Planned, proposed and ran technical events, workshops and hackathons for the club.",
      "Hosted club and campus events, and networked with guests, sponsors and other clubs.",
    ],
  },
  {
    id: "events",
    period: "Events",
    role: "Co-host & Organizer",
    org: "TEDx Invertis University and campus events",
    points: [
      "Co-hosted TEDx at Invertis University.",
      "Co-hosted Invertia 2026, organised the LinkedIn Creator Summit and placed 4th at Invertthon 2.0.",
    ],
  },
  {
    id: "github",
    period: "Consistency",
    role: "Open Source & Daily Building",
    org: "GitHub",
    points: [
      "Peak 99-day commit streak with 1200+ contributions.",
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
  timelines: ["ASAP", "2–4 weeks", "1–2 months", "Flexible"],
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
    project: "abhiruchi",
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
    slug: "seo-optimization",
    title: "SEO Optimization",
    desc: "Technical and on-page SEO that helps your site rank on Google and get found by the right customers.",
    intro:
      "A great website only works if people can find it. I optimise your site's structure, content and speed so search engines understand it and rank it higher.",
    deliverables: [
      { title: "Technical SEO", text: "Sitemaps, robots.txt, canonical URLs and structured data (schema)." },
      { title: "On-page SEO", text: "Titles, meta descriptions, headings and keywords tuned for every page." },
      { title: "Core Web Vitals", text: "Speed and performance fixes that search engines reward." },
      { title: "Search Console & analytics", text: "Google Search Console and Analytics set up to track growth." },
    ],
    stack: ["Next.js", "Google Search Console", "Google Analytics", "Lighthouse", "Schema.org"],
  },
  {
    slug: "domain-integration",
    title: "Domain Integration",
    desc: "Custom domain setup, DNS, SSL and professional email, connected correctly to your site or app.",
    intro:
      "Your domain is your brand's address online. I connect it to your website or app, configure DNS and SSL, and set up professional email so everything just works.",
    deliverables: [
      { title: "Domain setup", text: "Help choosing and buying a domain, then connecting it to your hosting." },
      { title: "DNS configuration", text: "A, CNAME, MX and TXT records configured without downtime." },
      { title: "SSL / HTTPS", text: "Secure certificates installed and auto-renewing." },
      { title: "Business email", text: "Professional email like you@yourbrand.com with proper SPF/DKIM." },
    ],
    stack: ["Vercel", "Cloudflare", "GoDaddy", "Hostinger", "Google Workspace"],
  },
  {
    slug: "deployment-maintenance",
    title: "Deployment & Maintenance",
    desc: "Vercel deployments, performance fixes and ongoing support after launch.",
    intro:
      "Launch is just the start. I handle hosting and performance, and I stay on hand for fixes and improvements so your product keeps running smoothly.",
    deliverables: [
      { title: "Deployment", text: "Hosting on Vercel with CI, previews and environment setup." },
      { title: "Monitoring", text: "Uptime and error tracking so issues are caught early." },
      { title: "Performance", text: "Speed audits and fixes for faster loads." },
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
  { id: "streak", value: "99", unit: "days", title: "GitHub commit streak", text: "A peak streak of 99 days of daily commits." },
  { id: "contributions", value: "1200+", unit: "", title: "Contributions", text: "Over 1200 GitHub contributions in a single year." },
  { id: "hackathon", value: "4th", unit: "", title: "HackBhoomi 2.0", text: "Secured 4th place at HackBhoomi 2.0, the internal Smart India Hackathon at Invertis University." },
  { id: "playstore", value: "Live", unit: "", title: "Google Play Store", text: "Invertis Mess published and live for university students." },
  { id: "tedx", value: "TEDx", unit: "", title: "Co-host", text: "Co-hosted TEDx Invertis University." },
  { id: "events", value: "4+", unit: "events", title: "Major campus events", text: "Co-hosted Invertia 2026, organised the LinkedIn Creator Summit and placed 4th at Invertthon 2.0." },
];

export type EventItem = {
  slug: string;
  title: string;
  tagline: string;
  role: string;
  year: string;
  summary: string;
  metrics: { value: string; label: string }[];
  highlights: string[];
  contributions: string[];
  tags: string[];
  // Drop photos into /public/events/<slug>/ and list them here. Empty shows a placeholder.
  photos: { src: string; alt: string }[];
};

export const events: EventItem[] = [
  {
    slug: "tedx",
    title: "TEDx Invertis University",
    tagline: "Ideas worth spreading, live on campus.",
    role: "Co-host & Organizer",
    year: "2025",
    summary:
      "Co-hosted the three-day TEDx edition at Invertis University and its run of pre-events, sharing the stage with speakers Bhumi Pednekar, Ashish Vidyarthi and Pratika Rawal.",
    metrics: [
      { value: "3 days", label: "Main event" },
      { value: "3", label: "Celebrity speakers" },
      { value: "Multiple", label: "Pre-events" },
    ],
    highlights: [
      "Co-hosted the main stage across all three days",
      "Introduced Bhumi Pednekar, Ashish Vidyarthi and Pratika Rawal",
      "Hosted multiple pre-events in the build-up to TEDx",
    ],
    contributions: [
      "Scripted and delivered the stage hosting, introducing every speaker and holding the audience between talks.",
      "Hosted the pre-events that built momentum on campus before the main event.",
      "Coordinated with sound and lighting operators on mic handovers, walk-on music and slide cues.",
      "Handled on-the-spot changes to the running order without breaking the flow of the show.",
    ],
    tags: ["Public Speaking", "Stage Management", "Speaker Relations", "Team Leadership"],
    photos: [{ src: "/events/tedx/team.jpg", alt: "TEDx Invertis University co-hosts and crew on stage" }],
  },
  {
    slug: "linkedin-summit",
    title: "Invertis LinkedIn Creator Summit",
    tagline: "Creators, careers and a lot of laughs.",
    role: "Organizer",
    year: "2026",
    summary:
      "Helped organise the Invertis × LinkedIn Creator Summit on personal branding and career growth, with creator panels and stand-up comedians Crazy and Ashish Solanki.",
    metrics: [
      { value: "300+", label: "Students" },
      { value: "2", label: "Stand-up comedians" },
      { value: "1 day", label: "Summit" },
    ],
    highlights: [
      "Stand-up sets by Crazy and Ashish Solanki",
      "Creator panels on LinkedIn and personal branding",
      "Ran registrations and seating on the day",
    ],
    contributions: [
      "Managed guest communication from the first invite to the thank-you note.",
      "Set up registration and check-in so hundreds of students got seated quickly.",
      "Planned the promotion across posters, WhatsApp groups and club pages.",
      "Kept sessions on time and handled the audience Q&A mic.",
    ],
    tags: ["Event Logistics", "Public Relations", "Guest Coordination", "Promotion"],
    photos: [{ src: "/events/linkedin-summit/panel.webp", alt: "Creator panel at the Invertis LinkedIn Creator Summit" }],
  },
  {
    slug: "agriculture-summit",
    title: "Agriculture Summit",
    tagline: "Technology meets the field.",
    role: "Sound & AV Lead",
    year: "2025",
    summary:
      "Owned the sound and AV for the Agriculture Summit, making sure every speaker, panel and presentation was heard and seen clearly.",
    metrics: [
      { value: "400+", label: "Attendees" },
      { value: "Full", label: "Sound & AV ops" },
      { value: "8+", label: "Panels & talks" },
    ],
    highlights: [
      "Set up and operated the sound system end to end",
      "Managed mics, projector and presentation switching",
      "Ran soundchecks before every session",
    ],
    contributions: [
      "Planned the audio layout for the hall: speakers, mixer position and mic count.",
      "Ran soundchecks with every panel before they went live.",
      "Operated the mixer and presentation switching for the whole day.",
      "Troubleshot feedback and dropouts live without stopping sessions.",
    ],
    tags: ["Sound Engineering", "AV Operations", "Technical Setup", "Event Logistics"],
    photos: [{ src: "/events/invertthon-2/team.jpg", alt: "Team at the Agriculture Summit" }],
  },
  {
    slug: "invertia-2026",
    title: "Invertia 2026",
    tagline: "The university's flagship fest.",
    role: "Co-host",
    year: "2026",
    summary:
      "Co-hosted Invertia 2026, the biggest event of Invertis University: two days of competitions and shows headlined by a live Sunidhi Chauhan concert, plus the pre-events leading up to it.",
    metrics: [
      { value: "2 days", label: "Main fest" },
      { value: "Live", label: "Sunidhi Chauhan concert" },
      { value: "Multiple", label: "Pre-events" },
    ],
    highlights: [
      "Co-hosted the main stage across both days",
      "On stage for the Sunidhi Chauhan concert night",
      "Hosted the pre-events and Mr. & Ms. Invertia",
    ],
    contributions: [
      "Co-hosted the main stage, introducing performers, competitions and award ceremonies.",
      "Hosted the pre-events that built up to the fest across campus.",
      "Kept the crowd engaged between acts on the concert night.",
      "Worked with the stage and AV crew on cues and running order.",
    ],
    tags: ["Public Speaking", "Stage Management", "Crowd Engagement", "Team Leadership"],
    photos: [{ src: "/events/invertia-2026/mr-ms-invertia.jpg", alt: "With the Mr. & Ms. Invertia 2026 winners" }],
  },
  {
    slug: "convocation-12",
    title: "12th Convocation Ceremony",
    tagline: "From graduation to greatness.",
    role: "Organizing Team",
    year: "2025",
    summary:
      "Part of the team behind Invertis University's 12th Convocation, where Navjot Singh Sidhu, Sushmita Mishra, Sanjay Mishra and Tapas Das were conferred honorary doctorates.",
    metrics: [
      { value: "12th", label: "Convocation" },
      { value: "4", label: "Honorary doctorates" },
      { value: "1000s", label: "Graduates & guests" },
    ],
    highlights: [
      "Honorary doctorates for Navjot Singh Sidhu, Sushmita Mishra, Sanjay Mishra and Tapas Das",
      "Managed guest and graduate flow during the ceremony",
      "Supported the Sun Downer evening",
    ],
    contributions: [
      "Coordinated the arrival and seating of chief guests and graduates.",
      "Kept the ceremony on schedule alongside the stage and AV teams.",
      "Guided families and graduates through the venue on the day.",
      "Helped run the Sun Downer celebration after the ceremony.",
    ],
    tags: ["Event Logistics", "Guest Coordination", "Protocol", "Team Leadership"],
    photos: [{ src: "/events/convocation-12/team.jpg", alt: "Organizing team at the 12th Convocation Ceremony" }],
  },
  {
    slug: "nirmiti-2026",
    title: "Nirmiti 2026",
    tagline: "The Invertis fashion show.",
    role: "Sound & Lights Operator",
    year: "2026",
    summary:
      "Ran the sound and auditorium lighting for Nirmiti 2026, the annual fashion show by the Department of Fashion Design.",
    metrics: [
      { value: "Sound", label: "Mixing & playback" },
      { value: "Lights", label: "Auditorium rig" },
      { value: "Live", label: "Runway show" },
    ],
    highlights: [
      "Operated the sound system for the whole show",
      "Ran the auditorium lights for every runway walk",
      "Synced music and lighting cues with the designers' collections",
    ],
    contributions: [
      "Set up and soundchecked the audio before the show.",
      "Played and mixed the runway tracks for each collection.",
      "Operated the auditorium lighting, changing the look for every walk.",
      "Worked with the show coordinators on the running order and cues.",
    ],
    tags: ["Sound Engineering", "Lighting Operation", "AV Operations", "Live Shows"],
    photos: [{ src: "/events/nirmiti-2026/fashion-show.webp", alt: "Models on the runway at Nirmiti 2026" }],
  },
  {
    slug: "invertthon-2",
    title: "Invertthon 2.0",
    tagline: "The university hackathon.",
    role: "Participant · 4th Place",
    year: "2026",
    summary:
      "Competed at Invertthon 2.0 and finished 4th with a mine safety rover our team designed and built during the hackathon.",
    metrics: [
      { value: "4th", label: "Position" },
      { value: "1", label: "Working rover" },
      { value: "Team", label: "Hardware + software" },
    ],
    highlights: [
      "Secured 4th position overall",
      "Built a mine safety rover from scratch",
      "Demoed the working prototype to the judges",
    ],
    contributions: [
      "Worked with the team to scope the mine safety problem and design the rover.",
      "Built and integrated the rover's hardware and control code.",
      "Tested and debugged the prototype under hackathon time pressure.",
      "Presented the rover and answered the judges' questions in the final round.",
    ],
    tags: ["Hardware Prototyping", "Robotics", "Teamwork", "Problem Solving"],
    photos: [{ src: "/events/invertthon-2/team.jpg", alt: "Team at the hackathon felicitation ceremony" }],
  },
];

export const club = {
  status: "Former Active Member",
  period: "2025 — 2026",
  name: "I-Tech",
  fullName: "I-Tech, The Technical Club",
  logo: "/clubs/itech.png",
  about:
    "I-Tech is the technical club of Invertis University, where students learn by building: workshops, coding sessions, hackathons and the tech behind campus events.",
  parent: {
    name: "abhiरुचि",
    fullName: "abhiरुचि – The Hobby Club",
    logo: "/clubs/abhiruchi.png",
    about:
      "The university's student organisation behind seven clubs and the biggest events on campus, from TEDx to Invertia.",
    clubs: ["I-Tech", "M-Factor", "Panache", "Rock On", "Stride", "Images", "The Responsible Invertian"],
  },
  metrics: [
    { value: "7", label: "Clubs under abhiरुचि" },
    { value: "15k+", label: "Students reached" },
    { value: "1 yr", label: "Active membership" },
  ],
  roles: [
    {
      title: "Event Host & Organizer",
      text: "Planned and ran technical events, workshops and hackathons, hosted them on stage and handled sound and AV for the club's shows.",
    },
    {
      title: "Developer",
      text: "Designed and built the official abhiरुचि website: club pages, events, teams and an admin panel for the core team.",
    },
  ],
  learned: [
    { title: "Public Speaking", text: "Speaking confidently in front of hundreds, from club meetings to the main stage." },
    { title: "Event Hosting", text: "Anchoring live shows, introducing guests and holding the crowd between acts." },
    { title: "Proposal Making", text: "Writing event proposals and budgets that get approved by faculty and management." },
    { title: "Networking", text: "Building relationships with guests, speakers, sponsors and members of other clubs." },
    { title: "Team Leadership", text: "Leading volunteer teams and keeping everyone in sync under real deadlines." },
    { title: "Event Planning", text: "Turning an idea into a schedule, venue plan, crew list and a show that runs on time." },
    { title: "Crisis Handling", text: "Fixing problems live, on stage, when nothing can be paused." },
    { title: "Collaboration", text: "Working across clubs, departments and faculty to make big events happen." },
  ],
  project: { label: "See the abhiरुचि website", href: "/work/abhiruchi" },
};

export type NavLink = {
  label: string;
  href: string;
  desc?: string;
  image?: string;
  external?: boolean;
};

export type NavItem = {
  label: string;
  href: string;
  intro?: string;
  children?: NavLink[];
};

export const nav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    intro: "Full-stack developer and CSE student at Invertis University.",
    children: [
      { label: "Overview", href: "/about", desc: "Who I am and how I work" },
      { label: "Experience", href: "/about/experience", desc: "Freelance work, club leadership and events" },
      { label: "Clubs & Events", href: "/about/clubs", desc: "I-Tech, abhiरुचि and the events we ran" },
      { label: "Skills", href: "/about/skills", desc: "My stack across web, mobile and backend" },
      { label: "Achievements", href: "/about/achievements", desc: "Streaks, hackathons and milestones" },
    ],
  },
  {
    label: "Work",
    href: "/work",
    intro: "Real products, shipped for real users.",
    children: [
      { label: "All projects", href: "/work" },
      ...projects.map((p) => ({ label: p.title, href: `/work/${p.slug}`, desc: p.category, image: p.image })),
    ],
  },
  {
    label: "Services",
    href: "/services",
    intro: "Everything your product needs to launch, built by one developer.",
    children: [
      { label: "All services", href: "/services" },
      ...services.map((s) => ({ label: s.title, href: `/services/${s.slug}`, desc: s.desc })),
    ],
  },
  {
    label: "Contact",
    href: "/contact",
    intro: "Open for freelance projects, internships and collaborations.",
    children: [
      { label: "Send a message", href: "/contact", desc: "Tell me about your idea, I reply within 24 hours" },
      { label: "Book a call", href: "/contact/book-call", desc: "Pick a free 30-minute slot that suits you" },
      { label: "Book a project", href: "/contact/book-project", desc: "Share scope, budget and timeline to get started" },
      { label: "FAQ", href: "/contact/faq", desc: "Availability, process and timelines" },
      { label: "WhatsApp", href: site.socials.whatsapp, desc: "Chat with me directly", external: true },
    ],
  },
];
