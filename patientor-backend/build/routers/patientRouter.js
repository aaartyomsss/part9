"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const toNewPatient_1 = __importDefault(require("../utils/toNewPatient"));
const toNewEntry_1 = __importDefault(require("../utils/toNewEntry"));
const patientRouter = express_1.default.Router();
patientRouter.get('/', (_req, res) => {
    res.send(patientService_1.default.getPatients());
});
patientRouter.get('/:id', (req, res) => {
    const patientId = req.params.id;
    const patientById = patientService_1.default.getPatients().find(patient => patient.id === patientId);
    res.send(patientById);
});
patientRouter.post('/:id/entries', (req, res) => {
    /* eslint-disable @typescript-eslint/no-unsafe-assignment */
    const patientId = req.params.id;
    const findPatient = patientService_1.default.getPatients().find(patient => patient.id === patientId);
    const { type, date, description, specialist, diagnosisCodes, healthCheckRating, employerName, discharge } = req.body;
    const newEntry = toNewEntry_1.default({
        type,
        date,
        description,
        specialist,
        diagnosisCodes,
        healthCheckRating,
        employerName,
        discharge
    });
    if (findPatient) {
        const toAdd = Object.assign({ id: String(Math.random()) }, newEntry);
        patientService_1.default.updatePatient(toAdd, patientId);
        res.send(toAdd);
    }
    else {
        throw new Error(`Patient was not found`);
    }
});
patientRouter.post('/', (req, res) => {
    /* eslint-disable @typescript-eslint/no-unsafe-assignment */
    const { name, ssn, occupation, gender, dateOfBirth } = req.body;
    const newPatient = toNewPatient_1.default({
        name,
        ssn,
        occupation,
        gender,
        dateOfBirth
    });
    const addedPatient = patientService_1.default.addPatient(newPatient);
    res.json(addedPatient);
});
exports.default = patientRouter;
