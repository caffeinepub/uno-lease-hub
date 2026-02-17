# Specification

## Summary
**Goal:** Make it clear and easy for admins to create and edit Lease Code, Split Ratio, and Availability in the Dashboard “My Offers” tab.

**Planned changes:**
- Improve the “My Offers” empty state to clearly explain that inputs are available via “Create Listing” (or the edit pencil) and that Lease Code, Split Ratio, and Availability are set there.
- Add a brief hint above/near the listings table explaining where to edit Lease Code/Split Ratio (Edit action) and where Availability can be changed (Availability control).
- Add an “Availability” field to the Create/Edit Lease Listing dialog with options: Available / In Use / Archived, and preselect the current value when editing.
- On dialog submit, persist Lease Code + Split Ratio and also persist Availability using existing frontend orchestration (no new backend API), then refresh the table data so updates appear without a manual reload.
- Add a user-friendly error state in “My Offers” when listings fail to load, including a “Retry” action that refetches data.

**User-visible outcome:** Admins can clearly find where to create/edit Lease Code, Split Ratio, and Availability; they can set Availability directly in the listing editor; and the dashboard shows a clear error + retry when listings can’t be loaded instead of looking empty.
