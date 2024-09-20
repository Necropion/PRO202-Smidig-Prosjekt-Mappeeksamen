import express from "express";
import {
    slidePOST,
    slideGETALL,
    slideGETONE,
    slideGETproject,
    slideUPDATEONE,
    slideDELETE
} from "../controllers/slideController.js";

const router = express.Router();

//Slide POST
router.post("/", slidePOST);

//Slide GET ALL
router.get("/", slideGETALL);

//Slide GET ONE
router.get("/:slideID&:projectID", slideGETONE);

//Slide GET ALL from Project
router.get("/:projectID", slideGETproject);

//Slide UPDATE ONE
router.put("/:slideID", slideUPDATEONE)

//Slide delete one
router.delete("/:slideID", slideDELETE)

export default router;