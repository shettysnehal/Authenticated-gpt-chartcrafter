import express from "express";
const router  = express.Router();
import login from "./login.js"


router.use("/login",login)
import { register} from "../../controllers/userController.js";
router.post("/register",register)


export default router 