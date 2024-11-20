import express from "express";

const posts = [
    {
        id: 1,
        descricao: "Cat please",
        imagem: "https://placecats.com/millie/300/150"
    },
    {
        id: 2,
        descricao: "Cute Puppy",
        imagem: "https://placepuppy.com/puppy/300/150"
    },
    {
        id: 3,
        descricao: "Beautiful Landscape",
        imagem: "https://placeimg.com/300/150/nature"
    },
    {
        id: 4,
        descricao: "Tech Gadgets",
        imagem: "https://placeimg.com/300/150/tech"
    },
    {
        id: 5,
        descricao: "Delicious Food",
        imagem: "https://placeimg.com/300/150/food"
    },
    {
        id: 6,
        descricao: "Funny Animals",
        imagem: "https://placeimg.com/300/150/animals"
    }
  ];

const app = express();
app.use(express.json());

app.listen(9042, () => {
    console.log("Servidor escutando...");
}); 

app.get("/posts", (req, res) => {
    res.status(200).json(posts);
});

function buscarPostPorId(id) {
    return posts.find((post) => {
        return post.id === Number(id);
    })
};

app.get("/posts/:id", (req, res) => {
    const post = buscarPostPorId(req.params.id);
    res.status(200).json(post);
});

app.get("/uhoh", (req, res) => {
    res.status(404).send("D: Uh Oh.");
});