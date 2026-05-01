---
name: tailwind-css-patterns
description: Provides BEM-first styling patterns for Tailwind CSS projects, including semantic component structure, responsive design, layout utilities, spacing, typography, colors, and modern CSS best practices. Use when styling React/Vue/Svelte components, building responsive layouts, implementing design systems, or optimizing CSS workflow. Prefer @apply when it maps cleanly to reusable Tailwind utilities, and use raw CSS for variables or other non-utility cases.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# Tailwind CSS Development Patterns

Expert guide for building modern, responsive user interfaces with BEM-first component styling in Tailwind CSS projects. Covers v4.1+ features including CSS-first configuration, custom utilities, and enhanced developer experience.

## Overview

Provides actionable patterns for responsive, accessible UIs with Tailwind CSS v4.1+. Covers BEM component structure, dark mode, component patterns, and performance optimization. Component styling examples use BEM selectors, with @apply used where it improves reuse and plain CSS used for variable-driven or non-utility values.

## When to Use

- Styling React/Vue/Svelte components
- Building responsive layouts and grids
- Implementing design systems
- Adding dark mode support
- Optimizing CSS workflow

## Quick Reference

### Responsive Breakpoints

| Prefix | Min Width | Description   |
| ------ | --------- | ------------- |
| `sm:`  | 640px     | Small screens |
| `md:`  | 768px     | Tablets       |
| `lg:`  | 1024px    | Desktops      |
| `xl:`  | 1280px    | Large screens |
| `2xl:` | 1536px    | Extra large   |

### Common Patterns

```html
<!-- Center content -->
<section class="page-shell page-shell--centered">
  <div class="page-shell__content">Content</div>
</section>

<!-- Responsive grid -->
<section class="feature-grid feature-grid--responsive">
  <!-- Items -->
</section>

<!-- Card component -->
<article class="card card--elevated">
  <h3 class="card__title">Title</h3>
  <p class="card__description">Description</p>
</article>
```

## Instructions

1. **Start Mobile-First**: Write base styles for mobile, add responsive prefixes (`sm:`, `md:`, `lg:`) for larger screens
2. **Use Design Tokens**: Leverage Tailwind's spacing, color, and typography scales for shared theme values
3. **Style with BEM**: Put visual styling in BEM selectors such as `.card`, `.card__title`, and `.card--featured`
4. **Use @apply Selectively**: Apply Tailwind utility bundles inside BEM selectors when the declaration maps cleanly to existing utilities
5. **Use Raw CSS for Exemptions**: Prefer plain CSS for custom properties, variables, `calc()`-heavy rules, complex gradients, and any value Tailwind cannot express cleanly
6. **Extract Components**: Create reusable BEM component classes for repeated patterns
7. **Configure Theme**: Customize design tokens in `tailwind.config.js` or using `@theme`
8. **Verify Changes**: Test at each breakpoint using DevTools responsive mode. Check for visual regressions and accessibility issues before committing.

## Examples

### Responsive Card Component

```tsx
function ProductCard({ product }: { product: Product }) {
  return (
    <article className={`product-card${product.featured ? ' product-card--featured' : ''}`}>
      <img className="product-card__image" src={product.image} alt={product.name} />
      <div className="product-card__body">
        <h3 className="product-card__title">{product.name}</h3>
        <button className="product-card__button">Add to Cart</button>
      </div>
    </article>
  )
}
```

### BEM Component Styles

```vue
<template>
  <article class="feature-card feature-card--featured">
    <h3 class="feature-card__title">Title</h3>
    <p class="feature-card__description">Description</p>
  </article>
</template>

<style scoped>
.feature-card {
  @apply rounded-2xl bg-white p-6 shadow-lg;
}

.feature-card__title {
  @apply text-xl font-semibold;
}

.feature-card__description {
  @apply mt-3 text-gray-700;
}

.feature-card--featured {
  @apply ring-1 ring-cyan-400;
}
</style>
```

### Form Input

```html
<input class="form-field" placeholder="you@example.com" />
```

## Best Practices

1. **Consistent Spacing**: Use Tailwind's spacing scale (4, 8, 12, 16, etc.)
2. **Color Palette**: Stick to Tailwind's color system for consistency
3. **Component Extraction**: Extract repeated patterns into reusable BEM components
4. **BEM Hooks**: Use BEM-style classes as the only styling surface for components
5. **Semantic HTML**: Use proper HTML elements with BEM classes
6. **Performance**: Ensure content paths include all template files for optimal purging
7. **Accessibility**: Include focus styles, ARIA labels, and respect user preferences (reduced-motion)

