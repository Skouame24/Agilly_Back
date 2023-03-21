const express = require('express');
const router = express.Router();

const { createCampagne, readCampagne, updateCampagne,  getCampagne,getCampagneById } = require('../Controlleurs/Campagne.controller');

router.post('/', createCampagne);
router.get('/', getCampagne);

router.get('/:id', readCampagne);
router.get('/form/:formId', getCampagneById);

router.put('/:id', updateCampagne)



module.exports = router;