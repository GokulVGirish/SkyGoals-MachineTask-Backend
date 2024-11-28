import express from "express"
import customersController from "../../../interfaceAdapters/controllers"
import customerInteractor from "../../../useCases/customersUseCase"
import customerRepository from "../../../interfaceAdapters/repositories"


const customersRouter=express.Router()
const repository=new customerRepository()
const interactor=new customerInteractor(repository)
const controller=new customersController(interactor)

customersRouter.get(`/customers`,controller.fetchCustomers.bind(controller))


export default customersRouter

