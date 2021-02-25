//Core
import fetch from 'node-fetch';

import { verifyEnvironment } from "../../helpers/verifyEnvironment";
import { developmentLogger, productionLogger } from "../../helpers/logger";

export default async (req, res) => {

    const { isDevelopment, isProduction } = verifyEnvironment();

    const url = 'https://cat-fact.herokuapp.com/facts';
    let status = null;

    try {
        if (isDevelopment) {
            developmentLogger.info(`API REST NEXT GET request to ${url} was started...`);
        }

        const response = await fetch(url);
        const data = await response.json();
        status = response.status;

        if(status === 200 && Array.isArray(data) && data.length > 0) {
            const responseData = data.map(({_id, text}) => ({_id, text}));


            res.status(200).json(responseData);
        } else {
            res.status(500).json({error: 'API error'});
        }
    } catch (err) {

        if (isDevelopment) {
            developmentLogger.warn({
                message: `Current status code is: 500`
            });
        }

        if (isProduction) {
            productionLogger.warn({
                url,
                method: 'GET',
                status,
                message: `API NEXT Error`
            });
        }

        res.status(500).json({error: 'API error'});
    }  finally {
        if (isDevelopment) {
            developmentLogger.info(`API REST NEXT GET request to ${url} was finished with status ${status ?? '500'}`);
        }
    }
}
