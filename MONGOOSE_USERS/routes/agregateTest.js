

const { Router } = require('express');



const router = Router()

// Controller register
const ClientController = require('../Controller/ClientController');
const controller = new ClientController();

router.get('/', controller.getAllClients)

router.post('/add', controller.addClients);



// router.post('/addone', controller.addOneClients);


module.exports = router
