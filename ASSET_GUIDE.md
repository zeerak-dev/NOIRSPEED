# NoirSpeed — Asset Guide

> Drop the right files in the right folders with the right names.
> The website handles everything else automatically.

---

## TL;DR

1. For each car, you need **5 images** (hero, front, side, rear, interior).
2. Use the exact filenames listed in this guide.
3. Put each file inside its matching folder under `public/cars/<slug>/`.
4. Reload the page — it appears.
5. If a file isn't there yet, the site shows a premium "Image coming soon" placeholder. Nothing breaks.

---

## 1. Image rules

### Quality
- **Minimum width:** 1600px
- **Recommended:** 1920px or wider
- Start as JPG / PNG, then **convert to `.webp`** (smaller, sharper, faster).
- ❌ No blurry, watermarked, low-quality wallpaper, or random-website-logo images.
- ❌ No copyrighted images grabbed from the internet without rights.

### Suggested angles
| Type      | What it looks like                  | Use on site                |
|-----------|-------------------------------------|----------------------------|
| `hero`    | Wide cinematic 21:9 / 16:9, dark mood | Hero banner on detail page |
| `front`   | Headlight-forward, slight angle     | Card thumbnail / gallery   |
| `side`    | Pure side profile                   | Specs page / gallery       |
| `rear`    | Rear three-quarter, taillights on   | Gallery                    |
| `interior`| Driver-seat / dash / steering wheel | Gallery / detail page      |
| `gallery-1` *(optional)* | Anything cinematic | Extra gallery slot         |

