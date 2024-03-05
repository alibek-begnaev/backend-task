import express from "express"
import { db } from "./config/db.config"
import { router } from "./routes/user.routes"
import errorHandler from "./middleware/errorHandler"
import logger from "./middleware/logger"

const app = express()
const PORT = 5000
//middlewares
app.use(logger)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(errorHandler)
//routes
app.use("/api/v1/user", router)

//db connection then server connection
db.then(() => {
  app.listen(PORT, () => console.log("Server is listening on port:  " + PORT))
})
