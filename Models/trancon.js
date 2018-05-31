const mongoose = require('./../dataBase/mongoose')


let tranconSchema = new mongoose.Schema({
    VOIE: {
        type: String,
        trim: true,
        minLength: 1,
        required: true
    },
    TYPE_STATIONNEMENT: {
        type: String,
        trim: true,
        minLength: 1,
        required: true
    },
    NUM_VOIE: {
        type: String,
        trim: true,
        required: true
    },
    OBJECTID: {
        type: Number,
        required: true
    },
    EMPLACEMENT: {
        type: String,
        trim: true,
        minLength: 1,
        required: true
    },
    ZONE_TARIFICATION: {
        type: String,
        trim: true,
        minLength: 1,
        required: true
    },
    SHAPE_LEN: {
        type: Number,
        required: true
    },
    CAPACITE: {
        type: Number,
        required: true
    },
    ID_TR_SIGU: {
        type: String,
        trim: true,
        minLength: 1,
        required: true
    },
    NUM_ARRETE: {
        type: String,
        trim: true,
        minLength: 1,
        required: true
    },
    DATE_ARRETE: {
        type: String,
        trim: true,
        minLength: 1,
        required: true
    },
    coordinates: {
        type: [],
        required: true
    }

})

let trancon = mongoose.model('trancon', tranconSchema)

module.exports = trancon