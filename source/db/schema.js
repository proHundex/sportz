// // src/db/schema.js

// import {pgTable,serial,text,integer,timestamp,jsonb,pgEnum,} from "drizzle-orm/pg-core";

// /**
//  * Enums
//  */
// export const matchStatusEnum = pgEnum("match_status", [
//   "scheduled",
//   "live",
//   "finished",
// ]);

// /**
//  * Matches Table
//  */
// export const matches = pgTable("matches", {
//   id: serial("id").primaryKey(),

//   sport: text("sport").notNull(),

//   homeTeam: text("home_team").notNull(),
//   awayTeam: text("away_team").notNull(),

//   status: matchStatusEnum("status")
//     .notNull()
//     .default("scheduled"),

//   startTime: timestamp("start_time", { withTimezone: true }),
//   endTime: timestamp("end_time", { withTimezone: true }),

//   homeScore: integer("home_score").notNull().default(0),
//   awayScore: integer("away_score").notNull().default(0),

//   createdAt: timestamp("created_at", { withTimezone: true })
//     .defaultNow()
//     .notNull(),
// });

// /**
//  * Commentary Table
//  */
// export const commentary = pgTable("commentary", {
//   id: serial("id").primaryKey(),

//   matchId: integer("match_id")
//     .notNull()
//     .references(() => matches.id, { onDelete: "cascade" }),

//   minute: integer("minute"),
//   sequence: integer("sequence"),

//   period: text("period"), // e.g. 1H, 2H, ET
//   eventType: text("event_type"), // goal, foul, corner, etc

//   actor: text("actor"), // player or system
//   team: text("team"),

//   message: text("message").notNull(),

//   metadata: jsonb("metadata"),

//   tags: text("tags").array(),

//   createdAt: timestamp("created_at", { withTimezone: true })
//     .defaultNow()
//     .notNull(),
// });

/**
 * Database schema definitions for the application.
 *
 * This module defines:
 * - Enums
 * - Tables
 * - Relationships
 *
 * @module schema
 */

import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  jsonb,
  pgEnum,
} from "drizzle-orm/pg-core";

/**
 * Match status enum representing the lifecycle of a match.
 * @enum {string}
 */
export const matchStatusEnum = pgEnum("match_status", [
  "scheduled",
  "live",
  "finished",
]);

/**
 * Matches table schema.
 *
 * Stores information about sports matches including:
 * teams, scores, timing, and status.
 */
export const matches = pgTable("matches", {
  id: serial("id").primaryKey(),

  sport: text("sport").notNull(),

  homeTeam: text("home_team").notNull(),
  awayTeam: text("away_team").notNull(),

  status: matchStatusEnum("status")
    .notNull()
    .default("scheduled"),

  startTime: timestamp("start_time", { withTimezone: true }),
  endTime: timestamp("end_time", { withTimezone: true }),

  homeScore: integer("home_score").notNull().default(0),
  awayScore: integer("away_score").notNull().default(0),

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

/**
 * Commentary table schema.
 *
 * Stores real-time or recorded match events such as:
 * goals, fouls, and other actions.
 */
export const commentary = pgTable("commentary", {
  id: serial("id").primaryKey(),

  matchId: integer("match_id")
    .notNull()
    .references(() => matches.id, { onDelete: "cascade" }),

  minute: integer("minute"),
  sequence: integer("sequence"),

  period: text("period"), // e.g. 1H, 2H, ET
  eventType: text("event_type"), // goal, foul, etc

  actor: text("actor"),
  team: text("team"),

  message: text("message").notNull(),

  metadata: jsonb("metadata"),

  tags: text("tags").array(),

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});