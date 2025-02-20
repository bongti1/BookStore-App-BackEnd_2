import express from "express";
import {getBook, newBook, updateBook , getBookbyId, deleteBook}  from "../controller/crud.book.mjs";
import { verifyAdminToken } from "../middleware/verifyToken.mjs";

const route = express.Router();

route.get("/books", getBook);

route.get("/book/:id", getBookbyId);

route.post("/newBook",verifyAdminToken, newBook);

route.put("/updateBook/:id",verifyAdminToken, updateBook );

route.delete("/deleteBook/:id",verifyAdminToken, deleteBook);

export default route;