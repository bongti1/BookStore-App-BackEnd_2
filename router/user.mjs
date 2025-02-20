import express from "express";
import { verifyUser } from "../controller/userController.mjs";

const route = express.Router();
route.post("/admin", verifyUser);

export default route;