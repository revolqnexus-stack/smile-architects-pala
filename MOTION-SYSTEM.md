# Smile Architects — Motion Design System

## Overview
Motion is a core part of the Smile Architects visual identity. This is **NOT** a collection of random animations. This is a deliberate motion language that makes the website feel fluid, organic, sophisticated, editorial, tactile, responsive, and alive.

---

## Philosophy

### Motion Should Feel
- **Fluid** — Smooth, natural transitions
- **Organic** — Botanical, gentle movement
- **Sophisticated** — Refined, intentional
- **Editorial** — Art-directed, composed
- **Tactile** — Responsive to interaction
- **Alive** — Dynamic without being distracting

### Motion Should NOT Feel
- ❌ Generic (fade-up on everything)
- ❌ Aggressive (bouncing, spinning)
- ❌ Distracting (excessive parallax)
- ❌ Template-driven (same animation everywhere)
- ❌ SaaS-blob-floating (decorative overload)

---

## Motion Tokens

### Duration
```typescript
fast: 0.15s        // UI micro-interactions
interactive: 0.3s  // Interactive elements
reveal: 0.7s       // Content reveals
hero: 1.0s         // Hero/primary reveals
organic: 10s       // Ambient botanical motion
```

### Easing
```typescript
natural: [0.4, 0, 0.2, 1]           // Natural smooth
out: [0.22, 1, 0.36, 1]             // Content entering
in: [0.4, 0, 1, 1]                  // Content leaving
inOut: [0.45, 0.05, 0.55, 0.95]     // Smooth in-out
editorial: [0.6, 0.14, 0, 1]        // Editorial reveal
```

### Spring Configurations
```typescript
gentle: { type: "spring", stiffness: 100, damping: 15 }
smooth: { type: "spring", stiffness: 80, damping: 20 }
bouncy: { type: "spring", stiffness: 200, damping: 10 }
```

---

## Motion Primitives

### 1. RevealUp
Classic content reveal with upward translation.

**Use for:**
- Section introductions
- Card reveals
- Content blocks

**Behavior:**
- Opacity: 0 → 1
- Y: 24px → 0
- Duration: 0.7s

```tsx
<RevealUp>
  <div>Content reveals from below</div>
</RevealUp>
```

### 2. RevealFade
Simple fade without translation.

**Use for:**
- Subtle reveals
- Background elements
- Supporting content

**Behavior:**
- Opacity: 0 → 1
- Duration: 0.7s

```tsx
<RevealFade delay={0.2}>
  <div>Content fades in</div>
</RevealFade>
```

### 3. RevealScale
Scale + fade reveal for cards and images.

**Use for:**
- Cards
- Images
- Featured elements

**Behavior:**
- Opacity: 0 → 1
- Scale: 0.95 → 1
- Duration: 0.7s

```tsx
<RevealScale>
  <div className="card">Card scales in</div>
</RevealScale>
```

### 4. ImageReveal
Masked image reveal with scale effect.

**Use for:**
- Hero images
- Feature images
- Editorial photography

**Behavior:**
- Container clips inward
- Image scales from 1.06 → 1
- Duration: 0.7s

```tsx
<ImageReveal delay={0.3}>
  <img src="/clinic.jpg" alt="Clinic" />
</ImageReveal>
```

### 5. HorizontalReveal
Enter from side.

**Use for:**
- Timeline elements
- Side-by-side content
- Directional emphasis

**Behavior:**
- Opacity: 0 → 1
- X: -20px → 0
- Duration: 0.7s

```tsx
<HorizontalReveal>
  <div>Content slides in from left</div>
</HorizontalReveal>
```

---

## Staggered Reveals

### StaggerContainer + StaggerItem
Sequential reveals for lists and grids.

**Use for:**
- Treatment cards
- Doctor profiles
- Feature lists

**Stagger Options:**
- `fast` — 50ms between items
- `normal` — 100ms between items (default)
- `slow` — 150ms between items
- `editorial` — 120ms with 200ms initial delay

