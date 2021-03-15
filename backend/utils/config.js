import dotenv from "dotenv";

dotenv.config();

export default {
    ENVIRONMENT: process.env.ENV,
    PORT: process.env["NODE_ENV"] === "develop" ? 5000 : 80,
    JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/atticus-social',
    STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY || 'pk_test_nqH70Fb8FmabuVsU5kp4gpYf00XGNeVxyf',
}