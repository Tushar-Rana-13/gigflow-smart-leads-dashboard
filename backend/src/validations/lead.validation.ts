import { z } from "zod";

export const createLeadSchema = z.object({
  name: z.string().min(2),

  email: z.string().email(),

  status: z
    .enum([
      "new",
      "contacted",
      "qualified",
      "lost",
    ])
    .optional(),

  source: z.enum([
    "website",
    "instagram",
    "referral",
  ]),
});

export const updateLeadSchema =
  createLeadSchema.partial();