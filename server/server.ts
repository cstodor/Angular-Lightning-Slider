import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as https from 'https';
import { UNSPLASH_API_ROOT, UNSPLASH_API_PHOTOS, UNSPLASH_API_APP_ID } from './constants';

const PORT = process.env.PORT || 3000;
const app = express();
const router = express.Router();

// CORS Middleware
app.use(cors());

// Body Parser Middleware
app.use(bodyParser.json());

// Set Public Folder
app.use(express.static(path.join(__dirname, 'dist')));

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});

// Get Images (paginated)
const getImages = (pageIndex: number): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        https.get(UNSPLASH_API_ROOT + UNSPLASH_API_PHOTOS + '?page=' + pageIndex + '&' + UNSPLASH_API_APP_ID, (resp) => {
            let data = '';
            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                // console.log(chunk);
                data += chunk;
            });
            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                const result_obj = JSON.parse(data);
                // console.log(result_obj);
                resolve(result_obj);
            });
        }).on('error', (err) => {
            console.log('Error: ' + err.message);
            reject(err);
        });
    });
};
const tryGettingImages = (req, res) => {
    const pageIndex = req.params['pageIndex'];
    getImages(pageIndex)
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            console.log('Error: ' + error);
        });
};

app.get('/get-images/:pageIndex', tryGettingImages);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './dist/index.html'));
});
