# Specification

## Summary
**Goal:** Simplify the dashboard Create/Edit Lease Listing dialog so users only need to enter Listing ID, Lease Code, and Split Ratio to submit successfully.

**Planned changes:**
- Update `frontend/src/components/dashboard/LeaseOfferEditorDialog.tsx` to make only Listing ID, Lease Code (UUID), and Split Ratio required user inputs.
- Remove Location, Area, and Capacity from required validation and from the primary form UI (omit or move into an optional/advanced section that is not required for submission).
- In the submit handler, automatically supply safe default values for Location/Area/Capacity when not provided (e.g., Location="Unspecified", Area=0, Capacity=0) while preserving user-entered Listing ID, Lease Code, and Split Ratio.
- Keep inline validation for Lease Code UUID and Split Ratio, with clear English error messages.

**User-visible outcome:** Users can create or edit a lease listing from the dashboard by entering only Listing ID, Lease Code, and Split Ratio, without being blocked by missing Location/Area/Capacity.
