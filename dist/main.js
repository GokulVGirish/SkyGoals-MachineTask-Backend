"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const applicationConfig_1 = __importDefault(require("./entities/applicationConfig"));
const config_1 = __importDefault(require("./frameworks/db/config"));
const app_1 = __importDefault(require("./frameworks/express/app"));
(0, config_1.default)();
app_1.default.listen(applicationConfig_1.default.PORT, () => {
    console.log(`server listening and is ready to go ${applicationConfig_1.default.PORT}`);
});
