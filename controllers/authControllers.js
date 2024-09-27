const User = require('../models/user')
const {StatusCodes} = require('http-status-codes')
const {
    UnauthenticatedError,
    BadRequestError
} = require('../errors')

const register = async (req, res) => {
    const {username, email, password} = req.body
    const user = await User.create({username, email, password})
    const token = user.createJWT({userId: user._id, username: user.username})
    res.status(StatusCodes.CREATED).json({token})
}
const login = async (req, res) => {
    const {username, password} = req.body
    if (!username || !password) {
        throw new BadRequestError('Provide username and password')
    }
    const user = await User.findOne({username})
    if (!user) throw new UnauthenticatedError('User with this username doesnt exist')

    const isPassCorrect = await user.comparePassword(String(password))
    if (!isPassCorrect) throw new UnauthenticatedError('Wrong password')

    const token = user.createJWT({userId: user._id, username: user.username})
    res.status(StatusCodes.OK).json({token})
}

module.exports = {
    register,
    login
}