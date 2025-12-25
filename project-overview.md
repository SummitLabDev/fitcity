# Kickboksen Page Implementation Plan

## Overview
Create a dedicated kickboxing page following the Ladies Only pattern, targeting fitness enthusiasts and beginners with a welcoming, approachable tone.

## User Requirements Summary
- **Audience:** Fitness enthusiasts and beginners (no competitive fight focus)
- **Tone:** Welcoming, approachable, matches existing branding
- **Hero Image:** Use `upscalemedia-transformed(15).jpeg` (optimized)
- **Visuals:** Use additional kickboxing photos from `kickboxing-pictures` for supporting sections
- **Schedule:** Ma/Do kids 18:00-19:00, adults 19:00-20:00; Zo kids 10:00-11:00, adults 11:00-12:00
- **CTA:** Include "Plan een proefles" callouts like Ladies Only
- **Video:** Not needed
- **FAQ:** Skip for now
- **Memberships:** Show kickboxing-weekly, kickboxing-unlimited, AND ultimate-fit

---

## Implementation Steps

### 1. Image Optimization

**Source:** `C:\Code\Claude\FitCity\kickboxing-pictures\upscalemedia-transformed(15).jpeg` (2.18 MB)

**Actions:**
1. Resize to 1920px width
2. Convert to WebP format at 85% quality
3. Target file size: < 150KB
4. Save as: `C:\Code\Claude\FitCity\public\kickboksen-hero.webp`

**Optional:** Convert `kinderkickboksen.jpg` (and other supporting photos) to WebP for better performance

---

### 2. Create Data File

**File:** `C:\Code\Claude\FitCity\src\data\kickboxingInfo.js` (NEW)

**Content Structure:**
```javascript
import { Target, Heart, Users, Clock } from 'lucide-react';

// Features (4 items)
const kickboxingFeatures = [
  { icon: Target, title: 'Techniek & conditie', copy: '...' },
  { icon: Heart, title: 'Voor iedereen', copy: '...' },
  { icon: Users, title: 'Kleine groepen', copy: '...' },
  { icon: Clock, title: 'Flexibel rooster', copy: '...' }
];

// Schedule (Mon/Thu/Sun with kids + adults)
const kickboxingSchedule = [
  { day: 'Maandag', sessions: [...] },
  { day: 'Donderdag', sessions: [...] },
  { day: 'Zondag', sessions: [...] }
];

// Beginner info
const beginnerInfo = {
  title: 'Wat kun je verwachten?',
  subtitle: 'We maken het laagdrempelig voor nieuwe leden',
  points: [
    'Eerste les: kennismaking met basis stances en slagen',
    'Opwarming en techniekdrills in vaste structuur',
    'Geen sparren verplicht - focus op techniek en conditie',
    'Eigen tempo bepalen binnen de les',
    'Handschoenen en beschermers beschikbaar om te lenen'
  ]
};

export { kickboxingFeatures, kickboxingSchedule, beginnerInfo };
```

---

### 3. Update Memberships Export

**File:** `C:\Code\Claude\FitCity\src\data\memberships.js` (MODIFY)

**Add at line ~195 (after ladiesOnlyPlans):**
```javascript
const kickboxingPlans = ['kickboxing-weekly', 'kickboxing-unlimited', 'ultimate-fit'].map((id) => {
  const plan = planLookup[id];
  if (!plan) return plan;
  // Mark Ultimate Fit as most popular
  return { ...plan, mostPopular: id === 'ultimate-fit' };
});

export {
  plans,
  planGroups,
  homeMembershipTeasers,
  ladiesOnlyPlans,
  kickboxingPlans, // NEW EXPORT
  additionalServices,
  oneTimeFees,
};
```

---

### 4. Update CTA Config

**File:** `C:\Code\Claude\FitCity\src\data\ctaConfig.js` (MODIFY)

**Add to contextualLabels (line ~6):**
```javascript
contextualLabels: {
  ladiesOnly: 'Plan proefles',
  kickboxing: 'Plan proefles', // NEW
},
```

---

### 5. Create Kickboksen Page Component

**File:** `C:\Code\Claude\FitCity\src\pages\Kickboksen.jsx` (NEW - ~350 lines)

**Structure (7 sections):**

#### Imports
```javascript
import { Link } from 'react-router-dom';
import { Target, Heart, Users, Clock } from 'lucide-react';
import Section from '../components/Section';
import PlanCard from '../components/PlanCard';
import Button from '../components/ui/Button';
import CtaStrip from '../components/CtaStrip';
import { kickboxingPlans } from '../data/memberships';
import { kickboxingFeatures, kickboxingSchedule, beginnerInfo } from '../data/kickboxingInfo';
import { getPrimaryCta } from '../data/ctaConfig';
```

