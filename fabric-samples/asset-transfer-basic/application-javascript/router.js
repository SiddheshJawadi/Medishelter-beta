var Router = require('express');
var queries = require('./blockchainController/queries');

const router = new Router();

router.get('/medicalHistory', queries.medicalHistory);

//router.post('/createMedicalDoc', queries.createMedicalDoc);


module.exports = router;