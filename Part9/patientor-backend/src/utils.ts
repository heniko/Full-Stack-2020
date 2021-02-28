/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient, Gender, Type, Entry } from './types';

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
}

const parseName = (name: any): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name: ' + name);
    }

    return name;
};

const parseDateOfBirth = (date: any): string => {
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

export const toNewPatient = (object: any): NewPatient => {
    return {
        name: parseName(object.name),
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        entries: parseEntries(object.entries)
    };
};