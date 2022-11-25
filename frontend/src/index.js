import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import { applyMiddleware, compose} from 'redux';
import { configureStore } from "@reduxjs/toolkit";
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import ChatProvider from './Context/ChatProvider';

const store = configureStore ({reducer:reducers},compose(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <BrowserRouter>
  <ChatProvider>
    <Provider store={store}>
        <ChakraProvider>
          <App />
        </ChakraProvider>
    </Provider>
  </ChatProvider>
      </BrowserRouter>

);


