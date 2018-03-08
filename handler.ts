import { Handler, Context, Callback } from 'aws-lambda';

const GetEvents: Handler = (event: any, context: Context, callback: Callback) => {
    try {
        // TODO: put code here
    } catch (err) {
        console.error(err);
    }
};

export { GetEvents }

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled rejection at: Promise', p, 'reason:', reason);
});
