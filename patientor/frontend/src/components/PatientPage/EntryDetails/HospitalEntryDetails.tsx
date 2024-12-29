import { HospitalEntry } from "../../../types";
import { Box, Typography } from "@mui/material";
import { LocalHospital } from "@mui/icons-material";

const HospitalEntryDetails = ({
  entry,
  getDiagnosisName,
}: {
  entry: HospitalEntry;
  getDiagnosisName: (a: string) => string | undefined;
}) => {
  return (
    <Box sx={{ border: "1px solid black", m: 1 }}>
      <Typography variant="body1">
        {entry.date} <LocalHospital />
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

      {entry.discharge && (
        <Box sx={{ border: "1px solid black" }}>
          <p>Discharged: {entry.discharge.date}</p>
          <p>{entry.discharge.criteria}</p>
        </Box>
      )}

      <Typography variant="body1">diagnose by {entry.specialist}</Typography>
    </Box>
  );
};

export default HospitalEntryDetails;
