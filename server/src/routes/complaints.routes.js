import express from "express";
import {verify} from "../app.js";
import { getAllComplains, insertComplaint } from "../services/complaints.service.js";

const router = express.Router()


router.post('/', insertComplaint);
router.get('/', verify ,getAllComplains);



export default router