import axios from 'axios';

const API_URL = 'http://192.168.1.2:8080';
const client = axios.create({
  baseURL: API_URL,
});

/**
 * Request Wrapper with default success/error actions
 */
const request = async options => {
  const onSuccess = response => {
    console.log('Request Successful!', response.data);
    return response.data;
  };

  const onError = error => {
    console.error('Request Failed:', error.config);

    if (error.response) {
      // Request was made but server responded with something
      // other than 2xx
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
      console.error('Headers:', error.response.headers);
    } else {
      // Something else happened while setting up the request
      // triggered the error
      console.error('Error Message:', error.message);
    }

    return Promise.reject(error.response || error.message);
  };

  try {
    const response = await client(options);
    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
};

export default request;
