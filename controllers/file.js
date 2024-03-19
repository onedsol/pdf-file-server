import config from '../config/config.js'
import multer from 'multer';
import fs from 'fs';
import path from 'path';

const load = function (req, res) {
  const file = req.query.file;
  const fileName = req.query.fileName;
  const fullPath = `${config.files.basePath}/${file}`
  console.log(fullPath)
  const fileExists = fs.existsSync(fullPath);
  if (file && fileExists) {
    console.log(req.query);
    res.sendFile(fullPath);
  } else {
    throw new Error('File not found in this server');
  }
};

const update = function (req, res, next) {
  console.log(req.query);
  console.log(req.body);
  console.log(req.file);
  res.send('Success, file saved');
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const filePath = req.query.filePath;
    if (filePath) {
      const fileName = path.dirname(filePath)
      const fullPath = `${config.files.basePath}/${fileName}`
      console.log(fullPath)
      cb(null, fullPath)
    } else {
      throw new Error('Missing file path');
    }
  },
  filename: function (req, file, cb) {
    const filePath = req.query.filePath;
    if (filePath) {
      const fileName = path.basename(filePath)
      console.log();
      cb(null, fileName)
    } else {
      throw new Error('Missing file path');
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
