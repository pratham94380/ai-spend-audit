# Prompt Design

The project uses LLM-generated summaries as a personalization layer on top of deterministic audit calculations.

The audit engine itself intentionally avoids AI-generated pricing recommendations because financial recommendations should remain explainable and predictable.

---

# Primary Summary Prompt

```text
You are an AI infrastructure cost optimization assistant.

Generate a concise personalized audit summary for a startup team based on the following audit data.

Requirements:
- Keep the response between 80–120 words
- Use professional but conversational tone
- Clearly explain overspending risks
- Mention optimization opportunities
- Mention estimated monthly and annual savings
- Avoid exaggeration or fake urgency
- Do not invent pricing numbers
- Be concise and readable

Audit Data:
{audit_results}
```

---

# Why This Prompt Was Designed This Way

The prompt was intentionally constrained because:
- audit summaries should remain short and scannable
- financial recommendations should sound trustworthy
- hallucinated pricing claims would reduce credibility
- concise summaries fit SaaS dashboard UX better

The prompt also explicitly prohibits:
- fake urgency
- invented numbers
- exaggerated claims

This keeps summaries aligned with deterministic audit outputs.

---

# Fallback Summary Strategy

If the LLM API fails:
- timeout
- quota exceeded
- invalid response
- provider outage

the application falls back to deterministic template summaries generated from the audit engine.

Example fallback:

```text
Your current AI tooling setup shows opportunities for optimization. Based on your selected plans and usage patterns, your team could potentially reduce monthly AI spend while maintaining similar functionality.
```

This ensures:
- stable UX
- graceful degradation
- reliable report generation

---

# Prompt Iterations That Did Not Work Well

## 1. Long-form consultant-style prompts

Early prompts produced:
- overly verbose responses
- repetitive explanations
- inflated savings language

These felt less trustworthy for financial tooling.

---

## 2. Open-ended recommendation prompts

Allowing the model to invent recommendations caused:
- unsupported pricing claims
- hallucinated competitor comparisons
- inconsistent reasoning

This was rejected in favor of deterministic pricing logic.

---

# AI Usage Philosophy

AI was intentionally used only for:
- summary generation
- personalization layer

AI was NOT used for:
- pricing calculations
- savings math
- audit logic
- recommendation rules

This separation improves:
- explainability
- consistency
- audit reliability
- testability