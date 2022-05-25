
const _ = require('lodash');
const {Customer, validate} = require('../models/customer'); 
const {Business} =require('../models/buisness');
const auth = require('../middleware/auth');

const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();



router.get('/',auth, async (req, res) => {

    const business =await Business.findById( req.body.businessId);
    if (!business) return res.status(400).send('No such a buisness registerd !');

    // const businessObj = {
    //     "name" : business.name,
    //     "email" : business.email,
    //     "_id" : business._id
    // }

    // console.log(businessObj);
    // const customer = await Customer.find({business:businessObj}).sort('name');

    //below one is easy and alternative way to above commented section
    const customer = await Customer.find({'business._id':business._id}).sort('name');

  res.send(customer);
  });

router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    
    const business = await Business.findById( req.body.businessId);
    if (!business) return res.status(400).send('Invalid business there is no such a businses registerd.');

    
    let customer = await Customer.findOne({ email: req.body.email });
    if (customer) return res.status(400).send('User already registered with this email.');

    

   try{

    
    // customer = new Customer( _.pick(req.body,['name','nic','address','dateOfBirth','contact','accountNumber','customer_email','password']));
    const customerGoingToSave = new Customer({

        business :{ _id : business._id, name: business.name,email:business.email},

        name: req.body.name,
        nic:req.body.nic,
        address:req.body.address,
        dateOfBirth:req.body.dateOfBirth,
        contact: req.body.contact,
        accountNumber:req.body.accountNumber,
        email:req.body.email,
        password:req.body.password

    });
    await customerGoingToSave.save();
    res.send(customerGoingToSave._id);

   }catch(e){
       console.log(e);
   }
   
   
  }); 

  
router.put('/:id', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const customer = await Customer.findByIdAndUpdate(req.params.id, { name: req.body.name,nic: req.body.nic,address: req.body.address,dateOfBirth: req.body.dateOfBirth,contact:req.body.contact,accountNumber: req.body.accountNumber,email:req.body.email,password:req.body.password }, {
      new: true
    });
  
    if (!customer) return res.status(404).send('The customer with the given ID was not found.');
    
    res.send(customer);
  });

  router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);
  
    if (!customer) return res.status(404).send('The customer with the given ID was not found.');
  
    res.send(customer);
  });
  module.exports=router;