import { Gender, HealthCheckRating, NewEntry } from "./types";
import { z } from "zod";

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string().regex(/^\d{6}-\d{2,4}[A-Z]?$/),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});

const NewEntrySchema = z.object({
  description: z.string(),
  date: z.string().date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});

const NewHealthCheckEntrySchema = NewEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.nativeEnum(HealthCheckRating),
});

const NewHospitalEntrySchema = NewEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: z
    .object({
      date: z.string().date(),
      criteria: z.string(),
    })
    .optional(),
});

const NewOccupationalHealthcareEntry = NewEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.string().date(),
      endDate: z.string().date(),
    })
    .optional(),
});

const NewDiscriminatedEntrySchema = z.discriminatedUnion("type", [
  NewHealthCheckEntrySchema,
  NewHospitalEntrySchema,
  NewOccupationalHealthcareEntry,
]);

// Wrapper for NewDisciminatedEntrySchema.parse for cleaner function signature
export const parseNewEntry = (object: unknown): NewEntry =>
  NewDiscriminatedEntrySchema.parse(object);
