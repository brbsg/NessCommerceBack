import Joi from "joi";

const productSchema = Joi.object({
  name: Joi.string().required(),
  img: Joi.string().uri().required(),
  price: Joi.number().required(),
  amount: Joi.number().integer().required(),
  category: Joi.string().required(),
  description: Joi.string().required(),
});

export default function productMiddleware(req, res, next) {
  console.log(req.body);
  const validation = productSchema.validate(req.body);
  if (validation.error) return res.sendStatus(422);
  console.log(req.body);
  next();
}
