

## Fix favicon not updating on the site

**Problem**
- `index.html` is missing a `<link rel="icon">` tag pointing to the new `/favicon.png`. Only the Apple touch icon is declared.
- An old `public/favicon.ico` still exists. Browsers request `/favicon.ico` by default, so they keep showing the old icon.
- The Google search result screenshot you shared shows Google's cached icon — that updates separately on Google's schedule, not instantly.

**Changes**

1. **`index.html`** — add explicit favicon links with cache-busting:
   ```html
   <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png?v=3" />
   <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png?v=3" />
   <link rel="shortcut icon" href="/favicon.png?v=3" type="image/png" />
   <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=3" />
   ```

2. **Regenerate `public/favicon.ico`** from the new wand image (multi-size 16/32/48). Browsers and many crawlers (including Google) request `/favicon.ico` by default, so this file must exist and match the new branding.

3. **Re-export `public/favicon.png`** at 512×512 and `public/apple-touch-icon.png` at 180×180 from the uploaded wand image to ensure they are the new asset (in case prior copy didn't take).

4. **Bump cache version to `?v=3`** everywhere so browsers refetch.

**After publishing**
- Hard-refresh (Cmd/Ctrl+Shift+R) and verify `https://wizardfingers.com/favicon.ico` and `/favicon.png` both show the wand.
- For Google search results: request re-indexing in Google Search Console. Google typically refreshes the displayed favicon within a few days to a few weeks — this is outside our control.

