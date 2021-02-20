import { NewEntry, HealthCheck, Hospital, OccupationalHealthcare, HealthCheckRating, Discharge } from '../types';
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-plus-operands */

const isString = (str: any): str is string => {
    return typeof str === 'string' || str instanceof String;
};

const isDateFormat = (date: string): boolean => {
    const format = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;
    return format.test(date);
};

const parseSpecialist = (params: any): string => {
    if (!params || !isString(params)){
        throw new Error(`Specialist error`);
    }
    return params;
};

const parseDate = (birth: any): string => {
    if (!birth || !isString(birth)) {
        throw new Error(`Incorrect or missing date`);
    }
    if (!isDateFormat(birth)) {
        throw new Error(`Invalid format`);
    }
    return birth;
};

const isArray = (params: any): boolean => {
    return Array.isArray(params);
};

const parseDiagnosisCodes = (params: any): Array<string> => {
    if (!params || !isArray(params)) {
        throw new Error(`Invalid diagnosis codes`);
    }
    return params as Array<string>;
};

const parseEmpName = (params: any): string => {
    if (!params || !isString(params)) {
        throw new Error(`Invalid employers name`);
    }
    return params;
};

const parseDescription = (params: any): string => {
    if (!params || !isString(params)) {
        throw new Error(`Invalid description`);
    }
    return params;
};

const assertNever = (x: never): never => {
    throw new Error(x);
};

const isRating = (params: any): params is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(params);
};

const parseRating = (params: any): HealthCheckRating => {
    console.log(params);
    if (!params || !isRating(params)) {
        throw new Error('Invalid rating ' + params);
    }
    return params;
};

const isDischarge = (params: any): params is Discharge => {
    return isDateFormat(params.date) && isString(params.criteria);
};

const parseDischarge = (params: any): Discharge => {
    if (!params || !isDischarge(params)) {
        throw new Error('Invalid discharge ' + params);
    }
    return params;
};

const parseType = (object: any): Omit<HealthCheck, 'id'> | Omit<Hospital, 'id'> | Omit<OccupationalHealthcare, 'id'> => {
    switch (object.type) {
        case "HealthCheck":
            console.log(object);
            const newHealthCheck: Omit<HealthCheck, 'id'> = {
                type: object.type,
                description: parseDescription(object.description),
                diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
                date: parseDate(object.date),
                specialist: parseSpecialist(object.specialist),
                healthCheckRating: parseRating(object.healthCheckRating)
            };
            return newHealthCheck;
        case "OccupationalHealthcare":
            const newOcEntry: Omit<OccupationalHealthcare, 'id'> = {
                type: object.type,
                description: parseDescription(object.description),
                diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
                date: parseDate(object.date),
                specialist: parseSpecialist(object.specialist),
                employerName: parseEmpName(object.employerName)
            };
            return newOcEntry;
        case "Hospital":
            const newEntry: Omit<Hospital, 'id'> = {
                type: object.type,
                date: parseDate(object.date),
                specialist: parseSpecialist(object.specialist),
                diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
                description: parseDescription(object.description),
                discharge: parseDischarge(object.discharge)
            };
            return newEntry;
        default:
            return assertNever(object.type as never);
    }
};


const toNewEntry = (object: any): NewEntry => {
    const entry = parseType(object);
    return entry as NewEntry;
};

export default toNewEntry;