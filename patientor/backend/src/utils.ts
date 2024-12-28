import { Gender, HealthCheckRating, NewEntry } from "./types";
import { z } from "zod";

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string().regex(/^\d{6}-\d{2,4}[A-Z]?$/),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});

const NewBaseEntrySchema = z.object({
  description: z.string(),
  date: z.string().date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});

const NewHealthCheckEntrySchema = NewBaseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.nativeEnum(HealthCheckRating),
});

const NewHospitalEntrySchema = NewBaseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: z
    .object({
      date: z.string().date(),
      criteria: z.string(),
    })
    .optional(),
});

const NewOccupationalHealthcareEntry = NewBaseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.string().date(),
      endDate: z.string().date(),
    })
    .optional(),
});

const NewEntrySchema = z.discriminatedUnion("type", [
  NewHealthCheckEntrySchema,
  NewHospitalEntrySchema,
  NewOccupationalHealthcareEntry,
]);

// Wrapper for NewDisciminatedEntrySchema.parse for cleaner function signature
export const parseNewEntry = (object: unknown): NewEntry =>
  NewEntrySchema.parse(object);
