"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const applicationConfig_1 = __importDefault(require("../../entities/applicationConfig"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const route_1 = __importDefault(require("./routes/route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: applicationConfig_1.default.CLIENT_ORIGIN,
    methods: "GET,POST,PUT,DELETE,OPTIONS,PATCH",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
}));
app.use(`/api`, route_1.default);
app.use(errorHandler_1.default);
exports.default = app;
