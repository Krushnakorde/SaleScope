import express, { urlencoded } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from 'cors'
import router from "./src/routes/routes.js";

dotenv.config();

//   configuration 
const app = express();

app.use(cors({
    origin:["http://localhost:3000"]
}))
app.use(bodyParser.json());
app.use(urlencoded({extended:true}));


// base urls
app.use("/api", router);


export default app;

