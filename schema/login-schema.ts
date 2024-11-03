import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string().min(4),
    password: z.string().min(6).max(64)
})