import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { supabase } from "./util/connection";
import reportWebVitals from './reportWebVitals';
import { AppContextProvider } from "./AppContext";
import 'semantic-ui-css/semantic.min.css'

ReactDOM.render(
  <AppContextProvider>
    <App supabase={supabase} />
  </AppContextProvider>, document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
