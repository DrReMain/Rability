const errors = require('@feathersjs/errors');

export default function () {
  return (req, res, next) => {
    next(new errors.NotFound('404'));
  };
}
