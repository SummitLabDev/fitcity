# FitCity Inschrijven Feature - Implementation Plan

## Overview
Build a checkout-style `/inschrijven` page with Mollie iDEAL payment integration for €17 registration fee, Cloudflare Pages Functions backend, D1 database, and Resend email confirmation.

**Form style:** Multi-step wizard (Step 1: membership → Step 2: start date → Step 3: personal info)

---

## Quick Start Checklist

**What YOU need to do first (before Claude can code):**
1. [x] Create Resend account + verify domain → `notifications.summitlab.dev`
2. [x] Create Cloudflare D1 database → `fitcity-signups` (ID: `2e1e45a8-4cde-4c00-98b9-b0aaaa043758`)
3. [x] Share the D1 database ID with Claude

**Then Claude will:**
1. [x] Create git branch and all code
2. [ ] You run the database migration ← **YOUR TURN**
3. [ ] Test locally with Mollie test mode
4. [ ] Deploy to production

---

## Phase 1: External Setup (User Tasks)

These tasks require manual action outside this environment. **Do these first before coding begins.**

### 1.1 Resend Email Setup
- [x] **USER** - Create Resend account at https://resend.com
- [x] **USER** - Add subdomain `notifications.summitlab.dev` (for sender credibility)
- [x] **USER** - Add DNS records in Cloudflare DNS
- [x] **USER** - Domain verified
- [x] **USER** - API key created and saved

### 1.2 Mollie Setup (already done)
- [x] **USER** - Mollie account is active
- [x] **USER** - Test API key is ready

### 1.3 Cloudflare D1 Database Setup
- [x] **USER** - Install Wrangler CLI globally
- [x] **USER** - Login to Cloudflare
- [x] **USER** - Create D1 database: `fitcity-signups` (region: WEUR)
- [x] **USER** - Database ID: `2e1e45a8-4cde-4c00-98b9-b0aaaa043758`

### 1.4 Environment Variables (set after deployment or in `.dev.vars` for local testing)
Cloudflare Dashboard → Pages → fitcity → Settings → Environment Variables:

| Variable | Value | Notes |
|----------|-------|-------|
| `MOLLIE_API_KEY` | `test_xxx...` or `live_xxx...` | Your Mollie API key |
| `MOLLIE_WEBHOOK_TOKEN` | random string | Run: `openssl rand -hex 32` |
| `RESEND_API_KEY` | `re_xxx...` | From Resend dashboard |
| `EMAIL_FROM` | `FitCity Culemborg <noreply@notifications.summitlab.dev>` | Sender address |
| `APP_BASE_URL` | `https://fitcityculemborg.nl` | Or preview URL for testing |
| `ENABLE_SEPA` | `false` | Set to `true` later for auto subscriptions |

---

## Phase 2: Code Implementation (Claude Tasks)

### 2.1 Project Setup
- [x] **CLAUDE** - Create git branch `feature/inschrijven`
- [x] **CLAUDE** - Create `wrangler.toml` config for Cloudflare Pages Functions + D1 binding
- [x] **CLAUDE** - Create `.dev.vars.example` template for local environment variables

### 2.2 Database Migration
- [x] **CLAUDE** - Create `migrations/0001_create_signups_table.sql`
- [ ] **USER** - Run migration locally: `wrangler d1 execute fitcity-signups --local --file=migrations/0001_create_signups_table.sql`
- [ ] **USER** - Run migration on production: `wrangler d1 execute fitcity-signups --file=migrations/0001_create_signups_table.sql`

### 2.3 Backend Functions
| File | Purpose |
|------|---------|
| `functions/api/start-signup-payment.js` | Create Mollie payment, store signup in D1, return checkout URL |
| `functions/api/mollie-webhook.js` | Handle payment status updates, send confirmation email |
| `functions/_lib/mollie.js` | Mollie API wrapper (createPayment, getPayment, createCustomer, createSubscription) |
| `functions/_lib/email.js` | Resend email helper with HTML template |
| `functions/_lib/validation.js` | Input validation (email, phone, date of birth, membership ID) |
| `functions/_lib/db.js` | D1 database helpers (createSignup, updateSignup, getSignupById) |

### 2.4 Frontend Pages
| File | Purpose |
|------|---------|
| `src/pages/Inschrijven.jsx` | Multi-step wizard form with 3 steps |
| `src/pages/Bedankt.jsx` | Thank you page after payment redirect |

**Multi-step form structure:**
1. **Step 1 - Abonnement kiezen**: Grid of membership cards (reuse existing card styling)
2. **Step 2 - Startdatum**: Date picker with minimum date = tomorrow
3. **Step 3 - Gegevens**: Personal info form + terms checkbox + submit button

**Available memberships for online signup (10 plans, recurring only):**
- Exclude: `dagpas` (day pass), `quick-deal-3mnd` (one-time payment)
- Include: All other monthly subscription plans

