# Test Plan Review — D.R. Horton (https://www.drhorton.com/)

**Date:** 2026-03-17
**Reviewed by:** QA Automation Team
**Target URL:** https://www.drhorton.com/

---

## 1. Site Map & Structure

### Hierarchical Site Tree

```
drhorton.com/
├── / (Home Page)
│   ├── Hero section with community search (combobox)
│   ├── "Map view" button
│   ├── Video section — "We are America's Builder"
│   └── Feature cards (Smart Home, Real Estate Agents, Military Buyers, Submit Your Story)
│
├── /who-we-are (Who We Are)
│   ├── Photo mosaic gallery
│   ├── Company history & mission
│   ├── Customer testimonial carousel (Previous/Next)
│   ├── Services cards (DHI Mortgage, DHI Title, DRH Insurance) — external links
│   └── Careers CTA → /careers
│
├── /smart-home (Smart Home)
│   ├── Product carousel (Previous/Next) — Qolsys IQ Panel, etc.
│   ├── Feature info cards (Remote monitoring, Hands-free, Expandable)
│   └── Legal disclaimer text
│
├── /services (Services)
│   ├── Hero section with photo mosaic
│   └── Three service cards:
│       ├── Finance → dhimortgage.com (external)
│       ├── Ownership → dhititle.com (external)
│       └── Coverage → drhortoninsurance.com (external)
│
├── /customer-care (Customer Care)
│   ├── "How can we help?" hub
│   ├── Warranty request → /warranty
│   ├── Maintenance resources → /documents-and-guides
│   ├── Property submittal → /contact-us---property-submittals
│   └── Contact us → /contact-us-page
│
├── /warranty (Warranty Request)
│   ├── Part of Customer Care tabbed interface
│   ├── Tabs: Warranty request | Maintenance resources | Property submittal | Contact us
│   └── Warranty form:
│       ├── Zip code (spinbutton)
│       ├── Home address (autocomplete, disabled until zip entered)
│       ├── "My address isn't listed" checkbox
│       └── Next button
│
├── /contact-us-page (Contact Us)
│   ├── Part of Customer Care tabbed interface
│   ├── Tabs: Warranty request | Maintenance resources | Property submittal | Contact us
│   ├── Contact form:
│   │   ├── Inquiry Type dropdown (Home Buyer, Homeowner, Real Estate Agent, Vendor, Other)
│   │   ├── First Name*, Last Name*
│   │   ├── Phone Number, Secondary Phone (masked input)
│   │   ├── Email*, Confirm Email*
│   │   ├── Address, State* dropdown (all US states), City*
│   │   ├── Request details* (min 10 chars)
│   │   └── Submit button
│   └── Find an Office section:
│       ├── Tab: Local offices | National offices
│       └── Accordion by state with division office details
│
├── /contact-us---property-submittals (Property Submittal)
│   └── Part of Customer Care tabbed interface
│
├── /documents-and-guides (Maintenance Resources)
│   └── Part of Customer Care tabbed interface
│
├── /military-benefits (Military Benefits)
│   ├── Hero with flag icon and CTA
│   ├── Feature cards (Ready when you are, Peace of mind, Investment value)
│   ├── Customer testimonial (Ocampo Family)
│   ├── VA loans section → DHI Mortgage (external)
│   └── Contact form:
│       ├── First name*, Last name*, Email*, Phone*
│       ├── Military branch* dropdown (Air Force, Army, Coast Guard, Marine Corps, Navy, Space Force)
│       └── Submit button
│
├── /careers (Careers)
│   ├── Company culture section
│   ├── Benefits list
│   ├── Apply now → drhorton.taleo.net (external)
│   ├── Internship program → /internships
│   └── National transfer program → drhorton.taleo.net (external)
│
├── /real-estate-agents (Real Estate Agents) — linked from homepage
│
├── /internships (Internships) — linked from careers
│
├── /faq (FAQ) — linked from contact page
│
├── /epa-consent-decree (EPA Consent Decree) — linked from footer
│
├── /rentals/rentalinvestor (Rental Investor) — linked from footer
│
├── /{state} (State Landing Pages) — 37 states
│   ├── /alabama, /arizona, /arkansas, /california, /colorado, /delaware
│   ├── /florida, /georgia, /hawaii, /idaho, /illinois, /indiana
│   ├── /iowa, /kansas, /kentucky, /louisiana, /maryland, /minnesota
│   ├── /mississippi, /missouri, /nebraska, /nevada, /new-jersey
│   ├── /new-mexico, /north-carolina, /ohio, /oklahoma, /oregon
│   ├── /pennsylvania, /south-carolina, /tennessee, /texas, /utah
│   ├── /virginia, /washington, /west-virginia, /wisconsin
│   └── Each has submenu buttons to expand local markets
│
└── Footer Links (present on all pages)
    ├── Internal: Who we are, Smart home, Military benefits, Contact, Careers, Warranty, Rental investor, EPA Consent Decree
    ├── External: Submit your story, Investor relations, DHI Mortgage, DHI Title, DRH Insurance
    ├── Social: Facebook, Instagram, LinkedIn, Pinterest
    └── Legal: Privacy policy, Terms of use, Privacy choices, Legal notices, Licensing, Manage cookies, Accessibility
```

