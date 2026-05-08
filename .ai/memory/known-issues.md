# Known Issues & Technical Debt

Format:

- **Issue**: Brief description
- **Impact**:
- **Workaround**:
- **Mitigation Plan**:
- **Date**: YYYY-MM-DD

---

- **Issue**: LoginForm crashes with `TypeError: Cannot read properties of undefined (reading 'data')` when backend is unreachable
- **Root Cause**: axios throws a network error with no `response` property when the backend is unreachable (`ERR_CONNECTION_REFUSED`). `LoginForm.tsx` accessed `error.response.data.message` without checking if `error.response` exists.
- **Resolution**: Added optional chaining (`error.response?.data?.message`) and a distinct network-error fallback message ("Unable to connect to server. Please check your connection.").
- **Date**: 2026-05-08

---

- **Issue**: Edit course form not sending curriculum file — curriculum field always missing from update request payload
- **Root Cause**: `edit/page.tsx` used `CourseFormSchema.omit({ curriculum: true })` as the zod resolver. Zod's `.omit()` creates a schema without the `curriculum` field, so `schema.parse()` strips it from the validated data. Even when a file is selected via the `FileUpload` Controller, `data.curriculum` is `undefined` in `onSubmit`, so the `instanceof File` guard fails and the file is never appended to FormData.
- **Resolution**: Replaced `.omit({ curriculum: true })` with `CourseFormSchema.extend({ curriculum: z.instanceof(File).optional() })`, making curriculum optional but present in the schema so it survives Zod parsing.
- **Date**: 2026-05-08
