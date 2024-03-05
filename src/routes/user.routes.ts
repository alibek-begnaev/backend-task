import express from "express"
import { body } from "express-validator"
import authenticateToken from "../middleware/authenticateToken"
import UserControllers from "../controllers/user.controller"

export const router = express.Router()

router.post(
  "/",
  [
    body("name").trim().isLength({ min: 1 }).escape(),
    body("email").trim().isEmail().normalizeEmail(),
    body("password").trim().isLength({ min: 6 }).escape(),
  ],
  authenticateToken,
  UserControllers.addUser,
)

router.get("/", authenticateToken, UserControllers.getUsers)

router.get("/:id", authenticateToken, UserControllers.getUser)

router.put(
  "/:id",
  [
    body("id").trim().isLength({ min: 1 }).escape(),
    body("name").optional().trim().escape(),
    body("email").optional().trim().isEmail().normalizeEmail(),
    body("password").optional().trim().isLength({ min: 6 }).escape(),
  ],
  authenticateToken,
  UserControllers.updateUser,
)

router.delete("/:id", [body("id").trim().isLength({ min: 1 }).escape()], authenticateToken, UserControllers.deleteUser)
