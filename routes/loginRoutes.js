const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController')

router.get('/',(req , res)=>{
    res.render('asset/login')
})
router.post('/homepage',loginController.loginUser)

router.get('/logout', (req, res) => {
  res.clearCookie("token"); // Clear the token cookie
  res.redirect('/login');   // Redirect to login page
});


module.exports = router

// router.get('/home',(req , res)=>{
//     res.render('home')
// })