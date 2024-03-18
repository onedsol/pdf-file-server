import express from 'express';

import file from '../../controllers/file.js';
import auth from '../../controllers/auth.js';

const routes  = express.Router();

// routes.use('/:userId/items', users.loadUser, items);
// routes.route('/:id')
//   .all(auth.verifyToken)
//   .get(users.read)
//   .put(users.update)
//   .delete(users.delete);

routes.route('/')
  .get(auth.verifyToken, file.load)
  .post(file.pdfFile, file.update);

export default routes;
