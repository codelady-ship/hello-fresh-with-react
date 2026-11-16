# HelloFresh React Clone (practice project)

[![Live demo](https://img.shields.io/badge/live-demo-16a34a?style=for-the-badge)](https://codelady-ship.github.io/hello-fresh-with-react/)

A multi-page clone of the HelloFresh meal-kit website, built with React, React Router, Vite and Tailwind CSS to practise components, state and routing.

> **Practice clone.** This is a learning project. It is not affiliated with, endorsed by or connected to HelloFresh. Plans, prices and gift cards are examples only and nothing can be ordered.
>
> 🇦🇿 Təlim layihəsi: HelloFresh saytının React, Vite və Tailwind CSS ilə hazırlanmış çoxsəhifəli klonu.

![Screenshot of the home page](docs/screenshot.png)

## Features

- **Home page:** hero, "Why HelloFresh?", box contents, plan carousel with arrow buttons, community photos, FAQ accordion
- **Our Plans:** choose a plan, number of people and meals per week; the summary calculates an example weekly total
- **Our Menu:** sample recipes that can be filtered by plan
- **Gift Cards:** form with a live gift card preview (demo toast instead of a real purchase)
- **Thanksgiving Box:** seasonal box menu and "how it works" steps
- **Sustainability:** three topic pages (packaging & recycling, seasonal ingredients, less food waste)
- Responsive header with a hamburger menu and a Sustainability dropdown (closes on navigation, outside click and Escape)
- Page titles per route, one `h1` per page, alt text on all images, WebP images, favicon, Open Graph tags, `robots.txt`, `sitemap.xml`

## Tech stack

React 19, React Router 7 (`HashRouter`), Vite 6, Tailwind CSS 4, ESLint.

## Run locally

```bash
git clone https://github.com/codelady-ship/hello-fresh-with-react.git
cd hello-fresh-with-react
npm install
npm run dev        # http://localhost:5173/
npm run build      # production build in dist/ (base: /hello-fresh-with-react/)
npm run preview    # preview the production build
```

## Deployment

The site is hosted on GitHub Pages from the `gh-pages` branch.

```bash
npm run deploy     # = npm run build && npx gh-pages@6 -d dist --nojekyll
```

- `vite.config.js` sets `base: '/hello-fresh-with-react/'` for builds, so assets resolve under the repository sub-path.
- Routing uses `HashRouter` (URLs look like `/hello-fresh-with-react/#/OurPlans`). GitHub Pages only serves real files, so with `BrowserRouter` a refresh on `/OurPlans` returned HTTP 404. With the hash, every route loads `index.html` and deep links work.
- `public/404.html` redirects old links such as `/hello-fresh-with-react/OurPlans` to the matching `#/OurPlans` route.

## Project structure

```
src/
  data/site.js              plans, recipes, sustainability topics, asset() helper
  komponents/
    layout/                 Header, Footer and the home page sections (PagesPart)
    pages/                  one folder per route
    ui/                     shared page header, section, button, hooks (title, toast)
    RouterPart/             route table
public/images/              images (photos in WebP)
```

## What I learned

- Splitting a page into reusable React components and sharing data from one file
- Managing UI state with `useState` (plan builder, filters, accordion, menus) and side effects with `useEffect`
- How client-side routing interacts with static hosting, and why `HashRouter` avoids 404s on GitHub Pages
- Configuring Vite's `base` for a sub-path deployment
- Accessibility basics: `aria-expanded`, labels for form fields, alt text and one `h1` per page
- Compressing images (the hero image went from 4.9 MB PNG to 140 KB WebP)
