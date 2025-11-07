import { z } from "zod";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "./blogs";

export const TestimonialSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z
    .string()
    .max(300, "Description must not exceed 300 characters")
    .min(100, "Description must be at least 100  characters"),
  image: z
    .any()
    .refine((files) => files?.length == 1, "file is required.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png , .webp and .dpf files are accepted."
    ),
});