# Keller Casey portfolio

A static portfolio site built with Vite, React, TypeScript, Tailwind CSS and Framer Motion. It is hosted for free on GitHub Pages and redeploys every time you push to `main`.

## Put it online (one time)

1. Create a GitHub repository. Name it `<your-username>.github.io` to get the address `https://<your-username>.github.io`. Any other name also works and gives `https://<your-username>.github.io/<repo-name>`.
2. Push this folder to the repository's `main` branch.
3. In the repository, open **Settings → Pages** and set **Source** to **GitHub Actions**.
4. Open the **Actions** tab and wait for "Deploy to GitHub Pages" to finish. The site address appears in the run summary.

## Edit the content

All text lives in `src/data/`:

| File | What it controls |
|---|---|
| `profile.ts` | Name, hero roles and tagline, bio, About stats, education, email, LinkedIn, GitHub, resume |
| `experience.ts` | Experience timeline |
| `skills.ts` | Skill groups |
| `projects.ts` | Year sections and every project |

### Add a project

1. Make a folder `public/media/<project-id>/`.
2. For each image, save a full-size WebP (about 1600 px wide) and a thumbnail named `<name>-thumb.webp` (about 720 px wide). Videos go in the same folder as H.264 `.mp4` files under 25 MB, each with a `-poster.webp` frame.
3. Add an entry to the `projects` array in `src/data/projects.ts`. The `year` field decides which section it appears in. The `img()` helper builds gallery entries from the file names.
4. Commit and push. The site redeploys on its own.

### Turn on the optional pieces

- **Resume download:** put a resume *without your home address or phone number* at `public/resume.pdf`, then set `resume: 'resume.pdf'` in `profile.ts`.
- **GitHub link:** set `github` in `profile.ts`.
- **Pinocchio tutorial link:** publish the Google Site, then add `{ label: 'Open the tutorial', href: '<published URL>' }` to that project's `links`.
- **Contact form:** messages go through FormSubmit, which is free and needs no account. The first message triggers a one-time activation email to your Gmail; click the confirm link in it and later messages arrive normally.
- **Social preview image:** `og:image` in `index.html` points at `https://kfcasey7.github.io/media/about/og.jpg`. Update it if the site address changes.

## Run it locally

```bash
npm install
npm run dev      # live-reloading preview at http://localhost:5173
npm run build    # production build in dist/
```
