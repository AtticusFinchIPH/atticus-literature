import express from "express";
import { body, validationResult } from "express-validator";
import BigNumber from 'bignumber.js';
import {getToken, isAuth} from "../auth/authHelper";
import Product from "../models/productModel";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        let products = await Product.find()
                                .populate('authorId', 'name')
                                .limit(45)
                                .lean(true)
                                .exec();
        products = products.map(product => {
            const reviewsCount = product.reviews.length;
            product.stars = reviewsCount > 0 
            ?
            new BigNumber(product.reviews.reduce((total, review) => {
                return total + review.stars
            }, 0)/reviewsCount).decimalPlaces(2)
            :
            null;
            return product;
        })
        return res.status(200).send(products);
    } catch (error) {
        return res.status(500).json({ msg: "Error in getting all products"});
    }
})

router.get("/recommendeds", async (req, res) => {
    try {
        let products = await Product.find({categories: "recommendeds"})
                                .limit(10)
                                .lean(true)
                                .exec();
        products = products.map(product => {
            const reviewsCount = product.reviews.length;
            product.stars = reviewsCount > 0 
            ?
            new BigNumber(product.reviews.reduce((total, review) => {
                return total + review.stars
            }, 0)/reviewsCount).decimalPlaces(2)
            :
            null;
            return product;
        })
        return res.status(200).send(products);  
    } catch (error) {       
        return res.status(500).json({ msg: "Error in getting recommended products"});
    }
})

router.get("/bestsellers", async (req, res) => {
    try {
        let products = await Product.find({categories: "bestsellers"})
                                .limit(10)
                                .lean(true)
                                .exec();
        products = products.map(product => {
            const reviewsCount = product.reviews.length;
            product.stars = reviewsCount > 0 
            ?
            new BigNumber(product.reviews.reduce((total, review) => {
                return total + review.stars
            }, 0)/reviewsCount).decimalPlaces(2)
            :
            null;
            return product;
        })
        return res.status(200).send(products);  
    } catch (error) {       
        return res.status(500).json({ msg: "Error in getting bestsellers"});
    }
})

export default router;