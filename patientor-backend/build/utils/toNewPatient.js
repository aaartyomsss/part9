"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const isString = (str) => {
    return typeof str === 'string' || str instanceof String;
};
const isDateFormat = (date) => {
    const format = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;
    return format.test(date);
};
const isGender = (param) => {
    return Object.values(types_1.Gender).includes(param);
};
const isEntry = (params) => {
    /* eslint-disable @typescript-eslint/no-unsafe-member-access */
    return params.type === "HealthCheck" || params.type === "OccupationalHealthcare" || params.type === "Hospital";
};
const parseEntry = (params) => {
    if (!params || !isEntry(params)) {
        throw new Error(`Incorrect or missing entry`);
    }
    return params;
};
const parseArrayOfEntries = (arr) => {
    const validEntries = arr.filter(obj => parseEntry(obj));
    return validEntries;
};
const parseName = (name) => {
    if (!name || !isString(name)) {
        throw new Error(`Incorrect or missing name`);
    }
    return name;
};
const parseSsn = (ssn) => {
    if (!ssn || !isString(ssn)) {
        throw new Error(`Incorrect or missing ssn`);
    }
    return ssn;
};
const parseDateOfBirth = (birth) => {
    if (!birth || !isString(birth)) {
        throw new Error(`Incorrect or missing birth`);
    }
    if (!isDateFormat(birth)) {
        throw new Error(`Invalid format`);
    }
    return birth;
};
const parseGender = (g) => {
    if (!g || !isGender(g)) {
        throw new Error(`Incorrect or missing gender`);
    }
    return g;
};
const parseOccupation = (o) => {
    if (!o || !isString(o)) {
        throw new Error(`Incorrect or missing name`);
    }
    return o;
};
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
const toNewPatient = (object) => {
    return {
        name: parseName(object.name),
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        entries: parseArrayOfEntries(object.entries)
    };
};
exports.default = toNewPatient;
