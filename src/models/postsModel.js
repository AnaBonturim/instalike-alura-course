import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

export async function getTodosPosts() {
    const db = conexao.db("instalike-alura-course");
    const colecao = db.collection("posts");

    return colecao.find().toArray();
}

export async function criarPost(novoPost) {
    const db = conexao.db("instalike-alura-course");
    const colecao = db.collection("posts");

    return colecao.insertOne(novoPost);
}

export async function atualizarPost(id, post) {
    const db = conexao.db("instalike-alura-course");
    const colecao = db.collection("posts");
    const objId = ObjectId.createFromHexString(id);
    
    return colecao.updateOne({_id: new ObjectId(objId)}, {$set:post});
}

export async function buscarPost(id) {
    const db = conexao.db("instalike-alura-course");
    const colecao = db.collection("posts");
    const objId = ObjectId.createFromHexString(id);
    
    return colecao.findOne({_id: new ObjectId(objId)});
}
