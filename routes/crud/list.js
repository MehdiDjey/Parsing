const express = require('express');
const router = express.Router();

let model = require('./../../Models/parking');

let model1 = require('./../../Models/trancon');

router.get('/', (req, res) => {



    model.find().then((result) => {
        if (!result || result.length === 0) {
            console.log('no data')
        } else {
            model1.find().then((results) => {
                if (!results || results.length === 0) {
                    console.log('no data')
                } else {
                    res.render('playground/test', {
                        trancon: results,
                        parcs:result
                    })
                }
            })

        }
    })
});

module.exports = router;

