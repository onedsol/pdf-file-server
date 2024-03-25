import express from 'express';
import https from 'https';
import http from 'http';
import bodyParser from 'body-parser';
import routes from './routes/index.js';
import cors from 'cors';
import config from './config/config.js';
import fs from 'fs';

// This line is from the Node.js HTTPS documentation.
// const options = {
//   key: fs.readFileSync('test/fixtures/keys/agent2-key.pem'),
//   cert: fs.readFileSync('test/fixtures/keys/agent2-cert.cert')
// };

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'), cors({origin: '*'}));
app.use('/', routes);

// Create an HTTP service.
http.createServer(app).listen(config.server.port);
// Create an HTTPS service identical to the HTTP service.
// https.createServer(options, app).listen(443);

// app.listen(config.server.port, () => {
//   console.log(`File server app listening on port ${config.server.port}`);
// });
