const express = require('express');
const router = express.Router();
const {  createQuestionnaire,
  getQuestionnaires,
  deleteQuestionnaire,
  updateQuestionnaire,
  getQuestionnairesForm} = require('../Controlleurs/Questionnires.controller');

router.post('/',  createQuestionnaire);

router.get('/', getQuestionnaires);

router.put('/:id', updateQuestionnaire);

// Delete a questionnaire by ID
router.delete('/:id', deleteQuestionnaire);


//router specifici form
router.get('/:formId', getQuestionnairesForm);

//put
router.put('/:formId', getQuestionnairesForm);


module.exports = router;