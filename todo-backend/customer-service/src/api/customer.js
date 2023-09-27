import express from "express";
import { CustomerService } from "../service/customer.js";
import { ValidationError } from "../utils/errors/app-errors.js";

const customerRouter = express.Router();

customerRouter.post("/signup", async (req, res, next) => {
  const service = new CustomerService();
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name)
      throw new ValidationError("Missing Required Fields");
    const data = await service.SignUp({ email, password, name });

    return res.json(data);
  } catch (err) {
    next(err);
  }
});

customerRouter.post("/login", async (req, res, next) => {
  const service = new CustomerService();
  try {
    const { email, password } = req.body;

    const data = await service.SignIn({ email, password });

    return res.json(data);
  } catch (err) {
    next(err);
  }
})
customerRouter.get('/get-all-customers',async(req,res,next)=>{
  try {
    const service = new CustomerService()

    let AllUsers = await service.GetAllCustomers()
    res.status(200).json(AllUsers)
  } catch (error) {
    
  }
})

customerRouter.post("/get-customer-via-email", async (req, res, next) => {
  const service = new CustomerService();
  try {
    const { email } = req.body;

    const data = await service.GetCustomerViaEmail(email);

    return res.json(data);
  } catch (err) {
    next(err);
  }
})
customerRouter.get("/wishliat", async (req, res, next) => {
  const service = new CustomerService();
  try {
    const { id } = req.body;

    const data = await service.Wishlist(id);

    return res.json(data);
  } catch (err) {
    next(err);
  }
})



export default customerRouter;
