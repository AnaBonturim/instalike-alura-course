import express from "express";
import conectarAoBanco from "./src/config/dbConfig.js";

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

const app = express();
app.use(express.json());

app.listen(9042, () => {
    console.log("Servidor escutando...");
}); 

async function getTodosPosts() {
    const db = conexao.db("instalike-alura-course");
    const colecao = db.collection("posts");

    return colecao.find().toArray();
}

app.get("/posts", async (req, res) => {
    const posts = await getTodosPosts();
    res.status(200).json(posts);
});

function buscarPostPorId(id) {
    return posts.find((post) => {
        return post.id === Number(id);
    })
};

app.get("/posts/:id", async (req, res) => {
    const posts = await getTodosPosts();
    const post = posts[req.params.id];
    res.status(200).json(post);
});

app.get("/uhoh", (req, res) => {
    res.status(404).send("D: Uh Oh.");
});