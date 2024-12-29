import { OccupationalHealthcareEntry } from "../../../types";
import { Box, Typography } from "@mui/material";
import { Work } from "@mui/icons-material";

const OccupationalHealthcareEntryDetails = ({
  entry,
  getDiagnosisName,
}: {
  entry: OccupationalHealthcareEntry;
  getDiagnosisName: (a: string) => string | undefined;
}) => {
  return (
    <Box sx={{ border: "1px solid black", m: 1 }}>
      <Typography variant="body1">
        {entry.date} <Work /> <em>{entry.employerName}</em>
      </Typography>
      <Typography variant="body1">
        <em>{entry.description}</em>
      </Typography>

      {entry.diagnosisCodes && (
        <Box sx={{ border: "1px solid black" }}>
          <p>Diagnoses</p>
          <ul>
            {entry.diagnosisCodes.map((code) => (
              <li key={code}>
                {code} {getDiagnosisName(code)}
              </li>
            ))}
          </ul>
        </Box>
      )}

      {entry.sickLeave && (
        <Box sx={{ border: "1px solid black" }}>
          <p>
            On leave: {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
          </p>
        </Box>
      )}

      <Typography variant="body1">diagnose by {entry.specialist}</Typography>
    </Box>
  );
};

export default OccupationalHealthcareEntryDetails;
