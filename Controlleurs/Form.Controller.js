const { Form } = require('../models');
const slug = require('slug')

const helpers = require('../helpers/Helpers')

//recuperer tout les forms
const getForms = async (req, res) => {
  try {
    const forms = await Form.findAll();
    res.status(200).json(forms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
//obtenir un user specific
const getFormsForUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const forms = await Form.findAll({ where: { userId: userId } });
    res.status(200).json(forms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
//
const getFormBySlug = async (req, res, next) => {
  console.log(req.params.slug);
  try {
    const form = await Form.findOne({ where: { slug: req.params.slug } });
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }
    console.log(form);
    let result = await helpers.getQuestionnairesForm(form.id)
    res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};
//
const getFormsForOneUser = async (req, res) => {
  const userId = req.params.userId;
  const formId = req.params.formId;
  try {
    const form = await Form.findOne({ where: { id: formId, userId: userId } });
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }
    res.status(200).json(form);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

//
const createForm = async (req, res) => {
  const { nom, description, userId, } = req.body;
  try {
    const form = await Form.create({ nom:nom, slug: slug(nom), description:description, userId:userId});
    res.status(201).json(form);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};



// Update a form for a specific user
const updateUserForm = async (req, res) => {
  const userId = req.params.userId;
  const formId = req.params.formId;
  const { nom, description } = req.body;
  try {
    const form = await Form.findOne({ where: { id: formId, userId } });
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }
    form.nom = nom || form.nom;
    form.slug = slug(nom) || form.slug;
    form.description = description || form.description;
    await form.save();
    res.status(200).json(form);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
// Delete a form for a specific user
const deleteUserForm = async (req, res) => {
  try {
    const { userId, formId } = req.params;
    
    if (!userId || !formId) {
      return res.status(400).json({ message: 'Missing required parameters' });
    }

    const form = await Form.findOne({ where: { id: formId, userId } });
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    await form.destroy();
    console.log(`Form with id ${formId} deleted successfully`);
    return res.status(204).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
};


module.exports = {
  getForms,
  createForm,
  getFormsForUser,
  getFormBySlug,
  getFormsForOneUser,
  updateUserForm,
  deleteUserForm
};
