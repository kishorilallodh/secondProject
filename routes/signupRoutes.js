const express = require('express');
const router = express.Router();
const signupController = require('../controllers/signupController');
// const upload = require('../middleware/multerConfig');

router.get('/',(req , res)=>{
    res.render('asset/signup')
})
router.post('/signup', signupController.signupUser)

module.exports = router