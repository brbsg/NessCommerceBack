import Jwt from "jsonwebtoken";
import db from "../../db.js";

export async function registerProducts(req, res) {
  const token = req.headers.authorization;
  const { name, img, price, description } = req.body;

  try {
    Jwt.verify(token, process.env.JWT_SECRET);

    res.send("oi");

    const dbSession = db.collection("admin-sessions").findOne({ token });

    if (!dbSession) return res.sendStatus(401);

    await db.collection("products").deleteMany({ name });

    await db
      .collection("products")
      .insertOne({ name, img, price, description });

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(401);
  }
}
