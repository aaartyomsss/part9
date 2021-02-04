import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils/toNewPatient';
import toNewEntry from '../utils/toNewEntry';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
    res.send(patientService.getPatients());
});

patientRouter.get('/:id', (req, res) => {
    const patientId: string = req.params.id;
    const patientById = patientService.getPatients().find(patient => patient.id === patientId);
    res.send(patientById);
});

patientRouter.post('/:id/entries', (req, res) => {
    /* eslint-disable @typescript-eslint/no-unsafe-assignment */
    const patientId: string = req.params.id;
    const findPatient = patientService.getPatients().find(patient => patient.id === patientId);
    const { type, date, description, specialist, diagnosisCodes, healthCheckRating, employerName } = req.body;
    const newEntry = toNewEntry({
        type,
        date,
        description,
        specialist,
        diagnosisCodes,
        healthCheckRating,
        employerName
    });
    if(findPatient){
        const updated = patientService.updatePatient(newEntry, patientId);
        res.send(updated);
    } else {
        throw new Error(`Patient was not found`);
    }
});

patientRouter.post('/', (req, res) => {
    /* eslint-disable @typescript-eslint/no-unsafe-assignment */
    const { name, ssn, occupation, gender, dateOfBirth } = req.body;
    const newPatient = toNewPatient({
        name, 
        ssn, 
        occupation, 
        gender,
        dateOfBirth
    });

    const addedPatient = patientService.addPatient(newPatient);

    res.json(addedPatient);

});

export default patientRouter;