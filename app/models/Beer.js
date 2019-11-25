const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const beerSchema = new Schema({
    name : {
        type: String,
        required : true
    },
    country : {
        type : String,
        required : true
    },
    style : {
        type : String,
        required : true
    },
    description :  {
        type : String,
        required : true
    },
    rate:{
        type: Number,
        min: 0,
        max: 5
    },
    alcohol : {
        type : Number,
        required : true
    },
    image : {
        type: String,
        required : true
    },
    comments : [{type: mongoose.Schema.Types.ObjectId, ref: "Comment"}],
    favoriteBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]

});

const Beer = mongoose.model('Beer', beerSchema);
module.exports = Beer;
