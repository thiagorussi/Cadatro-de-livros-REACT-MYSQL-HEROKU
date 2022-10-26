const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

const PORT = process.env.PORT || 3000; // o Heroku usa a $PORT variável de ambiente e é dinâmica.

const db = mysql.createPool({ //BANCO-HEROKU
    host: "us-cdbr-east-06.cleardb.net",
    user: "xxxxxxxx",
    password: "xxxxxxxx",
    database: "heroku_a5646a86631eda2",
});

app.use(express.json());
app.use(cors()); 

app.post("/register", (req, res) => {
    const { titulo } = req.body;
    const { autor } = req.body;
    const { data } = req.body;

    let mysql = "INSERT INTO livros ( titulo, autor, data) VALUES (?, ?, ?)";
    db.query(mysql, [titulo, autor, data], (err, result) => {
        if (err) res.send(err);
        res.send(result);
    });
});

app.post("/search", (req, res) => {
    const { titulo } = req.body;
    const { autor } = req.body;
    const { data } = req.body;

    let mysql =
        "SELECT * from livros WHERE titulo = ? AND autor = ? AND data = ?";
    db.query(mysql, [titulo, autor, data], (err, result) => {
        if (err) res.send(err);
        res.send(result);
    });
});

app.get("/getLivros", (req, res) => {
    let mysql = "SELECT * FROM livros";
    db.query(mysql, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.put("/edit", (req, res) => {
    const { id } = req.body;
    const { titulo } = req.body;
    const { autor } = req.body;
    const { data } = req.body;
    let mysql = "UPDATE livros SET titulo = ?, autor = ?, data = ? WHERE id = ?";
    db.query(mysql, [titulo, autor, data, id], (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

app.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    let mysql = "DELETE FROM livros WHERE id = ?";

    db.query(mysql, id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.listen(PORT, () => {
    console.log("rodando na porta 3001");
});
