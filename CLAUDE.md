# CLAUDE.md — Dr. Tasneem's Institute of Health (DTIOH)

## Project Overview

Lead generation + presentation website for DTIOH, a training institute for aesthetic/therapy courses and clinic in Malir Cantt, Karachi. The site must convert visitors into leads (form submissions, course inquiries, clinic bookings) while presenting DTIOH as Pakistan's premier aesthetic and healthcare education brand.

**Framework:** Astro 5 + React Islands  
**Styling:** Tailwind CSS 4  
**Animations:** GSAP ScrollTrigger + CSS View Transitions  
**Content:** Astro Content Collections (courses, blogs, testimonials)  

---

## Design System

### Color Tokens

```css
:root {
  /* Primary */
  --color-dark-blue:       #0C2E3C;
  --color-teal:            #219169;
  --color-lime:            #C0F180;
  --color-cool-cream:      #F4F4F4;

  /* Derived */
  --color-dark-blue-50:    #0C2E3C80;  /* 50% opacity */
  --color-gradient-blue:   #66A6AC;

  /* Semantic */
  --color-bg-primary:      var(--color-cool-cream);
  --color-bg-hero:         var(--color-dark-blue);
  --color-text-primary:    var(--color-dark-blue);
  --color-text-inverted:   #FFFFFF;
  --color-text-accent:     var(--color-teal);
  --color-cta-primary:     var(--color-teal);
  --color-cta-primary-hover: #1A7A58;
  --color-cta-secondary:   transparent;
  --color-highlight:       var(--color-lime);

  /* Gradients */
  --gradient-hero-overlay: linear-gradient(135deg, var(--color-dark-blue) 0%, var(--color-dark-blue-50) 100%);
  --gradient-brand:        linear-gradient(135deg, var(--color-teal) 0%, var(--color-gradient-blue) 100%);
  --gradient-accent:       linear-gradient(135deg, var(--color-lime) 0%, var(--color-teal) 100%);
}
```

### Tailwind Config Extensions

```js
// tailwind.config.mjs
export default {
  theme: {
    extend: {
      colors: {
        'dark-blue':     '#0C2E3C',
        'teal':          '#219169',
        'lime':          '#C0F180',
        'cool-cream':    '#F4F4F4',
        'gradient-blue': '#66A6AC',
      },
    },
  },
}
```

### Typography

| Role     | Family          | Google Fonts Import          | Usage                                      |
|----------|-----------------|------------------------------|--------------------------------------------|
| Heading  | Host Grotesk    | `Host+Grotesk:wght@400;500;600;700` | All h1–h6, section titles, hero text       |
| Body     | Poppins         | `Poppins:wght@300;400;500;600`       | Paragraphs, descriptions, lists, captions  |
| Buttons  | Figtree         | `Figtree:wght@500;600;700`           | All buttons, CTAs, nav links, form labels  |

**Type Scale (desktop → mobile):**

| Element       | Size (desktop) | Size (mobile) | Weight | Family       |
|---------------|----------------|---------------|--------|--------------|
| h1 (hero)     | 56px / 3.5rem  | 32px / 2rem   | 700    | Host Grotesk |
| h2 (section)  | 44px / 2.75rem | 28px / 1.75rem| 700    | Host Grotesk |
| h3 (card)     | 28px / 1.75rem | 22px / 1.375rem| 600   | Host Grotesk |
| Body large    | 18px / 1.125rem| 16px / 1rem   | 400    | Poppins      |
| Body          | 16px / 1rem    | 14px / 0.875rem| 400   | Poppins      |
| Body small    | 14px / 0.875rem| 13px / 0.8125rem| 400  | Poppins      |
| Button        | 16px / 1rem    | 14px / 0.875rem| 600   | Figtree      |
| Button small  | 14px / 0.875rem| 13px          | 500    | Figtree      |
| Nav link      | 14px / 0.875rem| 14px          | 500    | Figtree      |

