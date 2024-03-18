import config from '../config/config.js'
import multer from 'multer';
import fs from 'fs';

const load = function (req, res) {
  const file = req.query.file;
  const fileName = req.query.fileName;
  const fullPath = `${config.files.basePath}/${file}`
  console.log(fullPath)
  const fileExists = fs.existsSync(fullPath);
  console.log(fileExists)
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
    cb(null, config.files.basePath + filePath)
  },
  filename: function (req, file, cb) {
    const fileName = req.query.fileName;
    cb(null, fileName)
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
