# Al Shab Smithery & Turnery Workshop - static website

Plain HTML, CSS and JavaScript. No build step, no backend.

## 1. Add your photos (names matter)

Save photos in these exact paths. Missing photos show a neutral placeholder, so you can add them one by one.
Use JPG, landscape, about 1600 px wide, under 300 KB each (compress with squoosh.app).

| File | Where it appears |
|---|---|
| `img/hero.jpg` | Top banner background and link-share preview (workshop front or a welding/turning scene) |
| `img/workshop.jpg` | "Equipment and people" section (inside the workshop) |
| `img/machines/machine-01.jpg`, `machine-02.jpg` | "Machines built" |
| `img/gallery/fabrication-01.jpg`, `fabrication-02.jpg` | Fabrication |
| `img/gallery/turning-01.jpg`, `turning-02.jpg` | Turned parts |
| `img/gallery/repair-01.jpg`, `repair-02.jpg` | Repairs |

To add more photos, copy one `<button class="g-item">...</button>` line in `index.html` and change the file name, category (`data-cat`) and captions.

## 2. Things to confirm or change

- **Email:** open `js/main.js` and set `EMAIL = "you@example.com"`. Until you do, the email links are hidden.
- **Opening hours:** the page says "Sat - Thu, from 8:00 AM" (Google showed "Opens 8 AM Sat"). Correct it in `index.html` (search for `8:00 AM`, 2 places) once you know the real hours.
- **Services text:** edit the six service cards and the capability list in `index.html` so they match what the workshop really does.
- **Phone / WhatsApp:** the number `971545066017` appears in `index.html` and `js/main.js`. Find and replace if it changes.
- **Arabic line:** "ورشة الشعب للحدادة والخراطة" - ask a native speaker to confirm the spelling the workshop uses.
- **Colours:** change the variables at the top of `css/style.css`.

## 3. Publish on GitHub Pages

1. Create a new GitHub repository (e.g. `alshab-workshop`) and upload everything in this folder (keep `index.html` in the root).
2. Open the repository: Settings > Pages > Build and deployment > Source: "Deploy from a branch" > Branch: `main`, folder `/ (root)` > Save.
3. After a minute the site is live at `https://YOUR-USERNAME.github.io/alshab-workshop/`.
4. Optional custom domain: add it under Pages > Custom domain and set the DNS records GitHub shows you.

After going live, add the website address to the workshop's Google Business Profile.
