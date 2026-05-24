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

// === Minimal addition for validation tests ===
const createHaircut = async (req, res) => {
  try {
    const { title, price, duration, description } = req.body;

    if (!title || !price || !duration) {
      return res.status(400).json({ error: "Missing required fields: title, price, duration" });
    }

    if (typeof price !== 'number' || typeof duration !== 'number') {
      return res.status(400).json({ error: "Price and duration must be numbers" });
    }

    if (price <= 0 || duration <= 0) {
      return res.status(400).json({ error: "Price and duration must be positive" });
    }

    if (title.length > 100) {
      return res.status(400).json({ error: "Title is too long (max 100 characters)" });
    }

    const newHaircut = new Haircut({
      title,
      price,
      duration,
      description: description || ""
    });

    const savedHaircut = await newHaircut.save();
    res.status(201).json({ data: savedHaircut });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllHaircuts,
  getHaircutById,
  createHaircut     // ← Added this
};