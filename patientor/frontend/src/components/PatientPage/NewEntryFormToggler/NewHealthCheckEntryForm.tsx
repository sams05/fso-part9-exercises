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
import { Entry, HealthCheckRating } from "../../../types";

const NewHealthCheckEntryForm = ({
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
  const [healthCheckRating, setHealthCheckRating] = useState(0);

  const submit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      const newEntry = await patientService.createEntry(patientId, {
        type: "HealthCheck",
        description,
        date,
        specialist,
        diagnosisCodes: diagnosisCodes.length > 0 ? diagnosisCodes : undefined,
        healthCheckRating: healthCheckRating,
      });
      updateEntries(newEntry);

      setDescription("");
      setDate("");
      setSpecialist("");
      setDiagnosisCodes([]);
      setHealthCheckRating(0);
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
        <Typography variant="h5">New HealthCheck entry</Typography>
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
        <FormControl fullWidth margin="normal">
          <InputLabel id="health-check-rating-label">
            Health Check Rating
          </InputLabel>
          <Select
            required
            labelId="health-check-rating-label"
            id="health-check-rating"
            value={healthCheckRating}
            label="Health Check Rating"
            onChange={({ target }) => setHealthCheckRating(+target.value)}
          >
            {Object.entries(HealthCheckRating).filter(([key]) => isNaN(+key)).map(([option, value]) => (
              <MenuItem key={option} value={value}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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

export default NewHealthCheckEntryForm;
