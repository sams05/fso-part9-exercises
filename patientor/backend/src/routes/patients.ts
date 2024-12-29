import express, { Request, Response, NextFunction } from "express";
import patientService from "../services/patientService";
import { NewPatientSchema, parseNewEntry } from "../utils";
import { Patient, NewPatient, NewEntry, Entry } from "../types";
import { z } from "zod";
import {fromError} from 'zod-validation-error';

const router = express.Router();

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  NewPatientSchema.parse(req.body);
  next();
};

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
  parseNewEntry(req.body);
  next();
};

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    const validationError = fromError(error);
    res.status(400).send({ validationError: validationError.toString() });
  } else {
    next(error);
  }
};

router.get("/", (_req, res) => {
  res.json(patientService.getPatients());
});

router.get("/:id", (req, res) => {
  const patient = patientService.getPatient(req.params.id);
  if (patient) {
    res.json(patient);
  } else {
    res.status(404).end();
  }
});

router.get("/:id/entries", (req, res) => {
  const patient = patientService.getPatient(req.params.id);
  if (patient) {
    res.json(patient.entries);
  } else {
    res.status(404).end();
  }
});

router.post(
  "/",
  newPatientParser,
  (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const addedPatient = patientService.addPatient(req.body);
    res.json(addedPatient);
  }
);

router.post(
  "/:id/entries",
  newEntryParser,
  (req: Request<{ id: string }, unknown, NewEntry>, res: Response<Entry>) => {
    const patient = patientService.getPatient(req.params.id);
    if (patient) {
      const addedEntry = patientService.addEntry(req.params.id, req.body);
      res.json(addedEntry);
    } else {
      res.status(404).end();
    }
  }
);

router.use(errorMiddleware);

export default router;
