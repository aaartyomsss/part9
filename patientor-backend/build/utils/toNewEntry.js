"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
const isString = (str) => {
    return typeof str === 'string' || str instanceof String;
};
const isDateFormat = (date) => {
    const format = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;
    return format.test(date);
};
const parseSpecialist = (params) => {
    if (!params || !isString(params)) {
        throw new Error(`Specialist error`);
    }
    return params;
};
const parseDate = (birth) => {
    if (!birth || !isString(birth)) {
        throw new Error(`Incorrect or missing date`);
    }
    if (!isDateFormat(birth)) {
        throw new Error(`Invalid format`);
    }
    return birth;
};
const isArray = (params) => {
    return Array.isArray(params);
};
const parseDiagnosisCodes = (params) => {
    if (!params || !isArray(params)) {
        throw new Error(`Invalid diagnosis codes`);
    }
    return params;
};
const parseEmpName = (params) => {
    if (!params || !isString(params)) {
        throw new Error(`Invalid employers name`);
    }
    return params;
};
const parseDescription = (params) => {
    if (!params || !isString(params)) {
        throw new Error(`Invalid description`);
    }
    return params;
};
const assertNever = (x) => {
    throw new Error(x);
};
const isRating = (params) => {
    return Object.values(types_1.HealthCheckRating).includes(params);
};
const parseRating = (params) => {
    console.log(params);
    if (!params || !isRating(params)) {
        throw new Error('Invalid rating ' + params);
    }
    return params;
};
const parseType = (object) => {
    switch (object.type) {
        case "HealthCheck":
            console.log(object);
            const newHealthCheck = {
                type: object.type,
                description: parseDescription(object.description),
                diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
                date: parseDate(object.date),
                specialist: parseSpecialist(object.specialist),
                healthCheckRating: parseRating(object.healthCheckRating)
            };
            return newHealthCheck;
        case "OccupationalHealthcare":
            const newOcEntry = {
                type: object.type,
                description: parseDescription(object.description),
                diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
                date: parseDate(object.date),
                specialist: parseSpecialist(object.specialist),
                employerName: parseEmpName(object.employerName)
            };
            return newOcEntry;
        case "Hospital":
            const newEntry = {
                type: object.type,
                date: parseDate(object.date),
                specialist: parseSpecialist(object.specialist),
                diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
                description: parseDescription(object.description)
            };
            return newEntry;
        default:
            return assertNever(object.type);
    }
};
const toNewEntry = (object) => {
    const entry = parseType(object);
    return entry;
};
exports.default = toNewEntry;
