# Non-Functional Requirements

## Purpose

Capture early non-functional requirements from intake.

<!-- WWG_GENERATED:NON_FUNCTIONAL_REQUIREMENTS:START -->
- Hosting preference: Not finalized (NEEDS_CONFIRMATION). Local Node + optional Docker Compose for now; container image via Dockerfile is sufficient for scaffold deploy experiments.
- Frontend preference: None in this repository (pairs with bnpi-sm-app)
- Backend preference: Express 5 + TypeScript (CommonJS) + Zod + Helmet + CORS + Swagger
- Database preference: None in this repository (optional Redis only)
- Background jobs/queues: false
- Security/privacy/compliance concerns: No regulated data in scaffold shell, Future auth/PII/payments require approval-gated work, Secrets via .env / Secret Manager only — never commit .env
<!-- WWG_GENERATED:NON_FUNCTIONAL_REQUIREMENTS:END -->
