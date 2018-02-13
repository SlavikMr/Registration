export const submitForm = () => ({ 
  type: 'SUBMIT_FORM',
  payload: {
    isLoading: true,
    message: 'Data is loading...',
  },
  error: false,
 });
 
export const receiveData = () => ({
  type: 'RECEIVE_DATA',
  payload: {
    isLoading: false,
    message: 'Data is loaded',
  },
  error: false,
});

export const failResponse = (error) => ({
  type: 'FAIL_RESPONSE',
  payload: {
    isLoading: false,
    message: error,
  },
  error: true,
});

export const asyncAction = () => ({
  type: 'SEND_ASYNC',
});
