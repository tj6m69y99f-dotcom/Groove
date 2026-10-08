require("dotenv").config();

const path = require("path");

//IMPORTAÇÃO
const express = require("express");
const mysql = require("mysql2/promise");

// INIT EXPRESS
const app = express();

//DEFINIR PORTA
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "groove_store",
  waitForConnections: true,
  connectionLimit: 10
});

function validId(value) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0;
}

function validProduct(product) {
  return (
    validId(product.categoryId) &&
    String(product.title || "").trim() !== "" &&
    String(product.artist || "").trim() !== "" &&
    ["New", "Used"].includes(product.condition) &&
    Number.isFinite(Number(product.price)) && Number(product.price) >= 0 &&
    Number.isInteger(Number(product.stock)) && Number(product.stock) >= 0
  );
}

app.get("/api/estado", async (request, response) => {
  try {
    await pool.query("SELECT 1");
    response.json({ mensagem: "Backend e MySQL estão ligados." });
  } catch (error) {
    response.status(503).json({ erro: "O backend funciona, mas não conseguiu ligar ao MySQL." });
  }
});

app.get("/api/categories", async (request, response) => {
  try {
    const [categories] = await pool.query(
      "SELECT id, name, description FROM categories ORDER BY name"
    );
    response.json(categories);
  } catch (error) {
    response.status(500).json({ erro: "Não foi possível carregar as categorias." });
  }
});

app.get("/api/products", async (request, response) => {
  try {
    const [products] = await pool.query(`
      SELECT p.id, p.title, p.artist, c.name AS category,
             p.condition, p.price, p.stock,
p.cover_class AS coverClass, p.image_url AS imageUrl
      FROM products p
      INNER JOIN categories c ON c.id = p.category_id
      ORDER BY c.name, p.title
    `);
    response.json(products);
  } catch (error) {
    response.status(500).json({ erro: "Não foi possível carregar os produtos." });
  }
});

app.get("/api/products/:id", async (request, response) => {
  if (!validId(request.params.id)) {
    return response.status(400).json({ erro: "O ID não é válido." });
  }

  try {
    const [products] = await pool.query(`
      SELECT p.id, p.category_id AS categoryId, p.title, p.artist,
             p.condition, p.price, p.stock, p.cover_class AS coverClass, p.image_url AS imageUrl
      FROM products p
      WHERE p.id = ?
    `, [request.params.id]);

    if (products.length === 0) {
      return response.status(404).json({ erro: "Produto não encontrado." });
    }

    response.json(products[0]);
  } catch (error) {
    response.status(500).json({ erro: "Não foi possível carregar o produto." });
  }
});

app.post("/api/products", async (request, response) => {
  if (!validProduct(request.body)) {
    return response.status(400).json({ erro: "Verifique os dados do produto." });
  }

  const { categoryId, title, artist, condition, price, stock, coverClass = "cover-1" } = request.body;

  try {
    const [result] = await pool.query(`
      INSERT INTO products
        (category_id, title, artist, condition, price, stock, cover_class)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [categoryId, title.trim(), artist.trim(), condition, price, stock, coverClass]);

    response.status(201).json({ mensagem: "Produto adicionado.", id: result.insertId });
  } catch (error) {
    if (error.code === "ER_NO_REFERENCED_ROW_2") {
      return response.status(400).json({ erro: "A categoria indicada não existe." });
    }
    response.status(500).json({ erro: "Não foi possível adicionar o produto." });
  }
});

app.put("/api/products/:id", async (request, response) => {
  if (!validId(request.params.id) || !validProduct(request.body)) {
    return response.status(400).json({ erro: "Verifique o ID e os dados do produto." });
  }

  const { categoryId, title, artist, condition, price, stock, coverClass = "cover-1" } = request.body;

  try {
    const [result] = await pool.query(`
      UPDATE products
      SET category_id = ?, title = ?, artist = ?, condition = ?,
          price = ?, stock = ?, cover_class = ?
      WHERE id = ?
    `, [categoryId, title.trim(), artist.trim(), condition, price, stock, coverClass, request.params.id]);

    if (result.affectedRows === 0) {
      return response.status(404).json({ erro: "Produto não encontrado." });
    }

    response.json({ mensagem: "Produto atualizado." });
  } catch (error) {
    if (error.code === "ER_NO_REFERENCED_ROW_2") {
      return response.status(400).json({ erro: "A categoria indicada não existe." });
    }
    response.status(500).json({ erro: "Não foi possível atualizar o produto." });
  }
});

app.delete("/api/products/:id", async (request, response) => {
  if (!validId(request.params.id)) {
    return response.status(400).json({ erro: "O ID não é válido." });
  }

  try {
    const [result] = await pool.query("DELETE FROM products WHERE id = ?", [request.params.id]);

    if (result.affectedRows === 0) {
      return response.status(404).json({ erro: "Produto não encontrado." });
    }

    response.json({ mensagem: "Produto apagado." });
  } catch (error) {
    response.status(500).json({ erro: "Não foi possível apagar o produto." });
  }
});

app.use(express.static(path.join(__dirname, "..", "frontend")));

app.listen(PORT, () => {
  console.log(`Groove Store: http://localhost:${PORT}`);
});
