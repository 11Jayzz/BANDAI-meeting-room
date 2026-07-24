# Deployment Model

## Purpose

Capture hosting, stack, and deployment preferences from intake.

<!-- WWG_GENERATED:DEPLOYMENT_MODEL:START -->
- Hosting: Not finalized (NEEDS_CONFIRMATION). Local Node + optional Docker Compose for now; container image via Dockerfile is sufficient for scaffold deploy experiments.
- Frontend: None in this repository (pairs with bnpi-sm-app)
- Backend: Express 5 + TypeScript (CommonJS) + Zod + Helmet + CORS + Swagger
- Database: None in this repository (optional Redis only)
- Data storage needs: None required for scaffold shell (no database), Optional Redis when REDIS_URL is set, [object Object]
- Integrations/APIs: Optional Redis via REDIS_URL, Frontend bnpi-sm-app via CORS + VITE_API_BASE_URL
- File uploads: false
- Notifications: false
- Payments: false
<!-- WWG_GENERATED:DEPLOYMENT_MODEL:END -->
