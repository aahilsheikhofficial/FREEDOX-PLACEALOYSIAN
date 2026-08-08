
> **Team Name:** Pink Pandas
> **Project:** Placement Offers & Student Placement Management System

A web-based placement management system designed to help colleges efficiently manage student placement offers, placement drives, company information, and placement outcomes.

The system provides separate interfaces for **Faculty** and **Students**, while maintaining a centralized placement database.

---

 Problem Statement

Institutions need to analyze and document placement outcomes such as:

* Offers extended to students
* Offers accepted
* Students placed
* Joining status
* Placement percentage
* Company-wise placement
* Program-wise placement
* Salary statistics

Traditional placement tracking using spreadsheets or disconnected systems can make it difficult to maintain accurate student-wise placement histories and generate reliable reports.

The goal is to build a **Placement Offer Management System** on top of the existing **Company and Placement Drive concepts from V05**, allowing institutions to track individual student offers and placement outcomes.

---

 Project Objective
* Faculty to manage student placement information.
* Faculty to create and update placement offers.
* Faculty to track eligible, selected and placed students.
* Students to view their own placement information.
* Institutions to calculate placement statistics automatically.
* Placement officers to analyze company-wise, program-wise and salary-related outcomes.

---

User Interfaces

The system contains two completely separate spaces.

##  Faculty Space

Faculty can:

* Select Academic Year
* Select Department
* Select Class/Program
* View students
* Search and filter students
* View eligible students
* View selected students
* View placed students
* View student profiles
* View placement history
* Add and update offers
* Manage companies and placement drives
* View placement analytics

## Student Space

Students can view only their own information:

* My Profile
* Eligibility Status
* Placement Status
* My Offers
* Placement History
* Company and CTC details

Students cannot view or modify other students' information.

---

#  Faculty Workflow

```text
Faculty
   ↓
Academic Year
   ↓
Department
   ↓
Class / Program
   ↓
Class Dashboard
   ↓
Student List
   ↓
Student Profile
   ↓
Placement History
   ↓
Offer Details
```

---

#  Student Workflow

```text
Student
   ↓
My Dashboard
   ↓
My Profile
   ↓
My Placement Status
   ↓
My Placement History
   ↓
My Offers
```

---

#  Core Entities

The system uses the following entities:

* Institution
* Department
* Program
* Academic Year
* Semester
* Student
* Faculty
* Course
* Company
* Placement Drive
* Offer

---

#  ER Relationship

The important placement relationships are:

```text
Company
   │
   │ 1 : N
   ↓
Placement Drive
   │
   │ 1 : N
   ↓
Offer
   ↑
   │ N : 1
   │
Student
```

### Relationship Explanation

* One **Company** can have multiple Placement Drives.
* One **Placement Drive** can generate multiple Offers.
* One **Student** can receive multiple Offers.
* A Student can have **at most one accepted/placed offer**.

Example:

```text
Mansi
 ├── Infosys → ₹6 LPA → Placed
 ├── TCS     → ₹5 LPA → Pending
 └── Wipro   → ₹4.5 LPA → Not Joined
```

---

# Required Data

The system captures:

| Entity          | Important Data                                                    |
| --------------- | ----------------------------------------------------------------- |
| Student         | Name, UN Number, Department, Program, Eligibility                 |
| Company         | Company Name, Industry, Location                                  |
| Placement Drive | Company, Date, Mode, Status                                       |
| Offer           | Student, Drive, CTC, Offer Date, Joining Status, Placement Status |

---

# Placement Analytics

The system dynamically calculates:

### Eligible Students

Number of unique students marked eligible.

### Students Placed

Number of unique eligible students with a placed offer.

### Placement Percentage

```text
Placement Percentage =
Unique Placed Students
---------------------- × 100
Eligible Students
```

### Salary Statistics

* Minimum CTC
* Average CTC
* Maximum CTC

### Other Insights

* Company-wise offers
* Program-wise placement
* Joining status
* Selected students
* Placed students
* Pending offers

All statistics are calculated dynamically from the database.

---

# Offer Management

Faculty can create an offer using an existing Placement Drive.

When creating an offer:

```text
Student
   ↓
Placement Drive
   ↓
Company automatically selected
   ↓
CTC
   ↓
Offer Date
   ↓
Joining Status
   ↓
Placement Status
```

The Company should be derived from the selected Placement Drive to prevent incorrect company-drive combinations.

---

# Business Rules

The system enforces the following rules:

1. A student can have multiple offers.
2. A student can have only one accepted/placed offer.
3. A placement drive can have multiple offers.
4. Every offer must reference an existing student.
5. Every offer must reference an existing placement drive.
6. Company is automatically derived from the placement drive.
7. CTC must be greater than zero.
8. `Not Joined + Placed` is not allowed.
9. All statistics must be calculated dynamically.
10. Editing an offer must apply the same validation rules as creating an offer.

