const express = require('express');
const router = express.Router();
const AssetCategory = require('../models/assetCategory');

// GET all asset categories
router.get('/', async (req, res) => {
  try {
    const assetCategories = await AssetCategory.find();
    res.json(assetCategories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET one asset category by ID
router.get('/:id', getAssetCategory, (req, res) => {
  res.json(res.assetCategory);
});

// CREATE one asset category
router.post('/', async (req, res) => {
  const assetCategory = new AssetCategory({
    name: req.body.name,
    description: req.body.description
  });

  try {
    const newAssetCategory = await assetCategory.save();
    res.status(201).json(newAssetCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE one asset category by ID
router.patch('/:id', getAssetCategory, async (req, res) => {
  if (req.body.name != null) {
    res.assetCategory.name = req.body.name;
  }

  if (req.body.description != null) {
    res.assetCategory.description = req.body.description;
  }

  try {
    const updatedAssetCategory = await res.assetCategory.save();
    res.json(updatedAssetCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE one asset category by ID
router.delete('/:id', getAssetCategory, async (req, res) => {
  try {
    await res.assetCategory.remove();
    res.json({ message: 'Asset category deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get asset category by ID
async function getAssetCategory(req, res, next) {
  try {
    const assetCategory = await AssetCategory.findById(req.params.id);
    if (assetCategory == null) {
      return res.status(404).json({ message: 'Asset category not found' });
    }
    res.assetCategory = assetCategory;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
