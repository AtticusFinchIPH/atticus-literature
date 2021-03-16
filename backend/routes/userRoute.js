import express from "express";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import {getToken, isAuth} from "../auth/authHelper";
import User from "../models/userModel";
import Product from "../models/productModel";

const router = express.Router();

router.post("/register", 
    [
        body('firstName').not().isEmpty().withMessage('empty_firstname'),
        body('lastName').not().isEmpty().withMessage('empty_lastname'),
        body('email').isEmail().withMessage('invalid_email'),
        body('password').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
        .withMessage('weak_password'),
        body("rePassword").custom(
            (value, { req, loc, path }) => {
                if (value !== req.body.password) {
                    throw new Error('password_notmatch');
                } else {
                    return value;
                }
            }
        ),
    ],
    async (req, res) => {
        const validatorErrors = validationResult(req);
        if (!validatorErrors.isEmpty()) {
            console.log(validatorErrors.array())
            return res.status(400).send(validatorErrors.array());
        }

        let { firstName, lastName, email, password, rePassword } = req.body;
        const registerUser = await User.findOne({ email });
        if(registerUser) res.status(401).send([{ param: 'email', msg: 'used_email'}]);
        else {
            const salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(password, salt);
            const user = new User({
                firstName, lastName, email, password,
                nickName: `${firstName} ${lastName}`,       
                role: "client",
            });
            const newUser = await user.save();
            if (newUser) {
                res.status(200).send({
                    _id: newUser._id,
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    nickName: newUser.nickName,
                    email: newUser.email,
                    role: newUser.role,
                    token: getToken(newUser),
                });
            } else {
                res.status(401).send([{ msg: 'invalid_user_data' }]);
            }
        }
    }
)

router.post("/signin", 
    [
        body('email').isEmail().withMessage('invalid_email'),
    ],
    async (req, res) => {
        const validatorErrors = validationResult(req);
        if (!validatorErrors.isEmpty()) {
            console.log(validatorErrors.array())
            return res.status(400).send(validatorErrors.array());
        }
        const { email, password } = req.body;
        try {
            const signinUser = await User.findOne({ email });
            if (!signinUser) return res.status(401).send([{ msg: 'unregisted_user' }]);
            const isMatch = await bcrypt.compare(password, signinUser.password);
            if (!isMatch) return res.status(401).send([{ msg: 'invalid_password' }]);
            const {
                _id, firstName, lastName, nickName,
                address, city, state, country,
                phone, role,
                favorites, orders
            } = signinUser;
            const token = getToken(signinUser);
            return res.status(200).send({
                _id, firstName, lastName, nickName,
                email, address, city, state, country,
                phone, role, token,
                favorites, orders
            })        
        } catch (error) {
            return res.status(501).send([{ msg: 'server_error' }])
        }
    }
)

router.post("/add_favorite", isAuth, async (req, res) => {
    const user = req.user;
    const { productId } = req.body;
    let {
        _id, firstName, lastName, nickName,
        email, address, city, state, country,
        phone, role,
        favorites, orders
    } = user;
    let errorFound = false;
    let token = req.headers.authorization;
    try {       
        const product = await Product.findById(productId);
        if (!product) throw 'product_notfound';
        const userInfo = await User.findByIdAndUpdate(user._id, 
            {$push: {favorites: productId}}, 
            {new: true})
            .lean(true).exec();    
            console.log(userInfo)
        if (!userInfo) throw 'user_notfound';
        favorites = userInfo.favorites;
        token = getToken(userInfo);
        console.log(token)
    } catch (error) {
        switch (error) {
            case 'user_notfound':
            case 'product_notfound':
                errorFound = error;
                break  
            default:
                console.error(error);
                errorFound = 'server_error';
                break;
        }
    } finally {
        if (errorFound) {
        switch (errorFound) {
            case 'user_notfound':
                return res.status(401).send({
                    error: errorFound
                })
            case 'product_notfound':
                return res.status(401).send({
                    _id, firstName, lastName, nickName,
                    email, address, city, state, country,
                    phone, role,
                    favorites, orders, 
                    token, error: errorFound
                })
            default:
                return res.status(501).send({
                    _id, firstName, lastName, nickName,
                    email, address, city, state, country,
                    phone, role,
                    favorites, orders, 
                    token, error: errorFound
                })
            }
        }
        return res.status(200).send({
            _id, firstName, lastName, nickName,
            email, address, city, state, country,
            phone, role,
            favorites, orders, 
            token
        })
    }
})

router.post("/remove_favorite", isAuth, async (req, res) => {
    const user = req.user;
    const { productId } = req.body;
    let {
        _id, firstName, lastName, nickName,
        email, address, city, state, country,
        phone, role,
        favorites, orders
    } = user;
    let errorFound = false;
    let token = req.headers.authorization;
    try {       
        const product = await Product.findById(productId);
        if (!product) throw 'product_notfound';
        const userInfo = await User.findByIdAndUpdate(user._id, 
            {$pull: {favorites: productId}}, 
            {new: true})
            .lean(true).exec();
        if (!userInfo) throw 'user_notfound';
        favorites = userInfo.favorites;
        token = getToken(userInfo);
    } catch (error) {
        switch (error) {
            case 'user_notfound':
            case 'product_notfound':
                errorFound = error;
                break  
            default:
                console.error(error);
                errorFound = 'server_error';
                break;
        }
    } finally {
        if (errorFound) {
        switch (errorFound) {
            case 'user_notfound':
                return res.status(401).send({
                    error: errorFound
                })
            case 'product_notfound':
                return res.status(401).send({
                    _id, firstName, lastName, nickName,
                    email, address, city, state, country,
                    phone, role,
                    favorites, orders, 
                    token, error: errorFound
                })
            default:
                return res.status(501).send({
                    _id, firstName, lastName, nickName,
                    email, address, city, state, country,
                    phone, role,
                    favorites, orders, 
                    token, error: errorFound
                })
            }
        }
        return res.status(200).send({
            _id, firstName, lastName, nickName,
            email, address, city, state, country,
            phone, role,
            favorites, orders, 
            token
        })
    }
})

export default router;