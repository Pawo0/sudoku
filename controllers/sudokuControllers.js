const Sudoku = require('../models/sudoku')
const { StatusCodes } = require('http-status-codes')
const {
    BadRequestError
} = require('../errors')

const addSudoku = async (req, res) => {
    console.log('xd')
    const {difficulty, puzzle, solved} = req.body
    if (!difficulty || !puzzle || !solved) {
        throw new BadRequestError('Fields difficulty, puzzle and solved can not be empty!')
    }
    if (puzzle.length !== 9 || solved.length !== 9){
        throw new BadRequestError('Sudoku must be 9x9 grids')
    }
    const sudoku = await Sudoku.create({difficulty, puzzle, solved})
    if (!sudoku){
        throw new Error('lol')
    }
    res.status(StatusCodes.CREATED).json(sudoku)
}


const getSudoku = async (req, res) =>{
    const { diff } = req.query
    try{
        const puzzle = await Sudoku.aggregate([{ $match: { difficulty } }, { $sample: { size: 1 } }]);
        console.log(puzzle)
        res.json(puzzle[0])
    }
    catch (e){
        res.json({e})
    }
}

module.exports = {
    getSudoku,
    addSudoku
}

