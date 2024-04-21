"use strict";
//          ***** Utility functions for parsing data *****
//          ***** and type guards for validating data ****
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewEntry = exports.toNewPatientEntry = void 0;
//          ***** Imports ****
const types_1 = require("./types");
//          ***** Main utility functions *****
const toNewPatientEntry = (object) => {
    console.log("object:", object);
    if (!object ||
        typeof object !== "object" ||
        !isValidNewPatientEntry(object)) {
        throw new Error("Object does not match the type NewPatientEntry");
    }
    return {
        name: parseStringProperty(object.name, "name"),
        dateOfBirth: parseDateProperty(object.dateOfBirth, "dateOfBirth"),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseStringProperty(object.occupation, "occupation"),
        entries: object.entries.map((entry) => (0, exports.toNewEntry)(entry)),
    };
};
exports.toNewPatientEntry = toNewPatientEntry;
const toNewEntry = (object) => {
    if (!object || typeof object !== "object") {
        throw new Error("Incorrect or missing data");
    }
    const entry = object;
    switch (entry.type) {
        case "HealthCheck":
            if (isValidHealthCheckEntry(object)) {
                return parseHealthCheckEntry(object);
            }
            break;
        case "Hospital":
            if (isValidHospitalEntry(object)) {
                return parseHospitalEntry(object);
            }
            break;
        case "OccupationalHealthcare":
            if (isValidOccupationalHealthcareEntry(object)) {
                return parseOccupationalHealthcareEntry(object);
            }
            break;
        default:
            throw new Error("Unknown entry type: " + entry.type);
    }
    throw new Error("Incorrect data: some fields are missing or invalid for type " + entry.type);
};
exports.toNewEntry = toNewEntry;
//          ***** Parsers *****
const parseStringProperty = (property, propertyName) => {
    if (!property || !isString(property)) {
        throw new Error("Incorrect or missing " + propertyName + ": " + property);
    }
    return property;
};
const parseDateProperty = (property, propertyName) => {
    if (!property || !isString(property) || !isDate(property)) {
        throw new Error("Incorrect or missing " + propertyName + ": " + property);
    }
    return property;
};
const parseSsn = (ssn) => {
    if (!ssn || !isString(ssn) || !isSsn(ssn)) {
        throw new Error("Incorrect or missing ssn: " + ssn);
    }
    return ssn;
};
const parseGender = (gender) => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error("Incorrect or missing gender: " + gender);
    }
    return gender;
};
const parseHealthCheckEntry = (entry) => {
    const e = entry;
    const newEntry = Object.assign(Object.assign({}, e), { description: parseStringProperty(e.description, "description"), date: parseDateProperty(e.date, "date"), specialist: parseStringProperty(e.specialist, "specialist"), diagnosisCodes: parseDiagnosisCodes(e.diagnosisCodes), healthCheckRating: parseHealthCheckRating(e.healthCheckRating) });
    return newEntry;
};
const parseHospitalEntry = (entry) => {
    const e = entry;
    const newEntry = Object.assign(Object.assign({}, e), { description: parseStringProperty(e.description, "description"), date: parseDateProperty(e.date, "date"), specialist: parseStringProperty(e.specialist, "specialist"), diagnosisCodes: parseDiagnosisCodes(e.diagnosisCodes), discharge: parseDischarge(e.discharge) });
    return newEntry;
};
const parseOccupationalHealthcareEntry = (entry) => {
    const e = entry;
    const newEntry = Object.assign(Object.assign({}, e), { description: parseStringProperty(e.description, "description"), date: parseDateProperty(e.date, "date"), specialist: parseStringProperty(e.specialist, "specialist"), diagnosisCodes: parseDiagnosisCodes(e.diagnosisCodes), employerName: parseStringProperty(e.employerName, "employer name"), sickLeave: parseSickLeave(e.sickLeave) });
    return newEntry;
};
const parseDiagnosisCodes = (diagnosisCodes) => {
    if (!Array.isArray(diagnosisCodes)) {
        return [];
    }
    for (let code of diagnosisCodes) {
        if (!isString(code)) {
            throw new Error("Incorrect diagnosis code: " + code);
        }
    }
    return diagnosisCodes;
};
const parseHealthCheckRating = (rating) => {
    if (rating !== undefined && rating !== null && isHealthCheckRating(rating)) {
        return rating;
    }
    else {
        throw new Error("Incorrect or missing health check rating: " + rating);
    }
};
const parseDischarge = (discharge) => {
    if (typeof discharge === "object" && discharge !== null) {
        const potentialDischarge = discharge;
        if (typeof potentialDischarge.date === "string" &&
            typeof potentialDischarge.criteria === "string" &&
            isDate(potentialDischarge.date) &&
            isString(potentialDischarge.criteria)) {
            return {
                date: potentialDischarge.date,
                criteria: potentialDischarge.criteria,
            };
        }
        else {
            throw new Error("Incorrect discharge: " + JSON.stringify(discharge));
        }
    }
    throw new Error("Incorrect discharge: " + JSON.stringify(discharge));
};
const parseSickLeave = (sickLeave) => {
    if (typeof sickLeave === "object" && sickLeave !== null) {
        const potentialSickLeave = sickLeave;
        if (typeof potentialSickLeave.startDate === "string" &&
            typeof potentialSickLeave.endDate === "string" &&
            isDate(potentialSickLeave.startDate) &&
            isDate(potentialSickLeave.endDate)) {
            return {
                startDate: potentialSickLeave.startDate,
                endDate: potentialSickLeave.endDate,
            };
        }
        else {
            throw new Error("Incorrect sick leave: " + JSON.stringify(sickLeave));
        }
    }
    return undefined;
};
//          ***** Type Guards *****
const isValidNewPatientEntry = (entry) => {
    // Use a temporary type assertion to be able to check the type of the entry
    const e = entry;
    return (typeof (e === null || e === void 0 ? void 0 : e.name) === "string" &&
        typeof (e === null || e === void 0 ? void 0 : e.dateOfBirth) === "string" &&
        typeof (e === null || e === void 0 ? void 0 : e.ssn) === "string" &&
        isSsn(e.ssn) &&
        typeof (e === null || e === void 0 ? void 0 : e.gender) === "string" &&
        isGender(e.gender) &&
        typeof (e === null || e === void 0 ? void 0 : e.occupation) === "string");
};
const isString = (text) => {
    return typeof text === "string" || text instanceof String;
};
// The pattern is just simply 6 characters, then a hyphen,
// followed by three or four letters or digits.
const isSsn = (ssn) => {
    const pattern = /^(\d{2})(\d{2})(\d{2})-([0-9A-Z]{3,4})$/;
    return pattern.test(ssn);
};
const isGender = (param) => {
    return Object.values(types_1.Gender)
        .map((g) => g.toString())
        .includes(param);
};
const isDate = (date) => {
    if (date === "") {
        return true;
    }
    return typeof date === "string" && Boolean(Date.parse(date));
};
const isValidHealthCheckEntry = (entry) => {
    const e = entry;
    return ((e === null || e === void 0 ? void 0 : e.type) === "HealthCheck" &&
        isString(e.description) &&
        isDate(e.date) &&
        isString(e.specialist) &&
        isHealthCheckRating(e.healthCheckRating));
};
const isValidHospitalEntry = (entry) => {
    const e = entry;
    return ((e === null || e === void 0 ? void 0 : e.type) === "Hospital" &&
        isString(e.description) &&
        isDate(e.date) &&
        isString(e.specialist) &&
        isValidDischarge(e.discharge));
};
const isValidOccupationalHealthcareEntry = (entry) => {
    const e = entry;
    return ((e === null || e === void 0 ? void 0 : e.type) === "OccupationalHealthcare" &&
        isString(e.description) &&
        isDate(e.date) &&
        isString(e.specialist) &&
        isString(e.employerName));
};
const isHealthCheckRating = (rating) => {
    return Object.values(types_1.HealthCheckRating).includes(rating);
};
const isValidDischarge = (discharge) => {
    const d = discharge;
    return typeof (d === null || d === void 0 ? void 0 : d.date) === "string" && typeof (d === null || d === void 0 ? void 0 : d.criteria) === "string";
};