### Free WebP converter
- [squoosh.app](https://squoosh.app) — drag in JPG/PNG → pick "WebP" → save. Done.

---

## 2. Naming convention

Each car has a **short name** used in its filenames, and a **slug** used for its folder.

| Folder (`public/cars/<slug>/`)            | File prefix (`<short>`) |
|-------------------------------------------|-------------------------|
| `koenigsegg-jesko-absolut/`               | `jesko`                 |
| `bugatti-chiron-super-sport-300/`         | `chiron-ss`             |
| `bugatti-bolide/`                         | `bolide`                |
| `rimac-nevera/`                           | `nevera`                |
| `ferrari-sf90-stradale/`                  | `sf90`                  |
| `ferrari-daytona-sp3/`                    | `daytona-sp3`           |
| `lamborghini-revuelto/`                   | `revuelto`              |
| `mclaren-speedtail/`                      | `speedtail`             |
| `porsche-911-gt3-rs/`                     | `gt3-rs`                |
| `pagani-utopia/`                          | `utopia`                |
| `aston-martin-valkyrie/`                  | `valkyrie`              |
| `mercedes-amg-one/`                       | `amg-one`               |

### Filename pattern (per car folder)
```
<short>-hero.webp
<short>-front.webp
<short>-side.webp
<short>-rear.webp
<short>-interior.webp
<short>-gallery-1.webp    (optional)
<short>-gallery-2.webp    (optional)
```

### Example — Koenigsegg Jesko Absolut
```
public/cars/koenigsegg-jesko-absolut/jesko-hero.webp
public/cars/koenigsegg-jesko-absolut/jesko-front.webp
public/cars/koenigsegg-jesko-absolut/jesko-side.webp
public/cars/koenigsegg-jesko-absolut/jesko-rear.webp
public/cars/koenigsegg-jesko-absolut/jesko-interior.webp
public/cars/koenigsegg-jesko-absolut/jesko-gallery-1.webp
```

> ⚠️ Filenames are case-sensitive on deploy (Vercel, Netlify). Always lowercase.

---

## 3. Loading video

The loading screen looks for this file:

```
public/videos/loading-car.webm
```

If it isn't there, the loading screen automatically shows a premium animated dark fallback — the site still works.

### Loading video specs
- **Duration:** 4–6 seconds
- **Format:** `.webm` preferred · `.mp4` backup
- **Resolution:** 1920×1080
- **File size:** under 5 MB if possible
- **No text · no logo · no people · no watermark**
- Dark cinematic mood, premium automotive commercial style

### AI video generation prompt (copy-paste this)

> Create a premium cinematic 5-second video for a luxury racing car website loading screen. Scene: a black futuristic hypercar inside a dark luxury tunnel. The car headlights are glowing. Smoke and mist move around the car. Red and champagne gold neon reflections appear on a glossy black floor. The camera slowly pushes toward the car from the front. The mood is dark, premium, cinematic, high contrast, ultra-realistic automotive commercial style. No text, no logo, no people, no watermark, no extra objects.

---

## 3b. Homepage hero image (most important file!)

The homepage hero is a **single large image of the Koenigsegg Jesko Absolut** — the fastest car in the roster. It's already wired to:

```
public/cars/koenigsegg-jesko-absolut/jesko-hero.webp
```

This is the same `jesko-hero.webp` from section 2 — it powers **both** the homepage hero AND the Jesko detail page. Add this file first if you're adding only one image.

### Hero image specs
- **Aspect:** Landscape — wide cinematic 16:9 / 21:9 / 2:1
- **Minimum width:** 1920px (wider is better — 2560px+ is ideal for retina screens)
- **Format:** `.webp` (or `.jpg` / `.png` first, then convert)
- **Mood:** Dark, dramatic, side or rear three-quarter angle
- **No text · no logos · no watermark**

### AI image generation prompt (copy-paste this)

> An ultra-realistic cinematic photograph of a Koenigsegg Jesko Absolut hypercar parked in a dramatic dark setting — wet asphalt, low-key lighting, neon red and champagne gold rim lighting glinting off the carbon fiber bodywork, deep shadows, golden hour ambient light, rear three-quarter angle, sharp focus on the car. Luxury automotive commercial style, super high contrast, deep blacks, ultrawide cinematic crop, no text, no logo, no watermark.

Recommended tools: Midjourney v6+, Flux Pro, DALL-E 3, or commission a real photographer.

If the file is missing, the SafeImage placeholder shows a luxury "Image coming soon" card with the brand name — the hero layout still works.

---

## 4. 3D model (optional, future)

Earlier the homepage hero supported a 3D model viewer (`/public/models/jesko.glb`). The current hero uses a still image instead, but a future Jesko detail page could reactivate the 3D viewer. If you ever want it:

- File location: `public/models/jesko.glb`
- Format: binary glTF, under 8 MB, under 200k polygons
- Source: [Sketchfab](https://sketchfab.com) → filter "Downloadable" + commercial license, OR commission a custom model

> ⚠️ Do **not** embed third-party Sketchfab iframes — always **download the `.glb`** and place it locally.

---

## 5. Brand logos

```
public/brands/<brand-name>.webp
```

The Brands page will use these. Suggested filenames:

- `koenigsegg.webp`
- `bugatti.webp`
- `rimac.webp`
- `ferrari.webp`
- `lamborghini.webp`
- `mclaren.webp`
- `porsche.webp`
- `pagani.webp`
- `aston-martin.webp`
- `mercedes-amg.webp`

Use **white/monochrome SVG-style logos on transparent background** if possible (cleanest on a dark theme). Save as `.webp` to keep loading instant.

---

## 6. Fallback system (so you don't worry)

Every image/video/3D area on the site uses one of three components:

| Component             | Renders when file exists | Renders when file missing                          |
|-----------------------|--------------------------|----------------------------------------------------|
| `SafeImage`           | Optimized Next.js image  | Dark card · red+gold glow · "Image coming soon"   |
| `SafeVideo`           | Auto-playing video       | Animated dark background · drifting glow + speed lines |
| `Safe3DPlaceholder`   | n/a (replaced by real 3D viewer) | Animated concentric glow rings + center card |

You can ship the site to production **right now** with zero assets — every screen still looks intentional.

---

## 7. Workflow checklist

When you're ready to add a real car image:

- [ ] Open the car's folder under `public/cars/<slug>/`
- [ ] Drop in the `.webp` file using the exact filename from the table above
- [ ] Run `npm run dev` (or refresh the page if it's already running)
- [ ] The placeholder disappears, the image appears

Repeat for each car. There is no other step.

---

## 8. Important: what NOT to do

- ❌ Don't paste internet image URLs into `data/cars.ts`.
- ❌ Don't change file names — the code looks for these exact names.
- ❌ Don't store images outside the `public/` folder (Next.js can't serve them).
- ❌ Don't commit huge unoptimized files (>2 MB per image). Convert to WebP first.
- ❌ Don't use copyrighted manufacturer press images without permission for production launch.
