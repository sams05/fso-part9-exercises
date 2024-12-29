import { Entry } from "../../../types";
import HealthCheckEntryDetails from "./HealthCheckEntryDetails";
import HospitalEntryDetails from "./HospitalEntryDetails";
import OccupationalHealthcareEntryDetails from "./OccupationalHealthcareEntryDetails";

const assertNever = (value: never) => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const EntryDetails = ({entry, getDiagnosisName}: {entry: Entry, getDiagnosisName: (a: string) => string | undefined;}) => {
    switch (entry.type) {
        case "HealthCheck":
            return <HealthCheckEntryDetails entry={entry} getDiagnosisName={getDiagnosisName} />;
            break;
        case "OccupationalHealthcare":
            return <OccupationalHealthcareEntryDetails entry={entry} getDiagnosisName={getDiagnosisName} />;
            break;
        case "Hospital":
            return <HospitalEntryDetails entry={entry} getDiagnosisName={getDiagnosisName} />;
            break;
        default:
            assertNever(entry);
    }
};

export default EntryDetails;