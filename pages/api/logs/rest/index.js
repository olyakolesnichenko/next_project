
import fsPromise from 'fs/promises';
import Cookies from 'cookies';
const fs = require('fs');
const path = require('path');

export default async (req, res) => {
    const directoryPath = path.join('./sources/logs/rest');
    const {method, query, body} = req;
    const cookies = new Cookies(req, res);
    if (method === 'POST') {

        const newLogItem = {};
        newLogItem.created = new Date().toISOString();
        newLogItem.logId = Date.now().toString();
        newLogItem.userId = cookies.get('userID');
        newLogItem.userAgent = req.headers['user-agent'];
        newLogItem.payload = JSON.parse(body);

        await fsPromise.writeFile(`./sources/logs/rest/${Date.now().toString()}.json`, JSON.stringify(newLogItem, null, 4));

        res.status(201).json({ name: 'POST response', message: `created at ${new Date().toISOString()}` });

    } else if (method === 'GET') {

        fs.readdir(directoryPath+"/", async (err, files) => {
            //handling error
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            }
            const promises = files.map(async (file) => {
                const source = await fsPromise.readFile(directoryPath+"/"+file, 'utf-8');
                return JSON.parse(source);
            });

           const result = await Promise.all( promises );
            let filtered = null;
            if (query?.userId){
                filtered = result.filter(log => query.userId === log.userId );
            }
                res.status(200).json({ name: 'GET response', data: (filtered ?? result) });

        });


    } else {
        //res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
}