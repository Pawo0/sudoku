const express = require('express')
const router = express.Router()
const {getSudoku, addSudoku} = require('../controllers/sudokuControllers')


router.get('/', getSudoku)
router.post('/add', addSudoku)

module.exports = router

