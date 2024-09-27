const mongoose = require('mongoose')

const sudokuSchema = new mongoose.Schema({
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        required: true
    },
    puzzle: {
        type: [[Number]],
        required: true
    },
    solved: {
        type: [[Number]],
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Sudoku', sudokuSchema)