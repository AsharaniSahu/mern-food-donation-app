const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  bill_generated:{ type: String, required: false,
      default: "not_generated.pdf"  },
});

module.exports = mongoose.model('History', historySchema);
