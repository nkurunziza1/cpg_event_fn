import { z } from "zod";


export const EmailSchema = z.object({
    message: z.any()
  })