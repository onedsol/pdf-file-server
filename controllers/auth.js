// import mongoose from 'mongoose';
// import jwt from 'jsonwebtoken';
// import config from 'config';
// import response from '../helpers/response.js';

// const User = mongoose.model('User');

// const privateKey = config.key.privateKey;
// const tokenExpireInSeconds = config.key.tokenExpireInSeconds;

const authenticate = function(req, res) {
  // User.findOne({ email: req.body.email })
  // .exec(function(err, user) {
  //   if (err) throw err;
  //
  //   if (!user) {
  //     response.sendUnauthorized(res, 'Authentication failed.');
  //   } else if (user) {
  //     user.verifyPassword(req.body.password, function(err, isMatch) {
  //       if (isMatch) {
  //         const token = jwt.sign(user.getTokenData(), privateKey, {
  //           expiresIn: tokenExpireInSeconds
  //         });
  //
  //         res.json({
  //           success: true,
  //           message: 'Token created.',
  //           token: token
  //         });
  //       } else {
  //         response.sendUnauthorized(res, 'Authentication failed.');
  //       }
  //     });
  //   }
  // });
  res.json({
    success: true,
    message: 'Token created.',
    token: 'token'
  });
}

const verifyToken = function(req, res, next) {
  next();
  // const token = req.body.token || req.query.token || req.headers['x-access-token'];
  //
  // if (token) {
  //   jwt.verify(token, privateKey, function(err, decoded) {
  //     if (err) {
  //       response.sendUnauthorized(res, 'Failed to authenticate token.');
  //     } else {
  //       User.findById(decoded.id, function(err, user) {
  //         if (err) res.send(err);
  //         req.currentUser = user;
  //         next();
  //       });
  //     }
  //   });
  // } else {
  //   response.sendUnauthorized(res, 'No token provided.');
  // }
};

const auth = {
  verifyToken,
  authenticate
}

export default auth
