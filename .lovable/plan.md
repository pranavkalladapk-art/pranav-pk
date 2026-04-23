

## Update LinkedIn URLs to use `?skipRedirect=true`

Replace the existing LinkedIn profile links with the new URL `https://www.linkedin.com/in/pranav-a-56191b367/?skipRedirect=true` so visitors land directly on the profile without LinkedIn's intermediate redirect/auth wall.

**Changes**

1. **`src/components/Contact.tsx`** — update two LinkedIn links:
   - The social icon link (currently `https://www.linkedin.com/in/pranav-a-56191b367`)
   - The badge fallback link (currently `https://ae.linkedin.com/in/pranav-a-56191b367?trk=profile-badge`)

   Both will point to: `https://www.linkedin.com/in/pranav-a-56191b367/?skipRedirect=true`

2. **Check other files** for any other LinkedIn URL references (e.g., JSON-LD `sameAs` in `index.html`, memory files, etc.) and update them to the same URL for consistency.

**Notes**
- The `data-vanity="pranav-a-56191b367"` on the badge stays unchanged — that's how LinkedIn's script identifies the profile to embed.
- No layout or styling changes.

