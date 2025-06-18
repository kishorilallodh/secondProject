const signupModel = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const jwt_secret = "yourkey"


exports.signupUser = async (req, res) => {
    const { name, email, password } = req.body;
    // const p_pic = req.file ? req.file.originalname : null;
const existUser = await signupModel.findOne({ email });
if (existUser) {
    return res.send('User already exists');
}
const hasspassword = await bcrypt.hash(password, 10);
const token = jwt.sign({email}, jwt_secret)

    try {
        const signup1 = new signupModel({
            name,
            email,
            password: hasspassword,
            token,
        });

        await signup1.save(); // Await async operation
        res.cookie("token", token,{
          httpOnly:true, 
          sameSite:"strict",
          secure:false,
        })
        res.render('asset/login');
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).send('Something went wrong');
    }
};