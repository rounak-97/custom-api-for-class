const Joi = require('joi');

// CREATE student
const validateCreateStudent = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    age: Joi.number().integer().min(1).required(),
    course: Joi.string().min(2).required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
};

// UPDATE student
const validateUpdateStudent = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2),
    email: Joi.string().email(),
    age: Joi.number().integer().min(1),
    course: Joi.string().min(2)
  }).min(1);

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
};

// PAGINATION + SEARCH QUERY VALIDATION 
const validateStudentQuery = (req, res, next) => {
  const schema = Joi.object({
    page: Joi.number().integer().min(1).optional(),
    limit: Joi.number().integer().min(1).max(50).optional(),
    search: Joi.string().allow('').optional()
  });

  const { error } = schema.validate(req.query);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message
    });
  }

  next();
};

module.exports = {
  validateCreateStudent,
  validateUpdateStudent,
  validateStudentQuery
};
