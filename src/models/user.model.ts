import { Schema, model } from "mongoose"
import Joi from "joi"

//validation schema
export const UserschemaValidate = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().required(),
})

//creating an interface
interface IUsers {
  name: string
  password: string
  email: string
}

//Userschema
const UserSchema = new Schema<IUsers>({
  name: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
})

//creating a model
export const User = model<IUsers>("User", UserSchema)
