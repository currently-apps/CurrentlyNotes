import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes } from "react-router-dom";

import 'services/firebase';
import store from 'stores/store';
import { Provider } from 'react-redux';

import GlobalPopup from "./components/UI/GlobalPopup";

import AuthRouter from "./pages/Auth/router";
import ErrorRouter from "./pages/Common/router";
import HomeRouter from "./pages/Home/router";
import SharedNoteRouter from "./pages/Publish/router";
import showdownHighlight from "showdown-highlight";
import 'highlight.js/styles/github-dark-dimmed.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

const showdown = require('showdown');
showdown.setOption('tasklists', true);
showdown.setOption('smoothLivePreview', true);
showdown.setOption('smartIndentationFix', true);
showdown.setOption('emoji', true);
showdown.setOption('extensions', [showdownHighlight({ pre: true })]);

root.render(
  <Provider store={store} >
    <GlobalPopup/>
    <Router>
      <Routes>
        { HomeRouter() }
        { AuthRouter() }
        { ErrorRouter() }
        { SharedNoteRouter() }
      </Routes>
    </Router>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
