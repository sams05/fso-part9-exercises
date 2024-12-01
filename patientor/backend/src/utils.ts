import { NewPatient, Gender } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isSSN = (ssn: string): boolean => {
    return /^\d{6}-\d{2,4}[A-Z]?$/.test(ssn);
};

const isGender = (gender: string): gender is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(gender);
};

const parseName = (name: unknown): string => {
    if(!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }

    return name;
};

const parseDate = (date: unknown): string => {
    if(!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date');
    }

    return date;
};

const parseSSN = (ssn: unknown): string => {
    if(!ssn || !isString(ssn) || !isSSN(ssn)) {
        throw new Error('Incorrect or missing SSN');
    }

    return ssn;
};

const parseGender = (gender: unknown): Gender => {
    if(!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender');
    }

    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if(!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }

    return occupation;
};

export const parseNewPatient = (obj: unknown): NewPatient => {
    if(!obj || typeof obj !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if(!('name' in obj && 'dateOfBirth' in obj && 'ssn' in obj && 'gender' in obj && 'occupation' in obj)) {
        throw new Error('Missing data');
    }
    return {
        name: parseName(obj.name),
        dateOfBirth: parseDate(obj.dateOfBirth),
        ssn: parseSSN(obj.ssn),
        gender: parseGender(obj.gender),
        occupation: parseOccupation(obj.occupation)
    };
};
