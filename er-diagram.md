# Entity-Relationship Diagram

```
                    ┌──────────────────────┐
                    │       COMPANY         │
                    │──────────────────────│
                    │ PK  id                │
                    │     company_name      │
                    │     industry          │
                    │     location          │
                    └──────────┬───────────┘
                               │ 1
                               │
                               │ N
                    ┌──────────▼───────────┐
                    │   PLACEMENT DRIVE    │
                    │──────────────────────│
                    │ PK  id                │
                    │ FK  company_id        │
                    │     drive_name        │
                    │     drive_date        │
                    │     mode              │
                    │     eligibility_      │
                    │       criteria        │
                    │     status            │
                    └──────────┬───────────┘
                               │ 1
                               │
                               │ N
                    ┌──────────▼───────────┐
                    │       OFFER           │
                    │──────────────────────│
                    │ PK  id                │
                    │ FK  student_id   ─────┼──┐
                    │ FK  drive_id          │  │
                    │     ctc               │  │ N
                    │     offer_date        │  │
                    │     joining_status    │  │
                    │     placement_status  │  │
                    └───────────────────────┘  │
                                               │ 1
                              ┌────────────────▼────────────┐
                              │          STUDENT            │
                              │─────────────────────────────│
                              │ PK  id                       │
                              │     un_number (unique)       │
                              │     name                     │
                              │     department               │
                              │     program                  │
                              │     academic_year            │
                              │     semester                 │
                              │     eligible (boolean)       │
                              └─────────────────────────────┘
```

## Cardinality

| Relationship | Cardinality |
|---|---|
| Company → Placement Drive | 1 : N |
| Placement Drive → Offer | 1 : N |
| Student → Offer | 1 : N |
| Offer → Student | N : 1 |
| Offer → Placement Drive | N : 1 |
| Placement Drive → Company | N : 1 |

## Business Rules

- A **Student** may have many **Offers**.
- A **Student** may have **at most one** Offer with `placement_status = Placed` (accepted offer).
- An **Offer** always references exactly one **Student** and one **Placement Drive**.
- The **Company** of an offer is derived from its **Placement Drive** (never selected manually).
- `Not Joined` + `Placed` is not allowed; `Placed` requires `Joining Status = Joined`.
- CTC must be greater than 0.