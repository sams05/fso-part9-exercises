import { useParams } from "react-router-dom";
import { Diagnosis, Entry, Patient } from "../../types";
import { useEffect, useState } from "react";
import patientService from "../../services/patients.ts";
import diagnosisService from "../../services/diagnoses.ts";
import { Typography } from "@mui/material";
import { Male, Female } from "@mui/icons-material";
import EntryDetails from "./EntryDetails";
import NewEntryForm from "./NewEntryForm";

const PatientPage = () => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosisService.getAll();
      setDiagnoses(diagnoses);
    };

    fetchDiagnoses();
  }, []);

  useEffect(() => {
    const fetchPatient = async (id: string) => {
      const patient = await patientService.get(id);
      setPatient(patient);
    };

    if (id) {
      fetchPatient(id);
    } else {
      setPatient(null);
    }
  }, [id]);

  const getDiagnosisName = (code: Diagnosis["code"]) => {
    const diagnosis = diagnoses?.find((diagnosis) => diagnosis.code === code);
    return diagnosis?.name;
  };

  const updateEntries = (entry: Entry) => {
    if (patient) {
      setPatient({
        ...patient,
        entries: patient.entries.concat(entry),
      });
    }
  };

  if (!patient || !id) {
    return <div>Error, patient not found</div>;
  }

  return (
    <div>
      <Typography variant="h5">
        {patient.name}
        {patient.gender === "male" && <Male />}
        {patient.gender === "female" && <Female />}
      </Typography>
      <Typography variant="body1">ssn: {patient.ssn}</Typography>
      <Typography variant="body1">occupation: {patient.occupation}</Typography>
      <NewEntryForm patientId={id} updateEntries={updateEntries} />
      <div>
        <Typography variant="h6">entries</Typography>
        {patient.entries.map((entry) => (
          <EntryDetails
            key={entry.id}
            entry={entry}
            getDiagnosisName={getDiagnosisName}
          />
        ))}
      </div>
    </div>
  );
};

export default PatientPage;
