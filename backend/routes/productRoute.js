import express from "express";
import { body, validationResult } from "express-validator";
import {getToken, isAuth} from "../auth/authHelper";
import Product from "../models/productModel";

const router = express.Router();

export default router;