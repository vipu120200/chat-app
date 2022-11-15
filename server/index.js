import express  from "express";
import dotenv  from "dotenv";


const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.listen(5000,console.log('server running ion porrt 5000'));
