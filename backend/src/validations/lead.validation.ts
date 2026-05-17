import { z } from "zod";

export const createLeadSchema =
  z.object({
    name: z
      .string()
      .min(2),

    email: z
      .string()
      .email(),

    status: z.enum([
      "new",
      "contacted",
      "qualified",
      "converted",
      "lost",
    ]),

    source: z.enum([
      "website",
      "facebook",
      "linkedin",
      "instagram",
      "referral",
    ]),
  });

export const updateLeadSchema =
  z.object({
    name: z
      .string()
      .min(2)
      .optional(),

    email: z
      .string()
      .email()
      .optional(),

    status: z
      .enum([
        "new",
        "contacted",
        "qualified",
        "converted",
        "lost",
      ])
      .optional(),

    source: z
      .enum([
        "website",
        "facebook",
        "linkedin",
        "instagram",
        "referral",
      ])
      .optional(),
  });