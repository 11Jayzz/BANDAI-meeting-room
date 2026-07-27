# WWG Lint Report

## Summary

critical: 0, high: 0, medium: 0, low: 0, info: 6

## Command

`wwg ci validate: lint`

## Repository Type Detected

wwg-native-project

## Findings by Severity

### critical

- None.

### high

- None.

### medium

- None.

### low

- None.

### info

- INFO ambiguous-report-classification: evidence=confirmed risk=low Some report-like files need human classification. Recommendation: Run `wwg reports --target .` and review the Ambiguous / Needs Review section.
- INFO artifact-metadata-present: Template manifest and registry schema metadata are present.
- INFO duplicate-concept-hint: No duplicate concept hints detected beyond intentional template and dogfood separation.
- INFO expected-artifacts-present: Expected key WWG files and directories are present.
- INFO generated-markers-balanced: Generated marker pairs are balanced where present.
- INFO layer-boundaries-clean: No obvious layer boundary filename conflicts detected.

## Duplicate Concept Hints

- No duplicate concept hints detected beyond intentional template and dogfood separation.

## Layer Boundary Hints

- Wiki files should store canonical truth, evidence, and synthesis.
- Workspace files should store agent instructions, context packs, prompts, task templates, and skills.
- Governance files should store validation, quality gates, audits, reviews, and approval policy.

## Template-vs-Dogfood Boundary Hints

- Adopt existing artifacts by mapping them before creating native WWG folders.

## Recommended Next Steps

- Review medium findings before promoting Phase 2A into stricter CI.
- Use `wwg audit --existing` before adopting WWG into mature repositories.
