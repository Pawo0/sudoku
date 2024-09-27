const jwt = require('jsonwebtoken')
const {UnauthenticatedError} = require('../errors')

const authentication = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) throw new UnauthenticatedError('Access denied, no token')
    try {
        const token = authHeader.split(' ')[1]
        req.user = jwt.verify(token, process.env.JWT_SECRET)
        next()
    } catch (e){
        throw new UnauthenticatedError('Access denied, wrong token')
    }
}

module.exports = authentication