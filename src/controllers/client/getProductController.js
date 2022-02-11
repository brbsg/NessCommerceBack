import db from "../../db.js";

export async function getAllProducts(_, res) {
    try {
        const Allproducts = await db.collection("products").find({}).toArray();
        if(!Allproducts){
            res.sendStatus(404); //not found;
        }
        res.send(Allproducts);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};