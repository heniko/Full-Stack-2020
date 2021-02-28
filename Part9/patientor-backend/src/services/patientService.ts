import { v4 as uuid } from 'uuid';
import patientsData from '../../data/patients';
import { Patient, NewPatient, NewEntry, Entry } from '../types';

let patients: Array<Patient> = patientsData;

const getPatientsWithoutSsn = (): Omit<Patient, 'ssn' | 'entries'>[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const getPatientWithId = (id: string): Patient | undefined => {
    return patients.find(patient => patient.id === id);
};

const addPatient = (patient: NewPatient): Patient => {
    const obj = patient as Patient;
    obj.id = uuid();
    patients.push(obj);
    return obj;
};

const addEntry = (patient: Patient, entry: NewEntry): Patient => {
    const obj = entry as Entry;
    obj.id = uuid();
    const updatedPatient: Patient = {
        ...patient,
        entries: [
            obj,
            ...patient.entries
        ]
    };
    patients = patients.map(pat => updatedPatient.id === pat.id ? updatedPatient : pat);
    return updatedPatient;
};

export default {
    getPatientsWithoutSsn,
    getPatientWithId,
    addPatient,
    addEntry
};