const initState = {
  isLoading: false,
  message: '',
  error: false,
};

export const formData = (state = initState, action) => {
  switch (action.type) {
    case 'SUBMIT_FORM':
      return {
        isLoading: action.payload.isLoading,
        message: action.payload.message,
        error: action.error,
      };

    case 'RECEIVE_DATA':
      return {
        isLoading: action.payload.isLoading,
        message: action.payload.message,
        error: action.error,
      };    
  
    case 'FAIL_RESPONSE':
      return {
        isLoading: action.payload.isLoading,
        message: action.payload.message,
        error: action.error,
      };    

    default:
      return state;
  }
};
