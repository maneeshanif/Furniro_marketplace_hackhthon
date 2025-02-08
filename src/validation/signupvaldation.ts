import { z } from "zod"

export const signUpSchema = z.object({
    name: z.string().min(3, { message: "Minimum 3 characters are required in a name" }),
    email: z.string().email({ message: "Invalid Email" }),
    password: z.string().min(8, { message: "Password must contain at least 8 characters" })
}).strict()