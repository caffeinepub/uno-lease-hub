# Specification

## Summary
**Goal:** Make frontend routing work reliably when deployed on the Internet Computer, including direct URL navigation and browser refresh on non-root routes without 404s.

**Planned changes:**
- Update the frontend routing strategy to be Internet Computer–safe for client-side routes (e.g., /listings, /listings/:listingId, /how-it-works, /dashboard).
- Ensure deployed builds correctly serve the app entry for direct navigation and hard refresh on non-root routes.

**User-visible outcome:** When the app is deployed live, users can navigate to and refresh /listings, /listings/:listingId, /how-it-works, and /dashboard (including typing the URL directly) without seeing a 404, and the correct page loads.
