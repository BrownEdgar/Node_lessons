const 	{ Router } = require('express'),
 		Controller = require('../Controller/Wine'),
 		controller = new Controller();
const AuthController = require('../Controller/Auth')
	  authController = new AuthController();

const router = Router()

router.get('/', controller.getAllWines);

router.post('/', controller.addSingleWine);

router.get('/multiple', controller.getWinesByMultipleFields); 

router.get('/winename/:winename', authController.isLogin, controller.getWineByName);
router.get('/company/:companyname', authController.isLogin, controller.getWineByCompanyName);
router.get('/expensive', controller.getMostExpensiveWine); 
router.get('/increase/:sum', controller.priceIncrease); 
router.get('/random', controller.randomWine); 



module.exports = router
