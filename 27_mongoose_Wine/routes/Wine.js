const 	{ Router } = require('express'),
 		Controller = require('../Controller/Wine'),
 		controller = new Controller()

const router = Router()

router.get('/', controller.getAllWines);

router.post('/', controller.addSingleWine);

router.get('/multiple', controller.getWinesByMultipleFields); 

router.get('/:winename', controller.getWineByName); 


module.exports = router
