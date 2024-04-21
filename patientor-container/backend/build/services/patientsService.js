"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../data/patients"));
const uuid_1 = require("uuid");
const patients = patients_1.default;
const getPatients = () => {
    return patients;
};
const getPatientsNoSsn = () => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries,
    }));
};
const getPatient = (id) => {
    const patient = patients.find((p) => p.id === id);
    return patient;
};
const addPatient = (entry) => {
    console.log("entry: ", entry);
    const id = (0, uuid_1.v1)();
    const newPatientEntry = Object.assign({ id: id }, entry);
    patients.push(newPatientEntry);
    return newPatientEntry;
};
const addEntry = (id, entry) => {
    const patient = patients.find((p) => p.id === id);
    const newEntry = Object.assign({}, entry);
    patient === null || patient === void 0 ? void 0 : patient.entries.push(newEntry);
    return newEntry;
};
exports.default = {
    getPatients,
    getPatientsNoSsn,
    getPatient,
    addPatient,
    addEntry,
};
