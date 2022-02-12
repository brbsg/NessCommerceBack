import Jwt from "jsonwebtoken";
import db from "../../db.js";

export async function registerProducts(req, res) {
  const token = req.headers.authorization;
  const { name, img, price, amount, description } = req.body;

  if (!token) return res.sendStatus(405);

  try {
    Jwt.verify(token, process.env.JWT_SECRET);

    const dbSession = db.collection("admin-sessions").findOne({ token });

    if (!dbSession) return res.sendStatus(401);

    await db.collection("products").deleteMany({ name });

    await db
      .collection("products")
      .insertOne({ name, img, price, amount, description });

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(401);
  }
}
