import db from "../../db.js";
import dayjs from "dayjs";

export async function getClient(req, res) {
    const token = req.headers.authorization;

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
        const clientCart = await db.collection("carts").findOne({ userId: session.userId });
        if(!clientCart) {
            res.sendStatus(404); // NotFound;
        }
        const objectClientData = {
            name: user.name,
            cart: clientCart.products
        }
        res.send(objectClientData);
    }
    catch (error){
        console.log(error);
        res.sendStatus(500); // Server Error;
    }
}

export async function postConfirmBuy(req, res){
    const token = req.headers.authorization;
    if(!token) {
        return res.sendStatus(401); //Bad Request;
    };

    try {
        const session = await db.collection("client-sessions").findOne({ token });  
        if (!session) {
            return res.sendStatus(404); //Not Found;
        }
        const clientCart = await db.collection("carts").findOne({ userId: session.userId });
        if(!user) {
            res.sendStatus(404); // NotFound;
        }

        const replacer = (dayjs().format("YYYY-MM-DD")).replace("-", "/");

        const productsID = clientCart.products;
        let objectProducts = {};

        for(let i=0; i<productsID.length; i++){
            objectProducts = Object.assign({ _id: productsID[i] }, objectProducts);
        }
        const clientProducts = await db.collection("products").findMany(objectProducts).toArray();

        let ProductPrices= 0;
        for(let i=0; i<clientProducts.length; i++){
            ProductPrices += Number(clientProducts[i].price);
        }

        await db.collection("sales").insertOne({
            userId: clientCart.userId,
            products = clientCart.products,
            date: replacer,
            total: productPrices
        });
        res.sendStatus(201); // Created;
    } catch (error) {
        console.log(error);
        res.sendStatus(500); // Server Error;
    }
}