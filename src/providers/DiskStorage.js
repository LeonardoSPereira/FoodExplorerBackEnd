const fs = require('fs');
const path = require('path');
const uploadConfig = require('../config/upload');

// create a class to handle the storage of the files
class DiskStorage {
    // create a method to save the file
    async saveFile(file) {

        // change the file location to the uploads folder
        await fs.promises.rename(
            path.resolve(uploadConfig.TMP_FOLDER, file),
            path.resolve(uploadConfig.UPLOADS_FOLDER, file)
        );

        return file;
    }
    
    // create a method to delete the file
    async deleteFile(file) {

        // get the file path
        const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file);

        try {
            // check if the file exists
            await fs.promises.stat(filePath);

        } catch  {
            return;
        }

        // delete the file
        await fs.promises.unlink(filePath);
    
    }
}


module.exports = DiskStorage;