### External Links (reference only — not tested)

| Link | Destination |
|------|-------------|
| Submit your story | customerportal.drhorton.com/myStory |
| Investor relations | investor.drhorton.com |
| DHI Mortgage | dhimortgage.com/affiliate/ |
| DHI Title | dhititle.com (via affiliate redirect) |
| DRH Insurance | drhortoninsurance.com (via affiliate redirect) |
| Facebook | facebook.com/DRHorton.Homes |
| Instagram | instagram.com/drhorton/ |
| LinkedIn | linkedin.com/company/dr-horton/ |
| Pinterest | pinterest.com/drhortonhomes/ |
| Privacy Policy / Terms / Legal | privacy-central.securiti.ai (Securiti embed) |
| Apply Now / Transfer | drhorton.taleo.net |
| accessiBe | accessibe.com |

---

## 2. Page-by-Page Feature Inventory

### 2.1 Home Page (`/`)

| Element | Type | Notes |
|---------|------|-------|
| D.R. Horton logo | Link → `/` | Alt text present |
| Skip to main content | Link → `#main-content` | Accessibility |
| "New homes. Now ready." | Top banner | Persistent across site |
| Nav: Who we are | Link → `/who-we-are` | |
| Nav: Smart home | Link → `/smart-home` | |
| Nav: Services | Link → `/services` | |
| Nav: Customer care | Link → `/customer-care` | |
| Community search | Combobox | "Search by zip, city, state, or community" |
| Map view | Button | Alternative search mode |
| Hero heading | h1 | "Find your community. Find your home." |
| Video section | iframe + overlay | "We are America's Builder" |
| Smart Home card | Link → `/smart-home` | |
| Real Estate Agents card | Link → `/real-estate-agents` | |
| Military Buyers card | Link → `/military-benefits` | |
| Submit Your Story card | Link (external) | customerportal.drhorton.com |
| State links grid | 37 state links | With expandable submenus |
| Footer navigation | Links | 3 columns |
| Social media links | 4 icons | Facebook, Instagram, LinkedIn, Pinterest |
| Legal links row | 8 links | Privacy, Terms, etc. |
| Cookie banner | Dialog | Manage Cookies / Reject / Dismiss buttons |
| accessiBe widget | Button | Accessibility overlay tool |

**Responsive behavior (375px):**
- Navigation collapses to hamburger menu ("toggle navigation" button)
- Footer navigation becomes tabbed accordion (About D.R. Horton, Resources, Finance Your Home, Legal Information)
- Main navigation links hidden behind hamburger

### 2.2 Who We Are (`/who-we-are`)

| Element | Type | Notes |
|---------|------|-------|
| Photo mosaic | 12 images | Alt text present on all |
| Scroll down CTA | Link → `#scroll-down` | |
| Company history text | Paragraphs | Mission/history |
| Testimonial carousel | Previous/Next buttons | Multiple customer photos |
| DHI Mortgage card | Link (external) | |
| DHI Title card | Link (external) | |
| DRH Insurance card | Link (external) | |
| "Come work with us" | Section + Link → `/careers` | |

### 2.3 Smart Home (`/smart-home`)

| Element | Type | Notes |
|---------|------|-------|
| Product carousel | Previous/Next | Qolsys IQ Panel and other devices |
| Feature cards | 3 info cards | Remote, Hands-free, Expandable |
| Legal disclaimer | Long text block | Product substitution notice |

### 2.4 Services (`/services`)

| Element | Type | Notes |
|---------|------|-------|
| Hero section | Photo mosaic + heading | "We keep home in the family" |
| Finance card | Link (external) | DHI Mortgage |
| Ownership card | Link (external) | DHI Title |
| Coverage card | Link (external) | DRH Insurance |

