let createError = require('http-errors')
let express = require('express')
let path = require('path')
let cookieParser = require('cookie-parser')
let logger = require('morgan')
let gpxParser = require('gpx-parse')
let indexRouter = require('./routes/index')
let usersRouter = require('./routes/users')

let app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
let type = require('type-of-is')
let fs = require('fs')
let park = require('./Models/parking')
let parkingCoordinates = []
let tranconCoordinates = []


gpxParser.parseGpxFromFile("/Users/MrBejart/WebstormProjects/Parsing/SourceFiles/OD.STATIONNEMENT_PARC.gpx", function(error, data) {
    //parkingCoordinates = data
    let tracksArray = data.tracks
    for (let i = 0; i < tracksArray.length; i++) {
        let segmentsArray = tracksArray[i].segments[0]
        let segment = []
        for (let j = 0; j < segmentsArray.length; j++) {
            let lat = segmentsArray[j].lat
            let lon = segmentsArray[j].lon
            let arr = []
            arr.push(lat)
            arr.push(lon)
            segment.push(arr)
        }
        parkingCoordinates.push(segment)
        // lecture du fichier => les donnee dans la variable data

    }

    fs.readFile('/Users/MrBejart/WebstormProjects/Parsing/SourceFiles/OD.STATIONNEMENT_PARC.json', 'utf8', (err, data) => {
        if (err) {
            throw err
        }
        // parsing JSON vers un oarrat of objects
        let array = JSON.parse(data).features
        // on boucle sur le tableau
        for (let i = 0; i < array.length; i++) {
            let object = array[i].properties
            // creation d'un objet parking

            let NB_PLACE_VEHIC_ELEC = object['NB_PLACE_VEHIC_ELEC']
            if (type(NB_PLACE_VEHIC_ELEC) !== Number) {
                NB_PLACE_VEHIC_ELEC = 0
            }
            let NB_PLACE_GIGGIC = object['NB_PLACE_GIGGIC']
            if (type(NB_PLACE_GIGGIC) !== Number) {
                NB_PLACE_GIGGIC = 0
            }
            let SHAPE_LEN = object['SHAPE.LEN']
            if (type(SHAPE_LEN) !== Number) {
                SHAPE_LEN = 0
            }
            let SHAPE_AREA = object['SHAPE.AREA']
            if (type(SHAPE_AREA) !== Number) {
                SHAPE_AREA = 0
            }
            let OBJECTID = object['OBJECTID']
            if (type(OBJECTID) !== Number) {
                OBJECTID = 0
            }
            let NB_PLACE_TOTAL = object['NB_PLACE_TOTAL']
            if (type(NB_PLACE_TOTAL) !== Number) {
                NB_PLACE_TOTAL = 0
            }

            let NOM_PARC = object['NOM_PARC']
            let TYPE = object['TYPE']
            let parking = new park({
                OBJECTID: OBJECTID,
                Name: NOM_PARC,
                type: TYPE,
                ETIQUETTE: object['ETIQUETTE'],
                ZONE_TARIFAIRE: object['ZONE_TARIFAIRE'],
                NB_PLACE_TOTAL: object['NB_PLACE_TOTAL'],
                SHAPE_AREA: object['SHAPE.AREA'],
                SHAPE_LEN: SHAPE_LEN,
                NB_PLACE_VEHIC_ELEC: NB_PLACE_VEHIC_ELEC,
                NB_PLACE_GIGGIC: NB_PLACE_GIGGIC,
                coordinates: parkingCoordinates[i]
            })
            // insertion de l'objet creer dans la base
            parking.save()
        }
        console.log('data saved you can stop the app')
        // cool huh :D
    });
});
let tranc = require('./Models/trancon')


gpxParser.parseGpxFromFile("/Users/MrBejart/WebstormProjects/Parsing/SourceFiles/OD.STATIONNEMENT_TRONCON_EPL_PART.gpx", function(error, infos) {
    //console.log(data)
    let tracksArray = infos.tracks

    for (let i = 0; i < tracksArray.length; i++) {
        let segmentsArray = tracksArray[i].segments[0]
        let segment = []
        for (let j = 0; j < segmentsArray.length; j++) {
            let lat = segmentsArray[j].lat
            let lon = segmentsArray[j].lon
            let arr = []
            arr.push(lat)
            arr.push(lon)
            segment.push(arr)
        }
        tranconCoordinates.push(segment)
    }

    let Data = fs.readFileSync('/Users/MrBejart/WebstormProjects/Parsing/SourceFiles/OD.STATIONNEMENT_TRONCON_EPL_PART.json', 'utf-8')


    let array = JSON.parse(Data).features
    console.log(array.length)
    for (let i = 0; i < array.length; i++) {
        let object = array[i].properties

        NUM_VOIE = object['NUM_VOIE']
        if(!type(NUM_VOIE) !== String){
            NUM_VOIE = "null"
        }


        let VOIE = "null"
        if(object['VOIE']){
            VOIE = object['VOIE']
        }
        let SHAPE_LEN = object['SHAPE.LEN']
        if(type(SHAPE_LEN) !== Number){
            SHAPE_LEN = 0
        }
        let CAPACITE = object['CAPACITE']
        if(type(CAPACITE) !== Number){
            CAPACITE = 0
        }

        let NUM_ARRETE = "null"
        if(object['NUM_ARRETE']){
            NUM_ARRETE = object['NUM_ARRETE']
        }
        let DATE_ARRETE = "null"
        if(object['DATE_ARRETE']){
            DATE_ARRETE = object['DATE_ARRETE']
        }
        let ZONE_TARIFICATION = "null"
        if(object['ZONE_TARIFICATION']){
            ZONE_TARIFICATION = object['ZONE_TARIFICATION']
        }
        let ID_TR_SIGU = "null"
        if(object['ID_TR_SIGU']){
            ID_TR_SIGU = object['ID_TR_SIGU']
        }
        let EMPLACEMENT = "null"
        if(object['EMPLACEMENT']){
            ID_TR_SIGU = object['EMPLACEMENT']
        }
        let TYPE_STATIONNEMENT = "null"
        if(object['TYPE_STATIONNEMENT']){
            TYPE_STATIONNEMENT = object['TYPE_STATIONNEMENT']
        }

        let trancon = new tranc({
            VOIE: VOIE,
            NUM_VOIE: NUM_VOIE,
            OBJECTID: object['OBJECTID'],
            EMPLACEMENT: EMPLACEMENT,
            TYPE_STATIONNEMENT: TYPE_STATIONNEMENT,
            ZONE_TARIFICATION: ZONE_TARIFICATION,
            SHAPE_LEN: SHAPE_LEN,
            CAPACITE: CAPACITE,
            ID_TR_SIGU: ID_TR_SIGU,
            NUM_ARRETE: NUM_ARRETE,
            DATE_ARRETE: DATE_ARRETE,
            coordinates: tranconCoordinates[i]
        })
        trancon.save()
    }
    console.log('data saved you can stop the app')
});






// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
