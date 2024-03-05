import { User } from "../models/user.model"

export class UserService {
  //create a User
  async createUser(data: any) {
    try {
      const newUser = await User.create(data)
      return newUser
    } catch (error) {
      console.log(error)
    }
  }

  //get all Users
  async getUsers() {
    try {
      const users = await User.find({})
      return users
    } catch (error) {
      console.log(error)
    }
  }

  //get a single User
  async getUser(id: string) {
    try {
      const user = await User.findById({ _id: id })
      if (!user) {
        return "User not available"
      }
      return user
    } catch (error) {
      console.log(error)
    }
  }

  //update a User
  async updateUser(id: string, data: any) {
    try {
      const user = await User.findByIdAndUpdate({ _id: id }, data, { new: true })
      if (!user) {
        return "User not available"
      }
      return user
    } catch (error) {
      console.log(error)
    }
  }

  //delete a User by using the find by id and delete
  async deleteUser(id: string) {
    try {
      const user = await User.findByIdAndDelete(id)
      if (!user) {
        return "User not available"
      }
    } catch (error) {
      console.log(error)
    }
  }
}

//export the class
export const UserServices = new UserService()
