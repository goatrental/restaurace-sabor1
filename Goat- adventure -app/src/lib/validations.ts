import { z } from "zod";

export const bookingSchema = z.object({
  adventureId: z.string().min(1),
  customerName: z.string().min(2, "Name is required"),
  customerEmail: z.string().email("Invalid email"),
  customerPhone: z.string().min(5, "Phone is required"),
  date: z.string().min(1, "Date is required"),
  adults: z.number().int().min(1, "At least 1 adult"),
  children: z.number().int().min(0),
  message: z.string().optional(),
});

export const adventureSchema = z.object({
  title: z.string().min(2, "Title is required"),
  slug: z.string().min(2, "Slug is required"),
  description: z.string().min(10, "Description is required"),
  scheduleJson: z.string().min(2, "Schedule is required"),
  adultPrice: z.number().positive("Price must be positive"),
  childPrice: z.number().min(0),
  childFreeNote: z.string().optional(),
  imageUrl: z.string().optional(),
  youtubeUrl: z.string().optional(),
  isActive: z.boolean(),
});

export type BookingInput = z.infer<typeof bookingSchema>;
export type AdventureInput = z.infer<typeof adventureSchema>;
