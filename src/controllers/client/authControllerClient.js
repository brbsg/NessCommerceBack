import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import db from "../../db.js";
import joi from 'joi';

export async function signUpClient(req, res) {
  console.log(req.body);
  const userData = req.body; // name, email, password

  const userSchema = joi.object({
      name: joi.string().required(),
      email: joi.string().email().required(),
      password: joi.string().required()
  });

  const userSchemaValidation = userSchema.validate(
    userData, 
    { abortEarly: false }
  );

  if (userSchemaValidation.error) {
      console.log(userSchemaValidation.error.details);
      return res.sendStatus(422);
  }

  const passwordHash = bcrypt.hashSync(userData.password, 10);
  try {
      const UserLocate = await db.collection('clients').FindOne({ email: userData.email });
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
  console.log(req.body);
  const userData = req.body;

  const userSchema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().required()
  });

  const userSchemaValidation = userSchema.validate(
    userData, 
    { abortEarly: false }
  );

  if (userSchemaValidation.error) {
      console.log(userSchemaValidation.error.details);
      return res.sendStatus(422);
  }

  try {
      const user = await db.collection('clients').findOne({ email: userData.email });
  
      if(!user){
          return res.sendStatus(404); //notFound
      }
      if(!bcrypt.compareSync(userData.password, user.password)) {
          return res.sendStatus(401) //Unauthorized
      }

      const token = uuid();
      await db.collection("client-sessions").insertOne({
          userId: user._id,
          token
      })

      res.send(token);
  } catch (error) {
      console.log(error);
      res.sendStatus(500);
  }
}

