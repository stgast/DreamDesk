# Design System Specification: The Weightless Framework

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Digital Architect."** This system is not merely a collection of UI elements; it is a high-end, editorial environment designed to feel like a premium hardware configurator. We move away from the rigid "boxed-in" web and toward a fluid, weightless experience.

By leveraging intentional asymmetry, overlapping layers, and generous whitespace, we break the "template" aesthetic. The goal is to make the user feel as though they are interacting with a physical piece of glass and light. Every interaction should feel intentional, airy, and "pro."

---

## 2. Colors & Surface Logic
The palette is rooted in sophisticated neutrals, using vibrant "Google-style" accents only to denote high-value interaction or status.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning or layout containment. Structural boundaries must be defined solely through background color shifts. Use `surface-container-low` against a `surface` background to create a section. Contrast is our architect, not lines.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of frosted glass.
- **Base Level:** `surface` (#121318) or `background`.
- **Low Priority Content:** `surface-container-low` (#1a1b20).
- **Standard Cards/Sections:** `surface-container` (#1e1f24).
- **Prominent "Lifted" Elements:** `surface-container-high` (#292a2f) or `highest`.

### The "Glass & Gradient" Rule
To achieve a "hardware configurator" feel, use **Glassmorphism** for floating panels (e.g., sidebars, navigation docks).
- **Effect:** Apply `surface` at 70% opacity with a 20px-32px Backdrop Blur.
- **Signature Textures:** For Primary CTAs, use a linear gradient from `primary` (#adc6ff) to `primary_container` (#4d8efe) at a 135-degree angle. This adds a "soul" to the component that a flat hex code cannot replicate.

---

## 3. Typography
We utilize a dual-font strategy to balance technical precision with modern editorial flair.

*   **Display & Headlines (Plus Jakarta Sans):** Chosen for its geometric clarity and "tech-forward" personality. Use `display-lg` for hero moments with slightly tightened tracking (-0.02em) to create an authoritative, premium look.
*   **Body & Labels (Inter):** Highly legible and neutral. Use generous letter spacing (0.01em to 0.02em) on `body-md` and `label-sm` to maintain the "airy" vibe.

**Hierarchy as Identity:** 
High contrast in scale is mandatory. A `display-lg` headline should often sit near a `label-md` or `body-sm` metadata point to create a sophisticated, unbalanced layout that feels custom-built rather than a standard grid.

---

## 4. Elevation & Depth
In this design system, depth is a function of **Tonal Layering** and light, not artificial structure.

*   **The Layering Principle:** Avoid shadows for static content. Achieve lift by nesting colors (e.g., a `surface-container-lowest` card placed on a `surface-container-low` section). This creates a "soft" natural lift.
*   **Ambient Shadows:** For floating elements (Modals, Hovered Cards), use extra-diffused shadows. 
    *   *Values:* `0px 24px 48px rgba(0, 0, 0, 0.08)`. The shadow must feel like ambient light blockage, not a dark smudge.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility, use the `outline-variant` token at **15% opacity**. 100% opaque borders are strictly forbidden as they "anchor" the design too heavily to the screen.
*   **Backdrop Blur:** Use blurs on all overlays to ensure the background "bleeds through," making the UI feel integrated and holistic.

---

## 5. Components

### Buttons
*   **Primary:** Pill-shaped (`rounded-full`). Gradient fill (`primary` to `primary_container`). No border. White text (`on_primary`).
*   **Secondary:** Pill-shaped. Background: `surface-container-high`. Subtle `outline-variant` (15% opacity).
*   **Tertiary:** Ghost style. No background. Label uses `primary` color. High-emphasis on hover through a subtle `surface-variant` background shift.

### Cards
*   **Rule:** Forbid divider lines. Use `md` (1.5rem) or `lg` (2rem) corner radius.
*   **Interaction:** On hover, a card should transition from `surface-container` to `surface-container-high` with a subtle 4% ambient shadow.

### Input Fields
*   **Style:** Subtle `surface-container-lowest` fills. 
*   **States:** The focus state should not be a heavy border; use a 2px `primary` glow or a subtle background transition to `surface-bright`.

### Selection Chips
*   **Vibe:** Pill-shaped. Unselected: `surface-container-high`. Selected: `primary` background with `on_primary` text.

### The "Configurator" Dock (Unique Component)
A floating, glassmorphic navigation or tool bar anchored to the bottom of the viewport. Uses `surface` at 60% opacity with a heavy `32px` blur and a `rounded-xl` (3rem) radius.

---

## 6. Do’s and Don’ts

### Do:
*   **Embrace Asymmetry:** Align text to the left while keeping imagery or data visualizations slightly offset to the right.
*   **Use Generous Spacing:** If you think there is enough whitespace, add 16px more. The system relies on "breathability."
*   **Tint Your Neutrals:** Use `on_surface_variant` for secondary text to keep the "deep charcoal" sophisticated tone.

### Don’t:
*   **Don't use 100% Black:** Never use `#000000`. Use `surface_container_lowest` (#0d0e13) to maintain depth in dark mode.
*   **Don't use Hard Corners:** Avoid `none` or `sm` roundedness unless it's for a technical data grid.
*   **Don't use Dividers:** If you need to separate content, use a 32px or 48px gap instead of a line.