import { User } from "./../models/user.model"
import { NextFunction, Request, Response, RequestHandler } from "express"
import jwt from "jsonwebtoken"

interface IUser {
  user: typeof User
}

const secretKey = process.env.secret_key || ""

const authenticateToken = (req: Request & IUser, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1] // Extract token from 'Bearer <token>' format

  if (!token) {
    return res.sendStatus(401) // Unauthorized
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.sendStatus(403) // Forbidden
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    req.user = user as IUser["user"]

    next()
  })
}

export default authenticateToken as RequestHandler
