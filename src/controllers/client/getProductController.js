import { ObjectId } from "mongodb";
import Jwt from "jsonwebtoken";
import db from "../../db.js";

export async function getCart(req, res) {
  const token = req.headers.authorization;

  try {
    Jwt.verify(token, process.env.JWT_SECRET);

    const dbSession = await db.collection("client-sessions").findOne({ token });

    const dbCart = await db
      .collection("carts")
      .find({ userId: new ObjectId(dbSession.userId) })
      .toArray();

    let cart = [];

    for (let i in dbCart) {
      let auxCart = await db
        .collection("products")
        .findOne({ _id: dbCart[i].productId });

      cart.push(auxCart);
    }

    res.send(cart).status(201);
  } catch (error) {
    console.log(error);
  }
}

export async function postCart(req, res) {
  const token = req.headers.authorization;
  const { productId } = req.params;

  try {
    Jwt.verify(token, process.env.JWT_SECRET);

    const dbSession = await db.collection("client-sessions").findOne({ token });

    console.log(dbSession);
    await db.collection("carts").insertOne({
      productId: new ObjectId(productId),
      userId: dbSession.userId,
    });

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(401);
  }
}

export async function getAllProducts(_, res) {
  try {
    const Allproducts = await db.collection("products").find({}).toArray();
    if (!Allproducts) {
      res.sendStatus(404); //not found;
    }
    res.send(Allproducts).status(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function getProduct(req, res) {
  const { productId } = req.params;

  console.log(productId);

  try {
    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(productId) });

    if (!product) {
      return res.sendStatus(404); //not found;
    }

    res.send(product);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
