import Expo from 'expo';

const { manifest } = Expo.Constants;
const backendPort = '5000';
/*
const api = typeof manifest.packagerOpts === 'object'
  && manifest.packagerOpts.dev
  && `http://${manifest.debuggerHost
    .split(':')
    .shift()
    .concat(`:${backendPort}`)}`;
    */
const api = `https://mapp.mikligardur.com`;

export default api;
