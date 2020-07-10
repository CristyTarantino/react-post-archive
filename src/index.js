import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// Execute code globally
import axios from 'axios';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com/';
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';

axios.interceptors.request.use(request => {
  console.log(request);
  // Add headers etc
  return request;
}, error => {
  console.error(error);
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  console.log(response);
  return response;
}, error => {
  console.error(error);
  return Promise.reject(error);
});

// https://github.com/axios/axios#interceptors
// If you may need to remove an interceptor later you can.
// axios.interceptors.request.eject(requestInterceptor);
// axios.interceptors.response.eject(responseInterceptor);

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
