import * as z from "zod";

export const baseSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, {message: "Password must be atleast 8 characters long"}),
})

export const signUpSchema = baseSchema.extend({
    confirmPassword: z.string().min(1, {
        message: "Confirm Password is required"
    })
}).refine((data)=> data.password === data.confirmPassword,{
    message: "Password and confirm password do not match",
    path: ["confirmPassword"]
})