**Heading style note:** In hero and section headings, specific words are highlighted in `--color-teal` or `--color-lime` to create emphasis (e.g., "healthcare **and aesthetic** education" where "and aesthetic" is lime/teal). Implement with `<span>` tags carrying accent color classes.

### Spacing

Base unit: `4px`. Use Tailwind spacing scale. Fold-level vertical padding: `py-20` (80px) minimum on desktop, `py-12` on mobile. Section inner content max-width: `max-w-7xl` (1280px) centered.

### Border Radius

- Buttons: `rounded-full` (pill shape) for primary CTAs, `rounded-lg` for secondary
- Cards: `rounded-2xl`
- Images: `rounded-xl` or clipped with custom shapes

### Shadows

- Cards: `shadow-lg` with slight teal tint → `0 8px 32px rgba(12, 46, 60, 0.08)`
- Elevated elements: `0 16px 48px rgba(12, 46, 60, 0.12)`

---

## Page Architecture — Fold Structure

The site uses **full-viewport fold-based scrolling**. Each section occupies `100dvh` with CSS scroll-snapping.

```css
html {
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
}

.fold {
  scroll-snap-align: start;
  min-height: 100dvh;
  display: flex;
  align-items: center;
  overflow: hidden;
  position: relative;
}
```

### Fold Map (Homepage)

| #  | Fold Name              | Layout Summary                                                                 |
|----|------------------------|--------------------------------------------------------------------------------|
| 1  | Hero                   | Full-bleed image, dark-blue overlay, heading with accent words, sub-copy, scroll indicator |
| 2  | Become Certified       | Centered text block, "Become a Certified **Aesthetic** Professional", dual CTAs (Explore Courses / Learn More) |
| 3  | What We Do & Promises  | Split layout: left text block + right circular/radial arrangement of 5 promise badges (Professional Training, Institute Excellence, Recognized Certification, Accredited Programs, Excellence & Expertise, Certified Careers) |
| 4  | Transform Your Career  | (Visible in design, full content TBD) — likely course showcase or testimonial   |
| 5  | Courses Grid           | Course cards with images, duration, certification badge                        |
| 6  | Clinic Services        | Clinic offerings, Malir Cantt location, booking CTA                            |
| 7  | Testimonials           | Student/patient testimonials carousel (React island)                           |
| 8  | Lead Capture           | Contact form (React island), map embed, phone/WhatsApp CTA                     |
| 9  | Footer                 | Nav links, social, accreditations (DUHS, SBTE), copyright                      |

### Fold Animation Pattern

Each fold uses GSAP ScrollTrigger with staggered entrance:

```js
// Pattern: elements animate in when fold enters viewport
gsap.from('.fold-content > *', {
  scrollTrigger: { trigger: '.fold', start: 'top center' },
  y: 40,
  opacity: 0,
  stagger: 0.12,
  duration: 0.8,
  ease: 'power3.out',
})
```

---

## Component Inventory

### Global

- `Navbar` — sticky, transparent on hero → solid on scroll, logo left, nav center, CTA button right. Mobile: hamburger → slide-in drawer
- `Footer` — dark-blue bg, multi-column, accreditation logos, social links
- `CTAButton` — primary (teal bg, white text, pill), secondary (transparent, dark-blue border, dark-blue text, pill), both with arrow icon and hover scale

### Fold-Specific

- `HeroFold` — background image with gradient overlay, animated heading, scroll-down indicator
- `CertifiedFold` — centered typographic lockup, dual CTA row
- `PromisesFold` — radial/circular layout of promise items around a central graphic. The circular arrangement of 6 items uses CSS transforms (rotate + translateX) or absolute positioning on a circle
- `CourseCard` — image, title, duration, certification badge, hover lift
- `TestimonialCarousel` — React island, auto-play, dots/arrows, student photo + quote
- `LeadForm` — React island, fields: name, phone, email, course interest (dropdown), message. Posts to backend/serverless endpoint. Fires dataLayer events on submit

### Shared

