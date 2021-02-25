import fs from 'fs/promises';
const path = require('path');

export default async (req, res) => {
    const {
        query: { id }, method,
    } = req
    const directoryPath = path.join('./sources/logs/rest');

    switch (method) {
        case 'GET':
            const source = await fs.readFile(directoryPath+"/"+id+'.json', 'utf-8');
            const logData = JSON.parse(source);
            res.status(200).json({ id, logData });
            break
        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}