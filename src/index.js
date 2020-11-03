import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './assets/fonts/Questrial-Regular.ttf';
import App from './containers/App/App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';

//axios.defaults.baseURL = 'http://127.0.0.1:3001/api';
axios.defaults.baseURL = 'https://evening-wildwood-17350.herokuapp.com/api';
//axios.defaults.headers.common['Autorization'] = 'AUTH TOKEN';
axios.interceptors.request.use(request=>{
	return request;
}, error=>{
	console.log(error);
	return Promise.reject(error);
});

axios.interceptors.response.use(response=>{
	return response;
},error=>{
	console.log(error);
	return Promise.reject(error);
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
//CLOUDINARY_URL=cloudinary://432723375944148:JSDqr-nva3H92LFl-AktW0y5MZ4@lenxo;