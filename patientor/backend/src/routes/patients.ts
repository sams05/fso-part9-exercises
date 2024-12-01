import express from 'express';
import patientService from '../services/patientService';
import { parseNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.json(patientService.getNonSensitivePatients());
});

router.post('/', (req, res) => {
    try {
        const newPatient = parseNewPatient(req.body);
        const addedPatient = patientService.addPatient(newPatient);
        res.json(addedPatient);
    } catch(error: unknown) {
        let errorMessage = 'Something went wrong.';
        if(error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).json({
            error: errorMessage
        });
    }
});

export default router;