const express = require('express');
const business =require('../routes/business');
const customer =require('../routes/customer');
const fertilizer =require('../routes/fertilizer');
const supply_tea =require('../routes/supply_tea');
const advance_payment = require('../routes/advance_payment');
const fertilizer_cost = require('../routes/fertilizer_cost');
const auth = require('../routes/auth');

module.exports = function(app){
    app.use(express.json());
    app.use('/api/business',business);
    app.use('/api/customer',customer);
    app.use('/api/fertilizer',fertilizer);
    app.use('/api/supply_tea',supply_tea);
    app.use('/api/advance_payment',advance_payment);
    app.use('/api/fertilizer_cost',fertilizer_cost);
    app.use('/api/auth', auth);



}