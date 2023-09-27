import Sentry from "@sentry/node"
export function errorHandler(app) {
  app.use((error, req, res, next) => {
    let reportError = true

    //  skip common and known error
    // [
    //   (NotfoundError, ValidationError, AuthorizeError)
    // ].forEach((typeOfError) => {
    //   if (error instanceof typeOfError) {
    //     reportError = false;
    //   }
    // });
    Sentry.init({
      dsn: 'https://6662c7f0ae5ea75ece3b2b6d2cef0d12@o4505939754680320.ingest.sentry.io/4505939775848448',
    });

    if(reportError){
        Sentry.captureException(error)
    }

    const statusCode = error.statusCode || 500;
    const data = error.data || error.message;
    return res.status(statusCode).json(data);
  });
}
