import express from "express";
import { body, validationResult } from "express-validator";
import {getToken, isAuth} from "../auth/authHelper";
import User from "../models/userModel";

const router = express.Router();

export default router;