# AI Spend Audit

AI Spend Audit is a full-stack SaaS-style web application that helps startups and engineering teams analyze AI tooling costs and identify overspending opportunities.

The platform audits AI subscriptions, recommends better pricing plans or alternatives, and calculates potential monthly and annual savings.

---

# Live Demo

Frontend:
https://ai-spend-audit-4vn25tj3a-pratham94380s-projects.vercel.app

Backend API:
https://ai-spend-audit-3kp0.onrender.com

---

# Features

- Multi-tool AI spend analysis
- Dynamic pricing plan recommendations
- Overspending detection
- Monthly and annual savings calculations
- Multi-tool audit support
- Persistent form state using localStorage
- SaaS-style analytics UI
- Live deployed frontend and backend
- Scalable pricing configuration system

---

# Supported Tools

- ChatGPT
- Claude
- Cursor
- GitHub Copilot
- Gemini
- Anthropic API
- OpenAI API
- Windsurf

---

# Tech Stack

## Frontend
- React
- Vite
- Tailwind CSS

## Backend
- Django
- Django REST Framework

## Deployment
- Vercel
- Render

---

# Screenshots

## Audit Dashboard

(Add screenshot here later)

## Multi-tool Audit

(Add screenshot here later)

## Savings Recommendations

(Add screenshot here later)

---

# Local Setup

## Frontend

```bash
cd frontend
npm install
npm run dev
```

## Backend

```bash
cd backend
pip install -r requirements.txt
python manage.py runserver
```

---

# Architecture Overview

Frontend communicates with a Django REST API backend that processes audit requests and returns savings recommendations.

Pricing logic is centralized in a configurable pricing engine for scalability and maintainability.

---

# Decisions

## 1. React + Vite instead of Next.js
Chosen for fast iteration speed and simpler deployment during MVP development.

## 2. Config-driven pricing architecture
Pricing plans are stored in centralized configuration objects to simplify scaling and maintenance.

## 3. LocalStorage persistence
Implemented to improve user experience by preserving audit sessions across reloads.

## 4. Django REST Framework backend
Selected for rapid API development and clear backend structure.

## 5. Hardcoded audit rules instead of AI-generated pricing logic
Used deterministic pricing rules for audit calculations because financial recommendations must remain explainable and reliable.

---

# Pricing Assumptions

Pricing values are based on publicly available pricing pages and simplified for audit modeling purposes.

Enterprise and API pricing may vary depending on usage and contracts.

---

# Future Improvements

- AI-generated personalized summaries
- PDF export reports
- Historical analytics dashboard
- Benchmarking against similar companies
- Email-based audit reports
- Database persistence
- Shareable public audit links