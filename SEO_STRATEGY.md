# Vitur Ltd Website - SEO Optimization Notes

## Overview
This is the optimized website for Vitur Ltd, an IT and cyber security services company based in Bathgate, West Lothian, Scotland.

## SEO Strategy

### Target Keywords
- Primary: "IT services West Lothian", "cyber security West Lothian", "cloud cost optimisation Scotland"
- Secondary: "DevOps consultancy", "cloud security", "IT support Livingston", "Bathgate"
- Long-tail: "reduce cloud costs", "GDPR compliance Scotland", "cloud security audit"

### Geographic Focus
- Primary service area: West Lothian (Bathgate, Livingston, Linlithgow)
- Secondary: Midlothian and East Lothian
- Tertiary: Scotland and UK

### Page Structure

**Core Pages:**
- `/` (Homepage) - Main entry point, targets broad IT/cyber security keywords for West Lothian
- `/services/` - Service listing page with breadcrumb schema
- `/services/cloud-cost-optimisation.html` - Detailed service page with Service schema (generic cloud)
- `/services/devops-consultancy.html` - DevOps focused page with Service schema
- `/services/security.html` - Cyber security focused page with Service schema
- `/about/` - Company information and credentials
- `/contact/` - Contact form and booking CTA

**Location Pages:**
- `/locations/west-lothian.html` - Regional landing page with LocalBusiness schema
- `/locations/livingston.html` - City-specific landing page for Livingston
- Potential: Additional pages for Linlithgow as traffic grows

**Content Pages:**
- `/faq.html` - FAQ page with FAQ schema markup for rich snippets
- `/guides/reduce-cloud-costs.html` - Educational content targeting cloud cost reduction keywords

### Schema Markup Implemented
1. **LocalBusiness** - Homepage has LocalBusiness schema with address, service area, contact info
2. **Organization** - Homepage includes Organization schema with company info
3. **Service** - Each service page has Service schema with description and area served
4. **BreadcrumbList** - Services page includes breadcrumb navigation schema
5. **FAQPage** - FAQ page includes FAQ schema with Q&A pairs
6. **Article** - Guides/blog posts include Article schema

### Meta Tags
All pages include optimized:
- Title tags (50-60 characters, keyword-focused)
- Meta descriptions (150-160 characters, compelling with CTA)
- Open Graph tags (for social sharing)
- Twitter Card tags
- Canonical tags
- Alternate hreflang tags

### Internal Linking
- Homepage links to all service pages, location pages and important content
- Service pages cross-link to related services
- FAQ page provides internal links to services
- Location pages link back to main service pages
- Strategic anchor text using target keywords

### Technical SEO
- **robots.txt** - Configured to allow crawling, block bad bots, reference sitemap
- **sitemap.xml** - Complete XML sitemap with all public pages, priorities and change frequency
- **.htaccess** - Compression enabled, caching configured, HTTPS enforcement, product page redirect
- Mobile responsive design
- Fast load times (optimized for Lighthouse)

### Keyword Strategy by Page

**Homepage:**
- Primary: "IT services West Lothian", "cyber security West Lothian"
- Secondary: "cloud security", "DevOps consultancy", "cloud cost optimisation"

**Cloud Cost Optimisation Page:**
- Primary: "cloud cost optimisation", "reduce cloud costs"
- Secondary: "cost management", "cloud savings", "cost optimisation"
- Guide page targets: "how to reduce cloud costs", "cloud cost management"

**DevOps Consultancy Page:**
- Primary: "DevOps consultancy Scotland", "CI/CD automation"
- Secondary: "Kubernetes", "Terraform", "infrastructure automation"

**Cyber Security Page:**
- Primary: "cyber security West Lothian", "security audit Scotland"
- Secondary: "GDPR compliance", "ISO 27001", "security hardening"

**Location Pages:**
- Livingston: "IT services Livingston", "cyber security Livingston"
- West Lothian: "IT services West Lothian", "cyber security services"

### Content Optimization
- Proper heading hierarchy (H1, H2, H3) on all pages
- Keyword-relevant image alt text
- Descriptive link anchors (not "click here")
- Comprehensive content depth (FAQ page is ~2000 words)
- Clear value propositions and CTAs

### Performance Optimizations
- Compress images for faster loading
- Minify CSS and JavaScript
- Leverage browser caching
- Enable GZIP compression
- Optimize Core Web Vitals

## Maintenance & Updates

### Regular Tasks
1. **Monthly:** 
   - Review Google Search Console for errors and impressions
   - Check page rankings for target keywords
   - Update sitemap with new content

2. **Quarterly:**
   - Review and update FAQ page with new questions
   - Add new location pages if expanding service area
   - Create new guide/blog content

3. **Annually:**
   - Full SEO audit
   - Competitor keyword analysis
   - Update metadata and keywords as needed

### Content Calendar Suggestions
- Monthly guides on cloud/security topics (target long-tail keywords)
- Quarterly case studies (improve authority)
- Holiday/seasonal IT security tips
- Industry news roundups

## Tools & Analytics
- Google Search Console - Monitor search performance, submit sitemaps
- Google Analytics 4 - Track user behavior and conversions
- Lighthouse - Monitor page speed and SEO scores
- Keyword research tools - Track rankings and identify new opportunities

## File Structure
```
/
├── index.html                          # Homepage
├── about/index.html                    # About page
├── contact/index.html                  # Contact page
├── services/
│   ├── index.html                      # Services listing
│   ├── cloud-cost-optimisation.html
│   ├── devops-consultancy.html
│   ├── security.html
│   ├── devops-as-a-service.html
│   └── cloud-security.html
├── locations/
│   ├── west-lothian.html               # West Lothian region page
│   └── livingston.html                 # Livingston city page
├── guides/
│   └── reduce-cloud-costs.html  # Educational guide
├── faq.html                            # FAQ page
├── sitemap.xml                         # XML sitemap
├── robots.txt                          # Robots.txt
├── .htaccess                           # Server configuration
└── assets/                             # Images, CSS, JS
```

## Future Optimization Ideas
1. Add blog/news section for regular content updates
2. Implement internal search functionality
3. Add customer testimonials with review schema
4. Create video content (YouTube optimization)
5. Develop local citation strategy (industry directories, local listings)
6. Implement hreflang for multi-language versions if needed
7. Create AMP versions for mobile performance
8. Add structured data for pricing (if offering service pricing)

---

Last Updated: December 10, 2025
