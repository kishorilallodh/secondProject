const express = require('express')
const router = express.Router()
const multer = require('multer')
const productController = require('../controllers/productController')
const authMiddleware = require('../authentication/auth'); // Protect middleware


// Multer Config
const storage = multer.diskStorage({
    destination: 'public/productimage',
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})
const upload = multer({ storage: storage })

// Routes
router.get('/', authMiddleware, productController.getHomePage);
// router.get('/signin', productController.getSigninPage)
router.get('/products',authMiddleware, productController.getAllProducts)
router.get('/addproduct', productController.getAddProductPage)
router.post('/submitproduct', upload.single('pimage'), productController.submitProduct)

router.get('/editproduct/:id', authMiddleware, productController.getEditProductPage);
router.post('/editproduct/:id', authMiddleware, upload.single('pimage'), productController.updateProduct);

router.get('/deleteproduct/:id', authMiddleware, productController.deleteProduct);

module.exports = router
// uploadimage.array('pimage',2)