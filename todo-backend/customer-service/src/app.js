import customerRouter from "./api/customer.js"
import express, { urlencoded } from "express"


async function express_app(app){
app.use(express.json())


app.use(customerRouter)



}

export {express_app}