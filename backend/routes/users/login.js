import express from "express";

const router  = express.Router()
import {checkotp, loginThroughmail,loginThroughmblnumber,loginThroughusername} from "../../controllers/userController.js"
router.post("/username",loginThroughusername)
router.post("/phone",loginThroughmblnumber)
router.post("/mail",loginThroughmail)
router.post("/checkOtp",checkotp)

export default router