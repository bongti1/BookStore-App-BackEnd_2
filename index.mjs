import express from "express";
import { connectDB } from "./config/db.mjs";
import bookRouter from "./router/book.mjs";
import orderRouter from "./router/order.mjs";
import userRouter from "./router/user.mjs";
import adminRoute from "./state/stateAdmin.mjs";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({ 
    origin: ['http://localhost:5173', 'https://book-store-app-front-end-seven.vercel.app'],
    credentials: true
}));

app.use("/api/bookstore", bookRouter);
app.use("/api/order", orderRouter);
app.use("/api/auth", userRouter);
app.use("/api/admin", adminRoute);

app.get("/", (req, res) => {
    return res.send("I am a new programmer")
});

app.listen(PORT, () =>{
   console.log("Server is running on " + PORT +"...");
   connectDB();
})