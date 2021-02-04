interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<DiagnosesEntry['code']>;
}

interface SickLeave {
    startDate: string;
    endDate: string;
}

interface Discharge {
    date: string;
    criteria: string;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

export interface HealthCheck extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcare extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: SickLeave
}

export interface Hospital extends BaseEntry {
    type: "Hospital"
    discharge?: Discharge;
}

export type Entry =
    | HealthCheck
    | OccupationalHealthcare
    | Hospital;

export type NewEntry = Omit<Entry, 'id'>;

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}

export interface DiagnosesEntry {
    name: string,
    code: string,
    latin?: string
}

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn?: string,
    gender: Gender,
    occupation: string,
    entries: Entry[]
}

export type OmitSsn = Omit<Patient, 'ssn'>;

export type NewPatient = Omit<Patient, 'id'>;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export type NonSensetiveDiaryEntry = Omit<DiagnosesEntry, 'latin'>;