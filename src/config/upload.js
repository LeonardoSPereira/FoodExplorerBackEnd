const path = require('path');
const multer = require('multer');
const crypto = require('crypto');

// create a folder to store the files temporarily
const TMP_FOLDER = path.resolve(__dirname, '..', '..', 'tmp');

// create a folder to store the files uploaded by the users
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, 'uploads');

//multer configuration
const MULTER = {
    
    storage: multer.diskStorage({
        destination: TMP_FOLDER,
        // generate a random name for the file
        filename: (request, file, callback) => {

            const fileHash = crypto.randomBytes(10).toString('hex');
            const fileName = `${fileHash}-${file.originalname}`;

            return callback(null, fileName);
        },
    }),
}

module.exports = {
    TMP_FOLDER,
    UPLOADS_FOLDER,
    MULTER,
}