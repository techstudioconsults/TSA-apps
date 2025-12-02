import * as z from "zod";

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, "First Name must be at least 2 characters long")
    .min(1, "First Name is required"),
  lastName: z
    .string()
    .min(2, "Last Name must be at least 2 characters long")
    .min(1, "Last Name is required"),
  email: z
    .string()
    .email("Must be a valid email address")
    .min(1, "Email Address is required"),
  phoneNumber: z
    .string()
    .min(11, "Phone Number must be at least 10 characters long")
    .min(1, "Phone Number is required"),
});
// const passwordSchema = z
//   .string()
//   .min(1, { message: "Password is required" })
//   .min(8, { message: "Password must be at least 8 characters long" })
//   .refine((value) => /[a-z]/.test(value), {
//     message: "Password must contain at least one lowercase letter",
//   })
//   .refine((value) => /[A-Z]/.test(value), {
//     message: "Password must contain at least one uppercase letter",
//   })
//   .refine((value) => /\d/.test(value), {
//     message: "Password must contain at least one number",
//   })
//   .refine((value) => /[\W_]/.test(value), {
//     message: "Password must contain at least one special character",
//   });

// export const RegisterSchema = z.object({
//   first_name: z.string().min(1, { message: "First name is required." }).min(3, {
//     message: "First name must be at least 3 characters",
//   }),
//   last_name: z.string().min(1, { message: "Last name is required." }).min(3, {
//     message: "Last name must be at least 3 characters",
//   }),
//   email: z.string().min(1, { message: "Field is required" }).email({
//     message: "Invalid email address",
//   }),
//   password: passwordSchema,
// });

// export const LoginSchema = z.object({
//   email: z.string().min(1, { message: "Email is required" }).email({
//     message: "Invalid email address",
//   }),
//   password: passwordSchema,
//   rememberMe: z.boolean().default(false).optional(),
// });

// export const OtpSchema = z.object({
//   token: z.string(),
//   email: z.string().email().optional(),
// });

export const contactFormSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full Name must be at least 2 characters long")
    .min(1, "Full Name is required"),
  email: z
    .string()
    .email("Must be a valid email address")
    .min(1, "Email Address is required"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters long")
    .min(1, "Message is required"),
});

export const registerFormSchema = formSchema.merge(
  z.object({
    courseId: z
      .string()
      .min(1, "Course is required")
      .refine((value) => value !== "", {
        message: "Please select a course",
      }),
    schedule: z
      .string()
      .min(1, "Schedule is required")
      .refine((value) => value !== "", {
        message: "Please select a schedule",
      }),
    newsletter: z.boolean(),
    source: z.string(),
  }),
);

export const signUpFormSchema = formSchema.merge(
  z.object({
    courseId: z
      .string()
      .min(1, "Course is required")
      .refine((value) => value !== "", {
        message: "Please select a course",
      }),
    cohortId: z
      .string()
      .min(1, "Cohort is required")
      .refine((value) => value !== "", {
        message: "Please select a cohort",
      }),
    joinNewsLetter: z.boolean(),
    utm_source: z.string(),
    utm_medium: z.string(),
    utm_content: z.string(),
    utm_term: z.string(),
  }),
);

export const newsletterFormSchema = z.object({
  email: z
    .string()
    .email("Must be a valid email address")
    .min(1, "Email Address is required"),
});

// type declaration
export type ContactFormData = z.infer<typeof contactFormSchema>;
export type RegisterFormData = z.infer<typeof registerFormSchema>;
export type SignUpFormData = z.infer<typeof signUpFormSchema>;
export type newsletterFormData = z.infer<typeof newsletterFormSchema>;
