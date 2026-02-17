# Specification

## Summary
**Goal:** Change the unauthenticated top navigation login button label to “Admin Login” while keeping other authentication button states unchanged.

**Planned changes:**
- Update `frontend/src/components/auth/LoginButton.tsx` so the unauthenticated label displays “Admin Login” instead of “Login”.
- Preserve the existing authenticated label (“Logout”) and in-progress label (“Logging in...”).
- Ensure no changes are made to backend/auth behavior or to any files under `frontend/src/components/ui`.

**User-visible outcome:** When signed out, the top navigation authentication button reads “Admin Login”; when signed in it still reads “Logout”, and during sign-in it still reads “Logging in...”.
