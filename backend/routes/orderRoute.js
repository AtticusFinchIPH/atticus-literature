import express from "express";
import { body, validationResult } from "express-validator";
import {getToken, isAuth} from "../auth/authHelper";
import Order from "../models/orderModel";

const router = express.Router();

export default router;