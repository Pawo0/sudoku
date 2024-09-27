const mongoose = require('mongoose')

const savedSudokuSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    sudokuId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sudoku',
        required: true
    },
    currentState: {
        type: [[Number]],
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

module.exports = mongoose.model('SavedSudoku', savedSudokuSchema)