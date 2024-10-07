// here we creating a function for handing the error with our own status code and message
const errorHandler = (statusCode , message) => {
    const error = new Error();
    error.message = message;
    error.statusCode = statusCode;
    return error;
}