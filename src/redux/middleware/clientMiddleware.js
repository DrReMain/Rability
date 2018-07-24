export default providers => ({ dispatch, getState }) => next => action => {
  if (typeof action === 'function') {
    return action(dispatch, getState);
  }

  const { promise, types, ...rest } = action;

  if (!promise) {
    return next(action);
  }

  const [REQUEST, SUCCESS, FAILURE] = types;
  next({ ...rest, type: REQUEST });

  const actionPromise = promise(providers, dispatch);
  actionPromise
    .then(
      result => next({ ...rest, result, type: SUCCESS }),
      error =>
        // axios请求全局错误拦截 ...
        // e.g
        // if (error.errcode === ????) { action()(dispatch, getState) }
        next({ ...rest, error, type: FAILURE })
    )
    .catch(error => {
      console.error('MIDDLEWARE ERROR: ', error);
      next({ ...rest, error, type: FAILURE });
    });
  return actionPromise;
};
