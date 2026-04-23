

## Verify LinkedIn Badge Rendering

Use browser automation to confirm the LinkedIn badge loads, displays correctly, and doesn't overlap surrounding Contact elements at desktop and mobile breakpoints.

**Steps**

1. **Desktop check (1280×720)**
   - Navigate to `/#contact` in the preview.
   - Wait for LinkedIn's `profile.js` to hydrate the badge into an iframe.
   - Screenshot the Contact section.
   - Verify: badge iframe is present, centered, sits below the Instagram/LinkedIn icon row with clear spacing (`mt-10`), and does not overflow the container or overlap the social icons or footer.

2. **Mobile check (390×844)**
   - Resize viewport to mobile.
   - Re-navigate to `/#contact`.
   - Screenshot the Contact section.
   - Verify: badge fits within viewport width, remains centered, no horizontal scroll, no overlap with social icons above or page edges.

3. **Report**
   - Summarize findings with both screenshots.
   - If issues found (badge missing, overflow, overlap), list them and propose a fix (e.g., wrap badge in `max-w-full overflow-hidden`, add responsive sizing, or switch `data-size` to `medium` on mobile).
   - If clean, confirm no changes needed.

**No code changes** unless verification surfaces a real issue — then I'll stop and report before editing.

