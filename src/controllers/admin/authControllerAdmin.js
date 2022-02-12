import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../../db.js";

export async function signIn(req, res) {
  const { email, password } = req.body;
  console.log(req.body);

  try {
    const dbAdmin = await db.collection("admins").findOne({ email });
    const dbSession = await db
      .collection("admin-sessions")
      .findOne({ userId: dbAdmin._id });

    if (dbSession) {
      await db.collection("admin-sessions").deleteMany({ userId: dbAdmin._id });
    }

    if (dbAdmin && bcrypt.compareSync(password, dbAdmin.password)) {
      const token = jwt.sign({ name: dbAdmin.name }, process.env.JWT_SECRET, {
        expiresIn: Number(process.env.JWT_EXPIRATION),
      });

      await db.collection("admin-sessions").insertOne({
        userId: dbAdmin._id,
        token,
      });

      res.send({ name: dbAdmin.name, token }).status(200);
    } else {
      res.sendStatus(402);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(401);
  }
}

export async function registerAdmin(req, res) {
  const token = req.headers.authorization;
  const { name, email, password } = req.body; // dados do admin que será cadastrado

  if (!token) return res.sendStatus(405);
  try {
    jwt.verify(token, process.env.JWT_SECRET);

    const dbSession = await db.collection("admin-sessions").findOne({ token });

    if (!dbSession) return res.sendStatus(401);

    const dbAdmin = await db
      .collection("admins")
      .findOne({ _id: dbSession.userId });

    const dbAdminMaster = await db
      .collection("admins-master")
      .findOne({ email: dbAdmin.email });

    if (dbAdmin && dbAdminMaster) {
      const checkAdmin = await db.collection("admins").findOne({ email });

      if (checkAdmin) return res.sendStatus(401);

      const passwordHash = bcrypt.hashSync(password, 10);

      await db
        .collection("admins")
        .insertOne({ name, email, password: passwordHash });

      res.send().status(201);
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(401);
  }
}