### 2.5 Customer Care (`/customer-care`)

| Element | Type | Notes |
|---------|------|-------|
| Help hub | 4 action cards | Links to sub-pages |
| Warranty request | Link → `/warranty` | |
| Maintenance resources | Link → `/documents-and-guides` | |
| Property submittal | Link → `/contact-us---property-submittals` | |
| Contact us | Link → `/contact-us-page` | |

### 2.6 Warranty (`/warranty`)

| Element | Type | Notes |
|---------|------|-------|
| Tab navigation | 4 tabs | Part of customer care hub |
| Zip code input | Spinbutton | Required |
| Home address | Textbox | Disabled until zip entered; autocomplete |
| "Address not listed" | Checkbox | Alternative entry |
| Next button | Button | Advances form |
| Console errors | 3 errors noted | Resource loading failure (dropzone.css), Promise.allSettled compatibility |

### 2.7 Contact Us (`/contact-us-page`)

| Element | Type | Notes |
|---------|------|-------|
| Tab navigation | 4 tabs | Selected: Contact us |
| Inquiry Type | Dropdown | 5 options + placeholder |
| First Name | Textbox | Required |
| Last Name | Textbox | Required |
| Phone Number | Masked textbox | `(___) ___-____` |
| Secondary Phone | Masked textbox | Optional |
| Email | Textbox | Required |
| Confirm Email | Textbox | Required |
| Address | Textbox | Optional |
| State | Dropdown | All US states; required |
| City | Textbox | Required |
| Request details | Textbox | Required, min 10 chars |
| Submit button | Button | |
| Find an Office | Tabbed section | Local offices / National offices |
| State accordions | Expandable buttons | Division office details by state |

### 2.8 Military Benefits (`/military-benefits`)

| Element | Type | Notes |
|---------|------|-------|
| Hero section | Image + text | Flag icon |
| "Start the conversation" | Anchor link → `#contact-form` | |
| Feature cards | 3 cards | Ready, Peace of mind, Investment |
| Testimonial | Quote | Ocampo Family |
| VA Loans section | External link | DHI Mortgage |
| Contact form | 5 fields | First name, Last name, Email, Phone, Military branch |
| Military branch | Dropdown | 6 branches |
| Submit button | Button | |

### 2.9 Careers (`/careers`)

| Element | Type | Notes |
|---------|------|-------|
| Hero text | h1 | "We build people too.®" |
| Benefits list | Unordered list | 9 items |
| Apply now card | Link (external) | Taleo job search |
| Internship card | Link → `/internships` | |
| Internship section | Image + CTA | |
| National transfer | Link (external) | Taleo internal |

---

## 3. Smoke Test Cases

| ID | Title | Category | Preconditions | Steps (high-level) | Expected Result | Priority | Notes |
|----|-------|----------|---------------|---------------------|-----------------|----------|-------|
| SMK-001 | Home page loads | Page Load | None | 1. Navigate to `https://www.drhorton.com/` | Page loads with title "D.R. Horton America's Largest Home Builder \| Homes For Sale", no console errors blocking render | Critical | |
| SMK-002 | Logo renders on all pages | Branding | None | 1. Navigate to home page 2. Verify D.R. Horton logo image is visible with correct alt text | Logo image visible with alt "D R Horton logo, go to the home page" | Critical | |
| SMK-003 | Main navigation links resolve | Navigation | None | 1. Navigate to home page 2. Click each main nav link: Who we are, Smart home, Services, Customer care | Each page loads with correct title, no 404 or crash | Critical | |
| SMK-004 | Who We Are page loads | Page Load | None | 1. Navigate to `/who-we-are` | Page title "Who We Are \| D.R. Horton", h1 heading visible | High | |
| SMK-005 | Smart Home page loads | Page Load | None | 1. Navigate to `/smart-home` | Page title "Smart Home \| D.R. Horton", h1 heading visible | High | |
| SMK-006 | Services page loads | Page Load | None | 1. Navigate to `/services` | Page title "Services \| D.R. Horton", h1 heading visible | High | |
| SMK-007 | Customer Care page loads | Page Load | None | 1. Navigate to `/customer-care` | Page title "Customer Care \| D.R. Horton", h1 heading visible | High | |
| SMK-008 | Contact Us page loads | Page Load | None | 1. Navigate to `/contact-us-page` | Page title "Contact Us \| D.R. Horton", contact form visible | High | |
| SMK-009 | Warranty page loads | Page Load | None | 1. Navigate to `/warranty` | Page title "Warranty Request Page", warranty form visible | High | |
| SMK-010 | Military Benefits page loads | Page Load | None | 1. Navigate to `/military-benefits` | Page title "Military Benefits \| D.R. Horton", contact form visible | High | |
| SMK-011 | Careers page loads | Page Load | None | 1. Navigate to `/careers` | Page title "Careers \| D.R. Horton", h1 heading visible | High | |
| SMK-012 | Community search is present | Search | Home page loaded | 1. Verify search combobox exists with placeholder text | Combobox with "Search by zip, city, state, or community" placeholder visible | Critical | |
| SMK-013 | Footer renders on all pages | Layout | None | 1. Navigate to any page 2. Scroll to footer | Footer navigation, social links, legal links, and copyright all visible | High | |
| SMK-014 | Cookie banner displays | Privacy | First visit / cleared cookies | 1. Navigate to home page in clean session | Cookie banner dialog appears with Manage Cookies, Reject, and Dismiss buttons | High | |
| SMK-015 | Cookie banner dismissible | Privacy | Cookie banner visible | 1. Click "Dismiss" button on cookie banner | Cookie banner closes | High | |
| SMK-016 | State landing page loads | Page Load | None | 1. Navigate to `/texas` (sample state) | State page loads without error, community listings visible | High | Test with 2-3 sample states |
| SMK-017 | Skip to main content link | Accessibility | None | 1. Tab into page 2. Verify "Skip to main content" link exists | Skip link present with href `#main-content` | Medium | |
| SMK-018 | Top banner visible | Layout | None | 1. Navigate to any page | "New homes. Now ready." banner visible at top | Medium | |

