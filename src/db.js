import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);

// InternetDBLink= mongodb+srv://ness-commerce:carlosgustavo123@nesscommerce.y0fz8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

let db;

try {
  await mongoClient.connect();
  db = mongoClient.db("ness-commerce");

  console.log("Mongo Connected");
} catch (error) {
  console.log(error);
}

export default db;
