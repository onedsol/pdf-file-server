import express from 'express';

import auth from './auth.js';
import file from './file/index.js';
import response from '../helpers/response.js';

const routes  = express.Router();

routes.use(response.setHeadersForCORS);
// routes.use('/', auth);
routes.use('/file', file);

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World!' });
});

routes.use(function(req, res) {
  response.sendNotFound(res);
});

export default routes;
