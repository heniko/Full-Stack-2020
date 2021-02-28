import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient } from '../utils';
import {Patient} from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getPatientsWithoutSsn());
});

router.get('/:id', (req, res) => {
    try {
        const patient: Patient | undefined = patientService.getPatientWithId(req.params.id);
        if (patient) {
            res.send(patient);
        } else {
            res.status(404).send();
        }
    } catch (error) {
        res.status(400).send((<Error>error).message);
    }
});

router.post('/', (req, res) => {
    try {
        const newPatient = toNewPatient(req.body);
        const addedPatient = patientService.addPatient(newPatient);
        res.send(addedPatient);
    } catch (error) {
        res.status(400).send((<Error>error).message);
    }
});

export default router;