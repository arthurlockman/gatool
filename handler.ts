import { Handler, Context, Callback } from 'aws-lambda';
const rp = require('request-promise');

const GetEvents: Handler = (event: any, context: Context, callback: Callback) => {
    return GetDataFromFIRSTAndReturn(event.pathParameters.year + '/events', callback);
};

const GetEventTeams: Handler = (event: any, context: Context, callback: Callback) => {
    // TODO: remove pagination from this API
    return GetDataFromFIRSTAndReturn(event.pathParameters.year + '/teams?eventcode='
        + event.pathParameters.eventCode + '&page=' + event.pathParameters.page, callback);
};

const GetTeamAwards: Handler = (event: any, context: Context, callback: Callback) => {
    return GetDataFromFIRSTAndReturn(event.pathParameters.year + '/awards/' + event.pathParameters.teamNumber, callback);
};

const GetEventScores: Handler = (event: any, context: Context, callback: Callback) => {
    const range = (event.pathParameters.start === event.pathParameters.end) ?
        '?matchNumber=' + event.pathParameters.start :
        '?start=' + event.pathParameters.start + '&end=' + event.pathParameters.end;
    return GetDataFromFIRSTAndReturn(event.pathParameters.year + '/scores/' +
        event.pathParameters.eventCode + '/' + event.pathParameters.tournamentLevel + range, callback);
};

const GetEventSchedule: Handler = (event: any, context: Context, callback: Callback) => {
    return GetDataFromFIRSTAndReturn(event.pathParameters.year + '/schedule/' +
        event.pathParameters.eventCode + '/' + event.pathParameters.tournamentLevel + '/hybrid', callback);
};

const GetHighScores: Handler = (event: any, context: Context, callback: Callback) => {
    // TODO: implement this stub
};

const GetOffseasonEvents: Handler = (event: any, context: Context, callback: Callback) => {
    // TODO: implement this stub
};

const UpdateHighScores: Handler = (event: any, context: Context, callback: Callback) => {
    return GetDataFromFIRST(process.env.FRC_CURRENT_SEASON + '/events').then((eventList) => {
        const promises = [];
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 1);
        for (const _event of eventList.Events) {
            const eventDate = new Date(_event.dateStart);
            if (eventDate < currentDate) {
                promises.push(GetDataFromFIRST(process.env.FRC_CURRENT_SEASON + '/schedule/' + _event.code + '/qual/hybrid'));
                promises.push(GetDataFromFIRST(process.env.FRC_CURRENT_SEASON + '/schedule/' + _event.code + '/playoff/hybrid'));
            }
        }
        Promise.all(promises).then((data) => {
            // TODO: calculate high scores and store to table
            callback();
        });
    });
};

export { GetEvents, GetEventTeams, GetTeamAwards, GetEventScores, GetEventSchedule, UpdateHighScores }

/**
 * Get and return data from the FIRST API
 * @param path The path on the FIRST API to call
 * @param callback The lambda callback to return the data
 */
function GetDataFromFIRSTAndReturn(path: string, callback: any) {
    return GetDataFromFIRST(path).then((body) => {
        ReturnJsonWithCode(200, body, callback);
    });
}

/**
 * Get data from FIRST and return a promise
 * @param path The path to GET data from
 */
function GetDataFromFIRST(path: string): Promise<any> {
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
        return rp(options);
    } catch (err) {
        console.error(err);
        return Promise.reject(err);
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
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'charset': 'utf-8'
        },
        isBase64Encoded: false
    });
}
