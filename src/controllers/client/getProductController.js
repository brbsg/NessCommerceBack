import db from "../../db.js";

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
    const productID = req.params.whatproduct;

    try {
        const product = await db.collection("products").findOne({_id: productID });
        if(!product){
            res.sendStatus(404); //not found;
        }
        res.send(product);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}