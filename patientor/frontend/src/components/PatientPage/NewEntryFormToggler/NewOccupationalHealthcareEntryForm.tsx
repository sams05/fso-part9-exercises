import {
  Typography,
  TextField,
  Stack,
  Button,
  Alert,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import patientService from "../../../services/patients";
import { isAxiosError } from "axios";
import { Entry } from "../../../types";

const NewOccupationalHealthcareEntryForm = ({
  patientId,
  updateEntries,
  closeForm,
  diagnosisCodes: diagnosisCodesOptions,
}: {
  patientId: string;
  updateEntries: (entry: Entry) => void;
  closeForm: () => void;
  diagnosisCodes: string[] | undefined;
}) => {
  const [error, setError] = useState<string | null>();

  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState("");

  const submit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      const newEntry = await patientService.createEntry(patientId, {
        type: "OccupationalHealthcare",
        description,
        date,
        specialist,
        diagnosisCodes: diagnosisCodes.length > 0 ? diagnosisCodes : undefined,
        employerName,
        sickLeave:
          sickLeaveStartDate && sickLeaveEndDate
            ? {
                startDate: sickLeaveStartDate,
                endDate: sickLeaveEndDate,
              }
            : undefined,
      });
      updateEntries(newEntry);

      setDescription("");
      setDate("");
      setSpecialist("");
      setDiagnosisCodes([]);
      setEmployerName("");
      setSickLeaveStartDate("");
      setSickLeaveEndDate("");
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
        <Typography variant="h5">New Occupational Healthcare entry</Typography>
        <TextField
          required
          fullWidth
          margin="normal"
          id="description"
          label="Description"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          type="date"
          required
          fullWidth
          margin="normal"
          id="date"
          label="Date"
          InputLabelProps={{ shrink: true }}
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          required
          fullWidth
          margin="normal"
          id="specialist"
          label="Specialist"
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="diagnosis-codes-label">Diagnosis Codes</InputLabel>
          <Select
            labelId="diagnosis-codes-label"
            id="diagnosis-codes"
            multiple
            value={diagnosisCodes}
            label="Diagnosis Codes"
            onChange={({ target }) =>
              setDiagnosisCodes(
                typeof target.value === "string"
                  ? target.value.split(",")
                  : target.value
              )
            }
          >
            {diagnosisCodesOptions?.map((code) => (
              <MenuItem key={code} value={code}>
                {code}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          required
          fullWidth
          margin="normal"
          id="employer-name"
          label="Employer Name"
          value={employerName}
          onChange={({ target }) => setEmployerName(target.value)}
        />
        <TextField
          type="date"
          fullWidth
          margin="normal"
          id="sick-leave-start-date"
          label="Sick Leave Start Date"
          InputLabelProps={{ shrink: true }}
          value={sickLeaveStartDate}
          onChange={({ target }) => setSickLeaveStartDate(target.value)}
        />
        <TextField
          type="date"
          fullWidth
          margin="normal"
          id="sick-leave-end-date"
          label="Sick Leave End Date"
          InputLabelProps={{ shrink: true }}
          value={sickLeaveEndDate}
          onChange={({ target }) => setSickLeaveEndDate(target.value)}
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

export default NewOccupationalHealthcareEntryForm;
