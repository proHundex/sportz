// src/validation/matches.js
import { z } from "zod";

// Match status constants
export const MATCH_STATUS = {
  SCHEDULED: "scheduled",
  LIVE: "live",
  FINISHED: "finished",
};

// Query schema for listing matches
export const listMatchesQuerySchema = z.object({
  limit: z.coerce
    .number()
    .int()
    .positive()
    .max(100)
    .optional(),
});

// Params schema for match ID
export const matchIdParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

// ISO datetime schema (replaces custom validator)
const isoDateString = z.iso.datetime();

// Schema for creating a match
export const createMatchSchema = z
  .object({
    sport: z.string().min(1, "Sport is required"),
    homeTeam: z.string().min(1, "Home team is required"),
    awayTeam: z.string().min(1, "Away team is required"),

    // ✅ use isoDateString directly
    startTime: isoDateString,
    endTime: isoDateString,

    homeScore: z.coerce.number().int().min(0).optional(),
    awayScore: z.coerce.number().int().min(0).optional(),
  })
  .superRefine((data, ctx) => {
    const start = new Date(data.startTime);
    const end = new Date(data.endTime);

    if (end <= start) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "endTime must be after startTime",
        path: ["endTime"],
      });
    }
  });

// Schema for updating scores
export const updateScoreSchema = z.object({
  homeScore: z.coerce.number().int().min(0),
  awayScore: z.coerce.number().int().min(0),
});