const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const productRoutes = require('./routes/productRoutes')
const signupRoutes = require('./routes/signupRoutes');
const loginRoutes = require('./routes/loginRoutes');
const cookieParser = require('cookie-parser');

const app = express()
const port = 3000

// Middleware
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.use(cookieParser());

// MongoDB Connection
mongoose.connect('mongodb+srv://kishorilallodh2:54N58PiEDlbgNMI4@cluster0.qexgmon.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err))

// Routes
app.use('/api', productRoutes)

app.use('/', signupRoutes); 
app.use('/login', loginRoutes);

// Server
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
})
// sirt/mca 
//sirt/me