import dotenv from "dotenv";

dotenv.config();

export default {
    ENVIRONMENT: process.env.ENV,
    PORT: process.env.PORT || 5000,
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/atticus-social',
}