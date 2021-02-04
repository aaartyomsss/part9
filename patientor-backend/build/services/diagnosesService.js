"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const diagnoses_1 = __importDefault(require("../data/diagnoses"));
const diagnoses = diagnoses_1.default;
const getDiagnoses = () => {
    console.log(diagnoses);
    return diagnoses;
};
const getNonSensitiveEntries = () => {
    console.log(diagnoses);
    return diagnoses.map(({ name, code }) => ({
        name,
        code
    }));
};
exports.default = {
    getDiagnoses,
    getNonSensitiveEntries
};
