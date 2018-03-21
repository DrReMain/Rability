import PropTypes from 'prop-types';
import { Provider as PProvider } from 'react-redux';
import { withContext } from 'recompose';

const Provider = withContext(
  {
    app: PropTypes.objectOf(PropTypes.any).isRequired,
    restApp: PropTypes.objectOf(PropTypes.any).isRequired
  },
  ({ app, restApp }) => ({ app, restApp })
)(PProvider);

export default Provider;
