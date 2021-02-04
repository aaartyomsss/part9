import { Gender, NewPatient, Entry } from '../types';
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

const isString = (str: any): str is string => {
    return typeof str === 'string' || str instanceof String;
};

const isDateFormat = (date: string): boolean => {
    const format = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;
    return format.test(date);
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const isEntry = (params: any): boolean => {
    /* eslint-disable @typescript-eslint/no-unsafe-member-access */
    return params.type === "HealthCheck" || params.type === "OccupationalHealthcare" || params.type === "Hospital";
};

const parseEntry = (params: any): Entry => {
    if (!params || !isEntry(params)){
        throw new Error(`Incorrect or missing entry`);
    }
    return params as Entry;
};

const parseArrayOfEntries = (arr: Array<any>): Entry[] => {
    const validEntries: Entry[] = arr.filter(obj => parseEntry(obj));
    return validEntries;
};

const parseName = (name: any): string => {
    if(!name || !isString(name)){
        throw new Error(`Incorrect or missing name`);
    }

    return name;
};

const parseSsn = (ssn: any): string => {
    if(!ssn || !isString(ssn)){
        throw new Error(`Incorrect or missing ssn`);
    }

    return ssn;
};

const parseDateOfBirth = (birth: any): string => {
    if (!birth || !isString(birth)) {
        throw new Error(`Incorrect or missing birth`);
    }
    if (!isDateFormat(birth)) {
        throw new Error(`Invalid format`);
    }
    return birth;
};

const parseGender = (g: any): Gender => {
    if(!g || !isGender(g)) {
        throw new Error(`Incorrect or missing gender`);
    }
    return g;
};

const parseOccupation = (o: any): string => {
    if(!o || !isString(o)){
        throw new Error(`Incorrect or missing name`);
    }

    return o;
};

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
const toNewPatient = (object: any): NewPatient => {
    return {
        name: parseName(object.name),
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        entries: parseArrayOfEntries(object.entries)
    };
};

export default toNewPatient;