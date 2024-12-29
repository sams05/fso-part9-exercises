import { HealthCheckEntry, HealthCheckRating } from "../../../types";
import { Box, Typography } from "@mui/material";
import { MedicalServices, Favorite } from "@mui/icons-material";
import { green, yellow, orange, red } from '@mui/material/colors';

const HealthCheckEntryDetails = ({
  entry,
  getDiagnosisName,
}: {
  entry: HealthCheckEntry;
  getDiagnosisName: (a: string) => string | undefined;
}) => {
  let ratingStyle: {color: typeof green[500] | typeof yellow[500] | typeof orange[500] | typeof red[500]};
  switch (entry.healthCheckRating) {
    case HealthCheckRating.Healthy:
      ratingStyle = {color: green[500]};
      break;
    case HealthCheckRating.LowRisk:
      ratingStyle = {color: yellow[500]};
      break;
    case HealthCheckRating.HighRisk:
      ratingStyle = {color: orange[500]};
      break;
    case HealthCheckRating.CriticalRisk:
      ratingStyle = {color: red[500]};
      break;
    default:
      const _exhaustiveCheck: never = entry.healthCheckRating;
      return _exhaustiveCheck;
      break;
  }

  return (
    <Box sx={{ border: "1px solid black", m: 1 }}>
      <Typography variant="body1">
        {entry.date} <MedicalServices />
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

      <Favorite sx={ratingStyle} />

      <Typography variant="body1">diagnose by {entry.specialist}</Typography>
    </Box>
  );
};

export default HealthCheckEntryDetails;
