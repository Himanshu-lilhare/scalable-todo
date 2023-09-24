import express from "express"
import { CustomerService } from "../service/customer.js";
import { ValidationError } from "../utils/errors/app-errors.js";

const customerRouter = express.Router()

customerRouter.post("/customer/signup", async (req, res, next) => {

  const service = new CustomerService()
    try {
     const { email, password, name } = req.body;
     
     if (!email || !password || !name) throw new ValidationError("Missing Required Fields");
     
      const { data } = await service.SignUp({ email, password, name });
      return res.json(data); 
   
    } catch (err) {
      next(err);
    }
  });

  export default customerRouter
