# SparklePro Cleaning Services

A single-page website for a fictional cleaning company, built to convert visitors
into booking enquiries. White + light-blue theme, minimal and premium, no build
step — open `index.html` directly, or run the optional local server.

```
npm install
npm start          # http://localhost:3000
```

## Files

```
index.html    all sections: hero, services, booking, how it works, why us,
              before/after, pricing, testimonials, gallery, areas, contact
styles.css    theme tokens, layout, components, responsive + reduced-motion rules
script.js     sticky nav, mobile menu, scroll spy, before/after sliders, lightbox,
              booking + contact form validation, reveals
```

No frameworks and no bundler. The only dependency is `serve`, for local preview.

## Sections

Hero · Services · Book a Cleaning · How It Works · Why Choose Us · Before & After
(drag-to-compare sliders) · Pricing (illustrative) · Testimonials · Gallery
(click any image for a lightbox) · Service Areas · Contact · Footer, plus floating
WhatsApp and call buttons.

## Replacing the placeholders

Everything is dummy content, ready to swap:

- **Photos** — direct Unsplash URLs on each `<img src>` and gallery `data-src`.
- **Contact details** — phone `+91 98765 43210`, `hello@sparkleproclean.com`, and
  the Kadri Road address appear in the contact section, footer and floating buttons.
- **WhatsApp** — the `wa.me` links use the same dummy number, with a pre-filled message.
- **Instagram** — the Instagram links in the contact section and footer are placeholders.
- **Prices** — illustrative demo pricing in the pricing section.
- **Map** — the service-areas section uses a styled placeholder, not a live embed.

## Notes

- Smooth scrolling and `scroll-padding-top` keep anchored sections clear of the sticky header.
- The before/after sliders are keyboard accessible (focus the slider and use arrow keys).
- Sections reveal on scroll via `IntersectionObserver`.
- `prefers-reduced-motion` disables the animations.
