import express from "express";
import { body, validationResult } from "express-validator";
import BigNumber from 'bignumber.js';
import {getToken, isAuth} from "../auth/authHelper";
import config from "../utils/config";
import Order from "../models/orderModel";
import Product from "../models/productModel";

const router = express.Router();

const COUNTRY_VN = "VN";
const STATE_HN = "HN";
const STATE_HCM = "SG";

const getShippingFee = ({ countryId, stateId, cityId, currency }) => {
    let fee;
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
    return fee;
}

router.get("/shipping_fee/", (req, res) => {
    const { countryId, stateId, cityId } = req.query;
    let fee, currency;
    fee = getShippingFee({ countryId, stateId, cityId, currency })
    if (!isNaN(fee)) return res.status(200).send({ isAllow: true, fee });
    else return res.status(200).send({ isAllow: false });
});

router.get("/stripe_key/", (req, res) => {
    return res.status(200).send({ publishKey: config.STRIPE_PUBLIC_KEY });
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
);

router.post("/save_order/",
    [
        body('first_name').not().isEmpty().withMessage("empty_firstname"),
        body('last_name').not().isEmpty().withMessage("empty_lastname"),
        body('email').isEmail().withMessage("invalid_email"),
        body('phone').not().isEmpty().withMessage("empty_phone"),
        body('address_detail').not().isEmpty().withMessage("empty_address_detail"),
        body('country').not().isEmpty().withMessage("empty_country"),
        body('total').isNumeric().withMessage("empty_total"),
        body('currency').not().isEmpty().withMessage("empty_currency"),
        body('payment_method').not().isEmpty().withMessage("empty_payment_method"),
        body('items').isArray().withMessage("invalid_items_array"),
    ],
    async (req, res) => {
        const validatorErrors = validationResult(req);
        if (!validatorErrors.isEmpty()) {
            console.log(validatorErrors.array())
            return res.status(400).send(validatorErrors);
        };
        try {
            let {
                first_name: firstName,
                last_name: lastName,
                address_detail: address,
                payment_method: paymentMethod,
                email, phone, total, items, 
                city, state, country
            } = req.body;
            const currency = req.body.currency || "usd";
            let recountTotal = new BigNumber(0);
            items = await Promise.all(
                items.map(async (item) => {
                    const { _id: productId, quantity } = item;
                    if(isNaN(quantity) || quantity < 1) throw "invalid_item_quantity";
                    const product = await Product.findById(productId);
                    if (product) {
                        recountTotal = recountTotal.plus(product.price*quantity);
                        return {
                            productId: product._id,
                            quantity,
                        }
                    } else throw "item_not_found";
                })
            );
            const finalTotal = recountTotal.plus(getShippingFee({ 
                countryId: country.isoCode,
                stateId: state.isoCode,
            }));
            console.log({total, finalTotal: finalTotal.toNumber(), equal: finalTotal.comparedTo(total) === 0 })
            if (finalTotal.comparedTo(total) !== 0) throw "invalid_total";
            const order = new Order({
                items, firstName, lastName, 
                email, phone, address, city, state, country, 
                total, currency, paymentMethod,
                status: "accepted",
            });
            const newOrder = await order.save();
            if (newOrder) return res.status(200).send({ newOrder });
            else return res.status(400).send({ errors: [{ param: "invalid_payment_data "}]})
        } catch (error) {
            return typeof error === "string" 
            ? 
            res.status(400).send({ errors: [{ param: error }]})
            :
            res.status(500).send({ errors: [{ param: "server_error" }]})

        };
    }
)

export default router;