const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
  asset_type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AssetCategory',
    required: true
  },
  make: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  serial_number: {
    type: String,
    required: true,
    unique: true
  },
  is_scrap: {
    type: Boolean,
    required: true,
    default: false
  }
});

module.exports = mongoose.model('Asset', assetSchema);
