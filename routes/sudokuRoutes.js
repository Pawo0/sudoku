const express = require('express')
const router = express.Router()
const {
    getAllSudoku,
    addSudoku,
    deleteSudoku,
    saveGame,
    getSavedGame
} = require('../controllers/sudokuControllers')


router.get('/', getAllSudoku)
router.post('/add', addSudoku)
router.delete('/delete/:id', deleteSudoku)
router.put('/save',saveGame)
router.get('/save/:id', getSavedGame)
module.exports = router

