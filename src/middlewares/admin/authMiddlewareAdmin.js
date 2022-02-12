import Joi from "joi";

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
const registerSchema = Joi.object({
  name: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export function loginMiddleware(req, res, next) {
  const validation = loginSchema.validate(req.body);
  if (validation.error) return res.sendStatus(422);
  next();
}

export function registerMiddleware(req, res, next) {
  const validation = registerSchema.validate(req.body);
  if (validation.error) return res.sendStatus(422);
  next();
}
