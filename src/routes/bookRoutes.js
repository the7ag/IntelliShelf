// src/routes/bookRoutes.js
const express = require('express');
const bookController = require('../controllers/bookcontroller');
const authMiddleware = require('../middleware/authMiddleware'); 

const router = express.Router();

router.use(authMiddleware);

router.get('/', bookController.getAllBooks);
router.post('/', bookController.createBook);
router.get('/:id', bookController.getBookById);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

module.exports = router;