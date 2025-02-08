import { z } from "zod";

export const logInSchema = z.object({
    email: z.string().email({message: "Invalid Email"}),
    password : z.string().min(8, {message: "password must contain atleast 8 characters"})
})