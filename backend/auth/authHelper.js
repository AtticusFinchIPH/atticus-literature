import jwt from 'jsonwebtoken';
import config from '../utils/config';
import { UserEnumRole } from '../enums/userEnums';

const getToken = (user) => {
    return jwt.sign({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        nickName: user.nickName,
        email: user.email,
        address: user.address,
        city: user.city,
        state: user.state,
        country: user.country,
        phone: user.phone,
        role: user.role,
        favorites: user.favorites,
        orders: user.orders,
    }, config.JWT_SECRET, {
        expiresIn: '48h'
    })
}

const isAuth = (req, res, next) => {
    const token = req.headers.authorization;
    if(token){
        const onlyToken = token.slice(7, token.length)
        jwt.verify(onlyToken, config.JWT_SECRET, (error, decode) => {
            if(error){
                return res.status(401).send(({msg: 'Invalid Token'}))
            }
            req.user = decode;
            next();
            return;
        })
    } else {
        return res.status(401).send({msg: 'Token is not supplied'})
    }
}

const isAdmin = (req, res, next) => {
    if(req.user && req.user.role === UserEnumRole.ADMIN){
        return next();
    }
    return res.status(401).send({msg: 'Admin Token is not valid'})
}

const isSuperAdmin = (req, res, next) => {
    if(req.user && req.user.role === UserEnumRole.SUPER_ADMIN){
        return next();
    }
    return res.status(401).send({msg: 'Super Admin Token is not valid'})
}

export {getToken, isAuth, isAdmin, isSuperAdmin};