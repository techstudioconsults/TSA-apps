# Last Agent Output

**Agent**: bugfix — DONE 2026-05-08T09:00:00Z

## Summary

- Fixed bug: Edit course form not sending curriculum file
- Modified `edit/page.tsx:40` — replaced `CourseFormSchema.omit({ curriculum: true })` with `CourseFormSchema.extend({ curriculum: z.instanceof(File).optional() })`.
- Root cause: Zod's `.omit()` creates a schema without the `curriculum` field, so `schema.parse()` strips it from validated data. `data.curriculum` was always `undefined` in `onSubmit`, so the `instanceof File` guard always failed and the file was never appended to FormData.

## Verified

- Lint passes (no new warnings)
- Typecheck passes (`tsc --noEmit` clean)
- Curriculum field now survives Zod parsing (File instance passes `z.instanceof(File).optional()`)
- When no file selected, curriculum is `undefined` (optional field), FormData excludes it correctly

## Unverified

- E2E test with running backend to confirm curriculum file appears in update request
- Manual browser UI test with file upload flow
