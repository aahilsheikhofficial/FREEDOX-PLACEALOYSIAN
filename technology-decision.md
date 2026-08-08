# Technology Decisions — Placement Offer Management & Analytics System

## Frontend
React (Vite) with Tailwind CSS and shadcn/ui was chosen for building a responsive, component-based interface. It allows rapid iteration, reusable UI components, and clean responsive layouts suitable for a college administration dashboard. Charts are rendered with Recharts.

## Data Model
A relational-style data model is used because **Company**, **Placement Drive**, **Offer** and **Student** have clear foreign-key dependencies (Company → Drive → Offer ← Student). Base44 entities store these relationships via reference id fields (`company_id`, `drive_id`, `student_id`), preserving referential integrity while letting the frontend join records for display and analytics.

## Why Offer is a separate entity
An offer is the central record that captures the outcome of a student participating in a placement drive. Keeping it separate allows one student to hold multiple offers (across different drives/companies) and lets the system track CTC, offer date, joining status and placement status independently per offer.

## Why Placement Drive is related to Company
A company conducts one or more placement drives; each drive then generates many offers. Modeling the drive under a company (and the offer under a drive) prevents inconsistent data — the company of an offer is always derived from its drive, never entered manually.

## Why a student can have multiple offers
Students often sit for multiple drives and receive multiple offers (e.g. Infosys Placed, TCS Pending, Wipro Not Joined). Storing each offer as its own record supports this realistically and powers the Placement History view.

## Why only one accepted offer is allowed
To keep placement statistics accurate, a student can have at most one offer with `placement_status = Placed`. The system enforces this on both create and update, showing a clear validation message when a second placed offer is attempted.

## How placement percentage is calculated
```
Placement % = (Unique eligible students with a Placed offer / Total eligible students) × 100
```
Unique students are counted — not offers — so a student with three offers still counts once.

## How salary statistics are calculated
Minimum, average and maximum CTC are computed from **Placed** offers only, so pending offers cannot distort official placement salary figures.

## How validation prevents inconsistent data
- A student may have only one Placed offer (enforced on create + edit).
- `Not Joined` cannot be combined with `Placed` — a student who did not join cannot be marked placed.
- `Placed` requires `Joining Status = Joined`.
- CTC must be greater than 0 and an offer date is required.

## Analytics
All dashboard and report values (placement %, salary stats, company-wise offers, program-wise placement, joining distribution) are calculated dynamically from the underlying records. Adding or updating an offer immediately updates every statistic and chart — no values are hard-coded.