import PrettyError from 'pretty-error';

const pretty = new PrettyError();

export default function (app) {
  app.logger = pretty;

  return (err, req, res, next) => {
    if (err && err.code !== 404) {
      console.error('API ERROR: ', pretty.render(err));
    }

    next(err);
  };
}
