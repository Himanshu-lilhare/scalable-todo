import { customerModel as CustomerModel, customerModel } from "../models/Customer.js";
import { APIError, STATUS_CODES } from "../../utils/errors/app-errors.js";

export class CustomerRepository {
  async CreateCustomer(data) {
    console.log("aya");
    const customerResult = await CustomerModel.create(data);

    return customerResult;
  }
  async GetAllCustomers(){
   const customers = await customerModel.find({})
   return customers
  }

  async FindCustomer(email) {
    const existingCustomer = await CustomerModel.findOne({ email: email });
    return existingCustomer;
  }

  async FindCustomerById({ id }) {
    try {
      const existingCustomer = await CustomerModel.findById(id)
        .populate("wishlist")
        .populate("completedTodos")
       
      return existingCustomer;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Customer"
      );
    }
  }

  async Wishlist(customerId) {
    const profile = await CustomerModel.findById(customerId).populate(
      "wishlist"
    );

    return profile.wishlist;
  }

  async AddWishlistItem(customerId, todo) {
    try {
      const profile = await CustomerModel.findById(customerId).populate(
        "wishlist"
      );

      if (profile) {
        let wishlist = profile.wishlist;

        if (wishlist.length > 0) {
          let isExist = false;
          wishlist.map((item) => {
            if (item._id.toString() === todo._id.toString()) {
              const index = wishlist.indexOf(item);
              wishlist.splice(index, 1);
              isExist = true;
            }
          });

          if (!isExist) {
            wishlist.push(todo);
          }
        } else {
          wishlist.push(todo);
        }

        profile.wishlist = wishlist;
      }

      const profileResult = await profile.save();

      return profileResult.wishlist;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Add to WishList"
      );
    }
  }

  async CompleteWishlistTOdo(customerId, todo) {
    const profile = await CustomerModel.findById(customerId);

    if (profile) {
      if (profile.completedTodos == undefined) {
        profile.completedTodos = [];
      }
      todo.isComplete = true;
      profile.completedTodos.push(todo);

      profile.wishlist = [];

      const profileResult = await profile.save();

      return profileResult;
    }
  }
}
