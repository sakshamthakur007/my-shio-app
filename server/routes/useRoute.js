const userCtrl = require('../contollers/userCtrl');
const router = require('express').Router();
const auth = require('../middleware/auth')
router.post('/register', userCtrl.register);
router.post('/login',userCtrl.login);
router.get('/logout',userCtrl.logout);
router.get('/refresh_token', userCtrl.refreshtoken);
router.get("/info",auth,userCtrl.getuser)
module.exports = router;
