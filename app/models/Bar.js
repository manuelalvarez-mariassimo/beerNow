const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const barSchema = new Schema({
  name: {
      type: String, 
      required: true
    },
  location :  { type: { type: String }, coordinates: [Number] },
  address: {
      type: String,
      required: true
  },
  rate:{
      type: Number,
      min: 0,
      max: 5
  },
  images : [String],
  comments : [{type: mongoose.Schema.Types.ObjectId, ref: "Comment"}], 
});

const Bar = mongoose.model('Bar', barSchema);
module.exports = Bar;
