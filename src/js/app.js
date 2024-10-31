
"use strict"

/*!
* Webpack Starter Kit by PIGMIL (https://pigmil.com/)
* Contributions: Antonio Da Silva (@asilvafx)
* Copyright (c) 2024 PIGMIL.COM
* Licensed under the Creative Commons Attribution 3.0 Unported License.
*/

/* CSS Imports */

import '../css/app.css';

import axios from 'axios';
window.axios = axios;

import CryptoJS from 'crypto-js';
window.CryptoJS = CryptoJS;

import './color-modes.js';

// Start WebAuthn 
import { WebAuthnApp } from './webauthn.js'; 
const webAuthnConfig = {
    timeout: 30000
};
const waApp = new WebAuthnApp(webAuthnConfig);
window.waApp = waApp;
