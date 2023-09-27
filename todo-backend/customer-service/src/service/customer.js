import {
  GeneratePassword,
  GenerateSalt,
  GenerateSignature,
  ValidatePassword,
} from "../utils/index.js";
import { ValidationError } from "../utils/errors/app-errors.js";
import { CustomerRepository } from "../database/repository/customer-repository.js";

export class CustomerService {
  constructor() {
    this.repository = new CustomerRepository();
  }

  async SignUp({ email, password, name }) {
    const isCustomerExist = await this.repository.FindCustomer({ email });
    if (isCustomerExist) throw new ValidationError("Email Already Exist");

    // create salt
    let salt = await GenerateSalt();

    let userPassword = await GeneratePassword(password, salt);
    console.log("return hua user");
    const existingCustomer = await this.repository.CreateCustomer({
      email,
      password: userPassword,
      name,
      salt,
    });

    const token = await GenerateSignature({
      email: email,
      _id: existingCustomer._id,
    });

    return { id: existingCustomer._id, token };
  }

  async SignIn(userInputs) {
    const { email, password } = userInputs;

    const existingCustomer = await this.repository.FindCustomer(email);

    if (!existingCustomer) throw new ValidationError("User Doesnt Exist");

    const validPassword = await ValidatePassword(
      password,
      existingCustomer.password,
      existingCustomer.salt
    );

    if (!validPassword) throw new ValidationError("Wrong Credentials");

    const token = await GenerateSignature({
      email: existingCustomer.email,
      _id: existingCustomer._id,
    });
    return { id: existingCustomer._id, token };
  }

  async GetCustomerViaEmail(email) {
    let customer = await this.repository.FindCustomer(email);
    return customer;
  }

  async Wishlist(id) {
    let result = await this.repository.Wishlist(id);

    return result;
  }
  async AddtoWishlist({ userId, todo }) {
    let result = await this.repository.AddWishlistItem({ userId, todo });

    return result;
  }

  async GetAllCustomers(){
    const customers = await this.repository.GetAllCustomers()
    return customers
  }

  async SubscribeEvents(payload) {
    const { event, data } = payload;
    const { todo, customerId } = data;
    let result;
    switch (event) {
      case "Add_TO_WISHLIST":
        result = await this.repository.AddWishlistItem(customerId, todo);
        return result;
        break;
      case "REMOVE_FROM_WISHLIST":
        console.log("delete to wishlist");
        break;

      case "GET_WISHLIST_TODOS":
        result = await this.repository.Wishlist(customerId);
        return result 
        break;

      case "COMPLETE_WISHLIST_TODO":
        result = await this.repository.CompleteWishlistTOdo(customerId, data);
        return result;
    
      case "TEST":
        console.log("TEST HUa Hua");

        break;
    }
  }
}
