import customerRouter from "./api/customer.js"
import express, { urlencoded } from "express"
import { ErrorHandler } from "./utils/errors/error-handler.js";


async function express_app(app){
app.use(express.json())
app.use(customerRouter)



}

export {express_app}