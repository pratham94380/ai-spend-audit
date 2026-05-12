# Product Metrics

## North Star Metric

### Completed Audits Per Week

The primary goal of the product is to generate completed AI spend audits from startup teams actively evaluating AI tooling costs.

This metric best represents:
- user engagement
- problem relevance
- product usefulness
- lead generation potential

A completed audit indicates:
- the user understood the value proposition
- the onboarding flow worked
- the product generated enough trust for users to submit tooling data

For Credex, completed audits are the strongest indicator of qualified cost-optimization intent.

---

# Input Metrics

## 1. Landing Page → Audit Start Conversion Rate

Measures how effectively the landing page communicates value.

Formula:

```text
audit_starts / landing_page_visits
```

Low conversion suggests:
- weak messaging
- poor positioning
- unclear value proposition

---

## 2. Audit Completion Rate

Measures how many users finish the audit flow after starting.

Formula:

```text
completed_audits / audit_starts
```

Low completion may indicate:
- excessive friction
- confusing forms
- low trust
- weak UX

---

## 3. High-Savings Audit Percentage

Measures how many audits produce significant savings opportunities.

Formula:

```text
audits_over_500_monthly_savings / completed_audits
```

This is especially important because:
- high-savings users are strongest Credex leads
- large savings opportunities increase conversion likelihood
- this metric directly impacts monetization potential

---

# Initial Instrumentation Plan

The first analytics events I would track:

- landing_page_view
- audit_started
- tool_added
- audit_generated
- audit_completed
- high_savings_detected
- lead_capture_submitted
- consultation_cta_clicked

This would provide visibility into:
- funnel drop-offs
- engagement quality
- monetization potential
- product-market fit signals

---

# Pivot Decision Metric

The product would require strategic reevaluation if:

```text
audit completion rate < 25%
```

after multiple onboarding and UX improvements.

This would suggest:
- users do not perceive sufficient value
- the audit process feels too time-consuming
- pricing recommendations are not compelling enough

Another pivot trigger would be:

```text
high-savings audits < 5%
```

because the lead-generation model depends heavily on uncovering meaningful optimization opportunities.

---

# Success Signals

Early positive indicators would include:
- strong organic sharing
- screenshots posted publicly
- repeat usage by teams
- high lead-capture conversion
- inbound requests for more advanced reporting

For an MVP-stage lead-generation product, usefulness and shareability matter more than daily active users.