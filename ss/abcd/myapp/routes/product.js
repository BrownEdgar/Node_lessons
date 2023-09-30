const express = require('express');
const path = require('path');
const multer = require('multer');
const router = express.Router();
const Controller  = require('../controllers/ProductController')
const controller = new Controller()



const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./uploads/")
	},
	filename: function (req, file, cb) {
		cb(null, `uploads+photo_${Date.now().toFixed(5)}` + path.extname(file.originalname))
	}
})

const upload = multer({ storage: storage })
/* GET home page. */
router.get('/', (req,res)=>{
	console.log("ok");
	res.render("main", { })
});


router.get('/allproducts', controller.allproducts);
router.get('/allproducts/type/:type', controller.getProductsByType);
router.get('/allproducts/type/:type/:id', controller.getProductById);
router.get('/allproducts/:id', controller.getProductShoptById);
router.post('/addproduct', upload.single('productImage'), controller.addproduct);
router.put('/updateproduct/:id', controller.updateAllProduct);
router.patch('/updateproduct/:id', controller.updateProductField);
router.delete('/allproducts/:id', controller.deleteProduct);


module.exports = router;
