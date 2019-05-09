import fs from 'fs';
import { join } from 'path';
import * as shortid from 'short-id';

const storeUpload = (createReadStream, filename) => {
    const name = `${shortid.generate()}${filename}`
    const path = `${join(__dirname, '../uploads')}/${name}`;

    return new Promise((resolve, reject) => {
        const stream = createReadStream();
        const writeStream = fs.createWriteStream(path);

        stream.pipe(writeStream)
            .on('finish', _ => resolve({ name }))
            .on('error', reject);
    });
};

const processUpload = async upload => {
    if (typeof(upload) === 'string') return upload;

    const { createReadStream, filename } = await upload.pop();
    const { name } = await storeUpload(createReadStream, filename);

    return name;
};

export default processUpload;
