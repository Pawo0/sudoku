const CustomError = require('../errors/custom-error');

module.exports = (err, req, res, next) => {
    if (err instanceof CustomError){
        res.status(err.statusCode).json({message: err.message})
    } else {
        res.status(500).json({err, message: err.message})
    }
}