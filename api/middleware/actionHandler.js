import PrettyError from 'pretty-error';
import * as actions from '../actions';
import mapUrl from '../utils/url';

const pretty = new PrettyError();

export default app => async (req, res, next) => {
  const splittedUrlPath = req.url
    .split('?')[0]
    .split('/')
    .slice(1);

  const { action, params } = mapUrl(actions, splittedUrlPath);

  req.app = app;

  if (action) {
    try {
      const result = await action(req, params);
      if (result instanceof Function) {
        result(res);
      } else {
        res.json(result);
      }
    } catch (e) {
      if (e && e.redirect) {
        return res.redirect(e.redirect);
      }
      console.error('API ERROR: ', pretty.render(e));
      res.status(e.code || 500).json(e);
    }
  } else {
    next();
  }
};
