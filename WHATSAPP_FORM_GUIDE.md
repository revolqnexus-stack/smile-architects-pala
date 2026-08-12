# WhatsApp Form Integration Guide

## Overview
The Smile Architects website now has a perfect WhatsApp CTA form that respects proper light/dark color contrast and provides an excellent user experience.

## Components Created

### 1. **WhatsAppForm Component** (`src/components/ui/WhatsAppForm.tsx`)
A reusable component for WhatsApp appointment booking that automatically:
- Pre-fills WhatsApp messages with form data
- Opens WhatsApp Web/App with the pre-formatted message
- Tracks GA4 conversion events
- Supports both light and dark mode rendering

#### Features:
- **Dark Mode Support**: `darkMode={true}` prop renders with white text on dark backgrounds
- **Visible Form Fields**: 
  - White text (#ffffff) on dark backgrounds
  - Jonquil (#EAC800) accent color for labels
  - Light opacity backgrounds with blur effect
- **Smart Contrast**: 
  - Light backgrounds = Dark Moss text
  - Dark backgrounds = White text with Jonquil accents
- **Touch-Friendly**: 44px+ minimum touch targets on all inputs
- **WhatsApp Green Button**: Official #25D366 color with hover effects

#### Color System:
```
Dark Mode (on green backgrounds):
- Text: #ffffff (white)
- Labels: #EAC800 (Jonquil)
- Borders: rgba(255, 255, 255, 0.25)
- Input BG: rgba(255, 255, 255, 0.15)
- Focus: #EAC800 (Jonquil)

Light Mode (on white backgrounds):
- Text: var(--color-dark-moss)
- Labels: var(--color-olive)
- Borders: var(--color-tea-green)
- Input BG: #ffffff
- Focus: var(--color-olive)
```

## Integration

### Book Appointment Page (`src/app/book-appointment/page.tsx`)
The WhatsApp form is featured in a **dedicated "Quick WhatsApp Booking" section** with:

1. **Left Column - Benefits**:
   - "Fastest Way to Book" eyebrow
   - Large headline: "Book instantly via WhatsApp"
   - 3 key benefits with check icons
   - Proper mobile-responsive layout

2. **Right Column - Form**:
   - Dark Moss Green background
   - Semi-transparent white glass effect with backdrop blur
   - Pre-filled appointment request form
   - WhatsApp green button

### Mobile Responsive
- Mobile-first design with `grid-template-columns: repeat(auto-fit, minmax(min(100%, 480px), 1fr))`
- Stacks vertically on tablets
- Full width on mobile phones
- All buttons and inputs are 44px+ touch targets

## Form Fields

1. **Your Name** * (required)
2. **Phone Number** * (required)
3. **Treatment** (optional)
   - General Dentistry
   - Orthodontics
   - Dental Implants
   - Cosmetic Dentistry
   - Root Canal Treatment
   - Braces
   - Clear Aligners
   - Emergency / Pain
   - General Check-up
   - Other

4. **Preferred Date** (optional) - date picker
5. **Additional Notes** (optional) - text area

## WhatsApp Message Format

When submitted, generates a formatted WhatsApp message:

```
Hi! I'd like to book an appointment at Smile Architects.

*Name:* [User Name]
*Phone:* [User Phone]
*Treatment:* [Selected Treatment] (if provided)
*Preferred Date:* [Date] (if provided)
*Additional Notes:* [Message] (if provided)
```

## Accessibility

- All form labels use proper `<label>` elements
- ARIA labels on buttons
- Focus indicators visible (Jonquil border + box-shadow)
- Touch-friendly form with 44px+ minimum targets
- Semantic HTML structure

## CSS Classes

Added utility classes for dark mode forms:
- `.dark-mode` - Applied to inputs for dark background styling
- Hover/focus states for all interactive elements
- Mobile-specific touch states

## Testing Checklist

- [ ] Form labels are visible (white text on dark)
- [ ] Input fields have proper contrast
- [ ] WhatsApp button is clearly visible (green)
- [ ] Form submits and opens WhatsApp correctly
- [ ] WhatsApp message is properly formatted
- [ ] Mobile layout stacks properly
- [ ] Touch targets are 44px+
- [ ] Focus states are visible
- [ ] GA4 tracking works

## Usage Examples

### Dark Mode (Recommended for green sections):
```tsx
<WhatsAppForm darkMode={true} heading="Quick WhatsApp Booking" />
```

### Light Mode (For white/light sections):
```tsx
<WhatsAppForm darkMode={false} heading="Book via WhatsApp" />
```

### Custom Heading:
```tsx
<WhatsAppForm darkMode={true} heading="Start Your Journey" />
```

## Color Reference

| Color | Hex | Usage |
|-------|-----|-------|
| Dark Moss | #254E06 | Primary backgrounds, text on light |
| Olive | #7E8407 | Secondary accents, labels on light |
| Jonquil | #EAC800 | Highlights, labels on dark, focus states |
| White | #ffffff | Text on dark backgrounds |
| Honeydew | #ECF5E2 | Light backgrounds |
| Tea Green | #D7E3A4 | Card backgrounds, light borders |

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- WhatsApp Web on desktop
- WhatsApp App on mobile (automatic fallback)

## Notes

- WhatsApp phone number is pulled from `CLINIC.contact.phone` via site config
- All messages are URL-encoded for proper WhatsApp transmission
- Forms reset after submission
- GA4 events track treatment selection for analytics
