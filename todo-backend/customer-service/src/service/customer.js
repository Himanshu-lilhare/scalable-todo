import {
  FormateData,
  GeneratePassword,
  GenerateSalt,
  GenerateSignature,
} from "../utils/index.js";
import { ValidationError } from "../utils/errors/app-errors.js";
import { CustomerRepository } from "../database/repository/customer-repository.js";

export class CustomerService {
  constructor() {
    this.repository = new CustomerRepository();
  }

  async SignUp(userInputs) {
    const isCustomerExist = await this.repository.FindCustomer({ email });
    if (isCustomerExist) throw new ValidationError("Email Already Exist");

    // create salt
    let salt = await GenerateSalt();

    let userPassword = await GeneratePassword(password, salt);

    const existingCustomer = await this.repository.CreateCustomer({
      email,
      password: userPassword,
      salt,
    });

    const token = await GenerateSignature({
      email: email,
      _id: existingCustomer._id,
    });

    return FormateData({ id: existingCustomer._id, token });
  }
}
