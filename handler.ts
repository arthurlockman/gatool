import { Handler, Context, Callback } from 'aws-lambda';
const rp = require('request-promise');

const GetEvents: Handler = (event: any, context: Context, callback: Callback) => {
    return GetDataFromFirst(event.pathParameters.year + '/events', callback);
};

const GetEventTeams: Handler = (event: any, context: Context, callback: Callback) => {
    return GetDataFromFirst(event.pathParameters.year + '/teams?eventcode='
        + event.pathParameters.eventCode + '&page=' + event.pathParameters.page, callback);
};

export { GetEvents, GetEventTeams }

/**
 * Get and return data from the FIRST API
 * @param path The path on the FIRST API to call
 * @param callback The lambda callback to return the data
 */
function GetDataFromFirst(path: string, callback: any) {
    try {
        const options = {
            method: 'GET',
            uri: 'https://frc-api.firstinspires.org/v2.0/' + path,
            json: true,
            headers: {
                'Authorization': process.env.FRC_API_KEY,
                'Accept': 'application/json'
            }
        };
        return rp(options).then((body) => {
            ReturnJsonWithCode(200, body, callback);
        });
    } catch (err) {
        console.error(err);
    }
}

/**
 * Return JSON data to the user with a specific status code.
 * @param statusCode The status code to use in the return.
 * @param body The body data (JSON) to return
 * @param callback The lambda callback function
 */
function ReturnJsonWithCode(statusCode: number, body: any, callback: any) {
    return callback(null, {
        statusCode: statusCode,
        body: body,
        headers: {
            'Content-Type': 'application/json',
            'charset': 'utf-8'
        }
    });
}

/**
 * Catch all unhandled exceptions
 */
process.on('unhandledRejection', (reason, p) => {
    console.error('Unhandled rejection at: Promise', p, 'reason:', reason);
});
