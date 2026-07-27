# Truth Capture

This file helps agents detect when new truth has been introduced.

New truth may come from:

- user prompts
- uploaded images
- uploaded documents
- screenshots
- code investigation
- bug reproduction
- test failures
- production logs
- design decisions
- naming decisions
- architecture decisions
- security/payment/auth decisions
- UX standards
- operational discoveries

## Existing Project Adoption Rule

For existing projects, code/docs/config are evidence of current reality, not automatically final truth.

Adoption should:
- capture observed reality
- infer initial truth
- mark uncertainty
- identify conflicts
- create open questions
- avoid changing source code unless requested

## Truth Capture Questions

Before and after implementation, ask:

Did this task introduce or change:

- Product identity?
- Product category?
- Primary users or roles?
- Feature scope?
- Canonical terminology?
- UX standards?
- Architecture boundaries?
- Data model?
- Payment behavior?
- Auth/permissions?
- Security expectations?
- Production-readiness claims?
- Testing/release requirements?
- Operational process?

If yes:

- Update the relevant Wiki file.
- Update Workspace/current-task.
- Check Governance/drift-guard.
- Mention the update in the close-out report.

## Required Result

Every meaningful task must report:

- New truth detected: YES / NO
- Wiki updated: YES / NO / N/A
- Notes:
  - TBD
