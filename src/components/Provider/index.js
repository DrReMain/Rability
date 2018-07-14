import PropTypes from 'prop-types';
import { Provider as RProvider } from 'react-redux';
import { withContext } from 'recompose';

const Provider = withContext(
  {
    client: PropTypes.func.isRequired
  },
  ({ client }) => ({ client })
)(RProvider);

export default Provider;
