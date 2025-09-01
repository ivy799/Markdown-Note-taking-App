import dotenv from "dotenv";
import express from "express";
import MarkdownRoutes from "./routes/markdown.route.js";


// import env
dotenv.config()

// express client
const app = express();
const PORT = process.env.PORT || 5000;

// client config
app.use(express.json());

// routes
app.use("/api/markdown", MarkdownRoutes);

app.listen(PORT, () =>{
    console.log(`Server Running On Port http://localhost:${PORT}`);
})



