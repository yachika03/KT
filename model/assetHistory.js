const mongoose = require('mongoose');

const assetHistorySchema = new mongoose.Schema({
  asset_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Asset',
    required: true
  },
  employee_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  issued_date: {
    type: Date,
    default: Date.now,
    required: true
  },
  returned_date: {
    type: Date
  },
  reason: {
    type: String
  }
});

module.exports = mongoose.model('AssetHistory', assetHistorySchema);
