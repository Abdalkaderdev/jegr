# Jegr Jalal Company Website Documentation

## Project Overview

This is a modern, responsive website for **Jegr Jalal Company**, a premier construction and infrastructure development firm based in Iraq. The website showcases the company's services, projects, and expertise in building sustainable urban solutions across Iraqi cities.

The website features a professional design with construction-themed colors (orange, yellow, gray) and includes smooth animations, interactive elements, and a mobile-first responsive design approach.

**Company Tagline:** "Strong. Elegant. Jegr Jalal."

## Tools & Technologies Used

- **React 18.3.1** - Frontend framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and development server
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **React Router DOM 6.20.1** - Client-side routing
- **Lucide React 0.344.0** - Icon library
- **PostCSS & Autoprefixer** - CSS processing
- **ESLint** - Code linting and quality

## Folder & File Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components
│   │   ├── AnimatedSection.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Input.tsx
│   ├── Footer.tsx       # Site footer
│   └── Navbar.tsx       # Navigation bar
├── pages/               # Page components
│   ├── HomePage.tsx     # Landing page
│   ├── AboutPage.tsx    # Company information
│   ├── ServicesPage.tsx # Services overview
│   ├── ProjectsPage.tsx # Project portfolio
│   └── ContactPage.tsx  # Contact form and info
├── App.tsx              # Main app component with routing
├── main.tsx             # Application entry point
├── index.css            # Global styles and Tailwind
└── vite-env.d.ts        # TypeScript environment types

public/
├── index.html           # HTML template
└── vite.svg             # Vite logo

Configuration Files:
├── package.json         # Dependencies and scripts
├── tailwind.config.js   # Tailwind configuration
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
└── eslint.config.js     # ESLint configuration
```

## Pages

### 1. Homepage (`/`)
- **Hero Section**: Full-screen banner with company tagline and CTA
- **About Section**: Brief company introduction with key values
- **Services Preview**: Grid of 6 main services with icons
- **Featured Projects**: Showcase of 3 major projects
- **Contact Form**: Quick contact form with company highlights

### 2. About Page (`/about`)
- **Company Story**: Detailed history and mission
- **Core Values**: 4 key principles (Strength, Elegance, Precision, Trust)
- **Timeline**: Company milestones from 2015-2024
- **FAQ Section**: Common questions about services
- **Contact CTA**: Call-to-action with contact information

### 3. Services Page (`/services`)
- **Service Details**: 6 comprehensive service descriptions
- **Feature Lists**: Detailed capabilities for each service
- **Why Choose Us**: 3 key differentiators
- **Custom Solutions CTA**: Encouragement to contact for custom needs

### 4. Projects Page (`/projects`)
- **Project Portfolio**: Grid of completed projects
- **Filter System**: Filter projects by category (Road, Lighting, Landscape, etc.)
- **Project Details**: Location, duration, team size, and features
- **Statistics**: Company achievements and metrics
- **Get Started CTA**: Encouragement to start new projects

### 5. Contact Page (`/contact`)
- **Contact Information**: Office address, phone, email, hours
- **Contact Form**: Comprehensive form with service selection
- **Map Placeholder**: Location visualization
- **FAQ**: Quick answers to common questions
- **Success Messaging**: Form submission feedback

## Components

### UI Components (`src/components/ui/`)

#### AnimatedSection
- **Purpose**: Provides scroll-triggered animations
- **Animations**: fade-in, slide-in (left/right/up/down), scale-in
- **Usage**: Wrap content to add entrance animations

#### Button
- **Variants**: primary (orange), secondary (outline), tertiary (gray)
- **Sizes**: small, medium, large
- **Features**: Icons, loading states, hover effects
- **Usage**: CTAs, form submissions, navigation

#### Card
- **Types**: ServiceCard, ProjectCard, base Card
- **Features**: Hover effects, image support, content areas
- **Usage**: Service listings, project showcases, content blocks

#### Input
- **Components**: Input, Textarea, Select
- **Features**: Labels, error states, icons, validation
- **Usage**: Contact forms, user input

### Layout Components

#### Navbar
- **Features**: Sticky positioning, scroll effects, mobile menu
- **Responsive**: Hamburger menu on mobile
- **Active States**: Current page highlighting

#### Footer
- **Sections**: Company info, quick links, contact details
- **Features**: Social media links, hover effects
- **Responsive**: Stacked layout on mobile

## Styling System

### Tailwind CSS Configuration
The project uses Tailwind CSS with custom configurations:

```css
/* Custom CSS Variables */
:root {
  --primary-orange: #ea580c;
  --primary-orange-dark: #c2410c;
  --primary-orange-light: #fed7aa;
  --secondary-yellow: #eab308;
  /* ... more variables */
}
```

### Color Palette
- **Primary**: Orange (#ea580c) - Main brand color
- **Secondary**: Yellow (#eab308) - Accent color
- **Neutral**: Gray scale (50-900) - Text and backgrounds
- **Success/Error**: Standard semantic colors

### Typography
- **Headings**: Bold, hierarchical sizing (text-4xl to text-6xl)
- **Body**: Regular weight, readable line height (1.5-1.6)
- **Font Stack**: System fonts for performance

### Responsive Design
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Approach**: Mobile-first design
- **Grid**: CSS Grid and Flexbox for layouts

## Animations & Interactions

### Scroll Animations
- **Trigger**: Intersection Observer API
- **Types**: Fade-in, slide-in from all directions, scale-in
- **Timing**: Staggered delays for sequential elements

### Hover Effects
- **Buttons**: Scale (105%), color transitions, shadow changes
- **Cards**: Scale (105%), shadow elevation, translate-y movement
- **Images**: Zoom (110%), overlay effects
- **Links**: Underline slide-in animations

### Page Transitions
- **Hero Animations**: Sequential fade-in with delays
- **Background Effects**: Slow zoom on scroll
- **Loading States**: Spinner animations for forms

### Micro-interactions
- **Icons**: Scale and color changes on hover
- **Form Focus**: Border color and glow effects
- **Success Messages**: Slide-in notifications

## How to Edit the Website

### 1. Changing Text Content
```typescript
// Example: Update hero title in HomePage.tsx
<h1 className="hero-text text-5xl md:text-7xl font-bold mb-6 leading-tight">
  Your New Title Here