---

## 4. Regression Test Cases

### Navigation & Layout

| ID | Title | Category | Preconditions | Steps (high-level) | Expected Result | Priority | Notes |
|----|-------|----------|---------------|---------------------|-----------------|----------|-------|
| REG-001 | Header nav links all functional | Navigation | None | 1. Click each header nav link 2. Verify URL and page title | Each nav link navigates to correct page | Critical | |
| REG-002 | Logo navigates to home | Navigation | On any sub-page | 1. Click D.R. Horton logo | Navigates to `/` (home page) | High | |
| REG-003 | Footer internal links functional | Navigation | None | 1. Click each internal footer link (Who we are, Smart home, Military benefits, Contact, Careers, Warranty, Rental investor) | Each link navigates to correct internal page | High | |
| REG-004 | Footer external links have correct hrefs | Navigation | None | 1. Verify href attributes on footer external links (Submit your story, Investor relations, DHI Mortgage, DHI Title, DRH Insurance) | Each has correct external URL | Medium | Don't navigate; just verify href |
| REG-005 | Social media links correct | Navigation | None | 1. Verify href on each social icon (Facebook, Instagram, LinkedIn, Pinterest) | Correct social URLs | Medium | |
| REG-006 | State grid links all resolve | Navigation | Home page | 1. Open 5+ sample state links from footer grid | Each state page loads | Medium | Sample: TX, FL, CA, NY, GA |
| REG-007 | State submenu expands | Navigation | Home page or footer | 1. Click "Open submenu" button next to a state (e.g., Texas) | Submenu expands showing local market links | Medium | |
| REG-008 | Mobile hamburger menu opens | Responsive | Viewport 375px | 1. At 375px width 2. Click "toggle navigation" button | Navigation menu opens showing main nav links | High | |
| REG-009 | Mobile footer accordion works | Responsive | Viewport 375px | 1. At 375px width 2. Click footer tab headings | Each section expands to show links | Medium | |
| REG-010 | Deep link to contact-us page | Navigation | None | 1. Navigate directly to `/contact-us-page` | Page loads with Contact us tab active | High | |
| REG-011 | Deep link to warranty page | Navigation | None | 1. Navigate directly to `/warranty` | Page loads with Warranty request tab/content active | High | |

### Home Page

| ID | Title | Category | Preconditions | Steps (high-level) | Expected Result | Priority | Notes |
|----|-------|----------|---------------|---------------------|-----------------|----------|-------|
| REG-012 | Community search accepts input | Search | Home page loaded | 1. Click search combobox 2. Type "Dallas" | Combobox accepts text, search suggestions may appear | Critical | |
| REG-013 | Map view button clickable | Search | Home page loaded | 1. Click "Map view" button | Map view mode activates or navigates to map | High | |
| REG-014 | Hero heading renders | Content | Home page loaded | 1. Verify h1 "Find your community. Find your home." is visible | Heading text matches expected | High | |
| REG-015 | Video section loads | Content | Home page loaded | 1. Verify iframe in video section loads | iframe renders without errors | Medium | |
| REG-016 | Feature card links correct | Navigation | Home page loaded | 1. Verify hrefs on Smart Home, Real Estate Agents, Military Buyers, Submit Your Story cards | Correct internal/external URLs | High | |

