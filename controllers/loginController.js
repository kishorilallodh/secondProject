
const signupModel = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existUser = await signupModel.findOne({ email });

    if (!existUser) {
      return res.send('User not found');
    }

    const hashPassword = await bcrypt.compare(password, existUser.password);

    if (!hashPassword) {
      return res.send('Invalid password');
    }

  const token = existUser.token  //get token from database
   res.cookie("token", token,{
    httpOnly:true, 
    sameSite:"strict",
    secure:false,
  })
  // console.log(token)

    // res.send('Login successful');

    res.render('asset/index')
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send('Internal Server Error');
  }
};