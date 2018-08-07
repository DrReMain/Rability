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
  console.log('显示菊花');
  actionPromise
    .then(
      result => {
        console.log('隐藏菊花');
        return next({ ...rest, result, type: SUCCESS });
      },
      error => {
        console.log('隐藏菊花');
        // axios请求全局错误拦截 ...
        // e.g
        // if (error.errcode === ????) { dispatch( action({ }) ) }
        return next({ ...rest, error, type: FAILURE });
      }
    )
    .catch(error => {
      console.log('隐藏菊花');
      console.error('MIDDLEWARE ERROR: ', error);
      next({ ...rest, error, type: FAILURE });
    });
  return actionPromise;
};
