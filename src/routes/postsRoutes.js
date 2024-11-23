import express from "express";
import multer from "multer";
import { listarPosts, buscarPostPorId, buscarUhOh, postarNovoPost, uploadImagem } from "../controllers/postsController.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({dest:"./uploads", storage});

// No linux ou mac:
// const upload = multer({dest:"./uploads"});

const routes = (app) => {
    app.use(express.json());

    app.get("/posts", listarPosts);
    
    app.post("/posts", postarNovoPost);

    app.get("/posts/:id", buscarPostPorId);
    
    app.get("/uhoh", buscarUhOh);

    app.post("/upload", upload.single("imagem"), uploadImagem);
}

export default routes;