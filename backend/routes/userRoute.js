import express from "express";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import {getToken, isAuth} from "../auth/authHelper";
import User from "../models/userModel";

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
                res.send({
                    _id: newUser.id,
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    nickName: newUser.nickName,
                    description: newUser.description,
                    email: newUser.email,
                    role: newUser.isAdmin,
                    token: getToken(newUser),
                });
            } else {
                res.status(401).send([{ msg: 'invalid_user_data' }]);
            }
        }
    }
)

export default router;