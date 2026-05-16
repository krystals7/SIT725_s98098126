const Haircut = require('../models/haircutModel');

const getAllHaircuts = async (req, res) => {
  try {
    const { postcode } = req.query;

    const filter = postcode ? { postcode } : {};
    const haircuts = await Haircut.find(filter);

    res.json({ data: haircuts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getHaircutById = async (req, res) => {
  try {
    const haircut = await Haircut.findById(req.params.id);

    if (!haircut) {
      return res.status(404).json({ error: 'Haircut not found' });
    }

    res.json({ data: haircut });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllHaircuts,
  getHaircutById
};