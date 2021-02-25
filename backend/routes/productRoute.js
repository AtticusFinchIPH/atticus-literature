import express from "express";
import { body, validationResult } from "express-validator";
import BigNumber from 'bignumber.js';
import {getToken, isAuth} from "../auth/authHelper";
import Product from "../models/productModel";

const router = express.Router();

const findAllProducts = async(skip) => {
    if(!skip) skip = 0;
    let products = await Product.find()
                                .populate('authorIds', 'name')
                                .skip(skip).limit(45)
                                .lean(true).exec();
    return products;
}

const findGenreOrOrigin = async(genre, origin, skip) => {
    if(!skip) skip = 0;
    let products = await Product.find({ $or: [{genres: genre}, {origin}]})
                                .populate('authorIds', 'name')
                                .skip(skip).limit(45)
                                .lean(true).exec();
    return products;
}

const findTitleByKeyword = async(keyword, skip) => {
    if(!skip) skip = 0;
    let products = await Product.find({title: {$regex: keyword, $options: "i"}})
                                .populate('authorIds', 'name')
                                .skip(skip).limit(45)
                                .lean(true).exec();
    return products;
}

// Get bookstore products
router.post("/bookstore", async (req, res) => {
    const { keyword, genre, origin, skip } = req.body;
    console.log( keyword, genre, origin, skip )
    try {
        let products = [];
        if(keyword?.length > 0) products = await findTitleByKeyword(keyword, skip);
        else if(genre || origin) products = await findGenreOrOrigin(genre, origin, skip);
        else products = await findAllProducts(skip);
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
        return res.status(500).json({ msg: "Error in getting products"});
    }
})

router.get("/recommendeds", async (req, res) => {
    try {
        let products = await Product.find({categories: "recommendeds"})
                                .populate('authorIds', 'name')
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
                                .populate('authorIds', 'name')
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

router.get("/item_detail/:productId", async (req, res) => {
    const productId = req.params.productId;
    try {
        let product = await Product.findById(productId)
                                .populate('authorIds', 'name')
                                .populate('reviews.userId', 'nickName')
                                .lean(true)
                                .exec();
        product.reviewsCount = product.reviews.length;
        product.stars = product.reviewsCount > 0 
                        ?
                        new BigNumber(product.reviews.reduce((total, review) => {
                            return total + review.stars
                        }, 0)/reviewsCount).decimalPlaces(2)
                        :
                        null;
        return res.status(200).send(product);  
    } catch (error) {       
        return res.status(500).json({ msg: "Error in getting product detail"});
    }
})

export default router;