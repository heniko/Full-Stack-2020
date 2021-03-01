import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient, toNewEntry } from '../utils';
import { Patient } from '../types';

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
        res.status(400).send({ error: (<Error>error).message });
    }
});

router.post('/:id/entries', (req, res) => {
    try {
        const newEntry = toNewEntry(req.body);
        const patient: Patient | undefined = patientService.getPatientWithId(req.params.id);
        if (patient) {
            const updatedPatient = patientService.addEntry(patient, newEntry);
            res.send(updatedPatient);
        } else {
            res.status(404).send();
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: (<Error>error).message });
    }
});

router.post('/', (req, res) => {
    try {
        const newPatient = toNewPatient(req.body);
        const addedPatient = patientService.addPatient(newPatient);
        res.send(addedPatient);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: (<Error>error).message });
    }
});

export default router;