const mongoose = require('./../dataBase/mongoose');

let parkingSchema =  new mongoose.Schema({
    Name: {
        type: String,
        minLength: 1,
        trim: true,
        required: true
    },
    OBJECTID: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        trim: true,
        minLength: 1,
        required: true
    },
    ETIQUETTE: {
        type: String,
        trim: true,
        minLength: 1,
        required: true
    },
    ZONE_TARIFAIRE: {
        type: String,
        trim: true,
        minLength: 1,
        required: true
    },
    NB_PLACE_TOTAL: {
        type: Number,
        required: true
    },
    SHAPE_AREA: {
        type: Number,
        required: true
    },
    SHAPE_LEN:{
        type: Number,
        required: true
    },
    NB_PLACE_VEHIC_ELEC:{
        type: Number,
        required: true
    },
    NB_PLACE_GIGGIC:{
        type: Number,
        required: true
    },
    coordinates: {
        type: [],
        required: true
    }

});


let parking = mongoose.model('parking', parkingSchema);

module.exports = parking;