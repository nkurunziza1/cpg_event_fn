import { z } from "zod";

export const MAX_FILE_SIZE = 5 * 1024 * 1024;
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const BlogsSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  image: z
    .any()
    .refine((files) => files?.length == 1, "file is required.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    ),
});
