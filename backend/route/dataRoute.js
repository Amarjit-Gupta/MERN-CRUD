import express from 'express';
import { addData,deleteSingleData,getData,getSingleData,search, updateSingleData } from '../controller/dataController.js';

const dataRoute = express.Router();

dataRoute.post("/addData",addData);
dataRoute.get("/getData",getData);
dataRoute.get("/getSingleData/:id",getSingleData);
dataRoute.put("/updateSingleData/:id",updateSingleData);
dataRoute.delete("/deleteSingleData/:id",deleteSingleData);
dataRoute.get("/search/:key",search);

export default dataRoute;


