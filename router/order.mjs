import express from 'express';
import {getOrderByEmail, newOrder} from '../controller/orderController.mjs';
const route = express.Router();

route.get("/getOrder/:email", getOrderByEmail);

route.post("/newOrder", newOrder);

export default route;