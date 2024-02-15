const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainControllers');

router.post('/signup', mainController.signup);
router.post('/login', mainController.login);
router.post('/game/:username', mainController.game);
router.delete('/logout/:username', mainController.logout);

// Periksa apakah Anda telah menulis nama fungsi dengan benar di sini
router.get('/leaderboard/:username', mainController.leaderboard);


module.exports = router;
