import db from "../../db.js";

export async function getClient(req, res) {
    const token = req.authorization;

    if(!token) {
        return res.sendStatus(401); //Bad Request;
    };

    try {
        const session = await db.collection("client-sessions").findOne({ token });  
    if (!session) {
        return res.sendStatus(404); //Not Found;
    }

    const user = await db.collection("client").findOne({ _id: session.userId });
    if(!user) {
        res.sendStatus(404); // NotFound;
    }
    const ClientCart = await db.collection("carts").findOne({ _id: session.userId });
    if(!ClientCart) {
        res.sendStatus(404); // NotFound;
    }
    const objectClientData = {
        name: user.name,
        cart: ClientCart.products
    }
    res.send(objectClientData);

    }
    catch (error){
        console.log(error);
        res.sendStatus(500); // Server Error;
    }
}