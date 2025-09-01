import express from "express"
import {
    check,
    save,
    list
} from "../controllers/markdown.controller.js"
import multer from "multer";

const upload = multer();


const MarkdownRoutes = express.Router();
MarkdownRoutes.post("/check",upload.single("file"), check)
MarkdownRoutes.post("/save", save)
MarkdownRoutes.get("/", list)


export default MarkdownRoutes