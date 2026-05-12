# Reflection

## What Went Well

One of the strongest parts of this project was the speed of iteration and deployment.

The project evolved from a simple audit calculator into a deployed full-stack SaaS-style application with:
- multi-tool support
- scalable pricing logic
- recommendation generation
- live deployment
- CI/CD integration
- automated testing

The architecture separation between frontend and backend also helped maintain clean responsibilities between:
- UI rendering
- business logic
- pricing configuration
- recommendation generation

Using React + Vite significantly accelerated frontend iteration speed.

Django REST Framework simplified backend API development and allowed rapid integration between frontend and backend.

---

# What Was Challenging

## 1. Dynamic Multi-tool State Management

Managing multiple AI tools dynamically inside React forms became more complex than expected.

Challenges included:
- updating nested state correctly
- maintaining stable rendering
- preserving localStorage persistence
- preventing invalid data states

This required restructuring state management around arrays of tool objects.

---

## 2. Deployment Issues

Production deployment introduced several real-world engineering issues:
- CORS configuration
- Render deployment setup
- ALLOWED_HOSTS configuration
- production API integration

These issues were valuable because they exposed differences between local development and production environments.

---

## 3. Pricing Normalization

Different vendors structure pricing differently:
- per-seat pricing
- usage-based API pricing
- enterprise contracts
- hybrid billing models

Creating a unified audit model required simplifying several pricing assumptions while still keeping recommendations explainable.

---

# Technical Decisions

## Why deterministic rules instead of AI-generated pricing logic

The audit engine intentionally uses deterministic pricing rules instead of AI-generated calculations.

Reasons:
- financial recommendations should remain explainable
- deterministic logic is easier to test
- audit outputs become predictable and debuggable
- reduced hallucination risk

AI-generated summaries were planned as an enhancement layer rather than the core calculation engine.

---

## Why localStorage instead of database persistence

For MVP scope:
- localStorage significantly reduced implementation complexity
- simplified deployment
- improved UX quickly
- avoided unnecessary backend state management

---

# What I Would Improve Next

If given more time, I would prioritize:

## Product Improvements
- AI-generated personalized summaries
- PDF export support
- historical audit tracking
- authentication and saved workspaces
- benchmarking against similar companies

## Engineering Improvements
- PostgreSQL integration
- Dockerized deployment
- better API validation
- stronger frontend form validation
- structured logging and monitoring
- integration tests and API tests

---

# Biggest Learning

The biggest learning from this project was understanding the difference between:
- building features locally
- deploying and maintaining production systems

Deployment, testing, CI/CD, documentation, and edge-case handling consumed significantly more engineering effort than initial feature development.

This project reinforced the importance of:
- iterative shipping
- production debugging
- maintainable architecture
- documentation quality
- scalable configuration design