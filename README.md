# Keller Casey portfolio

A static portfolio site built with Vite, React, TypeScript, Tailwind CSS and Framer Motion. It is hosted for free on GitHub Pages and redeploys every time you push to `main`.

## Put it online (one time)

1. Create a GitHub repository. Name it `<your-username>.github.io` to get the address `https://<your-username>.github.io`. Any other name also works and gives `https://<your-username>.github.io/<repo-name>`.
2. Push this folder to the repository's `main` branch.
3. In the repository, open **Settings → Pages** and set **Source** to **GitHub Actions**.
4. Open the **Actions** tab and wait for "Deploy to GitHub Pages" to finish. The site address appears in the run summary.

## Edit the content (dashboard)

Go to **https://kfcasey7.github.io/admin**. Edits are saved straight to this repository, and the site rebuilds in about a minute.

**First time on a device:** click **Sign In Using Access Token**, then use the link in the dialog to create a GitHub fine-grained token:
- Repository access: **Only select repositories → kfcasey7.github.io**
- Repository permissions: **Contents → Read and write** (Metadata is added automatically)

Paste the token into the dialog. The browser remembers it, so you only do this once per browser. Don't use "Sign In with GitHub"; that button needs a separate login server this site doesn't have.

What you can edit:

| Dashboard section | What it controls |
|---|---|
| **Projects** | Every project card: text, section (year), order, card image, gallery photos and clips, demo videos, links. **New Project** adds one. |
| **About, experience & skills → Profile, hero & About** | Name, rotating hero lines, intro, email, LinkedIn, GitHub, resume PDF, portrait, About paragraphs, highlight cards, education |
| **… → Experience timeline** | Timeline entries and their bullet points |
| **… → Skills** | Skill groups and chips |
| **… → Year section titles** | Section headings, the line beside each, and their order |

Photos you upload are converted to compressed WebP automatically. Keep videos as MP4 files under 25 MB.

The content lives in `src/content/` as JSON files (one file per project in `src/content/projects/`), so you can also edit those by hand.

### Turn on the optional pieces

- **Resume download:** in *Profile, hero & About*, upload a resume *without your home address or phone number*.
- **Pinocchio tutorial link:** publish the Google Site, then open that project and add a link.
- **Contact form:** messages go through FormSubmit (free, no account). The first message triggers a one-time activation email to your Gmail; click the confirm link and later messages arrive normally.

## Run it locally

```bash
npm install
npm run dev      # live-reloading preview at http://localhost:5173
npm run build    # production build in dist/
```
