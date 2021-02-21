import express from "express";
import {getToken, isAuth} from "../auth/authHelper";
import { ProductEnumGenre } from "../enums/productEnums";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const genres = await ProductEnumGenre.find();  
        return res.status(200).send(genres);
    } catch (error) {
        return res.status(500).json({ msg: "Error in getting product genres"});
        
    }
})

export default router;