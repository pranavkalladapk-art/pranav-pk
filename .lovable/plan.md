

## Add LinkedIn Profile Badge

Embed your official LinkedIn badge on the site so visitors can view your profile preview directly.

**Where to place it**

Add it to the Contact section (`src/components/Contact.tsx`), below the existing Instagram/LinkedIn social icons. This keeps all professional/social touchpoints grouped together.

**Changes**

1. **`index.html`** — add the LinkedIn platform script once globally (near the end of `<body>`), so it loads on every route:
   ```html
   <script src="https://platform.linkedin.com/badges/js/profile.js" async defer type="text/javascript"></script>
   ```

2. **`src/components/Contact.tsx`** — render the badge markup inside a centered wrapper beneath the social icon row:
   ```tsx
   <div className="flex justify-center mt-10">
     <div
       className="badge-base LI-profile-badge"
       data-locale="en_US"
       data-size="large"
       data-theme="dark"
       data-type="HORIZONTAL"
       data-vanity="pranav-a-56191b367"
       data-version="v1"
     >
       <a
         className="badge-base__link LI-simple-link"
         href="https://ae.linkedin.com/in/pranav-a-56191b367?trk=profile-badge"
       >
         Pranav A
       </a>
     </div>
   </div>
   ```

**Notes**
- Theme is set to `dark` to match the site's strict dark aesthetic.
- LinkedIn's script auto-renders the badge on mount; no React-specific init needed.
- Badge is rendered inside an iframe by LinkedIn, so site styles won't conflict.

