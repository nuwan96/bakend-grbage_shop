
const _ = require('lodash');
const {SupplyTea, validate} = require('../models/supply_tea'); 
const {Customer} =require('../models/customer');

const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();



router.get('/', async (req, res) => {

    const customer =await Customer.findById( req.body.customerId);
    if (!customer) return res.status(400).send('No such a customer registerd !');

    const customerObj ={
        "name" : customer.name,
        "email" : customer.email,
        "_id" : customer._id
    }

    
    const supply_tea = await SupplyTea.find({customer:customerObj}).sort('name');

  res.send(supply_tea);
  });

router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    
    const customer = await Customer.findById( req.body.customerId);
    if (!customer) return res.status(400).send('Invalid customer there is no such a customer registerd.');

   try{ 
       
    const supplyTeaGoingToSave = new SupplyTea({

        customer :{ _id : customer._id, name: customer.name,email:customer.email},

        date: Date.now(),
        amountOfKilos:req.body.amountOfKilos,
        numberOfBages:req.body.numberOfBages,
       
    });
    await supplyTeaGoingToSave.save();
    res.send(supplyTeaGoingToSave._id);

   }catch(e){
       console.log(e);
   }
   
   
  }); 

  
router.put('/:id', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const supply_tea = await SupplyTea.findByIdAndUpdate(
        req.params.id, { 
            date: req.body.date,
            amountOfKilos: req.body.amountOfKilos,
            numberOfBages: req.body.numberOfBages,
         }, {
      new: true
    });
  
    if (!supply_tea) return res.status(404).send('The supplyamount with the given ID was not found.');
    
    res.send(supply_tea);
  });

  router.delete('/:id', async (req, res) => {
    const supply_tea = await SupplyTea.findByIdAndRemove(req.params.id);
  
    if (!supply_tea) return res.status(404).send('The supplyamount with the given ID was not found.');
  
    res.send(supply_tea);
  });
  module.exports=router;