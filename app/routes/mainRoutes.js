const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainControllers');

router.post('/signup', mainController.signup);
router.post('/login', mainController.login);
router.post('/game/:username', mainController.game);
router.delete('/logout/:username', mainController.logout);


module.exports = router;