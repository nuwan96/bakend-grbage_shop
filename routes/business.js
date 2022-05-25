const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {Business, validate} = require('../models/buisness'); 
const auth = require('../middleware/auth');

const admin = require('../middleware/admin');

const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/me', auth, async (req, res) => {
  const business = await Business.findById(req.business._id).select('-password');
  res.send(business);
});



router.get('/', [auth,admin], async (req, res) => {
    const business = await Business.find().sort('name');
    res.send(business);
  });

router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    
    let business = await Business.findOne({ email: req.body.email });
    if (business) return res.status(400).send('User already registered with this email.');

    business = new Business( _.pick(req.body,['name','address','contact','email','password','isAdmin']));
    const salt = await bcrypt.genSalt(10);
    business.password =await bcrypt.hash(business.password,salt);
    await business.save();
    const token = business.generateAuthToken();
    res.header('x-auth-token', token).send(business._id);
  }); 

  
router.put('/:id', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const business = await Business.findByIdAndUpdate(req.params.id, { name: req.body.name,address: req.body.address,contact:req.body.contact,email:req.body.email,password:req.body.password }, {
      new: true
    });
  
    if (!business) return res.status(404).send('The business with the given ID was not found.');
    
    res.send(business);
  });

  router.delete('/:id', [auth,admin],async (req, res) => {
    const business = await Business.findByIdAndRemove(req.params.id);
  
    if (!business) return res.status(404).send('The business with the given ID was not found.');
  
    res.send(business);
  });

  module.exports=router;