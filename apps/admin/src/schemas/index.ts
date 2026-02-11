import * as z from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .email("Must be a valid email address")
    .min(1, "Email Address is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .min(1, "password is required"),
});

export const classFormSchema = z.object({
  title: z.string().min(1, "Class title is required"),
  fee: z.string().min(1, "Fee is required"),
  startDate: z.string().min(1, "Start date is required"),
  // endDate: z.string().min(1, "End date is required"),
  courseId: z.string().min(1, "Course selection is required"),
  type: z.enum(["online", "weekday", "weekend"], {
    required_error: "Please select a preference",
  }),
  description: z.string().min(1, "Description is required"),
});

export const classSubmitFormSchema = z.object({
  title: z.string().min(1, "Class title is required"),
  fee: z.string().min(1, "Fee is required"),
  startDate: z.string().min(1, "Start date is required"),
  // endDate: z.string().min(1, "End date is required"),
  type: z.enum(["online", "weekday", "weekend"], {
    required_error: "Please select a preference",
  }),
  description: z.string().min(1, "Description is required"),
  // courseId: z.string().min(1, "Class title is required"),
});

export const SheetsFormSchema = z.object({
  title: z.string().min(1, "Sheet title is required"),
  type: z.enum(["online", "physical"]).optional(),
});

export const CourseFormSchema = z.object({
  title: z.string().min(1, "Course title is required"),
  slug: z.string().optional(),
  about: z.string().min(1, "Description is required"),
  onlineDuration: z.number().min(1, "Online Duration must be at least 1 week"),
  weekdayDuration: z
    .number()
    .min(1, "Weekday Duration must be at least 1 week"),
  weekendDuration: z
    .number()
    .min(1, "Weekend Duration must be at least 1 week"),
  curriculum: z.instanceof(File, { message: "Curriculum file is required" }),
});

export type courseFormData = z.infer<typeof CourseFormSchema>;
export type signInFormData = z.infer<typeof signInSchema>;
export type classFormData = z.infer<typeof classFormSchema>;
export type classSubmitFormData = z.infer<typeof classSubmitFormSchema>;
export type SheetFormData = z.infer<typeof SheetsFormSchema>;