### Contact Us Form

| ID | Title | Category | Preconditions | Steps (high-level) | Expected Result | Priority | Notes |
|----|-------|----------|---------------|---------------------|-----------------|----------|-------|
| REG-017 | Contact form all fields render | Forms | `/contact-us-page` loaded | 1. Verify all form fields exist: Inquiry Type, First Name, Last Name, Phone, Secondary Phone, Email, Confirm Email, Address, State, City, Request details | All fields present and interactable | Critical | |
| REG-018 | Inquiry type dropdown options | Forms | `/contact-us-page` loaded | 1. Open Inquiry Type dropdown 2. Verify all options | Options: Make a selection, Home Buyer - Sales Inquiries, Homeowner Inquiries, Real Estate Agent Inquiries, Vendor Inquiries, Other Inquiries | High | |
| REG-019 | Required field validation — empty submit | Forms | `/contact-us-page` loaded | 1. Click Submit without filling any fields | Validation errors shown for required fields (First Name, Last Name, Email, Confirm Email, State, City, Request details) | Critical | |
| REG-020 | Email format validation | Forms | `/contact-us-page` loaded | 1. Enter invalid email format (e.g., "notanemail") 2. Attempt submit | Email validation error message displayed | High | |
| REG-021 | Email confirmation mismatch | Forms | `/contact-us-page` loaded | 1. Enter "test@test.com" in Email 2. Enter "different@test.com" in Confirm Email 3. Attempt submit | Validation error for email mismatch | High | |
| REG-022 | Request details min length | Forms | `/contact-us-page` loaded | 1. Fill required fields 2. Enter "short" in Request details (< 10 chars) 3. Submit | Validation error for minimum length | High | |
| REG-023 | Phone number mask formatting | Forms | `/contact-us-page` loaded | 1. Click Phone Number field 2. Type digits | Phone input formats as `(___) ___-____` | Medium | |
| REG-024 | State dropdown all options | Forms | `/contact-us-page` loaded | 1. Open State dropdown 2. Verify all state abbreviations present | All 50 states + DC represented | Medium | |

### Customer Care Tabs

| ID | Title | Category | Preconditions | Steps (high-level) | Expected Result | Priority | Notes |
|----|-------|----------|---------------|---------------------|-----------------|----------|-------|
| REG-025 | Customer care tab navigation | Tabs | `/contact-us-page` or `/warranty` loaded | 1. Click each tab: Warranty request, Maintenance resources, Property submittal, Contact us | Correct content panel displays for each tab | Critical | |
| REG-026 | Tab state reflects URL | Tabs | None | 1. Navigate to `/warranty` 2. Verify Warranty request tab active 3. Navigate to `/contact-us-page` 4. Verify Contact us tab active | Active tab matches URL | High | |

### Warranty Form

| ID | Title | Category | Preconditions | Steps (high-level) | Expected Result | Priority | Notes |
|----|-------|----------|---------------|---------------------|-----------------|----------|-------|
| REG-027 | Warranty zip code input | Forms | `/warranty` loaded | 1. Enter valid zip code in spinbutton | Zip code accepted, address field becomes enabled | Critical | |
| REG-028 | Warranty address disabled initially | Forms | `/warranty` loaded | 1. Verify address textbox is disabled before zip entry | Address field disabled with "Find and Select your House Address" placeholder | High | |
| REG-029 | Warranty "address not listed" checkbox | Forms | `/warranty` loaded | 1. Check "My address isn't listed" checkbox | Alternative address entry mode activated | High | |
| REG-030 | Warranty form console errors | Error Handling | `/warranty` loaded | 1. Check console for errors | Note: 3 errors observed (dropzone.css 404, Promise.allSettled compatibility). These should be investigated. | Medium | Existing defect |

### Military Benefits Form

