import express from "express";

const app = express();

app.listen(9042, () => {
    console.log("Servidor escutando...");
}); 

app.get("/home", (req, res) => {
    res.status(200).send("You know what, I just wanna go home.");
});