# WWG Adoption Audit

## Audit Summary

- Target: C:\Users\Renz\Documents\bnpi-sm\bnpi-sm-app
- Date: 2026-07-20
- Recommended adoption mode: infer
- Adoption readiness score: 78 / 100
- Confidence: HIGH
- Command: `wwg adopt --mode infer`

## Evidence Reviewed

- README/docs: README.md, e2e/README.md
- Package/config files: package.json
- Source folders: src, src/app, src/assets, src/components, src/components/atoms, src/components/atoms/Button, src/components/atoms/Input, src/components/atoms/Spinner, src/components/atoms/Text, src/components/molecules, src/components/molecules/FormField, src/components/molecules/NavLinkItem, src/components/organisms, src/components/organisms/AppHeader, src/components/organisms/PageHeader, src/components/templates, src/components/templates/AppShellLayout, src/config, src/hooks, src/i18n, src/lib, src/locales, src/locales/en, src/pages, src/pages/home, src/styles, src/test, src/types
- Tests: e2e/features/_template/feature.spec.ts, e2e/features/home/home.spec.ts, e2e/features/shell/navigation.spec.ts, src/components/atoms/Button/Button.test.tsx, src/config/routes.config.test.ts, src/lib/cn.test.ts, src/test/setup.ts
- Deployment/config: None detected
- Existing agent/context files: None detected

## Observed Reality

- Product/app identity: CONFIRMED - bnpi-sm-app Evidence: package.json (package name)
- Product category: INFERRED - Web application Evidence: package/source (frontend framework or route folders detected)
- Tech stack: CONFIRMED - react, typescript, vite, tailwindcss, TypeScript Evidence: package/config (dependencies and config files)
- Runtime/build tools: CONFIRMED - dev, build, preview, lint, typecheck, test, test:watch, test:e2e, test:e2e:ui, test:e2e:headed, test:e2e:open, test:e2e:debug, test:e2e:report, format, format:check Evidence: package.json (scripts)
- Main entry points: CONFIRMED - e2e/fixtures/index.ts, e2e/pages/index.ts, e2e/support/index.ts, src/app/App.tsx, src/components/atoms/Button/index.ts, src/components/atoms/Input/index.ts, src/components/atoms/Spinner/index.ts, src/components/atoms/Text/index.ts, src/components/atoms/index.ts, src/components/index.ts, src/components/molecules/FormField/index.ts, src/components/molecules/NavLinkItem/index.ts Evidence: e2e/fixtures/index.ts (entry point candidate); e2e/pages/index.ts (entry point candidate); e2e/support/index.ts (entry point candidate); src/app/App.tsx (entry point candidate); src/components/atoms/Button/index.ts (entry point candidate); src/components/atoms/Input/index.ts (entry point candidate); src/components/atoms/Spinner/index.ts (entry point candidate); src/components/atoms/Text/index.ts (entry point candidate); src/components/atoms/index.ts (entry point candidate); src/components/index.ts (entry point candidate); src/components/molecules/FormField/index.ts (entry point candidate); src/components/molecules/NavLinkItem/index.ts (entry point candidate)
- Main implemented features: INFERRED - Quick start, Scripts, Project structure, Atomic Design rules, Config vs localization, Adding a route, Adding copy / a new language, Environment variables Evidence: README.md (README headings or route files)
- User roles/surfaces: INFERRED - user Evidence: README/source (role-like terms detected)
- Data persistence: NEEDS_CONFIRMATION - No persistence layer detected Evidence: repository scan (no database/schema/migration indicators)
- Auth/security: INFERRED - Auth/security mentioned but implementation boundary unclear Evidence: README/source (auth/security terms detected)
- Payments/billing: NEEDS_CONFIRMATION - No payments/billing implementation detected Evidence: repository scan (no payment/billing indicators)
- Deployment/runtime: NEEDS_CONFIRMATION - No deployment config detected Evidence: repository scan (no Docker/Vercel/Netlify/GitHub Actions config detected)

## Inferred Truth

