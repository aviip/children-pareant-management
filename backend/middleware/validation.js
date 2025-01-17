const { errorFunction } = require('../utils/errorFunction');

module.exports = (schema) => (req, res, next) => {

  const { error } = schema.validate(req.body);

  if (error) {
    res.status(406);
    return res.json(
      errorFunction(true, `Error in User Data : ${error.details[0].message}`)
    );
  }
  next();
};
