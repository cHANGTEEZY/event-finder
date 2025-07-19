import * as z from "zod";

export const baseSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be atleast 8 characters long" }),
});

export const signUpSchema = baseSchema
  .extend({
    username: z.string().min(4, {
      message: "Username must be at least 4 characters",
    }),
    firstName: z
      .string()
      .min(4, {
        message: "First name must be at least 4 characters",
      })
      .max(20, {
        message: "Firstname must be max of 20 character",
      }),
    lastName: z
      .string()
      .min(4, {
        message: "Lastname must be at least 4 characters",
      })
      .max(20, {
        message: "Lastname must be max of 20 characters",
      }),
    confirmPassword: z.string().min(1, {
      message: "Confirm Password is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and confirm password do not match",
    path: ["confirmPassword"],
  });