- `SectionHeading` — h2 with optional accent-colored word spans
- `AccentWord` — inline span that applies teal or lime color to specific words in headings
- `ScrollIndicator` — animated down-arrow at fold bottom
- `Badge` — small pill for "DUHS Accredited", "SBTE Recognized", etc.

---

## SEO Strategy

### Technical SEO

- **Rendering:** Astro static output — fully rendered HTML, zero JS by default
- **Sitemap:** `@astrojs/sitemap` integration, auto-generated
- **Robots:** `/robots.txt` via `public/robots.txt`
- **Canonical URLs:** set in `<head>` of every page
- **Open Graph / Twitter Cards:** per-page meta with course images
- **Favicon:** SVG favicon + PNG fallback, apple-touch-icon

### Structured Data (JSON-LD)

Inject via `<script type="application/ld+json">` in layout head:

```json
{
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Dr. Tasneem's Institute of Health",
  "alternateName": "DTIOH",
  "url": "https://dtioh.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Malir Cantt",
    "addressLocality": "Karachi",
    "addressRegion": "Sindh",
    "addressCountry": "PK"
  },
  "sameAs": [],
  "hasCredential": ["DUHS Accredited", "SBTE Recognized"]
}
```

Also add `Course` schema per course page and `MedicalClinic` for clinic section/page.

### Content SEO

- **Primary keywords:** aesthetic courses Karachi, aesthetic training Pakistan, DUHS accredited courses, beauty therapy courses Karachi, clinical aesthetics certification
- **Page titles:** `{Page} | Dr. Tasneem's Institute of Health — Aesthetic & Healthcare Education`
- **Meta descriptions:** 155 chars max, include location + accreditation + CTA
- **Blog:** content collection for SEO long-tail (course guides, career advice, industry articles)
- **Image alt text:** descriptive, keyword-aware, never stuffed

---

## Analytics & Tracking

### GA4 Setup

Load via Astro Partytown for off-main-thread execution:

```astro
<!-- src/layouts/Base.astro -->
<script type="text/partytown" src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}></script>
<script type="text/partytown">
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA4_MEASUREMENT_ID');
</script>
```

### Meta Pixel Setup

```astro
<script type="text/partytown">
  !function(f,b,e,v,n,t,s) { /* standard Meta Pixel base code */ }
  fbq('init', 'META_PIXEL_ID');
  fbq('track', 'PageView');
</script>
<noscript>
  <img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=META_PIXEL_ID&ev=PageView&noscript=1"/>
</noscript>
```

### Conversion Events

Fire on form submissions from React islands:

```ts
// utils/tracking.ts
export function trackLeadSubmission(courseInterest?: string) {
  // GA4
  window.gtag?.('event', 'generate_lead', {
    event_category: 'lead_form',
    event_label: courseInterest ?? 'general',
    value: 1,
  });

  // Meta
  window.fbq?.('track', 'Lead', {
    content_name: courseInterest ?? 'general_inquiry',
  });
}

export function trackCourseInquiry(courseName: string) {
  window.gtag?.('event', 'course_inquiry', {
    event_category: 'engagement',
    event_label: courseName,
  });
  window.fbq?.('track', 'ViewContent', {
    content_name: courseName,
    content_type: 'course',
  });
}

export function trackClinicBooking() {
  window.gtag?.('event', 'clinic_booking', { event_category: 'conversion' });
  window.fbq?.('track', 'Schedule');
}
```

### UTM Handling

Capture UTM params on landing and store in sessionStorage. Attach to form submissions so lead source is tracked end-to-end.

```ts
// utils/utm.ts
export function captureUTM() {
  const params = new URLSearchParams(window.location.search);
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  const utm: Record<string, string> = {};
  utmKeys.forEach(key => {
    const val = params.get(key);
    if (val) utm[key] = val;
  });
  if (Object.keys(utm).length) {
    sessionStorage.setItem('utm_data', JSON.stringify(utm));
  }
}
```

---

## Project Structure

