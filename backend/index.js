import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import route from './route/authRoute.js';
import { deleteUnverifiedUser } from './deleteUnverifiedUser/deleteUser.js';
import dataRoute from './route/dataRoute.js';

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());

app.use(cors());


// for test
app.get("/",(req,res)=>{
    res.send("Hello");
});

deleteUnverifiedUser();

// for auth
app.use("/auth",route);

// for data
app.use("/data",dataRoute);

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});
