const express = require('express');
const router = express.Router();
const { getForms,
    createForm,
    getFormsForUser,
    updateUserForm,
    // getFormsForOneUser,
    getFormBySlug,
    deleteUserForm} = require('../Controlleurs/Form.Controller')

router.get('/', getForms);
router.post('/', createForm);
//specific user 
//get specific user
router.get('/:userId', getFormsForUser);
// router.get('/:userId/:formId', getFormsForOneUser);
router.get('/get-form-by-slug/:slug', getFormBySlug);


//mettre a jours user 
router.put('/:userId/:formId', updateUserForm);
router.delete('/:userId/:formId', deleteUserForm);




module.exports = router;