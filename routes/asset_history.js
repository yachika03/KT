const express = require('express');
const router = express.Router();
const AssetHistory = require('../models/asset_history');

// GET all asset histories
router.get('/', async (req, res) => {
  try {
    const assetHistories = await AssetHistory.find();
    res.json(assetHistories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET one asset history by ID
router.get('/:id', getAssetHistory, (req, res) => {
  res.json(res.assetHistory);
});

// CREATE one asset history
router.post('/', async (req, res) => {
  const assetHistory = new AssetHistory({
    asset_id: req.body.asset_id,
    employee_id: req.body.employee_id,
    issued_date: req.body.issued_date,
    returned_date: req.body.returned_date,
    reason: req.body.reason
  });

  try {
    const newAssetHistory = await assetHistory.save();
    res.status(201).json(newAssetHistory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE one asset history by ID
router.patch('/:id', getAssetHistory, async (req, res) => {
  if (req.body.asset_id != null) {
    res.assetHistory.asset_id = req.body.asset_id;
  }

  if (req.body.employee_id != null) {
    res.assetHistory.employee_id = req.body.employee_id;
  }

  if (req.body.issued_date != null) {
    res.assetHistory.issued_date = req.body.issued_date;
  }

  if (req.body.returned_date != null) {
    res.assetHistory.returned_date = req.body.returned_date;
  }

  if (req.body.reason != null) {
    res.assetHistory.reason = req.body.reason;
  }

  try {
    const updatedAssetHistory = await res.assetHistory.save();
    res.json(updatedAssetHistory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE one asset history by ID
app.delete('/api/asset-history/:id', async (req, res) => {
    try {
      const assetHistory = await AssetHistory.findById(req.params.id);
      if (!assetHistory) {
        return res.status(404).json({ message: 'Asset history not found' });
      }
      await AssetHistory.findByIdAndDelete(req.params.id);
      res.json({ message: 'Asset history deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  