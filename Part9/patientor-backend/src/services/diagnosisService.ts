import diagnosesData from '../../data/diagnoses';
import { Diagnosis } from '../types';

const diagnoses: Array<Diagnosis> = diagnosesData;

const getDiagnoses = (): Array<Diagnosis> => {
    return diagnoses;
};

const addDiagnosis = () => {
    return null;
};

export default {
    getDiagnoses,
    addDiagnosis
};