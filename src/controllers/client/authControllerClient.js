import bcrypt from 'bcrypt';
import db from "../../db.js";

export async function signUpClient(req, res) {
  const userData = req.body; // name, email, password

  

  const passwordHash = bcrypt.hashSync(userData.password, 10);
  try {
      const UserLocate = await db.collection('clients').findOne({ email: userData.email });
      if(UserLocate) {
        return res.sendStatus(401); //bad Request => User already exist;
      }

      await db.collection('clients').insertOne({ ...userData, password: passwordHash });
      res.sendStatus(201); //created;
  } catch (error) {
      console.log(error);
      res.sendStatus(500); //error from server;
  }
}

export async function signInClient(req, res) {
  const { email, password } = req.body;

  try {
      const user = await db.collection('clients').findOne({ email });

      const userSession = await db
      .collection("client-sessions")
      .findOne({ userId: user._id });

    if (userSession) {
      await db.collection("client-sessions").deleteMany({ userId: user._id });
    }

    if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign(
            { name: user.name }, 
            process.env.JWT_SECRET, 
            {expiresIn: Number(process.env.JWT_EXPIRATION),}
        );

        await db.collection("user-sessions").insertOne({
            userId: user._id,
            token,
          });
    
        res.send({ name: user.name, token });
    }else {
        res.sendStatus(402);
    }

  } catch (error) {
      console.log(error);
      res.sendStatus(500);
  }
}

