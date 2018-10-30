import Expo from 'expo';

const { manifest } = Expo.Constants;
const backendPort = '3000';
const api = typeof manifest.packagerOpts === 'object'
  && manifest.packagerOpts.dev
  && `http://${manifest.debuggerHost
    .split(':')
    .shift()
    .concat(`:${backendPort}`)}`;

export default api;
