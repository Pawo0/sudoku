const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide username'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide password']
    }
}, {timestamps: true})

userSchema.pre('save', async function (next){
    const salt = await bcrypt.genSalt(10)
    if (this.isModified('password')){
        this.password = await bcrypt.hash(this.password, salt)
    }
    next()
})

userSchema.methods.createJWT = (payload) =>{
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
}

userSchema.methods.comparePassword = async function (candidatePass) {
    return await bcrypt.compare(candidatePass, this.password)
}

module.exports = mongoose.model('User', userSchema)