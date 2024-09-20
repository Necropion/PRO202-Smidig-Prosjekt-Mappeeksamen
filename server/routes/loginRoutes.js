import express from "express";
import {
    loginPOST,
    loginGET
} from "../controllers/loginController.js";

const router = express.Router();

//Login POST
router.post("/", loginPOST)

//Login GET
router.get("/:password", loginGET)

//Login DELETE

//Login UPDATE

export default router;