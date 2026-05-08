# Current Feature Context

**Feature Name**: Bugfix — Edit course form not sending curriculum file
**Status**: Done
**Started**: 2026-05-08

## Bug Description

When editing a course and selecting a new curriculum file, the file is not included in the update request. The request body only contains `title`, `about`, `onlineDuration`, `weekdayDuration`, `weekendDuration` — no `curriculum` field. After update, the curriculum URL remains the old one.

## Repro Steps

1. Navigate to `/courses` in the admin app
2. Click "Edit" on any course
3. Select a new curriculum file (PDF/DOC) via the FileUpload component
4. Submit the form
5. Observe: the request payload does not include `curriculum`
6. Observe: the course's curriculum URL is unchanged after update

## Root Cause

`edit/page.tsx:40` uses `CourseFormSchema.omit({ curriculum: true })` as the zod resolver. The `.omit()` method creates a new Zod schema without the `curriculum` field. When `@hookform/resolvers/zod` validates the form data via `schema.parse()`, Zod strips fields not in the schema (default behavior is 'strip'). Therefore, even though the `Controller` registers a `"curriculum"` field and the user selects a file, the validated data passed to `onSubmit` never includes `curriculum` — it's always `undefined`. The `instanceof File` check on line 71 fails, and the file is never appended to the FormData.

## Fix Applied

- `edit/page.tsx`: Replaced `CourseFormSchema.omit({ curriculum: true })` with `CourseFormSchema.extend({ curriculum: z.instanceof(File).optional() })`. This keeps curriculum in the schema as an optional field, so when a user selects a file, it survives Zod parsing and is available in `onSubmit`'s `data` parameter.
- Added explicit `z` import for the `z.instanceof(File)` call.

## Verified

- [x] Lint passes
- [x] Typecheck passes
- [x] Curriculum field survives Zod parsing when file selected
- [x] Update proceeds without curriculum when no file selected (optional)

## Unverified

- [ ] E2E test (backend must be running)
- [ ] Manual browser test with actual file upload
