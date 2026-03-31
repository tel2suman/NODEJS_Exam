
const Joi = require("joi");

const StatusCode = require("./StatusCode");

const ProductSchemaValidation = Joi.object({
  //name validation
  name: Joi.string().min(5).max(10).trim().required(),

  //category validation
  category: Joi.string().min(5).max(10).trim().required(),

  //category validation
  slug: Joi.string().min(5).max(10).trim().required(),

  //description validation
  description: Joi.string().min(4).max(10).trim().required(),
});

const validateRegister = (req, res, next) => {

  const { error, value } = ProductSchemaValidation.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(StatusCode.BAD_REQUEST).json({
      success: false,
      message: error.details[0].message,
    });
  }

  req.body = value;

  next();
};

module.exports = validateRegister;

