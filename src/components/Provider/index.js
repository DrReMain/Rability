import PropTypes from 'prop-types';
import { Provider as PProvider } from 'react-redux';
import { withContext } from 'recompose';

const Provider = withContext(
  {
    app: PropTypes.objectOf(PropTypes.any).isRequired
  },
  ({ app }) => ({ app })
)(PProvider);

export default Provider;
