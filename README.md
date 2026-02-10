# Talent Loop - Professional Job Agency Website

A fully responsive, modern job agency website with multiple pages and an interactive career assessment quiz.

## 🌐 Website Information

- **Company Name**: Talent Loop
- **Domain**: www.talent-loop.org
- **Email (General)**: info@talent-loop.org
- **Email (Careers)**: careers@talent-loop.org

## 📋 Features

### Pages Included:
1. **Home (index.html)** - Hero section with corporate office video background, features, stats, and CTA
2. **About Us (about.html)** - Company story, mission, vision, values, and team
3. **Blog (blog.html)** - Career insights and articles
4. **Contact (contact.html)** - Contact form with FAQ section and proper email addresses
5. **Privacy Policy (privacy.html)** - Comprehensive privacy policy with Talent Loop details
6. **Legal (legal.html)** - Terms and conditions with Talent Loop branding
7. **Assessment Quiz (assessment.html)** - 10-question career assessment with IdentityIQ integration

### Key Features:
- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Professional corporate aesthetic with sophisticated color palette
- ✅ Animated statistics counters
- ✅ Interactive 10-question assessment quiz
- ✅ Priority verification option (IdentityIQ integration ready)
- ✅ Smooth animations and transitions
- ✅ Mobile-friendly navigation
- ✅ Contact form with validation
- ✅ Video background on home page
- ✅ SEO-friendly structure
- ✅ Strategic placement of contact information throughout site

## 🎨 Design

