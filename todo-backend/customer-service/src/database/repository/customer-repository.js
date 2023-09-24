import { customerModel as CustomerModel } from "../models/Customer.js";
import { APIError, STATUS_CODES } from "../../utils/errors/app-errors.js";

export class CustomerRepository {
  async CreateCustomer({ email, password, salt }) {
    const customer = new CustomerModel({email,password,salt,});

    const customerResult = await customer.save();

    return customerResult;
  }

  async FindCustomer({ email }) {
    try {
      const existingCustomer = await CustomerModel.findOne({ email: email });
      return existingCustomer;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Customer"
      );
    }
  }

}
