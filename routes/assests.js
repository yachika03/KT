const express = require('express');
const router = express.Router();
const Asset = require('../models/asset');

// GET all assets
router.get('/', async (req, res) => {
  try {
    const assets = await Asset.find({});
    res.json(assets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET one asset by ID
router.get('/:id', getAsset, (req, res) => {
  res.json(res.asset);
});

// CREATE one asset
router.post('/', async (req, res) => {
  const asset = new Asset({
    asset_type: req.body.asset_type,
    make: req.body.make,
    model: req.body.model,
    serial_number: req.body.serial_number,
    is_scrap: req.body.is_scrap || false
  });

  try {
    const newAsset = await asset.save();
    res.status(201).json(newAsset);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE one asset by ID
// UPDATE one asset by ID
router.patch('/:id', getAsset, async (req, res) => {
    if (req.body.asset_category != null) {
      res.asset.asset_category = req.body.asset_category;
    }
  
    if (req.body.serial_number != null) {
      res.asset.serial_number = req.body.serial_number;
    }
  
    if (req.body.make != null) {
      res.asset.make = req.body.make;
    }
  
    if (req.body.model != null) {
      res.asset.model = req.body.model;
    }
  
    if (req.body.purchase_date != null) {
      res.asset.purchase_date = req.body.purchase_date;
    }
  
    if (req.body.purchase_cost != null) {
      res.asset.purchase_cost = req.body.purchase_cost;
    }
  
    if (req.body.current_employee != null) {
      res.asset.current_employee = req.body.current_employee;
    }
  
    if (req.body.is_available != null) {
      res.asset.is_available = req.body.is_available;
    }
  
    try {
      const updatedAsset = await res.asset.save();
      res.json(updatedAsset);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // Middleware function to get asset by ID
  async function getAsset(req, res, next) {
    try {
      const asset = await Asset.findById(req.params.id);
      if (asset == null) {
        return res.status(404).json({ message: 'Asset not found' });
      }
      res.asset = asset;
      next();
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
  
// DELETE one asset by ID
router.delete('/:id', getAsset, async (req, res) => {
  try {
    await res.asset.remove();
    res.json({ message: 'Asset deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get asset by ID
async function getAsset(req, res, next) {
  try {
    const asset = await Asset.findById(req.params.id);
    if (asset == null) {
      return res.status(404).json({ message: 'Asset not found' });
    }
    res.asset = asset;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
