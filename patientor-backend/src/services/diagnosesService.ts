import diagnosesEntries from '../data/diagnoses';

import { DiagnosesEntry, NonSensetiveDiaryEntry } from '../types';

const diagnoses: Array<DiagnosesEntry> = diagnosesEntries;

const getDiagnoses = (): Array<DiagnosesEntry> => {
    console.log(diagnoses);
    return diagnoses;
};

const getNonSensitiveEntries = () : NonSensetiveDiaryEntry[] => {
    console.log(diagnoses);
    return diagnoses.map(( { name, code } ) => ({
        name,
        code
    }));
};

export default {
    getDiagnoses,
    getNonSensitiveEntries
};