# Specification

## Summary
**Goal:** Fix the /dashboard Internet Identity admin login flow so authenticated users reliably reach the dashboard without infinite initialization, silent failures, or manual refresh.

**Planned changes:**
- Update the /dashboard auth gate (RequireAuth) to show a clear admin-specific login prompt when signed out, with English CTA copy consistent with existing auth-guard copy.
- Fix authenticated actor readiness detection so that after Internet Identity login the app initializes and uses an authenticated backend actor (including re-running `_initializeAccessControlWithSecret`) and transitions cleanly between initializing, ready, and error/timeout states.
- Ensure actor/initialization failures surface the existing “Connection Issue” or initialization timeout states (not an infinite spinner), and that “Try Again” retries initialization without a full page reload while clearing prior error/timeout state.
- Prevent raw/internal agent/actor errors from being shown directly to end users during the login/initialization flow.

**User-visible outcome:** Visiting /dashboard while signed out shows an “Admin Login” prompt; after successful Internet Identity login the dashboard loads automatically, and if initialization fails or times out the user sees a friendly error state with a working “Try Again” retry (no refresh needed).
