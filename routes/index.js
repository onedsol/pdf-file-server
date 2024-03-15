import express from 'express';

import auth from './auth';
import file from './file';
import response from '../helpers/response';

const routes  = express.Router();

routes.use(response.setHeadersForCORS);

routes.use('/', (req, res) => {
  res.send('Hello World!');
});
routes.use('/files', file);

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Ok' });
});

routes.use(function(req, res) {
  response.sendNotFound(res);
});

module.exports = routes;
