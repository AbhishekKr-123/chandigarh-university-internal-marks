# CU Internal Marks Calculator

A web application for **Chandigarh University** students to calculate their semester internal marks, based on the official university Excel formula sheet.

## ✨ Features

- **4 Subject Types** — Hybrid, Theory, Practical, and Specialization (Advance C Programming)
- **Exact Excel Formulas** — Replicates the official CU internal marks calculation logic
- **Horizontal Scrolling Layout** — Subjects display 2-per-row; scroll sideways for more
- **Per-Subject Clear** — Reset the marks entered in any single subject card
- **Clear All** — Reset every subject at once from the top toolbar
- **Input Validation** — Prevents entering marks above the maximum allowed
- **Real-time Calculation** — Internal scores update instantly as you type
- **Summary Dashboard** — Per-subject totals and a grand total
- **Responsive Design** — Works on desktop and mobile
- **Zero Dependencies** — Pure HTML, CSS, and vanilla JavaScript

## 🖱️ Using the Calculator

1. Pick a **subject type** from the dropdown (Hybrid / Theory / Practical / Specialization)
2. Type a **subject name** (optional — it defaults to the type name)
3. Click **Add Subject** — a card appears and scrolls into view
4. Enter your **obtained marks** — internal scores calculate live
5. Use **Clear** on a card to reset just that subject, or **Clear All** to reset everything

Subjects are laid out two-per-row. When you add a third or more, a horizontal
scrollbar appears at the bottom of the strip so you can swipe sideways.


## 📖 Subject Types & Formulas

### Hybrid Subject

| Component | Max Marks | Internal Score Formula |
|-----------|-----------|------------------------|
| MST-1 | 20 | Obt × 0.25 |
| MST-2 | 20 | Obt × 0.25 |
| Experiment 1–10 | 30 each | Obt × (2/30) |
| Assignment/PBL | 10 | Obt × (6/10) |
| Quiz | 4 | Obt |
| Surprise Test | 12 | Obt × (4/12) |
| Lab MST | 10 | Obt × (4/10) |
| Attendance | 2 | Obt |
| EST Practical | 40 | Obt × (20/40) |
| EST Theory | 60 | Obt ÷ 2 |

### Theory Subject

| Component | Max Marks | Internal Score Formula |
|-----------|-----------|------------------------|
| Assignment/PBL | 10 | Obt |
| MST-1 | 20 | Obt ÷ 2 |
| MST-2 | 20 | Obt ÷ 2 |
| Quiz | 4 | Obt |
| Surprise Test | 12 | Obt ÷ 3 |
| Attendance | 2 | Obt |
| EST Theory | 60 | Obt |

### Practical Subject

| Component | Max Marks | Internal Score Formula |
|-----------|-----------|------------------------|
| Experiment 1–10 | 30 each | Obt × (4.5/30) |
| Lab MST | 15 | Obt |
| Lab EST | 40 | Obt |

### Specialization (Advance C Programming)

| Component | Max Marks | Internal Score Formula |
|-----------|-----------|------------------------|
| Assignment - 1 | 20 | Obt × (6/20) |
| Assignment - 2 | 20 | Obt × (6/20) |
| Assignment - 3 | 20 | Obt × (6/20) |
| Surprise Test Score | 12 | Obt × (5/12) |
| Practical Test - 1 | 30 | Obt × (7.5/30) |
| Practical Test - 2 | 30 | Obt × (7.5/30) |
| Practical Test - 3 | 30 | Obt × (7.5/30) |
| Mid Term | 15 | Obt ÷ 2 |
| Mini Project Implementation | 40 | Obt ÷ 2 |
| Mini Project Design | 50 | Obt ÷ 2 |
| Attendance | 2 | Obt |

## 🚀 Deployment

### Deploy on Vercel (Recommended)

1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import this repository
4. Click **Deploy** — Vercel auto-detects the static site (via `vercel.json`), no build settings needed

Or use the Vercel CLI:

```bash
npm i -g vercel
vercel --prod
```

### Run Locally

```bash
# Using npx
npx serve .

# Or using Python
python -m http.server 3000
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠 Tech Stack

- **HTML5** — Structure
- **CSS3** — Styling (custom properties, Flexbox, Grid)
- **Vanilla JavaScript** — Calculation logic
- **Vercel** — Deployment platform

No build step required — this is a pure static site.

## 📄 License

MIT License
