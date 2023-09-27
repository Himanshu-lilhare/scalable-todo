import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
  name: String,
  email: String,
  password: String,
  wishlist:[
    {
      _id:String,
      name:String,
      desciprtion:String,
      isComplete:{
        type:Boolean,
        default:false
      }
    }
  ],
  completedTodos:[
    {
      _id:String,
      name:String,
      desciprtion:String,
      isComplete:{
        type:Boolean,
        default:true
      }
    }
  ],
  salt: String,
});

export const  customerModel = mongoose.model("customer", CustomerSchema);
