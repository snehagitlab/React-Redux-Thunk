// fileActions.js

import axios from 'axios';

export const uploadFileRequest = () => ({
  type: 'UPLOAD_FILE_REQUEST',
});

export const uploadFileSuccess = (fileData) => ({
  type: 'UPLOAD_FILE_SUCCESS',
  payload: fileData,
});

export const uploadFileReset = () =>({
  type: 'RESET_UPLOADED_FILE',
  payload: null,
})
export const uploadFileFailure = (error) => ({
  type: 'UPLOAD_FILE_FAILURE',
  payload: error,
});

export const uploadFile = (file) => {
  return (dispatch) => {
    dispatch(uploadFileRequest());

    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 3);
    console.log(file)
    axios
      .post('https://semilynx-api.gogtas.com/support/public/api/v1/file', formData)
      .then((response) => {
        dispatch(uploadFileSuccess(response.data));
      })
      .catch((error) => {
        dispatch(uploadFileFailure(error));
        throw error;
      });
  };
};