#### Section 1: Hero
- **Pattern:** 2-column grid (text left, image right)
- **Eyebrow:** "Kickboksen"
- **Title:** "Train op jouw niveau, focus op techniek en plezier"
- **Subtitle:** "Geen wedstrijden - wel conditie, kracht en zelfvertrouwen opbouwen."
- **Content:**
  - Welcoming paragraph
  - 4 bullet points with fitcity yellow accent bars
  - Dual CTAs: "Plan een proefles" (primary), "Bekijk abonnementen" (ghost, anchor to #kickboxing-memberships)
- **Image:** `/kickboksen-hero.webp` with gradient overlay
- **Alt text:** "Kickboksles bij FitCity Culemborg met focus op techniek en conditie"

#### Section 2: Features Grid
- **Pattern:** `tone="overlay"`, 4-column grid (responsive: md:3, lg:4)
- **Eyebrow:** "Waarom Kickboksen bij FitCity"
- **Title:** "Alles om goed te starten en door te groeien"
- **Content:** Map over `kickboxingFeatures` array
- **Card Style:** Icon in fitcity/15 background, title, description text

#### Section 3: Schedule Block
- **Pattern:** 3-column card grid
- **Eyebrow:** "Rooster"
- **Title:** "Lessen voor kids en volwassenen"
- **Subtitle:** "Meerdere momenten per week, makkelijk te combineren."
- **Content:** Map over `kickboxingSchedule` array
- **Data:**
  - **Maandag:** Kids 18:00-19:00, Adults 19:00-20:00
  - **Donderdag:** Kids 18:00-19:00, Adults 19:00-20:00
  - **Zondag:** Kids 10:00-11:00, Adults 11:00-12:00
- **Disclaimer:** "Actueel rooster kan afwijken - check de planning via onze app of vraag aan de balie."

#### Section 4: Memberships
- **Pattern:** Same as Ladies Only page
- **ID:** `kickboxing-memberships` (anchor target)
- **Eyebrow:** "Memberships"
- **Title:** "Kies het ritme dat bij je past"
- **Subtitle:** "Kickboksen 1x per week, onbeperkt, of all-in met fitness via Ultimate Fit."
- **Content:** 3-column grid, map `kickboxingPlans` through `PlanCard`
- **Order:** kickboxing-weekly (EUR 19,95), kickboxing-unlimited (EUR 26,95), ultimate-fit (EUR 37,50, marked "Populair")

#### Section 5: What to Expect (Beginners)
- **Pattern:** `tone="panel"`, 2-column grid
- **Eyebrow:** "Eerste keer kickboksen?"
- **Title:** "Wat kun je verwachten?"
- **Subtitle:** "We maken het laagdrempelig voor nieuwe leden."
- **Content:**
  - Left: Bullet list from `beginnerInfo.points`, ghost CTA "Vragen? Neem contact op"
  - Right: Image `/kickboxing.webp`

#### Section 6: Kids Kickboxing (Optional)
- **Pattern:** 2-column grid (image left, text right)
- **Eyebrow:** "Kinderkickboksen"
- **Title:** "Spelenderwijs leren en groeien"
- **Subtitle:** "Voor kinderen vanaf 8 jaar - focus op plezier, techniek en zelfvertrouwen."
- **Content:**
  - Paragraph about kids program
  - 3 bullet points (respect, discipline, teamwork)
- **Image:** `/kinderkickboksen.webp` (or .jpg)

#### Section 7: CTA Strip
- **Component:** `CtaStrip`
- **Eyebrow:** "Start vandaag"
- **Title:** "Plan een proefles en ontdek kickboksen"
- **Copy:** "Kom kennismaken, geen verplichtingen. We reageren binnen een werkdag."
- **CTA:** `getPrimaryCta('kickboxing')` -> links to `/contact#proefles`

---

### 6. Add Routing

**File:** `C:\Code\Claude\FitCity\src\App.jsx` (MODIFY)

**Line 11 - Add import:**
```javascript
import Kickboksen from './pages/Kickboksen';
```

**Line 29 - Add route (after ladies-only):**
```javascript
<Route path="/kickboksen" element={<AnimatedPage><Kickboksen /></AnimatedPage>} />
```

---

### 7. Update Navigation

**File:** `C:\Code\Claude\FitCity\src\data\siteMeta.js` (MODIFY)

**Line 7 - Add nav item (after Ladies Only):**
```javascript
const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Abonnementen', to: '/abonnementen' },
  { label: 'Ladies Only', to: '/ladies-only' },
  { label: 'Kickboksen', to: '/kickboksen' }, // NEW
  { label: 'Contact', to: '/contact' },
];
```

---

### 8. Optional: Cross-Link from Home Page

**File:** `C:\Code\Claude\FitCity\src\pages\Home.jsx` (OPTIONAL ENHANCEMENT)

**Lines 190-199 - Make kickboxing cards clickable:**
```javascript
{kickboxingCards.map((item) => (
  <Link
    to="/kickboksen"
    key={item.title}
    className="group relative overflow-hidden rounded-4xl border border-white/10 transition-colors hover:border-fitcity/30"
  >
    {/* existing image and content */}
  </Link>
))}
```

**Line 218 - Add "Alles over kickboksen" button:**
```javascript
<Button as={Link} to="/kickboksen" className="w-full justify-center">
  Alles over kickboksen
</Button>
```

---

## Design Consistency Guidelines

### Colors
- Brand Yellow: `fitcity` (#FFE303)
- Text: `text-white`, `text-white/70`, `text-white/50`
- Backgrounds: `bg-white/[0.02]`, `bg-charcoal/70`
- Borders: `border-white/10`

### Typography
- Headings: `font-display` (Space Grotesk)
- Eyebrows: `text-xs uppercase tracking-[0.4em] text-fitcity/90`
- Section titles: `text-3xl md:text-4xl lg:text-5xl`
- Body: Default Inter font, `text-base` or `text-sm`

### Spacing & Layout
- Rounded corners: `rounded-3xl`, `rounded-4xl`
- Card padding: `p-6`
- Grid gaps: `gap-6` or `gap-10`
- Section component handles vertical padding automatically

### Components
- **Section:** Wrapper for all page sections, supports `tone` prop (base/overlay/contrast/panel)
- **Button:** Variants (primary/ghost), size (sm/md/lg), polymorphic (`as` prop)
- **PlanCard:** Automatic price formatting, "Populair" badge support
- **CtaStrip:** Full-width CTA banner
- All wrapped in automatic Reveal animations via Framer Motion

---

## Content Copy (Dutch)

### Hero
- **Title:** "Train op jouw niveau, focus op techniek en plezier"
- **Subtitle:** "Geen wedstrijden - wel conditie, kracht en zelfvertrouwen opbouwen."
- **Paragraph:** "Bij FitCity Kickboksen staat plezier en techniek centraal. Of je nu beginner bent of al ervaring hebt, onze trainers begeleiden je in kleine groepen naar jouw doelen. Focus op conditie, kracht en beweging - wedstrijden zijn geen verplichting."
- **Bullets:**
  - Kleine groepen met persoonlijke aandacht van ervaren trainers
  - Lessen voor kids (vanaf 8 jaar) en volwassenen, gesplitst op niveau
  - Focus op techniek, conditie en coordinatie - sparren is optioneel
  - Combineren met fitness mogelijk via Ultimate Fit Deal (EUR 37,50/maand)

### Features
1. **Techniek & conditie** - Leer de basis van kickboksen met focus op techniek, kracht en uithoudingsvermogen.
2. **Voor iedereen** - Beginners en gevorderden welkom. We bouwen rustig op in een vriendelijke groep.
3. **Kleine groepen** - Persoonlijke aandacht in overzichtelijke groepen met ervaren trainers.
4. **Flexibel rooster** - Meerdere momenten per week: avonden en weekend voor maximale flexibiliteit.

---

## Testing Checklist

### Visual
- [ ] Hero image loads correctly, proper alt text
- [ ] All icons render (Lucide imports working)
- [ ] Colors match brand (fitcity yellow #FFE303)
- [ ] Glassmorphism effects consistent (borders, backgrounds)
- [ ] Text contrast sufficient for readability

### Responsive
- [ ] Test mobile (375px), tablet (768px), desktop (1280px)
- [ ] Grids collapse/expand properly
- [ ] Images don't distort
- [ ] Buttons stack vertically on mobile

### Functionality
- [ ] All links work (`/contact`, `/abonnementen`, anchor links)
- [ ] Navigation shows "Kickboksen" correctly
- [ ] "Most Popular" badge on Ultimate Fit
- [ ] Page animations trigger

### Performance
- [ ] Hero image < 150KB
- [ ] Images use `loading="lazy"` (except hero)
- [ ] No console errors
- [ ] Page load < 3 seconds

### Accessibility
- [ ] All images have descriptive alt text
- [ ] Heading hierarchy correct (h2 > h3)
- [ ] Keyboard navigation works
- [ ] Color contrast meets WCAG AA

---

## Critical Files Summary

### New Files
1. **`src/pages/Kickboksen.jsx`** - Main page component (~350 lines)
2. **`src/data/kickboxingInfo.js`** - Features, schedule, beginner data (~80 lines)
3. **`public/kickboksen-hero.webp`** - Optimized hero image (<150KB)

### Modified Files
1. **`src/data/memberships.js`** - Add `kickboxingPlans` export (~5 lines)
2. **`src/data/ctaConfig.js`** - Add kickboxing context label (1 line)
3. **`src/App.jsx`** - Import + route (2 lines)
4. **`src/data/siteMeta.js`** - Add nav item (1 line)

### Optional Enhancements
1. **`src/pages/Home.jsx`** - Make kickboxing cards link to new page
2. **`public/kinderkickboksen.webp`** - Optimized kids image

---

## Estimated Implementation Time
- Data layer: 1-2 hours
- Page component: 3-4 hours
- Image optimization: 1 hour
- Routing/navigation: 30 minutes
- Testing & refinement: 2-3 hours
- **Total: 8-11 hours**

---

## Future Enhancements (Post-MVP)
- FAQ section with accordion component
- Trainer profiles
- Video integration (training footage)
- Testimonials/reviews
- Photo gallery
- Live schedule integration
