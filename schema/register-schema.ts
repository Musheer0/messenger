import { z } from "zod";

export const RegisterSchema = z.object({
    email: z.string().min(4),
    password: z.string().min(6).max(64),
    name: z.string().min(2).max(64),
    
})