| ID | Title | Category | Preconditions | Steps (high-level) | Expected Result | Priority | Notes |
|----|-------|----------|---------------|---------------------|-----------------|----------|-------|
| REG-031 | Military form all fields render | Forms | `/military-benefits` loaded | 1. Verify all form fields: First name, Last name, Email, Phone, Military branch | All fields present | High | |
| REG-032 | Military branch dropdown options | Forms | `/military-benefits` loaded | 1. Open Military branch dropdown | Options: Air Force, Army, Coast Guard, Marine Corps, Navy, Space Force | High | |
| REG-033 | Military form required validation | Forms | `/military-benefits` loaded | 1. Click Submit without filling fields | Required field validation errors shown | High | |
| REG-034 | Military form phone mask | Forms | `/military-benefits` loaded | 1. Type phone number | Phone formats as `(___) ___-____` | Medium | |

### Find an Office

| ID | Title | Category | Preconditions | Steps (high-level) | Expected Result | Priority | Notes |
|----|-------|----------|---------------|---------------------|-----------------|----------|-------|
| REG-035 | Local offices tab default | Tabs | `/contact-us-page` loaded, scrolled to Find an Office | 1. Verify "Local offices" tab is selected by default | Local offices tab active | Medium | |
| REG-036 | National offices tab | Tabs | `/contact-us-page` loaded | 1. Click "National offices" tab | National offices content displayed | Medium | |
| REG-037 | State accordion expand/collapse | UI Component | `/contact-us-page`, Find an Office section | 1. Click "Alabama" button 2. Verify office details appear 3. Click again to collapse | Office details for Alabama divisions expand/collapse | Medium | |

### Responsive Layout

| ID | Title | Category | Preconditions | Steps (high-level) | Expected Result | Priority | Notes |
|----|-------|----------|---------------|---------------------|-----------------|----------|-------|
| REG-038 | Layout at 1920px | Responsive | None | 1. Set viewport to 1920×1080 2. Navigate to home page | Full desktop layout, all nav links visible | Medium | |
| REG-039 | Layout at 1440px | Responsive | None | 1. Set viewport to 1440×900 2. Navigate to home page | Desktop layout maintained | Medium | |
| REG-040 | Layout at 1024px | Responsive | None | 1. Set viewport to 1024×768 2. Navigate to home page | Layout adjusts, check if nav collapses | Medium | Tablet breakpoint |
| REG-041 | Layout at 768px | Responsive | None | 1. Set viewport to 768×1024 2. Navigate to home page | Tablet layout, may show hamburger | Medium | |
| REG-042 | Layout at 375px | Responsive | None | 1. Set viewport to 375×812 2. Navigate to home page | Mobile layout: hamburger menu, stacked content, accordion footer | High | |

### Content & SEO

| ID | Title | Category | Preconditions | Steps (high-level) | Expected Result | Priority | Notes |
|----|-------|----------|---------------|---------------------|-----------------|----------|-------|
| REG-043 | Page titles unique and descriptive | Content | None | 1. Navigate to each main page 2. Check `document.title` | Each page has unique, descriptive title | Medium | |
| REG-044 | H1 headings present on all pages | Content | None | 1. Navigate to each page 2. Verify h1 exists | Every page has exactly one h1 heading | Medium | |
| REG-045 | Images have alt text | Accessibility | None | 1. Check key images on home, who we are, smart home pages | Images have descriptive alt attributes | Medium | |
| REG-046 | Copyright year current | Content | None | 1. Check footer copyright | Shows "© 2026 D.R. Horton, Inc. All Rights Reserved" | Low | |

### Carousels

| ID | Title | Category | Preconditions | Steps (high-level) | Expected Result | Priority | Notes |
|----|-------|----------|---------------|---------------------|-----------------|----------|-------|
| REG-047 | Who We Are testimonial carousel | UI Component | `/who-we-are` loaded | 1. Click "Next" button 2. Verify carousel advances 3. Click "Previous" 4. Verify carousel goes back | Carousel navigates between testimonials | Medium | |
| REG-048 | Smart Home product carousel | UI Component | `/smart-home` loaded | 1. Click "Next" button 2. Verify product changes 3. Click "Previous" | Carousel navigates between smart home products | Medium | |

### Cookie Consent

| ID | Title | Category | Preconditions | Steps (high-level) | Expected Result | Priority | Notes |
|----|-------|----------|---------------|---------------------|-----------------|----------|-------|
| REG-049 | Cookie banner — Reject | Privacy | Clean session | 1. Click "Reject" on cookie banner | Banner closes, cookies not set (or minimal) | High | |
| REG-050 | Cookie banner — Manage Cookies | Privacy | Clean session | 1. Click "Manage Cookies" on cookie banner | Cookie preferences panel opens | Medium | |
| REG-051 | Cookie banner persists on dismiss | Privacy | None | 1. Dismiss cookie banner 2. Refresh page | Cookie banner does not reappear | Medium | |

