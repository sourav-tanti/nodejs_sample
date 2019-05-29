
import multer from 'multer';
import { logger } from './logger';

const getFileName = (fileid, file) => {
    const todayDate = new Date();
    const day = (`0${todayDate.getDate()}`).slice(-2);
    const month = (`0${todayDate.getMonth() + 1}`).slice(-2);
    const year = String(todayDate.getFullYear());
    const timestamp = `${year}${month}${day}`;

    const fileNameParts = file.originalname.split('.');
    const fileExt = fileNameParts[fileNameParts.length - 1];
    const fileNameGen = `${timestamp}_${Date.now()}_${fileid}.${fileExt}`;

    logger.info(`File name generated as ${fileNameGen}`);
    return fileNameGen;
};

const getFilePath = (fileType) => {
  let filePath = '';
  if (fileType === 'image') {
    filePath = process.env.imagepath;
  } else if (fileType === 'pdf' || fileType === 'txt') {
    filePath = process.env.otherfilepath;
  }
  logger.info(`Uploading ${fileType} file to path: ${filePath}`);
  return filePath;
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    logger.info(`Request received on '${req.url}' from ${req.clientIp} `);
    cb(null, getFilePath(req.body.type));
  },
  filename: (req, file, cb) => {
    const fileid = req.body.fileid;
    cb(null, getFileName(fileid, file));
  }
});

const upload = multer({ storage });

export { upload };
