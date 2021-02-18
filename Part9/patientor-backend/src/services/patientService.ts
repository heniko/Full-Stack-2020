import patientsData from '../../data/patients';
import { Patient } from '../types';

const patients: Array<Patient> = patientsData;

const getPatientsWithoutSsn = (): Omit<Patient, 'ssn'>[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = () => {
    return null;
};

export default {
    getPatientsWithoutSsn,
    addPatient
};