### Error Handling

| ID | Title | Category | Preconditions | Steps (high-level) | Expected Result | Priority | Notes |
|----|-------|----------|---------------|---------------------|-----------------|----------|-------|
| REG-052 | 404 page for invalid routes | Error Handling | None | 1. Navigate to `/nonexistent-page` | Appropriate error page or redirect, no crash | High | |
| REG-053 | Console errors on warranty page | Error Handling | None | 1. Navigate to `/warranty` 2. Check console | Document known errors: dropzone.css 404, Promise.allSettled error | Medium | Existing defect to track |

---

## 5. End-to-End Test Cases

| ID | Title | Category | Preconditions | Steps (high-level) | Expected Result | Priority | Notes |
|----|-------|----------|---------------|---------------------|-----------------|----------|-------|
| E2E-001 | Home search to community results | Search | None | 1. Navigate to home page 2. Enter a zip code (e.g., "75034") in search combobox 3. Select a suggestion or submit 4. Verify community results page loads | Search results display relevant communities for the searched area | Critical | Core user journey |
| E2E-002 | Home → Who We Are → Careers flow | Navigation | None | 1. Navigate to home page 2. Click "Who we are" nav link 3. Verify page load 4. Scroll to "Come work with us" 5. Click "Join the team" link 6. Verify Careers page loads | Full navigation journey completes across 3 pages | High | |
| E2E-003 | Customer Care → Contact Us form submission | Forms | None | 1. Navigate to `/customer-care` 2. Click "Contact us" card 3. Fill out contact form with valid data (Inquiry Type: Other Inquiries, First/Last name, Email match, State, City, Request details 10+ chars) 4. Submit form | Form submits successfully, confirmation message displayed | Critical | Use realistic test data |
| E2E-004 | Customer Care → Warranty request flow | Forms | None | 1. Navigate to `/customer-care` 2. Click "Warranty request" card 3. Enter valid zip code 4. Select address from dropdown 5. Complete form steps 6. Submit | Warranty request form progresses through all steps | Critical | Need valid DR Horton zip codes |
| E2E-005 | Military Benefits contact flow | Forms | None | 1. Navigate to home page 2. Click "Military Buyers" card 3. Click "Start the conversation" anchor link 4. Fill form (First name, Last name, Email, Phone, Military branch: Army) 5. Submit | Form scrolls to contact section, submits successfully | High | |
| E2E-006 | Home → State → Community browse | Navigation | None | 1. Navigate to home page 2. Scroll to state grid in footer 3. Click "Texas" 4. Verify Texas landing page 5. Click on a local market link | Community listings for selected Texas market displayed | High | |
| E2E-007 | Find an Office by state | Navigation | None | 1. Navigate to `/contact-us-page` 2. Scroll to Find an Office 3. Ensure Local offices tab active 4. Click "Texas" accordion 5. Verify division office details display | Office addresses, phone numbers visible for Texas divisions | Medium | |
| E2E-008 | Customer Care tab switching | Navigation | None | 1. Navigate to `/warranty` 2. Verify warranty form visible 3. Click "Contact us" tab 4. Verify contact form visible 5. Click "Warranty request" tab 6. Verify warranty form returns | Tab switching works bidirectionally without page reload issues | High | |
| E2E-009 | Mobile navigation journey | Responsive | Viewport 375px | 1. Set viewport to 375×812 2. Navigate to home page 3. Click hamburger menu 4. Click "Customer care" 5. Verify page loads 6. Navigate to warranty tab | Full mobile navigation flow completes | High | |
| E2E-010 | Services page → External service links | Navigation | None | 1. Navigate to `/services` 2. Verify Finance card href → dhimortgage.com 3. Verify Ownership card href → dhititle.com 4. Verify Coverage card href → drhortoninsurance.com | All external service links have correct href attributes | Medium | Verify hrefs only, don't follow external links |
| E2E-011 | FAQ link from Contact page | Navigation | None | 1. Navigate to `/contact-us-page` 2. Click "frequently asked questions" link 3. Verify `/faq` page loads | FAQ page loads with relevant content | Medium | |
| E2E-012 | Search with Map view | Search | None | 1. Navigate to home page 2. Click "Map view" button 3. Verify map interface loads 4. Interact with map | Map view displays correctly with community markers or search interface | High | |

---

## 6. Risk Assessment & Recommendations

### 6.1 High-Risk Areas

