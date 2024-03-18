const sendCreated = function(res, data) {
  return res.status(201).send(data);
};

const sendBadRequest = function(res, message) {
  return res.status(400).send({
    success: false,
    message: message
  });
};

const sendUnauthorized = function(res, message) {
  return res.status(401).send({
    success: false,
    message: message
  });
};

const sendForbidden = function(res) {
  return res.status(403).send({ 
    success: false,
    message: 'You do not have rights to access this resource.'
  });
};

const sendNotFound = function(res) {
  return res.status(404).send({
    success: false,
    message: 'Resource not found.'
  });
};

const setHeadersForCORS = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-Access-Token, Content-Type, Accept");
  next();
}

const response = {
  sendCreated,
  sendBadRequest,
  sendUnauthorized,
  sendForbidden,
  sendNotFound,
  setHeadersForCORS
}

export default response;
