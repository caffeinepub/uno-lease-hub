# Specification

## Summary
**Goal:** Add prominent onsite download links for the Unity Network App and incorporate UnityNodes media-kit logos on the public site.

**Planned changes:**
- Add a mobile-responsive “Get the Unity Network App” section on the public Home/Landing page with buttons/badges linking to the provided Google Play and Apple App Store URLs.
- Ensure both outbound links open in a new tab with `target="_blank"` and `rel="noopener noreferrer"`.
- Download UnityNodes media-kit logo assets and add them as static frontend public assets (served from `frontend/public/...`), then render at least one logo in a public-facing area (e.g., the new download section and/or header/footer).
- Update/add English user-facing copy near the download links/logos to clearly indicate destinations are external app stores and avoid implying the Unity mobile app runs on ICP.

**User-visible outcome:** Visitors can see a clear “Get the Unity Network App” section on the landing page with tappable Google Play and App Store links (opening in a new tab) and UnityNodes branding rendered from locally hosted static assets.
