const { Router } = require('express');

const router = Router();
const Controller = require('../controller/WineController');

const controller = new Controller();

router.get('/all', controller.getAllWines);
router.post('/add', controller.addSingleWine);
router.post('/winename/:winename', controller.getWineByName);
router.get('/expensive/:winename/:sum', controller.tank);

module.exports = router;
