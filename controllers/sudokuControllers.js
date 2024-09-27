const Sudoku = require('../models/sudoku')
const SavedSudoku = require('../models/saved_sudoku')
const {StatusCodes} = require('http-status-codes')
const {
    BadRequestError,
    NotFoundError
} = require('../errors')

const addSudoku = async (req, res) => {
    const validSudokuGrid = (grid) => {
        if (!Array.isArray(grid) || grid.length !== 9) return false
        return grid.every(row => Array.isArray(row) && row.length === 9 && row.every(cell => cell >= 0 && cell <= 9))
    }

    const {difficulty, puzzle, solved} = req.body
    if (!difficulty || !puzzle || !solved) {
        throw new BadRequestError('Fields difficulty, puzzle and solved can not be empty!')
    }
    if (!validSudokuGrid(puzzle) || !validSudokuGrid(solved)) {
        throw new BadRequestError('Sudoku must be 9x9 grids')
    }
    const sudoku = await Sudoku.create({difficulty, puzzle, solved})
    if (!sudoku) {
        throw new Error('lol')
    }
    res.status(StatusCodes.CREATED).json(sudoku)
}

const getAllSudoku = async (req, res) => {
    const sudokus = await Sudoku.find({}).select(['_id', 'difficulty', 'createdAt'])
    res.status(StatusCodes.OK).json({sudokus})
}

const deleteSudoku = async (req, res) => {
    const {id} = req.params
    const sudoku = await Sudoku.findOneAndDelete({_id: id})
    if (!sudoku) throw new NotFoundError(`No sudoku with id ${id}`)
    res.status(StatusCodes.OK).json({sudoku})
}


const saveGame = async (req, res) => {
    const {sudokuId, currentState} = req.body
    const {userId} = req.user
    if (!sudokuId || !currentState) throw new BadRequestError('Fields sudokuId and currentState cant be empty')

    const savedGame = await SavedSudoku.findOne({userId, sudokuId})
    if (!savedGame) {
        await SavedSudoku.create({
            sudokuId, userId, currentState
        })
        res.status(StatusCodes.CREATED).json({msg: 'Created new save'})
    } else {
        savedGame.currentState = currentState
        await savedGame.save()
        res.status(StatusCodes.CREATED).json({msg: 'Save updated'})
    }

}

const getSavedGame = async (req, res) => {
    const sudokuId = req.params.id
    const userId = req.user.userId
    if (!sudokuId) throw new BadRequestError('Please provide save id')
    console.log(userId)
    console.log(sudokuId)
    const savedGame = await SavedSudoku.findOne({userId, sudokuId})
    if (!savedGame) throw new NotFoundError(`No save with for sudoku with id ${sudokuId}`)
    res.status(StatusCodes.OK).json(savedGame)
}

module.exports = {
    getAllSudoku,
    addSudoku,
    deleteSudoku,
    saveGame,
    getSavedGame
}

