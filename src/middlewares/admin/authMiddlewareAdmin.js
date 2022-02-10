import Joi from "joi";

const adminSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export default function adminMiddleware(req, res, next) {
  const validation = adminSchema.validate(req.body);
  if (validation.error) return res.sendStatus(422);
  next();
}
