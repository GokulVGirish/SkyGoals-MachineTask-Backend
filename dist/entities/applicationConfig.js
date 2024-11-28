"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const appData = {
    CLIENT_ORIGIN: process.env.CLIENT_ORIGIN,
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
};
exports.default = appData;