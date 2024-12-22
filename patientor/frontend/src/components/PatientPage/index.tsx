import { useParams } from "react-router-dom";
import { Patient } from "../../types";
import { useEffect, useState } from "react";
import patientService from "../../services/patients.ts";
import { Typography } from "@mui/material";
import { Male, Female } from "@mui/icons-material";

const PatientPage = () => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient | null>(null);

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

  if (!patient) {
    return <div>Error, patient not found</div>;
  }

  return (
    <div>
      <Typography variant="h5">
        {patient.name}
        {patient.gender === "male" && <Male />}
        {patient.gender === "female" && <Female />}
      </Typography>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
    </div>
  );
};

export default PatientPage;
