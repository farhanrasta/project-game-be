const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const gameController = require('../controllers/gameController');

router.post('/signup', userController.signup);
router.post('/login', authController.login);
router.get('/login/:username', authController.getLogin);
router.post('/game/:username', gameController.game);
router.post('/game/reset/:username', gameController.reset);
router.delete('/logout/:username', authController.logout);
router.get('/game/leaderboard/:username', gameController.leaderboard);

module.exports = router;