- Product identity: INFERRED - bnpi-sm-app Evidence: package.json (package name)
- Product category: INFERRED - Web application Evidence: package/source (frontend framework or route folders detected)
- Primary users: INFERRED - user Evidence: README/source (role-like terms detected)
- Core features: INFERRED - Quick start, Scripts, Project structure, Atomic Design rules, Config vs localization, Adding a route, Adding copy / a new language, Environment variables Evidence: README.md (README headings or route files)
- Architecture: INFERRED - source folders: src, src/app, src/assets, src/components, src/components/atoms, src/components/atoms/Button, src/components/atoms/Input, src/components/atoms/Spinner; package-managed runtime; TypeScript configuration Evidence: source/config (folders and package metadata)
- Safety/production boundaries: INFERRED - demo behavior mentioned, mock/demo files detected Evidence: README/source/package (safety boundary indicators)

## Conflicts and Drift Risks

- README vs code: CONFIRMED - No direct issue detected by lightweight audit.
- UI/copy vs implementation: CONFIRMED - No direct issue detected by lightweight audit.
- package metadata vs actual stack: CONFIRMED - No direct issue detected by lightweight audit.
- mock/demo vs production claims: CONFLICTING - Mock/demo and production/live language both appear in scanned text. Recommendation: Separate demo boundaries from production claims in project truth and public docs.
- terminology drift: CONFIRMED - No direct issue detected by lightweight audit.
- stale/generated files: CONFIRMED - No direct issue detected by lightweight audit.
- missing tests/checks: CONFIRMED - No direct issue detected by lightweight audit.

## Open Questions

- Confirm product category. Why: Category affects profile selection, architecture defaults, and governance gates. Evidence: INFERRED: Web application
- Confirm primary users and role names. Why: Roles affect permissions, UX, terminology, and task routing. Evidence: INFERRED: user
- Confirm persistence boundary. Why: Data ownership and migration policy depend on this. Evidence: NEEDS_CONFIRMATION: No persistence layer detected
- Confirm auth/security boundary. Why: Auth and permissions changes are approval-sensitive. Evidence: INFERRED: Auth/security mentioned but implementation boundary unclear
- Confirm payments/billing boundary. Why: Payments and billing are approval-sensitive. Evidence: NEEDS_CONFIRMATION: No payments/billing implementation detected
- Confirm deployment/runtime boundary. Why: Operational readiness depends on deployment truth. Evidence: NEEDS_CONFIRMATION: No deployment config detected

## Recommended Adoption Plan

- Recommended mode: infer
- Files WWG should create/update: `.wwg/wiki/project-truth.md`, `.wwg/wiki/terminology.md`, `.wwg/wiki/principles/README.md`, `.wwg/workspace/current-task.md`, `.wwg/governance/truth-capture.md`, `.wwg/governance/drift-guard.md`, `.wwg/reports/adoption-audit.md`, `AGENTS.md`.
- Follow-up actions: confirm inferred truth, resolve conflicts, answer open questions, and run `wwg validate --target <project>`.

Labels used: CONFIRMED, INFERRED, NEEDS_CONFIRMATION, CONFLICTING, STALE.


## Observed Facts

- Observed facts are the current code/docs/config signals listed above.

## Inferred Truth

- Inferred truth was copied into `.wwg/wiki/project-truth.md` with status and evidence labels.

## Conflicts

- mock/demo vs production claims: CONFLICTING - Mock/demo and production/live language both appear in scanned text.
- deployment/runtime: NEEDS_CONFIRMATION - No deployment config detected.

## Open Questions

- Confirm product category. Evidence: INFERRED: Web application
- Confirm primary users and role names. Evidence: INFERRED: user
- Confirm persistence boundary. Evidence: NEEDS_CONFIRMATION: No persistence layer detected
- Confirm auth/security boundary. Evidence: INFERRED: Auth/security mentioned but implementation boundary unclear
- Confirm payments/billing boundary. Evidence: NEEDS_CONFIRMATION: No payments/billing implementation detected
- Confirm deployment/runtime boundary. Evidence: NEEDS_CONFIRMATION: No deployment config detected

## Recommended Follow-Up

- Review `.wwg/wiki/project-truth.md` and promote accepted inferred truth to confirmed truth.
- Resolve `NEEDS_CONFIRMATION`, `CONFLICTING`, and `STALE` items before major work.

Reports are reference history. `.wwg/wiki/project-truth.md` is the canonical current truth once reviewed and maintained.
