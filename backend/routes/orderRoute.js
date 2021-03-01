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
});

router.post("/validate_shipping/", 
    [
        body('first_name').not().isEmpty().withMessage("empty_firstname"),
        body('last_name').not().isEmpty().withMessage("empty_lastname"),
        body('email').isEmail().withMessage("invalid_email"),
        body('phone').not().isEmpty().withMessage("empty_phone"),
        body('address_detail').not().isEmpty().withMessage("empty_address_detail"),
    ],
    (req, res) => {
        const validatorErrors = validationResult(req);
        if (!validatorErrors.isEmpty()) {
            console.log(validatorErrors.array())
            return res.status(400).send({ erros: validatorErrors });
        }
        return res.status(200).send({ isValidate: true })
    }
)

export default router;