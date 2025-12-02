import { z } from "zod";

export const marketingCycleSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
});

export type MarketingCycleFormData = z.infer<typeof marketingCycleSchema>;

export interface MarketingCycle extends MarketingCycleFormData {
  id: string;
  createdAt: string;
}
