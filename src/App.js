
"use strict"

/*!
* Webpack Starter Kit by PIGMIL (https://pigmil.com/)
* Contributions: Antonio Da Silva (@asilvafx)
* Copyright (c) 2024 PIGMIL.COM
* Licensed under the Creative Commons Attribution 3.0 Unported License.
*/

/* CSS Imports */

import './styles/index.css';

import axios from 'axios';
window.axios = axios;

import CryptoJS from 'crypto-js';
window.CryptoJS = CryptoJS;

import './scripts/color-modes.js';

// Start WebAuthn 
import { WebAuthnApp } from './scripts/webauthn.js';
const webAuthnConfig = {
    timeout: 30000
};
const waApp = new WebAuthnApp(webAuthnConfig);
window.waApp = waApp;

import * as serviceWorker from './serviceWorker.js';

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