```tsx
<StaggerContainer stagger="normal">
  {items.map(item => (
    <StaggerItem key={item.id}>
      <Card>{item.content}</Card>
    </StaggerItem>
  ))}
</StaggerContainer>
```

---

## Hero Entrance Sequence

The homepage hero has a **designed entrance sequence** with precise timing:

### Timing
1. **Eyebrow** (delay: 0.1s, duration: 0.4s)
2. **Headline lines** (delay: 0.2s, stagger: 0.1s per line, duration: 0.8s)
3. **Body text** (delay: 0.5s, duration: 0.6s)
4. **CTA buttons** (delay: 0.7s, duration: 0.5s)
5. **Hero visual** (delay: 0.4s, duration: 1.0s)
6. **Accent card** (delay: 0.9s, duration: 0.6s)

### Usage
```tsx
<HeroSection
  eyebrow="Pala · Kottayam · Kerala"
  headlineLines={["Multispeciality", "Dental Care", "in Pala"]}
  accentLine="Dental Care"
  body="..."
  primaryCTA={{ text: "Book", href: "/book" }}
  secondaryCTA={{ text: "Call", href: "tel:..." }}
  metaItems={[...]}
/>
```

### Typography Reveals
```tsx
<TextStagger>
  <TextLine>Line 1</TextLine>
  <TextLine>Line 2</TextLine>
  <TextLine>Line 3</TextLine>
</TextStagger>
```

---

## Organic Motion

### OrganicFloat
Subtle botanical floating motion for decorative elements.

**Use for:**
- Background gradients
- Decorative shapes
- Ambient elements

**Behavior:**
- Y: 0 → -15px → 0
- X: 0 → 10px → 0
- Duration: 12s
- Repeat: Infinite

```tsx
<OrganicFloat>
  <div className="decorative-gradient" />
</OrganicFloat>
```

### OrganicRotate
Gentle rotation for shapes.

**Behavior:**
- Rotate: 0 → 2deg → -2deg → 0
- Duration: 15s
- Repeat: Infinite

```tsx
<OrganicRotate>
  <div className="botanical-shape" />
</OrganicRotate>
```

**IMPORTANT:** Very subtle. Think "sunlight moving through leaves" NOT "SaaS blobs floating."

---

## Hover Interactions

### HoverScale
Element scales on hover.

**Types:**
- `button` — Scale 1.02, tap 0.98
- `card` — Y: -4px
- `image` — Scale 1.05

```tsx
<HoverScale type="button">
  <Link href="/treatments" className="btn">
    View Treatments
  </Link>
</HoverScale>

<HoverScale type="card">
  <div className="card-treatment">
    Treatment content
  </div>
</HoverScale>
```

### HoverArrow
Arrow moves on hover.

**Behavior:**
- X: 0 → 4px
- Duration: 150ms

```tsx
<span>
  Learn more <HoverArrow>→</HoverArrow>
</span>
```

---

## Viewport Configuration

Motion reveals trigger when elements enter viewport:

```typescript
default: { once: true, amount: 0.2 }    // 20% visible
partial: { once: true, amount: 0.3 }    // 30% visible
full: { once: true, amount: 0.8 }       // 80% visible
immediate: { once: true, amount: 0.1 }  // 10% visible
```

**Note:** `once: true` means animation plays once. Elements don't re-animate on scroll.

---

## Reduced Motion Support

### Accessibility First
All motion respects `prefers-reduced-motion`:

```typescript
// Automatic in all motion components
if (prefersReducedMotion()) {
  return { duration: 0.01 };
}
```

### When Reduced Motion Enabled
- ✅ Parallax disabled
- ✅ Organic infinite motion disabled
- ✅ Transforms minimized
- ✅ Content immediately visible
- ✅ State transitions retained

The site remains **completely usable** with reduced motion.

---

## Performance Guidelines

### DO
✅ Use `transform` and `opacity` (GPU-accelerated)
✅ Use `clip-path` for reveals
✅ Isolate animations in Client Components
✅ Keep Server Components for non-interactive content
✅ Use Intersection Observer via Framer Motion
✅ Respect `once: true` for scroll animations

