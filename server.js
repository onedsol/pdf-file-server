require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const docPath = process.env.DOC_DIR;
const cors = require('cors');
const fs = require('fs');
const multer = require('multer');

app.use(
  express.static('public'),
  cors({
    origin: '*',
  })
);

// change the url to your own
let corsOptions = {
  origin: [
    'http://localhost:8080/',
  ],
};

app.listen(port, () => {
  console.log(`File server app listening on port ${port}`);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/get', cors(corsOptions), function (req, res) {
  const filePath = req.query.filePath;
  // const fileName = req.query.filename;
  console.log(req.query);
  res.sendFile(docPath + filePath);
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const filePath = req.query.filePath;
    cb(null, docPath + filePath)
  },
  filename: function (req, file, cb) {
    const fileName = req.query.fileName;
    cb(null, fileName)
  }
})
const upload = multer({storage: storage})
const pdfFile = upload.single('pdfFile');
app.post('/save', pdfFile, function (req, res, next) {
  console.log(req.query);
  console.log(req.body);
  console.log(req.file);
  res.send('Success, file saved');
});
