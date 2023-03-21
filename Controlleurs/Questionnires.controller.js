const {Questionnaire }= require('../models')



const createQuestionnaire = async (req, res) => {
    const {  fields , formId } = req.body;
    let questionnaire = []
    try {
      for (let index = 0; index < fields.length; index++) {
        const r = fields[index];
        console.log("looopppp fileds ===>", r);
        const result = await Questionnaire.create({ "inputTypes": r.inputTypes,"label": r.label,"name":r.name, "formId": formId } );
        questionnaire.push(result)
        
      }
      res.status(201).json(questionnaire);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  const getQuestionnaires = async (req, res) => {
    try {
      const questionnaires = await Questionnaire.findAll();
      res.json(questionnaires);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  const updateQuestionnaire = async (req, res) => {
    const { id } = req.params;
    const { inputTypes, label, formId } = req.body;
    try {
      const questionnaire = await Questionnaire.findByPk(id);
      if (!questionnaire) {
        return res.status(404).json({ message: 'Questionnaire not found' });
      }
      questionnaire.inputTypes = inputTypes;
      questionnaire.label = label;
      questionnaire.formId = formId;
      await questionnaire.save();
      res.json(questionnaire);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  const deleteQuestionnaire = async (req, res) => {
    const { id } = req.params;
    try {
      const questionnaire = await Questionnaire.findByPk(id);
      if (!questionnaire) {
        return res.status(404).json({ message: 'Questionnaire not found' });
      }
      await questionnaire.destroy();
      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };

  //specific user

  const getQuestionnairesForm = async (req, res) => {
    const formId = req.params.formId;
    try {
      const questionnaire = await Questionnaire.findAll({ where: { formId: formId } });
      res.status(200).json(questionnaire);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };

  module.exports = {
 createQuestionnaire,
 getQuestionnaires,
 deleteQuestionnaire,
 updateQuestionnaire,
 getQuestionnairesForm
  };
  