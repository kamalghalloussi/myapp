const express = require('express');
const articlesController = require('./articles.controller.js');
const router = express.Router();

router.post('/', articlesController.createArticle);
router.put('/:id', articlesController.updateArticle);
router.delete('/:id', articlesController.deleteArticle);
router.get('/:userId/articles', usersController.getUserArticles);

module.exports = router;
