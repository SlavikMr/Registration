import { connect } from 'react-redux';
import { asyncAction } from './actions';
import Form from './Form';

const mapStateToProps = state => {
  const { isLoading, message, error } = state;
  return {
    isLoading,
    message,
    error,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    sendFormData: () => dispatch(asyncAction()),
  }
};

const RForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);

export default RForm;
