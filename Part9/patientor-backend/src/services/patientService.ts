import { v4 as uuid } from 'uuid';
import patientsData from '../../data/patients';
import { Patient, NewPatient } from '../types';

const patients: Array<Patient> = patientsData;

const getPatientsWithoutSsn = (): Omit<Patient, 'ssn' | 'entries'>[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const getPatientWithId = (id:string): Patient | undefined => {
    return patients.find(patient => patient.id === id);
};

const addPatient = (patient: NewPatient): Patient => {
    const obj = patient as Patient;
    obj.id = uuid();
    patients.push(obj);
    return obj;
};

export default {
    getPatientsWithoutSsn,
    getPatientWithId,
    addPatient
};