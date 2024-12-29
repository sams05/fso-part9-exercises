import { Typography, TextField, Stack, Button, Alert } from "@mui/material";
import React, { useState } from "react";
import patientService from "../../../services/patients";
import { isAxiosError } from "axios";
import { Entry } from "../../../types";

const NewHospitalEntryForm = ({
  patientId,
  updateEntries,
  closeForm,
}: {
  patientId: string;
  updateEntries: (entry: Entry) => void;
  closeForm: () => void;
}) => {
  const [error, setError] = useState<string | null>();

  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  const submit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      const diagnosisCodesArr = diagnosisCodes.split(",");
      const newEntry = await patientService.createEntry(patientId, {
        type: "Hospital",
        description,
        date,
        specialist,
        diagnosisCodes:
          diagnosisCodesArr[0] === diagnosisCodes
            ? undefined
            : diagnosisCodesArr,
        discharge:
          dischargeDate && dischargeCriteria
            ? {
                date: dischargeDate,
                criteria: dischargeCriteria,
              }
            : undefined,
      });
      updateEntries(newEntry);

      setDescription("");
      setDate("");
      setSpecialist("");
      setDiagnosisCodes("");
      setDischargeDate("");
      setDischargeCriteria("");
    } catch (e) {
      if (isAxiosError(e)) {
        if (e?.response?.data && e.response.data?.validationError) {
          setError(e.response.data.validationError);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  return (
    <div>
      {error && <Alert severity="error">{error}</Alert>}
      <form
        style={{ border: "2px solid black", padding: 16 }}
        onSubmit={submit}
      >
        <Typography variant="h5">New Hospital entry</Typography>
        <TextField
          fullWidth
          margin="normal"
          id="description"
          label="Description"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          id="date"
          label="Date"
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          id="specialist"
          label="Specialist"
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          id="diagnosis-codes"
          label="Diagnosis Codes"
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          id="discharge-date"
          label="Discharge Date"
          value={dischargeDate}
          onChange={({ target }) => setDischargeDate(target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          id="discharge-criteria"
          label="Discharge Criteria"
          value={dischargeCriteria}
          onChange={({ target }) => setDischargeCriteria(target.value)}
        />
        <Stack direction="row" justifyContent="space-between">
          <Button color="error" variant="contained" onClick={closeForm}>
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Add
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default NewHospitalEntryForm;
