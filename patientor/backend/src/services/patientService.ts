import patients from "../../data/patients";
import { NonSensitivePatient, NewPatient, Patient } from "../types";

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
    const newPatient: Patient = {
        id: crypto.randomUUID(),
        ...patient
    };
    patients.push(newPatient);
    return newPatient;
};

export default {
    getNonSensitivePatients,
    addPatient
};