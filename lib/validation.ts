import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(20).max(1000),
  category: z.string().min(3).max(50),
  link: z
    .string()
    .url()
    .refine(async (url) => {
      try {
        const res = await fetch(url, { method: "HEAD" });
        const contentType = res.headers.get("content-type");

        // Loosen the validation to accept more types of links.
        return contentType ? contentType.includes("image") : true;
      } catch {
        // Allow URLs even if the `HEAD` request fails, as long as they are valid URLs.
        return true;
      }
    }, "The provided URL must point to an image."),
  pitch: z.string().min(10),
});
