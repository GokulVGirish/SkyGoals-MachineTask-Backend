"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = __importDefault(require("../../../interfaceAdapters/controllers"));
const customersUseCase_1 = __importDefault(require("../../../useCases/customersUseCase"));
const repositories_1 = __importDefault(require("../../../interfaceAdapters/repositories"));
const customersRouter = express_1.default.Router();
const repository = new repositories_1.default();
const interactor = new customersUseCase_1.default(repository);
const controller = new controllers_1.default(interactor);
customersRouter.get(`/customers`, controller.fetchCustomers.bind(controller));
exports.default = customersRouter;
