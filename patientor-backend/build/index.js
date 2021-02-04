"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const diagnosesRouter_1 = __importDefault(require("./routers/diagnosesRouter"));
const patientRouter_1 = __importDefault(require("./routers/patientRouter"));
const app = express_1.default();
app.use(express_1.default.json());
app.use(cors_1.default());
const PORT = 3001;
app.get('/api/ping', (_req, res) => {
    res.send('pong');
});
app.use('/api/patients', patientRouter_1.default);
app.use('/api/diagnoses', diagnosesRouter_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
