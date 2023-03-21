const {Questionnaire }= require('../models')




exports.getQuestionnairesForm = async (formId) => {
    try {
      const questionnaire = await Questionnaire.findAll({ where: { formId: formId } });
      return questionnaire;
    } catch (error) {
      console.error(error);
      return [];
    }
  };