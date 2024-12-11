import * as z from "zod";

export const schoolRegistrationSchema = z.object({
  schoolName: z.string().min(1, "School name is required"),
  subdomain: z.string().min(1, "Subdomain is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Confirm password is required"),
  phone: z.string().min(10, "Phone number is required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type SchoolRegistrationFormData = z.infer<typeof schoolRegistrationSchema>;