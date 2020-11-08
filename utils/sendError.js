module.exports = (statusCode, errorMessage, res) => {
    return res.status(statusCode).json({
        status: 'fail',
        errorMessage
    });
}