```
dtioh-web/
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── CLAUDE.md                    # ← this file
├── public/
│   ├── robots.txt
│   ├── favicon.svg
│   └── images/                  # Static assets (hero photos, logos, accreditation badges)
├── src/
│   ├── assets/                  # Processed images (Astro image optimization)
│   ├── components/
│   │   ├── global/
│   │   │   ├── Navbar.astro
│   │   │   ├── Footer.astro
│   │   │   ├── CTAButton.astro
│   │   │   ├── SectionHeading.astro
│   │   │   └── ScrollIndicator.astro
│   │   ├── folds/
│   │   │   ├── HeroFold.astro
│   │   │   ├── CertifiedFold.astro
│   │   │   ├── PromisesFold.astro
│   │   │   ├── CoursesFold.astro
│   │   │   ├── ClinicFold.astro
│   │   │   └── TransformFold.astro
│   │   └── react/               # React islands (client:visible)
│   │       ├── LeadForm.tsx
│   │       ├── TestimonialCarousel.tsx
│   │       └── MobileNav.tsx
│   ├── content/
│   │   ├── config.ts            # Content collection schemas
│   │   ├── courses/             # MDX files per course
│   │   └── blog/                # MDX blog posts
│   ├── layouts/
│   │   ├── Base.astro           # HTML shell, fonts, tracking scripts
│   │   └── CourseLayout.astro   # Individual course page layout
│   ├── pages/
│   │   ├── index.astro          # Homepage (fold composition)
│   │   ├── courses/
│   │   │   ├── index.astro      # All courses grid
│   │   │   └── [...slug].astro  # Dynamic course pages
│   │   ├── clinic.astro
│   │   ├── about.astro
│   │   ├── blog/
│   │   │   ├── index.astro
│   │   │   └── [...slug].astro
│   │   └── contact.astro
│   ├── styles/
│   │   └── global.css           # CSS vars, scroll-snap rules, font-face
│   └── utils/
│       ├── tracking.ts          # GA4 + Meta event helpers
│       └── utm.ts               # UTM capture
```

---

## Coding Conventions

- **Astro components** for all static/presentational UI. React only when interactivity requires client-side state (forms, carousels, mobile nav drawer)
- **React islands** hydrated with `client:visible` (lazy) — never `client:load` unless critical above-the-fold
- **TypeScript** everywhere — strict mode
- **Tailwind utility-first**, extract to `@apply` only for highly repeated patterns (button base styles)
- **Image optimization:** use Astro `<Image>` component for all raster images — auto WebP/AVIF, responsive srcset
- **Accessibility:** semantic HTML, ARIA labels on interactive elements, focus-visible styles, reduced-motion media query disables GSAP animations
- **Mobile-first responsive:** design for 375px up, breakpoints at `sm` (640), `md` (768), `lg` (1024), `xl` (1280)
- **Performance budget:** Lighthouse 95+ on all categories. No render-blocking JS. Fonts preloaded with `display: swap`

---

## Environment Variables

```env
# .env
PUBLIC_GA4_ID=G-XXXXXXXXXX
PUBLIC_META_PIXEL_ID=XXXXXXXXXX
PUBLIC_SITE_URL=https://dtioh.com
```

Access in Astro with `import.meta.env.PUBLIC_GA4_ID`.

---

## Deployment

- **Host:** Netlify — `@astrojs/netlify` adapter
- **Build command:** `astro build`
- **Publish directory:** `dist/`
- **Preview:** `astro preview` for local production build testing
- **CI:** GitHub Actions — lint, type-check, build on PR. Netlify auto-deploys on merge to `main` via Git integration
- **Forms:** Use Netlify Forms for lead capture — add `data-netlify="true"` to `<form>` elements. Submissions land in Netlify dashboard and can forward to email/webhook. Still fire GA4 + Meta events client-side on submit alongside the native form post
- **Redirects:** `public/_redirects` file for any URL rewrites
- **Environment:** set `PUBLIC_GA4_ID`, `PUBLIC_META_PIXEL_ID`, `PUBLIC_SITE_URL` in Netlify dashboard → Site settings → Environment variables