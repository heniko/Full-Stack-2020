/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient, Gender, Type, Entry, HealthCheckRating } from './types';

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: any): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (gender: any): gender is Gender => {
    return Object.values(Gender).includes(gender);
};

const isEntry = (entry: any): entry is Entry => {
    return Object.values(Type).includes(entry.type);
};

const isType = (type: any): type is Type => {
    return Object.values(Type).includes(type);
};

const parseName = (name: any): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name: ' + name);
    }

    return name;
};

const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }

    return date;
};

const parseSsn = (ssn: any): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn: ' + ssn);
    }

    return ssn;
};

const parseGender = (gender: any): Gender => {
    if (!isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }

    return gender;
};

const parseOccupation = (occupation: any): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation: ' + occupation);
    }

    return occupation;
};

const parseEntries = (entries: []): [] => {
    if (!Array.isArray(entries)) {
        throw new Error('Incorrect or missing entries ' + entries);
    }
    for (let i = 0; i < entries.length; i++) {
        if (!isEntry(entries[i])) {
            throw new Error('Incorrect or missing entries ' + entries);
        }
    }

    return entries;
};

const parseDescription = (description: any): string => {
    if (!description || !isString(description)) {
        throw new Error('Missing or invalid description');
    }

    return description;
};

const parseSpecialist = (specialist: any): string => {
    if (!specialist || !isString(specialist)) {
        throw new Error('Missing or invalid specialist');
    }

    return specialist;
};

const parseType = (type: any): Type => {
    if (!isType(type)) {
        throw new Error('Missing or invalid type');
    }

    return type;
};

const isHealthCheckRating = (rating: any): rating is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(rating);
};

const parseHealthCheckRating = (rating: any): HealthCheckRating => {
    if (!isHealthCheckRating(rating)) {
        throw new Error('Missing or incorrect heathCheckRating');
    }

    return rating;
};

const parseDiagnosisCodes = (codes: any): Array<string> => {
    if (!Array.isArray(codes)) {
        throw new Error('Invalid or missing diagnosis codes');
    }
    for (let i = 0; i < codes.length; i++) {
        if (!isString(codes[i])) {
            throw new Error('Invalid or missing diagnosis codes');
        }
    }

    return codes;
};

const parseDischarge = (discharge: any): { date: string, criteria: string } => {
    if (!discharge ||
        !isString(discharge.date) ||
        !isString(discharge.criteria) ||
        !isDate(discharge.date)) {
        throw new Error('Invalid or missing discharge');
    }

    return {
        date: discharge.date,
        criteria: discharge.criteria
    };
};

const parseSickLeave = (leave: any): { startDate: string, endDate: string } => {
    if (!leave ||
        !isString(leave.startDate) ||
        !isString(leave.endDate) ||
        !isDate(leave.startDate) ||
        !isDate(leave.endDate)) {
        throw new Error('Invalid sickLeave');
    }

    return {
        startDate: leave.startDate,
        endDate: leave.endDate
    };
};

const parseEmplyerName = (employer: any): string => {
    if (!employer || !isString(employer)) {
        throw new Error('Invalid or missing emplyer name');
    }

    return employer;
};

export const toNewEntry = (entry: any): Entry => {
    const assertNever = (value: never): never => {
        throw new Error(
            `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };

    const type = parseType(entry.type);

    let newEntry: Entry = new Object as Entry;

    switch (type) {
        case Type.HealthCheckEntry:
            newEntry = {
                id: "",
                description: parseDescription(entry.description),
                date: parseDate(entry.date),
                specialist: parseSpecialist(entry.specialist),
                type: Type.HealthCheckEntry,
                healthCheckRating: parseHealthCheckRating(entry.healthCheckRating)
            };
            if (entry.diagnosisCodes) {
                newEntry.diagnosisCodes = parseDiagnosisCodes(entry.diagnosisCodes);
            }
            break;
        case Type.HospitalEntry:
            newEntry = {
                id: "",
                description: parseDescription(entry.description),
                date: parseDate(entry.date),
                specialist: parseSpecialist(entry.specialist),
                type: Type.HospitalEntry,
                discharge: parseDischarge(entry.discharge)
            };
            if (entry.diagnosisCodes) {
                newEntry.diagnosisCodes = parseDiagnosisCodes(entry.diagnosisCodes);
            }
            break;
        case Type.OccupationalHealthCareEntry:
            newEntry = {
                id: "",
                description: parseDescription(entry.description),
                date: parseDate(entry.date),
                specialist: parseSpecialist(entry.specialist),
                type: Type.OccupationalHealthCareEntry,
                employerName: parseEmplyerName(entry.employerName)
            };
            if (entry.sickLeave) {
                newEntry.sickLeave = parseSickLeave(entry.sickLeave);
            }
            if (entry.diagnosisCodes) {
                newEntry.diagnosisCodes = parseDiagnosisCodes(entry.diagnosisCodes);
            }
            break;
        default:
            assertNever(type);
    }

    return newEntry;
};

export const toNewPatient = (object: any): NewPatient => {
    return {
        name: parseName(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        entries: parseEntries(object.entries)
    };
};