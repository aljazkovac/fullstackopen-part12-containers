"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientsService_1 = __importDefault(require("../services/patientsService"));
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.get("/", (_req, res) => {
    const patients = patientsService_1.default.getPatientsNoSsn();
    console.log("patients: ", patients);
    res.json(patients);
});
router.get("/:id", (req, res) => {
    const patient = patientsService_1.default.getPatient(req.params.id);
    if (patient) {
        res.json(patient);
    }
    else {
        res.sendStatus(404);
    }
});
router.post("/", (req, res) => {
    try {
        console.log("req.body: ", req.body);
        const newPatientEntry = (0, utils_1.toNewPatientEntry)(req.body);
        const addedEntry = patientsService_1.default.addPatient(newPatientEntry);
        if (addedEntry) {
            res.json(addedEntry);
        }
        else {
            res.status(404).send("Patient not added");
        }
    }
    catch (error) {
        let errorMessage = "Something went wrong.";
        if (error instanceof Error) {
            errorMessage += " Error: " + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
router.post("/:id/entries", (req, res) => {
    try {
        console.log("req.body: ", req.body);
        const newEntry = (0, utils_1.toNewEntry)(req.body);
        const addedEntry = patientsService_1.default.addEntry(req.params.id, newEntry);
        if (addedEntry) {
            res.json(addedEntry);
        }
        else {
            res.status(404).send("Entry not added");
        }
    }
    catch (error) {
        let errorMessage = "Something went wrong.";
        if (error instanceof Error) {
            errorMessage += " Error: " + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
exports.default = router;
