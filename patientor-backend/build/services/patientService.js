"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../data/patients"));
const patients = patients_1.default;
const getPatients = () => {
    return patients;
};
const getPatientsNoSsn = () => {
    return patients.map(({ name, id, dateOfBirth, gender, occupation, entries }) => ({
        name,
        id,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};
const addPatient = (object) => {
    const newPatient = Object.assign({ id: String(Math.max(...patients.map(p => Number(p.id))) + 1) }, object);
    patients.push(newPatient);
    return newPatient;
};
const updatePatient = (entry, patientId) => {
    const toUpdate = patients.find(p => p.id === patientId);
    const updatedArray = toUpdate === null || toUpdate === void 0 ? void 0 : toUpdate.entries.concat(entry);
    const updatedPatient = Object.assign(Object.assign({}, toUpdate), { entries: updatedArray });
    patients.map(p => p.id === patientId ? updatedPatient : p);
    return updatedPatient;
};
exports.default = {
    getPatients,
    getPatientsNoSsn,
    addPatient,
    updatePatient
};
