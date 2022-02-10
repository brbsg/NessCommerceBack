import Joi from "joi";

const productSchema = Joi.object({
  name: Joi.string().required(),
  img: Joi.string().dataUri().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
});

export default function productMiddleware(req, res, next) {
  const validation = productSchema.validate(req.body);
  if (validation.error) return res.sendStatus(422);
  next();
}
