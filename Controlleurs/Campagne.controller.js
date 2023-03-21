const { Campagne } = require('../models');

const createCampagne = async (req, res) => {
  const { campagneReponse, formId } = req.body;
  try {
    const campagne = await Campagne.create({ campagneReponse, formId });
    const responseObj = {
      campagneReponse: campagne.campagneReponse,
      formId: (campagne.formId)
    };
    res.status(201).json(responseObj);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
const getCampagneById = async (req, res) => {
  const { formId } = req.params;
  try {
    const campagne = await Campagne.findAll({ where: { formId: formId } });
    if (campagne) {
      res.status(200).json(campagne);
    } else {
      res.status(404).json({ message: 'Campagne not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
const getCampagne = async (req, res) => {
  try {
    const campagne = await Campagne.findAll();
    res.status(200).json(campagne);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const readCampagne = async (req, res) => {
  const { id } = req.params;
  try {
    const campagne = await Campagne.findOne({ where: { id } });
    if (!campagne) {
      return res.status(404).json({ message: 'Campagne not found' });
    }
    const responseObj = {
      campagneReponse: campagne.campagneReponse,
      formId: parseInt(campagne.formId)
    };
    res.json(responseObj);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateCampagne = async (req, res) => {
  const { id } = req.params;
  const { campagneReponse, formId } = req.body;
  try {
    const [updated] = await Campagne.update(
      { campagneReponse, formId },
      { where: { id } }
    );
    if (updated) {
      res.json({ message: 'Campagne updated' });
    } else {
      res.status(404).json({ message: 'Campagne not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const deleteCampagne = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Campagne.destroy({ where: { id } });
    if (deleted) {
      res.json({ message: 'Campagne deleted' });
    } else {
      res.status(404).json({ message: 'Campagne not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { createCampagne, readCampagne, updateCampagne, deleteCampagne,getCampagne,getCampagneById };