## BEM Configuration

Use BEM for all component styling. Keep visual rules in block, element, and modifier selectors, and use `@apply` inside those selectors when it is a clean fit. Use raw CSS for variables, custom properties, `calc()`, gradients, and other values that Tailwind does not express well.

### Naming Rules

- **Block**: the standalone component, for example `feature-card`
- **Element**: a dependent part of the block, for example `feature-card__title`
- **Modifier**: a variation of the block or element, for example `feature-card--featured`

### Usage Pattern

```vue
<template>
  <article class="feature-card feature-card--featured">
    <h3 class="feature-card__title">Title</h3>
    <p class="feature-card__description">Description</p>
  </article>
</template>

<style scoped>
.feature-card {
  --feature-card-accent: #06b6d4;
  @apply rounded-2xl bg-white p-6 shadow-lg;
  border-color: var(--feature-card-accent);
}

.feature-card__title {
  @apply text-lg font-semibold;
}

.feature-card--featured {
  @apply ring-2 ring-cyan-400;
}
</style>
```

### Configuration Notes

- Use BEM class names when a component needs readable, durable selectors
- Keep BEM selectors as the styling surface, but apply Tailwind utilities with `@apply` inside the CSS when that keeps the rule set concise
- Avoid `@apply` for custom properties, CSS variables, or values Tailwind cannot represent cleanly
- When a declaration depends on variables or dynamic calculations, keep that specific rule in raw CSS and apply utilities only to the surrounding stable styles
- Keep modifier classes boolean or variant-driven instead of encoding layout details into the name

## Troubleshooting

### Classes Not Applying

- **Check content paths**: Ensure all template files are included in `content: []` in config
- **Verify build**: Run `npm run build` to regenerate purged CSS
- **Dev mode**: Use `npx tailwindcss -o` with `--watch` flag for live updates

### Responsive Styles Not Working

- **Order matters**: Responsive prefixes must come before non-responsive (e.g., `md:flex` not `flex md:flex`)
- **Check breakpoint values**: Verify breakpoints match your design requirements
- **DevTools**: Use browser DevTools responsive mode to test at each breakpoint

### BEM Naming Issues

- **Block names**: Use a single, stable block name per component
- **Elements**: Keep element names scoped to the block, not the app shell
- **Modifiers**: Use a `--modifier` suffix for variants instead of ad hoc class names
- **No Utility Drift**: Do not add Tailwind utilities to component templates when the component is styled with BEM; prefer `@apply` inside the CSS when you want utility-backed declarations

### Dark Mode Issues

- **Verify config**: Ensure `darkMode: 'class'` or `'media'` is set correctly
- **Toggle implementation**: Use `document.documentElement.classList.toggle('dark')` for class strategy
- **Initial flash**: Add `dark` class to `<html>` before body renders

## Constraints and Warnings

- **Class Proliferation**: Long class strings reduce readability; extract into components
- **Content Paths**: Misconfigured paths cause classes to be purged in production
- **Arbitrary Values**: Use sparingly; prefer design tokens for consistency
- **Specificity Issues**: Avoid `@apply` with complex selectors
- **Dark Mode**: Requires correct configuration (`class` or `media` strategy)
- **Browser Support**: Check Tailwind docs for compatibility notes

## References

- **[references/layout-patterns.md](references/layout-patterns.md)** — Flexbox, grid, spacing, typography, colors
- **[references/component-patterns.md](references/component-patterns.md)** — Cards, navigation, forms, modals, React patterns
- **[references/responsive-design.md](references/responsive-design.md)** — Responsive patterns, dark mode, container queries
- **[references/animations.md](references/animations.md)** — Transitions, transforms, built-in animations, motion preferences
- **[references/performance.md](references/performance.md)** — Bundle optimization, CSS optimization, production builds
- **[references/accessibility.md](references/accessibility.md)** — Focus management, screen readers, color contrast, ARIA
- **[references/configuration.md](references/configuration.md)** — CSS-first config, JavaScript config, plugins, presets
- **[references/reference.md](references/reference.md)** — Additional reference materials

## External Resources

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Tailwind UI](https://tailwindui.com)
- [Tailwind Play](https://play.tailwindcss.com)