The website features a professional corporate design with:
- **Primary Color**: Deep corporate blue (#1a4d7d)
- **Accent Color**: Warm gold (#d4a574)
- **Typography**: Playfair Display (headings) + DM Sans (body)
- **Layout**: Clean, modern, with generous whitespace
- **Animations**: Subtle fade-ins, smooth transitions

## 📧 Contact Information Placement

Your official contact information appears in these strategic locations:

### Email Addresses:
- **info@talent-loop.org** - General inquiries, employer contacts, partnerships
- **careers@talent-loop.org** - Job seeker inquiries, assessment follow-ups

### Where They Appear:
1. **Footer** (all pages) - Both email addresses prominently displayed
2. **Contact Page** - Featured in contact details section with icons and Quick Contact Reference box
3. **Privacy Policy** - In the Contact Us section at the bottom
4. **Legal/Terms** - In the Contact Information section at the bottom
5. **Assessment Completion** - careers@talent-loop.org for follow-up questions

### Website URL (www.talent-loop.org):
1. Footer of all pages
2. Contact page header
3. Privacy policy introduction
4. Legal terms introduction
5. All mailto links and references

## 🚀 Getting Started

### Installation:

1. **Extract all files** to a folder on your computer
2. **Open index.html** in a web browser
3. That's it! No server required for basic functionality.

### Files Structure:
```
talent-loop-website/
│
├── index.html          # Home page
├── about.html          # About Us page
├── blog.html           # Blog page
├── contact.html        # Contact page (with your emails)
├── privacy.html        # Privacy Policy
├── legal.html          # Terms & Conditions
├── assessment.html     # Assessment Quiz
├── styles.css          # Main stylesheet
├── script.js           # Main JavaScript
├── quiz.js            # Quiz functionality
└── README.md          # This file
```

## 📱 Video Background

The home page features a corporate office video background. The current implementation uses free stock videos from Coverr.co. To customize:

1. Replace the video URLs in `index.html` (lines 31-33)
2. Use MP4 format for best compatibility
3. Recommended: 1920x1080 resolution, under 5MB for fast loading
4. Ensure videos are muted (autoplay requires muted videos)

## 🎯 Assessment Quiz

The 10-question assessment includes:
- Questions 1-9: Career preferences, experience, industry, etc.
- Question 10: Priority verification option through IdentityIQ

### How the Quiz Works:
1. Users click "Start Assessment"
2. Progress through 10 questions with visual progress bar
3. Questions auto-advance on selection (except final question)
4. Final question offers IdentityIQ verification for priority status
5. Upon completion, users see customized message based on their choice
6. Contact info (careers@talent-loop.org) provided for follow-up questions

### IdentityIQ Integration:
The quiz includes a verification option. In the demo, this displays a message. To implement actual IdentityIQ integration:

1. Uncomment lines in `quiz.js` (around line 148)
2. Replace with your IdentityIQ partner URL
3. Set up backend to handle verification callbacks

## 🛠️ Customization

### Colors:
Edit CSS variables in `styles.css` (lines 8-18):
```css
--primary-color: #1a4d7d;
--accent-color: #d4a574;
```

### Contact Information:
Your contact details are already updated throughout the site:
- **Website**: www.talent-loop.org
- **Email (General)**: info@talent-loop.org
- **Email (Careers)**: careers@talent-loop.org

These appear in:
- Footer (all pages)
- Contact page
- Privacy policy
- Legal/terms page
- Assessment completion message

### Logo:
The diamond symbol (◆) can be replaced with:
- An image: `<img src="logo.png" alt="Talent Loop Logo">`
- Different icon/symbol
- Custom SVG logo

### Blog Posts:
Add real blog posts in `blog.html` by:
1. Duplicating `.blog-card` sections
2. Updating titles, dates, categories
3. Linking to actual blog post pages

## 📊 Form Handling

The contact form currently:
- Validates inputs
- Shows success message
- Logs data to console
- Stores assessment data in localStorage

### To Connect to Backend:

**Contact Form** (`script.js`, line 65):
```javascript
// Replace console.log with fetch/AJAX call
fetch('https://www.talent-loop.org/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
});
```

**Assessment Quiz** (`quiz.js`, line 161):
```javascript
// Replace localStorage with server call
fetch('https://www.talent-loop.org/api/assessment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(assessmentData)
});
```

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Content Guidelines

### Legal Pages:
- Review and customize privacy.html and legal.html
- Your company details are already in place
- Add any additional legal requirements
- Update "Last updated" dates when making changes

### Assessment Questions:
Customize quiz questions in `assessment.html` to match your:
- Industry focus
- Candidate requirements
- Screening criteria

## 🎭 Animations

The site includes:
- Fade-in on scroll for cards and content blocks
- Animated statistics counters
- Smooth page transitions
- Hover effects on interactive elements
- Progress bar animations in quiz

## 📱 Mobile Responsiveness

Breakpoints:
- Desktop: 969px+
- Tablet: 641px - 968px
- Mobile: < 640px

Mobile features:
- Hamburger menu
- Touch-friendly buttons
- Optimized font sizes
- Stacked layouts

## 🚀 Deploying to GitHub & Cloudflare

### Quick Steps:

1. **Create GitHub Repository**:
   - Name it: `talent-loop-website`
   - Upload all files

2. **Connect to Cloudflare Pages**:
   - Go to Cloudflare Dashboard → Workers & Pages
   - Connect your GitHub repository
   - Deploy (no build command needed)
   - Your site will be live at: `talent-loop-website.pages.dev`

3. **Add Custom Domain**:
   - In Cloudflare Pages → Custom domains
   - Add: `www.talent-loop.org`
   - Follow DNS setup instructions

## 🔐 Security Notes

Before going live:
- Implement CSRF protection on forms
- Add rate limiting to prevent spam
- Validate all inputs server-side
- Use HTTPS for all pages (Cloudflare provides this)
- Set up proper email forwarding for info@ and careers@ addresses
- Review and update privacy policy with actual data practices

## 📈 Email Setup

Your website references these email addresses. Make sure to:

1. **Set up email forwarding** for your domain (talent-loop.org):
   - info@talent-loop.org → your main inbox
   - careers@talent-loop.org → HR or recruitment inbox

2. **Update Cloudflare DNS** (if using Cloudflare):
   - Add MX records for email service
   - Or use Cloudflare Email Routing (free)

3. **Test all mailto: links** after deployment to ensure emails open correctly

## 📊 Analytics

To add Google Analytics:
```html
<!-- Add before </head> in all HTML files -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🤝 Support

For questions or issues:
1. Check browser console for JavaScript errors
2. Verify all files are in the same directory
3. Clear browser cache if styles don't update
4. Test in multiple browsers

## 📞 Your Contact Information Summary

**Company**: Talent Loop  
**Website**: www.talent-loop.org  
**General Email**: info@talent-loop.org  
**Careers Email**: careers@talent-loop.org

All strategically placed throughout the website for maximum professional impact!

## 📄 License

This website template is provided for your business use. Customize freely for Talent Loop.

## 🎉 Credits

- Fonts: Google Fonts (Playfair Display, DM Sans)
- Stock Videos: Coverr.co (free to use)
- Icons: Unicode characters (no external dependencies)

---

**Built specifically for Talent Loop. Ready to deploy to www.talent-loop.org!** 🚀