### 2.5 Frontend Components (new)
| File | Purpose |
|------|---------|
| `src/components/ui/Input.jsx` | Styled text input matching Button design |
| `src/components/ui/Select.jsx` | Styled select dropdown |
| `src/components/ui/Checkbox.jsx` | Styled checkbox with label |
| `src/components/signup/StepIndicator.jsx` | Progress indicator (1 → 2 → 3) |
| `src/components/signup/MembershipSelector.jsx` | Grid of selectable membership cards |
| `src/components/signup/DateStep.jsx` | Start date selection with explanation |
| `src/components/signup/PersonalInfoForm.jsx` | All personal info fields |

### 2.6 Route Integration
- [x] **CLAUDE** - Add `/inschrijven` and `/bedankt` routes to `src/App.jsx`
- [x] **CLAUDE** - Update PlanCard "Kies dit plan" buttons:
  - Recurring plans → link to `/inschrijven?plan={id}` (pre-selects the plan)
  - Non-recurring plans (dagpas, quick-deal) → keep linking to `/contact`
- [x] **CLAUDE** - Add `signupEligible: true/false` property to memberships data for clarity

---

## Phase 3: Testing & Deployment

### 3.1 Local Development
```bash
# Create .dev.vars file with your secrets (copy from .dev.vars.example)
# Then run:
npm run dev              # Vite dev server (frontend only)
wrangler pages dev       # Full stack with Functions + D1
```

### 3.2 Webhook Testing (requires public URL)
- [ ] **USER** - Install ngrok: `npm install -g ngrok` or download from ngrok.com
- [ ] **USER** - Start tunnel: `ngrok http 8788`
- [ ] **USER** - Copy ngrok URL (e.g., `https://abc123.ngrok.io`)
- [ ] **USER** - Set `APP_BASE_URL` in `.dev.vars` to ngrok URL
- [ ] **USER** - Test full payment flow with Mollie test iDEAL

### 3.3 Production Deployment
- [ ] **USER** - Push branch, create PR
- [ ] **USER** - Set all environment variables in Cloudflare Pages dashboard
- [ ] **USER** - Merge to main (triggers deployment)
- [ ] **USER** - Run D1 migration on production database
- [ ] **USER** - Test full flow with real iDEAL payment (refundable if needed)

---

## Technical Details

### File Structure (to be created)
```
functions/
├── api/
│   ├── start-signup-payment.js
│   └── mollie-webhook.js
└── _lib/
    ├── mollie.js
    ├── email.js
    ├── validation.js
    └── db.js

migrations/
└── 0001_create_signups_table.sql

src/
├── pages/
│   ├── Inschrijven.jsx (new)
│   └── Bedankt.jsx (new)
├── components/
│   ├── ui/
│   │   ├── Input.jsx (new)
│   │   ├── Select.jsx (new)
│   │   └── Checkbox.jsx (new)
│   └── signup/
│       ├── StepIndicator.jsx (new)
│       ├── MembershipSelector.jsx (new)
│       ├── DateStep.jsx (new)
│       └── PersonalInfoForm.jsx (new)
└── data/
    └── memberships.js (modify - add signupEligible flag)

wrangler.toml (new)
.dev.vars.example (new)
```

### Database Schema
```sql
CREATE TABLE signups (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  membership_id TEXT NOT NULL,
  membership_name TEXT NOT NULL,
  membership_price TEXT NOT NULL,
  membership_term TEXT NOT NULL,
  start_date TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  date_of_birth TEXT NOT NULL,
  street TEXT NOT NULL,
  house_number TEXT NOT NULL,
  house_number_addition TEXT,
  postal_code TEXT NOT NULL,
  city TEXT NOT NULL,
  mollie_payment_id TEXT,
  mollie_customer_id TEXT,
  mollie_subscription_id TEXT,
  email_sent_at TEXT
);
```

### API Endpoints
| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/start-signup-payment` | POST | Create Mollie payment, return checkout URL |
| `/api/mollie-webhook` | POST | Handle Mollie payment status updates |

### Environment Variables Summary
| Variable | Required | Description |
|----------|----------|-------------|
| `MOLLIE_API_KEY` | Yes | Mollie API key (test_ or live_) |
| `MOLLIE_WEBHOOK_TOKEN` | Yes | Secret token to validate webhook calls |
| `RESEND_API_KEY` | Yes | Resend API key for emails |
| `EMAIL_FROM` | Yes | Sender email address |
| `APP_BASE_URL` | Yes | Base URL for redirects |
| `ENABLE_SEPA` | No | Enable SEPA subscription creation (default: false) |

---

## Current Progress

**Status: Phase 2 Complete - Ready for Testing**

- [x] Phase 1: External setup complete
- [x] Phase 2: Code implementation complete
- [ ] Phase 3: Testing & deployment

**Next step for YOU:**
```bash
# 1. Create .dev.vars file from the template
cp .dev.vars.example .dev.vars
# Edit .dev.vars with your actual API keys

# 2. Run the database migration locally
wrangler d1 execute fitcity-signups --local --file=migrations/0001_create_signups_table.sql

# 3. Start the dev server with Functions
wrangler pages dev
```