---

# Faculty Student Management

After selecting:

```text
Academic Year
      ↓
Department
      ↓
Class / Program
```

Faculty sees the selected class dashboard.

### Dashboard Cards

* Total Students
* Eligible Students
* Selected Students
* Students Placed
* Total Offers
* Placement Percentage

### Student Tabs

```text
All Students
Eligible
Not Eligible
Offers
Selected
Placed
Not Placed
```

Faculty can search using:

* Student Name
* UN Number

---

# Student Profile

Faculty can open any student profile.

The profile contains:

* Student Name
* UN Number
* Department
* Program
* Academic Year
* Semester
* Eligibility
* Selection Status
* Placement Status
* Total Offers
* Placement History

### Placement History

| Company | Drive        |      CTC | Offer Date | Joining    | Placement  |
| ------- | ------------ | -------: | ---------- | ---------- | ---------- |
| Infosys | Campus Drive |   ₹6 LPA | 05 Aug     | Joined     | Placed     |
| TCS     | Campus Drive |   ₹5 LPA | 03 Aug     | Pending    | Not Placed |
| Wipro   | Campus Drive | ₹4.5 LPA | 01 Aug     | Not Joined | Not Placed |

---

# Acceptance Test

The reviewer should be able to perform the following:

1. Enter Faculty Space.
2. Select Academic Year.
3. Select Department.
4. Select Class/Program.
5. Select an eligible student.
6. Open the student's Placement History.
7. Create a new Offer.
8. Select an existing Placement Drive.
9. Enter CTC and offer details.
10. Save the offer.
11. Return to the dashboard.
12. Verify that placement statistics have automatically recalculated.

For example:

```text
Before:

Eligible Students = 30
Placed Students = 18
Placement % = 60%
```

After placing one new student:

```text
Eligible Students = 30
Placed Students = 19
Placement % = 63.33%
```

The values must be calculated from the database and must not be hard-coded.

---

# Dummy Dataset

The system should contain at least:

* 30 eligible students
* 20+ placement offers
* 5+ companies
* 10+ placement drives
* Different CTC values
* Different joining statuses
* Different placement statuses
* Multiple offers for some students

Example CTC range:

```text
₹3.5 LPA
₹4 LPA
₹4.5 LPA
₹5 LPA
₹6 LPA
₹7 LPA
₹8 LPA
₹10 LPA
₹12 LPA
```

---

# UI Design

The application uses a modern and professional college-management interface.

### Faculty UI

* Sidebar navigation
* Dashboard cards
* Search and filters
* Student tables
* Charts
* Status badges
* Student profile pages
* Offer forms
* Reports

### Student UI

Simple and focused interface containing:

* My Dashboard
* My Profile
* My Offers
* My Placement History

### Design Principles

* Clean layout
* Responsive design
* Consistent typography
* Rounded cards
* Clear tables
* Minimal animations
* Professional color palette
* Mobile responsive



#  Project Structure

```text
college-placement-management/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── models/
│   └── utils/
│
├── docs/
│   ├── er-diagram
│   └── technology-decision.md
│
├── database/
│   └── schema
│
├── README.md
└── ...
```

---

#  Documentation

The project includes:

### ER Diagram

Shows:

* Entities
* Attributes
* Primary Keys
* Foreign Keys
* Relationships
* Cardinalities

### Technology Decision

`docs/technology-decision.md` documents:

* Technology selection
* Database design
* Architecture decisions
* Offer entity design
* Business rules
* Validation logic
* Analytics calculations

---

# Technology Stack

> Update this section with the exact technologies used in the final implementation.

Possible stack:

* **Frontend:** React
* **Backend:** Node.js / Express
* **Database:** MySQL
* **Styling:** CSS / Tailwind CSS
* **Charts:** Chart.js / Recharts
* **Version Control:** Git & GitHub

---

# Expected Outcome

The final system should provide a single platform where faculty can manage and analyze placement outcomes while students can easily view their own placement information.

The application demonstrates:

```text
CREATE
  ↓
VIEW
  ↓
SEARCH
  ↓
FILTER
  ↓
UPDATE
  ↓
REPORT
  ↓
INSIGHT
```

---

# Live Demonstration

The recommended demonstration flow:

```text
Welcome Screen
      ↓
Faculty Space
      ↓
Select Year
      ↓
Select Department
      ↓
Select Class
      ↓
Class Dashboard
      ↓
Student List
      ↓
Student Profile
      ↓
Placement History
      ↓
Add / Update Offer
      ↓
Dashboard Analytics
```

Then demonstrate:

```text
Student Space
      ↓
My Dashboard
      ↓
My Profile
      ↓
My Placement Offers
```

---
