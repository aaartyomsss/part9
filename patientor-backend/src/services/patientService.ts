import patientList from '../data/patients';
import { Patient,  OmitSsn, NewPatient, NewEntry, Entry } from '../types';

const patients: Array<Patient> = patientList;

const getPatients = (): Array<Patient> => {
    return patients;
};

const getPatientsNoSsn = (): OmitSsn[] => {
    return patients.map(({ name, id, dateOfBirth, gender, occupation, entries }) => ({
        name,
        id,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};

const addPatient = (object: NewPatient): Patient => {
    const newPatient = {
        id: String(Math.max(...patients.map(p => Number(p.id))) + 1),
        ...object
    };

    patients.push(newPatient);
    return newPatient;
};

const updatePatient = (entry: NewEntry, patientId: string): Patient => {
    const toAdd = {
        id: String(Math.random()),
        ...entry
    };
    const toUpdate = patients.find(p => p.id === patientId);
    const updatedArray = toUpdate?.entries.concat(toAdd as Entry);
    const updatedPatient = {
        ...toUpdate,
        entries: updatedArray
    };

    patients.map(p => p.id === patientId ? updatedPatient : p);

    return updatedPatient as Patient;
};

export default {
    getPatients,
    getPatientsNoSsn,
    addPatient,
    updatePatient
};