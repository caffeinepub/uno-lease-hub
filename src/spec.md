# Specification

## Summary
**Goal:** Make Location, Area, and Capacity optional for lease listings end-to-end, requiring only Lease Code and Split Ratio in both backend and frontend.

**Planned changes:**
- Update the backend lease listing type and public Candid API so `location`, `area`, and `capacity` are optional, while enforcing `leaseCode` and `splitRatio` as required for create/update.
- Update frontend dashboard create/edit listing flow and associated mutations to submit only required fields (Listing ID, Lease Code, Split Ratio) and match the updated backend method signatures.
- Update public browsing UI (listing cards and details page) to hide Location/Area/Capacity sections when the fields are absent, while continuing to display Lease Code and Split Ratio (NLO then ULO).

**User-visible outcome:** Users can create and edit lease listings by providing only Lease Code and Split Ratio, and public listing pages no longer show Location/Area/Capacity headings when those values aren’t provided.