1. **Community Search (Home Page)** — The primary user action on the site. Search combobox drives all home-buying traffic. Broken search = total business impact.
2. **Contact Us Form** — Multi-field form with validation, masked inputs, and dropdowns. High surface area for regression.
3. **Warranty Request Form** — Multi-step form with zip code lookup and address autocomplete. Already shows console errors (dropzone.css 404, Promise.allSettled). Most complex form on the site.
4. **Customer Care Tab Navigation** — Four interconnected pages sharing a tab interface. Deep links must resolve to the correct tab. Breakage affects all customer support flows.
5. **State Landing Pages** — 37 state pages with expandable market submenus. High volume of routes to validate.

### 6.2 Coverage Gaps

1. **Authentication-gated areas** — No login/authentication flows were discovered on the public site. The "Submit Your Story" feature redirects to `customerportal.drhorton.com` which likely requires auth.
2. **Property Submittal form** — `/contact-us---property-submittals` was not fully explored; needs separate review.
3. **Maintenance Resources page** — `/documents-and-guides` content was not explored; may contain downloadable documents, filters, or state-based lookups.
4. **Internships page** — `/internships` linked from Careers but not explored.
5. **Real Estate Agents page** — `/real-estate-agents` linked from homepage but not explored.
6. **Community detail pages** — Individual community/home listing pages were not explored. These likely have floor plans, pricing, photo galleries, maps, and scheduling forms.
7. **Map view functionality** — Map interface on home page was not interacted with. May use Google Maps or similar.
8. **Search autocomplete behavior** — Dropdown suggestions when typing in community search were not fully tested.
9. **Third-party integrations** — OneTrust (cookies), Cloudflare Turnstile (bot protection), accessiBe (accessibility overlay), Facebook pixel tracking.

### 6.3 Recommended Test Data

| Data Type | Values Needed |
|-----------|---------------|
| Valid zip codes (with D.R. Horton homes) | 75034 (Frisco TX), 32259 (Fruit Cove FL), 28273 (Charlotte NC) |
| Contact form data | First/Last names, valid email pairs, phone numbers, addresses |
| Military branch values | Air Force, Army, Coast Guard, Marine Corps, Navy, Space Force |
| State abbreviations | All 50 + DC for dropdown validation |
| Invalid data | Bad emails, short text (<10 chars), mismatched emails, empty required fields |
| Zip codes without D.R. Horton homes | e.g., 10001 (Manhattan NY) — to test "no results" states |
| Community search terms | City names, state names, zip codes, community names |

### 6.4 Suggested Execution Order

1. **Smoke Tests first** — Validates all pages load and core elements render. Quick feedback on deployments. (~18 tests)
2. **Regression — Navigation & Layout** — Ensures links, responsive layouts, and page structure are intact. (~15 tests)
3. **Regression — Forms** — Contact, Warranty, and Military forms are the highest-interaction areas. (~18 tests)
4. **Regression — UI Components** — Carousels, tabs, accordions, cookie consent. (~10 tests)
5. **E2E Tests last** — Full journey tests after individual components are verified. (~12 tests)

### 6.5 Open Questions

1. **Warranty form errors** — The `/warranty` page has 3 console errors (dropzone.css 404, Promise.allSettled not a function). Are these known issues? Do they affect functionality?
2. **Search autocomplete API** — What API powers the community search? Is there a minimum character count before suggestions appear?
3. **Form submission endpoints** — Where do Contact Us, Military Benefits, and Warranty forms POST to? Is there a success/confirmation page or inline message?
4. **Map view implementation** — What mapping service is used? Does it require an API key for testing?
5. **Property Submittal form** — What fields does this form contain? Is it similar to Contact Us?
6. **Community detail pages** — What is the URL pattern? (e.g., `/texas/dfw/community-name`) What interactive elements exist on these pages?
7. **Rental Investor page** — `/rentals/rentalinvestor` — Is this a separate application or part of the main site?
8. **accessiBe overlay** — Should the accessibility overlay integration be tested, or is it managed by the vendor?
9. **Turnstile/CAPTCHA** — Cloudflare Turnstile is loaded. Does it appear on any form submissions? This will affect automated testing.
10. **Browser support matrix** — What browsers and versions should be tested? (Chrome, Firefox, Safari, Edge, mobile browsers)

---

**Total Test Cases: 73**
- Smoke: 18
- Regression: 53
- E2E: 12

*Once this review is approved, a follow-up prompt will be used to generate the actual Playwright test code based on the agreed plan.*
