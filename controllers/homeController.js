const express = require('express');
const router = express.Router();

let db = require("../models/");


router.get('/', function(req, res) {

    db.Events.findAll({
        limit: 5,
        order: ['eventDateTime', 'DESC']
    }).then(function(results){
        res.json(results);
    });

});