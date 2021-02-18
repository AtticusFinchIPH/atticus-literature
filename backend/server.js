import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import config from "./utils/config";
import cors from "cors";

const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
}).catch(error => console.log(error.reason));

const app = express();
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
const corsOption = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));
app.get("/api", (req, res) => {
    res.send("Atticus Literature's api is running");
});

const main = () => {
    console.log(`Server started at http://localhost:${config.PORT}`);
}

app.listen(config.PORT, () => {
    main();
})