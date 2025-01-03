import patients from "../../data/patients";
import {
  NonSensitivePatient,
  NewPatient,
  Patient,
  NewEntry,
  Entry,
} from "../types";

const getPatients = (): Patient[] => {
  return patients;
};

const getPatient = (id: string): Patient | undefined => {
  const patient = patients.find((patient) => patient.id === id);
  if (patient) {
    return patient;
  }
  return undefined;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getNonSensitivePatient = (
  id: string
): NonSensitivePatient | undefined => {
  const patient = patients.find((patient) => patient.id === id);
  if (patient) {
    const { id, name, dateOfBirth, gender, occupation } = patient;
    return { id, name, dateOfBirth, gender, occupation };
  }
  return undefined;
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient: Patient = {
    id: crypto.randomUUID(),
    ...patient,
  };
  patients.push(newPatient);
  return newPatient;
};

const addEntry = (patientId: string, entry: NewEntry): Entry => {
  const patient = getPatient(patientId);
  if (!patient) {
    throw new Error("Patient not found");
  }

  const newEntry: Entry = {
    id: crypto.randomUUID(),
    ...entry,
  };
  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  getPatient,
  getNonSensitivePatients,
  getNonSensitivePatient,
  addPatient,
  addEntry,
};
