# BluePeak Builders

A single-page website for a fictional construction company. Light-blue and white
theme, minimal and premium, no build step — open `index.html` directly, or run the
optional local server.

```
npm install
npm start          # http://localhost:3000
```

## Files

```
index.html    all sections: hero, about, projects, why us, testimonials, gallery, contact
styles.css    theme tokens, layout, components, responsive + reduced-motion rules
script.js     sticky nav, mobile menu, scroll spy, project tabs, lightbox, form validation, reveals
```

No frameworks and no bundler. The only dependency is `serve`, for local preview.

## Sections

Hero · About · Projects (Completed / Ongoing tabs) · Why Choose Us · Testimonials ·
Gallery (click any image for a lightbox) · Location & Contact · Footer, plus a
floating WhatsApp button.

## Replacing the placeholders

Everything is dummy content, ready to swap:

- **Photos** — `builder` images are direct Unsplash URLs on each `<img src>`.
  Gallery items also carry a higher-resolution `data-src` used by the lightbox.
- **Contact details** — phone `+91 98765 43210`, `hello@bluepeakbuilders.com`, and
  the office address appear in the contact section and footer.
- **WhatsApp** — the `wa.me` links use the same dummy number.
- **Social** — the Instagram link in the footer is a placeholder.
- **Map** — the contact section uses a styled placeholder, not a live embed.

## Notes

- Smooth scrolling and `scroll-padding-top` keep anchored sections clear of the sticky header.
- Sections reveal on scroll via `IntersectionObserver`.
- `prefers-reduced-motion` disables the animations.
