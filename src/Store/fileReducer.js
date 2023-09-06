const initialState = {
    uploadedFile: null,
    loading: false,
    error: null,
  };
  
  const fileReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPLOAD_FILE_REQUEST':
        return {
          ...state,
          loading: true,
          error: null,
        };
      case 'UPLOAD_FILE_SUCCESS':
        return {
          ...state,
          uploadedFile: action.payload,
          loading: false,
        };
      case 'UPLOAD_FILE_FAILURE':
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
    
      default:
        return state;
    }
  };
  
  export default fileReducer;