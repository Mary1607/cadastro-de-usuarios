import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();

app.use(express.json());
app.use(cors());

app.post("/usuarios", async (req, res) => {
    try {
        const usuario = await prisma.user.create({
            data: {
                email: req.body.email,
                name: req.body.name,
                age: req.body.age,
            },
        });

        res.status(201).json({
            message: "Usuário criado com sucesso!",
            usuario,
        });
    } catch (error) {
        console.error("ERRO:", error);

        res.status(500).json({
            error: error.message,
        });
    }
});

app.get("/usuarios", async (req, res) => {
  try {
        const { id, name, email, age } = req.query;

    const users = await prisma.user.findMany({
      where: {
                ...(id && { id }),
        ...(name && { name }),
        ...(email && { email }),
        ...(age && { age }),
      },
    });

    res.status(200).json(users);

  } catch (error) {
    console.error("ERRO:", error);

    res.status(500).json({
      error: error.message,
    });
  }
});




app.put('/usuarios/:id', async (req, res) => {
    try {
        const usuario = await prisma.user.update({
            where: {
                id: req.params.id
            },
            data: {
                email: req.body.email,
                name: req.body.name,
                age: req.body.age,
            }
        });

        res.json(usuario);
    } catch (error) {
        console.error("ERRO:", error);
        res.status(500).json({ error: error.message });
    }
});

app.delete("/usuarios/:id", async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.user.delete({
            where: {
                id: id,
            },
        });

        res.status(200).json({
            mensagem: "Usuário deletado com sucesso!",
        });

    } catch (error) {
        res.status(500).json({
            erro: error.message,
        });
    }
});

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});