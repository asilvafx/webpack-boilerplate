/*!
* Webpack Starter Kit by PIGMIL (https://pigmil.com/)
* Contributions: Antonio Da Silva (@asilvafx)
* Copyright (c) 2024 PIGMIL.COM
* Licensed under the Creative Commons Attribution 3.0 Unported License.
*/

/* CSS Imports */

import './styles/index.css';

import axios from 'axios';

import * as serviceWorker from './serviceWorker.js';

import './App.js';

window.axios = axios;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
