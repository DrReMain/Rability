import { getContext } from 'recompose';
import PropTypes from 'prop-types';

const withClient = getContext({
  client: PropTypes.func
});

export default withClient;
