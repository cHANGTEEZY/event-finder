import * as z from "zod";

export const eventSchema = z.object({
  eventName: z
    .string()
    .min(5, { message: "Event name must be at least 5 characters" }),
  eventDate: z.date(),

  eventTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Event time must be in HH:mm format",
  }),

  duration: z.string().regex(/^([0-9]{1,2}):[0-5][0-9]$/, {
    message: "Duration must be in HH:mm format",
  }),

  location: z
    .string()
    .min(5, {
      message: "Location must be at least 5 characters long",
    })
    .max(40, {
      message: "Location must be at most 40 characters long",
    }),
});
