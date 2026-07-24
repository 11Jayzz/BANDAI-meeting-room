# WWG Generate Governance Report

## Summary

Generation completed using safe generated-section and WWG-owned file rules.

## Command

`wwg generate-governance --target C:\Users\Renz\Documents\bnpi-sm\bnpi-sm-api --format plain`

## Target

.

## Source Artifacts Read

- None.

## Files Created

- None.

## Files Updated

- None.

## Files Skipped

- governance/project-readiness-checklist.md - Generated section SELECTED_PROFILE_GATES was not found.
- governance/project-readiness-checklist.md - Generated section APPROVAL_GATED_AREAS was not found.
- governance/project-readiness-checklist.md - Generated section EVIDENCE_STANDARDS_SUMMARY was not found.
- governance/truth-capture.md - Existing file has no safe generated section.
- governance/drift-guard.md - Existing file has no safe generated section.

## Generated Sections Updated

- None.

## Principle Review

- Principles reviewed:
  - Source Wiki artifacts and generated agent/governance outputs were checked for principle references.
- Principles updated:
  - None by generation.
- Candidate principle changes:
  - None.
- Principle drift concerns:
  - Review warnings above if principle source artifacts were skipped.

## Conflicts / Warnings

- governance/drift-guard.md: Existing file has no safe generated section.
- governance/project-readiness-checklist.md: Generated section APPROVAL_GATED_AREAS was not found.
- governance/project-readiness-checklist.md: Generated section EVIDENCE_STANDARDS_SUMMARY was not found.
- governance/project-readiness-checklist.md: Generated section SELECTED_PROFILE_GATES was not found.
- governance/truth-capture.md: Existing file has no safe generated section.


## Validation Performed

- Verified wwg.project.yaml exists and can be parsed.
- Compiled generation inputs deterministically without LLM calls.
- Applied generated-section safety rules.
- Recorded markdown and JSON generation reports.

## WWG Truth Synchronization

- Task mode: generation
- New truth detected: NO
- Wiki updated: NO / N/A
- Workspace updated: NO / N/A
- Governance review completed: YES
- Drift status: NONE / LOW / MEDIUM / HIGH
- Canonical files changed:
  - None by deterministic generation unless listed above.
- Implementation discoveries synced:
  - None.
- Remaining stale context:
  - Review skipped files and missing canonical sources above.

## Next Steps

- Review skipped files before using `--force`.
- Edit canonical Wiki truth before refreshing generated Workspace or Governance outputs.