</h1>
```

### 2. Adding New Services
```typescript
// In HomePage.tsx or ServicesPage.tsx, add to services array:
const services = [
  // ... existing services
  {
    icon: <YourIcon className="h-6 w-6 text-orange-600" />,
    title: 'New Service',
    description: 'Service description...',
    features: ['Feature 1', 'Feature 2'] // For ServicesPage
  }
];
```

### 3. Adding New Projects
```typescript
// In ProjectsPage.tsx, add to projects array:
const projects = [
  // ... existing projects
  {
    id: 7,
    title: 'New Project',
    category: 'Category',
    description: 'Project description...',
    image: 'https://your-image-url.com/image.jpg',
    location: 'City, Iraq',
    duration: 'X months',
    team: 'X professionals',
    features: ['Feature 1', 'Feature 2']
  }
];
```

### 4. Updating Images
Replace image URLs in the respective components:
```typescript
// Example: Update hero background
style={{
  backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(YOUR_NEW_IMAGE_URL)'
}}
```

### 5. Modifying Contact Information
Update contact details in:
- `ContactPage.tsx` - Main contact page
- `Footer.tsx` - Footer contact info
- `AboutPage.tsx` - CTA section

### 6. Customizing Colors
Modify the CSS variables in `src/index.css`:
```css
:root {
  --primary-orange: #your-new-color;
  --secondary-yellow: #your-accent-color;
}
```

## Best Practices

### Code Organization
- Keep components small and focused (under 300 lines)
- Use TypeScript for type safety
- Follow consistent naming conventions
- Separate concerns (UI, logic, data)

### Performance
- Optimize images (use appropriate formats and sizes)
- Lazy load images below the fold
- Minimize bundle size with tree shaking
- Use React.memo for expensive components

### Accessibility
- Use semantic HTML elements
- Provide alt text for images
- Ensure keyboard navigation works
- Maintain color contrast ratios

### SEO
- Update page titles in `index.html`
- Add meta descriptions
- Use proper heading hierarchy
- Include structured data for business info

### Maintenance
- Regular dependency updates
- Monitor for security vulnerabilities
- Test across different browsers and devices
- Keep documentation updated

## Deployment Guide

### Prerequisites
- Node.js 16+ installed
- Git repository set up

### Build Process
```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview production build locally
npm run preview
```

### Deployment Options

#### 1. Netlify (Recommended)
1. Connect your Git repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on git push

#### 2. Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in project directory
3. Follow prompts to deploy

#### 3. Traditional Hosting
1. Run `npm run build`
2. Upload `dist` folder contents to your web server
3. Configure server to serve `index.html` for all routes

### Environment Variables
If needed, create `.env` file for environment-specific settings:
```env
VITE_API_URL=your-api-url
VITE_CONTACT_EMAIL=your-email
```

### Domain Configuration
- Update any hardcoded URLs in the code
- Configure DNS settings with your hosting provider
- Set up SSL certificate (usually automatic with modern hosts)

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint

# Type checking
npx tsc --noEmit
```

## Support & Maintenance

For ongoing support and updates:
1. Monitor the development server for any errors
2. Test all forms and interactive elements regularly
3. Keep dependencies updated monthly
4. Backup your code regularly
5. Monitor website performance and loading speeds

---

**Last Updated**: January 2025  
**Version**: 1.0.0  
**Contact**: For technical support, refer to the project maintainer or development team.