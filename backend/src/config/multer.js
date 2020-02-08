import multer from 'multer';
import crypto from 'crypto';
import { resolve, extname } from 'path';

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, callback) => {
      crypto.randomBytes(16, (error, res) => {
        if (error) {
          return callback(error);
        }

        return callback(
          null,
          `${res.toString('hex')}_${new Date().getTime()}${extname(
            file.originalname
          )}`
        );
      });
    },
  }),
};
