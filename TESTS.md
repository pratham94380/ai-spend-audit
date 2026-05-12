# Automated Tests

The following automated tests were implemented for the audit engine.

---

# Test File

```text
backend/audit/test_audit_engine.py
```

---

# Test Coverage

## 1. ChatGPT Plus pricing validation
Ensures ChatGPT Plus pricing exists and matches configured pricing values.

## 2. Claude Team pricing validation
Ensures Claude Team pricing configuration is correctly loaded.

## 3. Cursor Business pricing validation
Verifies Cursor Business pricing data integrity.

## 4. GitHub Copilot Business pricing validation
Checks Copilot Business pricing configuration.

## 5. Gemini Ultra pricing validation
Validates Gemini Ultra pricing support inside the pricing engine.

---

# Running Tests

Run all backend tests:

```bash
cd backend
python manage.py test
```

---

# Notes

Tests focus on:
- pricing configuration integrity
- audit engine consistency
- prevention of pricing regressions

Future improvements would include:
- API integration tests
- recommendation logic tests
- edge-case validation tests
- frontend component testing