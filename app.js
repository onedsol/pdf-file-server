import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index.js';
import cors from 'cors';
import config from './config/config.js'

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'), cors({origin: '*'}));
app.use('/', routes);

app.listen(config.server.port, () => {
  console.log(`File server app listening on port ${config.server.port}`);
});
