import express from 'express';

import auth from '../controllers/auth.js';

const routes = express.Router();

routes.route('/authenticate')
  .post(auth.authenticate);

export default routes;
