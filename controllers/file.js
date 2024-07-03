import config from '../config/config.js'
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import log from '../logger.js';

const load = function (req, res) {
  const file = req.query.file;
  const fileName = req.query.fileName;
  const fullPath = `${config.files.basePath}/${file}`
  log.Info(`GET Request file: ${fullPath}`)
  const fileExists = fs.existsSync(fullPath);
  if (file && fileExists) {
    log.Info(`GET Request query params: ${JSON.stringify(req.query)}`);
    res.sendFile(fullPath);
  } else {
    throw new Error('File not found in this server');
  }
};

const update = function (req, res, next) {
  log.Info(`POST Request update file: ${req.file}`)
  log.Info(`POST Request query params: ${JSON.stringify(req.query)}`);
  log.Info(`POST Request body: ${req.body}`);
  res.send('Success, file saved');
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const filePath = req.query.filePath
    if (filePath) {
      const fileName = path.dirname(filePath)
      const fullPath = `${config.files.basePath}/${fileName}`
      log.Info(`Save file: ${fullPath}`)
      cb(null, fullPath)
    } else {
      throw new Error('Missing file path')
    }
  },
  filename: function (req, file, cb) {
    const filePath = req.query.filePath
    if (filePath) {
      const fileName = path.basename(filePath)
      log.Info(`Save file name: ${filePath}`)
      cb(null, fileName)
    } else {
      throw new Error('Missing file path')
    }
  }
})
const upload = multer({storage: storage})
const pdfFile = upload.single('file');


const file = {
  pdfFile,
  update,
  load
}

export default file
