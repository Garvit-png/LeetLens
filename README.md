# LeetLens — LeetCode Profile Analytics Dashboard

## Overview

LeetLens is a web-based application that analyzes LeetCode user profiles and transforms raw submission data into structured, easy-to-understand insights. Instead of scrolling through stats, users get a clear view of their problem-solving performance and progress.

Whether you're tracking your own growth or comparing with a friend, LeetLens makes the data actually useful (and a little more fun to look at).

---

## Features

* 🔍 Search any LeetCode profile by username
* 📊 View total problems solved with difficulty-wise breakdown (Easy / Medium / Hard)
* 📈 Visualize performance using charts for quick insights
* ⚔️ Compare two users side-by-side (VS Mode)
* ⚡ Real-time data fetching from LeetCode

---

## API Integration

LeetLens uses the **LeetCode GraphQL API** to fetch user data directly from the source.

* Endpoint: `https://leetcode.com/graphql`
* Extracts submission statistics and difficulty distribution
* Processes raw data into usable analytics

---

## Technology Stack

* **Frontend:** React (Hooks, Functional Components)
* **Backend:** Node.js with Express
* **Visualization:** Chart.js / Recharts
* **Styling:** CSS / Tailwind

---

## Why This Project

LeetCode profiles contain valuable data, but it isn’t always presented in the most intuitive way.
LeetLens bridges that gap by focusing on clarity, comparison, and visualization.

Also, let’s be honest — comparing stats with friends hits different when it’s visualized properly.

---

## Setup

```bash
git clone https://github.com/your-username/leetlens.git
cd leetlens
npm install
npm start
```

---

## Future Enhancements

* Topic-wise problem distribution
* Activity heatmap (daily submissions)
* Progress tracking over time
* Smarter comparison insights

---

## Author

Garvit Gandhi
