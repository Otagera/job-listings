import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';

import Layout from '../../hoc/Layout/Layout';
import Main from '../Main/Main';

class App extends Component {
  render(){
    return (
      <BrowserRouter>
        <div className="App">
          <Layout>
            <Main />
          </Layout>
          <div className="attribution">
      	    Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank" rel='noopener noreferrer'>Frontend Mentor</a>. 
      	    Coded by <a href="/">Lenzo</a>.
      	  </div>
        </div>      
      </BrowserRouter>
    );
  }
}

export default App;
