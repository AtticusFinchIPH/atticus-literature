import express from "express";
import { body, validationResult } from "express-validator";
import {getToken, isAuth} from "../auth/authHelper";
import Order from "../models/orderModel";

const router = express.Router();

const COUNTRY_VN = "VN";
const STATE_HN = "HN";
const STATE_HCM = "SG";

router.get("/shipping_fee/", (req, res) => {
    const { countryId, stateId, cityId } = req.query;
    let fee, currency;
    switch (countryId) {
        case COUNTRY_VN:
            switch (stateId) {
                case STATE_HN:
                case STATE_HCM:
                    fee = 0;
                    break;
                default:
                    fee = 2;
                    break;
            }
            break;
        default:
            break;
    }
    if (!isNaN(fee)) return res.status(200).send({ isAllow: true, fee });
    else return res.status(200).send({ isAllow: false });
})

export default router;