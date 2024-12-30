import { Stack, Button } from "@mui/material";
import { useState } from "react";
import { Entry, FormType } from "../../../types";
import NewHealthCheckEntryForm from "./NewHealthCheckEntryForm";
import NewHospitalEntryForm from "./NewHospitalEntryForm";
import NewOccupationalHealthcareEntryForm from "./NewOccupationalHealthcareEntryForm";

const NewEntryFormToggler = ({
  patientId,
  updateEntries,
  diagnosisCodes,
}: {
  patientId: string;
  updateEntries: (entry: Entry) => void;
  diagnosisCodes: string[] | undefined;
}) => {
  const [formType, setFormType] = useState(FormType.None);

  const closeForm = () => setFormType(FormType.None);

  return (
    <div>
      {formType === FormType.None && (
        <Stack direction="row">
          <Button
            variant="contained"
            onClick={() => setFormType(FormType.HealthCheck)}
          >
            Create New Health Check Entry
          </Button>
          <Button
            variant="contained"
            onClick={() => setFormType(FormType.Hospital)}
          >
            Create New Hospital Entry
          </Button>
          <Button
            variant="contained"
            onClick={() => setFormType(FormType.OccupationalHealthcare)}
          >
            Create New Occupational Healthcare Entry
          </Button>
        </Stack>
      )}
      {formType === FormType.HealthCheck && (
        <NewHealthCheckEntryForm
          patientId={patientId}
          updateEntries={updateEntries}
          closeForm={closeForm}
          diagnosisCodes={diagnosisCodes}
        />
      )}
      {formType === FormType.Hospital && (
        <NewHospitalEntryForm
          patientId={patientId}
          updateEntries={updateEntries}
          closeForm={closeForm}
          diagnosisCodes={diagnosisCodes}
        />
      )}
      {formType === FormType.OccupationalHealthcare && (
        <NewOccupationalHealthcareEntryForm
          patientId={patientId}
          updateEntries={updateEntries}
          closeForm={closeForm}
          diagnosisCodes={diagnosisCodes}
        />
      )}
    </div>
  );
};

export default NewEntryFormToggler;