### DO NOT
❌ Animate `width` or `height` unnecessarily
❌ Animate expensive layout properties
❌ Attach dozens of scroll listeners
❌ Turn every component into Client Component
❌ Create huge JavaScript animation systems

---

## Common Patterns

### Section with Header + Grid
```tsx
<section>
  <RevealUp>
    <div className="section-header">
      <h2>Section Title</h2>
      <p>Description</p>
    </div>
  </RevealUp>
  
  <StaggerContainer stagger="normal">
    {items.map(item => (
      <StaggerItem key={item.id}>
        <HoverScale type="card">
          <Card>{item}</Card>
        </HoverScale>
      </StaggerItem>
    ))}
  </StaggerContainer>
</section>
```

### Two-Column Feature
```tsx
<section>
  <div className="grid grid-cols-2">
    <RevealUp>
      <div className="content">
        <h2>Feature Title</h2>
        <p>Description</p>
        <HoverScale type="button">
          <Link href="/feature" className="btn">
            Learn More
          </Link>
        </HoverScale>
      </div>
    </RevealUp>
    
    <ImageReveal delay={0.2}>
      <img src="/feature.jpg" alt="Feature" />
    </ImageReveal>
  </div>
</section>
```

### CTA with Button Hover
```tsx
<HoverScale type="button">
  <Link href="/book" className="btn btn-primary">
    Book Appointment
  </Link>
</HoverScale>
```

---

## File Structure

```
src/
├── lib/
│   └── motion.ts                      # Motion tokens, primitives, utilities
├── components/
│   ├── motion/
│   │   └── MotionComponents.tsx       # Reusable animated components
│   └── sections/
│       └── HeroSection.tsx            # Hero with entrance sequence
└── app/
    └── page.tsx                       # Homepage with animations
```

---

## Implementation Checklist

### Homepage ✅
- [x] Hero entrance sequence
- [x] Staggered treatment cards
- [x] Section reveals
- [x] Image reveals
- [x] Hover interactions
- [x] Organic background motion
- [x] Button hover states

### Navigation
- [ ] Nav items reveal on load
- [ ] Dropdown smooth transitions
- [ ] Mobile menu stagger
- [ ] Scroll background transition

### Treatment Pages
- [ ] Title reveals
- [ ] Content section animations
- [ ] Related treatments stagger
- [ ] Image reveals

### Doctor Pages
- [ ] Portrait reveal
- [ ] Info stagger
- [ ] Credentials animation

### Global
- [x] Button hover states
- [x] Card hover states
- [x] Reduced motion support
- [x] Performance optimization

---

## Acceptance Test

After implementation, verify:

1. ✅ Hard refresh homepage
2. ✅ Watch entire hero entrance
3. ✅ Scroll slowly through homepage
4. ✅ Hover navigation
5. ✅ Hover buttons
6. ✅ Hover treatment cards
7. [ ] Open mobile menu
8. [ ] Navigate between pages
9. [ ] Open treatment page
10. [ ] Open doctor page
11. [ ] Test reduced-motion preference

### Success Criteria
- Hero entrance feels editorial and composed
- Scroll reveals feel intentional
- Hover states are responsive
- Motion enhances rather than distracts
- Performance is excellent
- Reduced motion works perfectly

### Failure Indicators
❌ Only generic fade-ups visible
❌ Everything appears simultaneously
❌ Motion feels random or template-driven
❌ Performance issues
❌ Reduced motion not working

---

## Motion Library

Using **Framer Motion** for production-grade animations:
- Declarative API
- GPU-accelerated
- Accessibility built-in
- Server Component compatible
- Excellent performance

```bash
npm install framer-motion
```

---

## Next Steps

### Immediate
1. Add navigation animations
2. Add mobile menu stagger
3. Add page transitions
4. Complete doctor page animations
5. Complete treatment page animations

### Future Enhancements
1. Scroll-driven horizontal showcases
2. Progress indicators for long pages
3. Micro-interactions for forms
4. Advanced parallax for editorial sections
5. Cursor-responsive elements (desktop)

---

**The motion system is now live. The website should feel dramatically more premium, editorial, and alive.**

Build status: ✅ **PASSING**
