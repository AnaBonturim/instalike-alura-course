import fs from "fs";
import { getTodosPosts, criarPost, atualizarPost, buscarPost }  from "../models/postsModel.js";
import gerarDescricaoComGemini from "../services/geminiService.js";

export async function listarPosts(req, res) {
    const posts = await getTodosPosts();
    res.status(200).json(posts);
}

export async function postarNovoPost(req, res) {
    const novoPost = req.body;

    try {
         const postCriado = await criarPost(novoPost);
         res.status(200).json(postCriado);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({"Erro": "Falha na requisição."});
    }
}

export async function uploadImagem(req, res) {

    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };

    try {
        const extensao = buscarExtensaoImagem(req.file.originalname);

        if (extensao == null)
            throw new Error(`Extensão de arquivo da imagem ${req.file.originalname} não encontrado!`);

        const postCriado = await criarPost(novoPost);
        const imagemAtualizada = `uploads/${postCriado.insertedId}${buscarExtensaoImagem(req.file.originalname)}`;

        fs.renameSync(req.file.path, imagemAtualizada);
        res.status(200).json(postCriado);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({"Erro": "Falha na requisição."});
    }
}

export async function buscarPostPorId(req, res) {
    try {
        const post = await buscarPost(req.params.id);
        res.status(200).json(post);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({"Erro": "Falha na requisição."});
    }
}

export async function atualizarNovoPost(req, res) {
    const id = req.params.id;

    try {
        const postOriginal = await buscarPost(req.params.id);

        if (!postOriginal)
            throw new Error(`Não foi possível encontrar o post do id ${req.params.id}!`);

        const extensao = buscarExtensaoImagem(postOriginal.imgUrl);

        if (extensao == null)
            throw new Error(`Extensão de arquivo da imagem ${postOriginal.imgUrl} não encontrado!`);
        
        const urlImagem = `${id}${extensao}`;

        const imgBuffer = fs.readFileSync(`uploads/${urlImagem}`);
        const descricao = await gerarDescricaoComGemini(imgBuffer);

        const post = {
            imgUrl: `http://localhost:3000/${urlImagem}`,
            descricao: descricao,
            alt: descricao
        }

        const postCriado = await atualizarPost(id, post);
        res.status(200).json(postCriado);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({"Erro": "Falha na requisição."});
    }
}



export function buscarUhOh(req, res) {
    res.status(404).send("D: Uh Oh.");
}

function buscarExtensaoImagem(nomeImagem) {
    const re = new RegExp("[.].[a-zA-Z\d].*");

    return re.exec(nomeImagem);
}