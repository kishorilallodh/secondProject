const Product = require("../models/productModel");

const getHomePage = (req, res) => {
  res.render("asset/index");
};

// const getSigninPage = (req, res) => {
//     res.render('asset/signin')
// }

const getAllProducts = async (req, res) => {
  const data = await Product.find();
  res.render("asset/product", { data });
};

const getAddProductPage = (req, res) => {
  res.render("admin/addproduct");
};

const getEditProductPage = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send("Product not found");
    res.render("asset/editproduct", { product }); // create this EJS file
  } catch (err) {
    res.status(500).send("Server error");
  }
};

const updateProduct = async (req, res) => {
  try {
    const { pname, pprice, pcategory, pbname, pdesc } = req.body;
    const updatedData = {
      pname,
      pprice,
      pcategory,
      pbname,
      pdesc,
    };

    if (req.file) {
      updatedData.pimage = "productimage/" + req.file.originalname;
    }

    await Product.findByIdAndUpdate(req.params.id, updatedData);
    res.redirect("/api/products"); // or wherever your product list is
  } catch (err) {
    res.send("Failed to update product");
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.send("Product not found");
    res.redirect("/api/products"); 
  } catch (err) {
    res.send("Failed to delete product");
  }
};


const submitProduct = async (req, res) => {
  const { pname, pprice, pcategory, pbname, pdesc } = req.body;
  const pimage = "productimage/" + req.file.originalname;
  // const pimage = req.files.map(file => 'productimage/' + file.originalname)
  const data = new Product({
    pname,
    pprice,
    pcategory,
    pbname,
    pdesc,
    pimage,
  });

  await data.save();
  res.send("Data submitted");
};

module.exports = {
  getHomePage,
  // getSigninPage,
  getAllProducts,
  getAddProductPage,
  submitProduct,

  getEditProductPage,
  updateProduct,
  deleteProduct,
};
