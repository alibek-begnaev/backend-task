import { UserService } from "./../services/user.sevice"
import { Request, Response } from "express"
import { UserschemaValidate } from "../models/user.model"
import { validationResult } from "express-validator"

class UserController {
  constructor(private userService: UserService) {}

  //add user controller
  addUser = async (req: Request, res: Response) => {
    //data to be saved in database
    const data = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    }

    //validating the request
    const { error, value } = UserschemaValidate.validate(data)

    if (error) {
      res.send(error.message)
    } else {
      //call the create user function in the service and pass the data from the request
      const user = await this.userService.createUser(value)
      res.status(201).send(user)
    }
  }

  //get all users
  getUsers = async (req: Request, res: Response) => {
    const users = await this.userService.getUsers()
    res.send(users)
  }

  //get a single user
  getUser = async (req: Request, res: Response) => {
    //get id from the parameter
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const id = req.params.id
    const user = await this.userService.getUser(id)
    res.send(user)
  }

  //update user
  updateUser = async (req: Request, res: Response) => {
    const id = req.params.id
    const user = await this.userService.updateUser(id, req.body)
    res.send(user)
  }

  //delete a user
  deleteUser = async (req: Request, res: Response) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const id = req.params.id
    await this.userService.deleteUser(id)
    res.send("user deleted")
  }
}

//export class
export default new UserController(new UserService())
