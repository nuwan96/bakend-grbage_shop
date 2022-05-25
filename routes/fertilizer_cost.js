
const _ = require('lodash');
const {FertilizerCost, validate} = require('../models/fertilizer_cost'); 
const {Customer} =require('../models/customer');
const {Fertilizer} =require('../models/fertilizer');
const mongoose = require('mongoose');
const Fawn = require('fawn');
const express = require('express');
const router = express.Router();

Fawn.init("mongodb://localhost/tea_buyers");



router.get('/', async (req, res) => {

    const customer =await Customer.findById( req.body.customerId);
    if (!customer) return res.status(400).send('No such a customer registerd !');

    const customerObj ={
        "name" : customer.name,
        "email" : customer.email,
        "_id" : customer._id
    }

    
    const ferlizer_cost = await FertilizerCost.find({customer:customerObj}).sort('name');

  res.send(ferlizer_cost);
  });

router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    
    const customer = await Customer.findById( req.body.customerId);
    if (!customer) return res.status(400).send('Invalid customer there is no such a customer registerd.');

    const fertilizer = await Fertilizer.findById( req.body.fertilizerId);
    if (!fertilizer) return res.status(400).send('Invalid fertilizer id there is no such a fertilizer registerd.');

   try{ 
       
    const fertilizerCostGoingToSave = new FertilizerCost({

        customer :{ _id : customer._id, name: customer.name,email:customer.email},

        date: Date.now(),
        fertilizer : {_id: fertilizer._id, name: fertilizer.name},
        quantity:req.body.quantity,
        amount:req.body.amount,
       
    });
    

    new Fawn.Task()
      .save('fertilizercosts', fertilizerCostGoingToSave)
      .update('fertilzers', { _id: fertilizer._id }, { 
        $inc: { stoke: -req.body.quantity }
      })
      .run();
  res.send(fertilizerCostGoingToSave._id);

   }catch(e){
    res.status(500).send('Something failed.');
   }
   
   
  }); 

  
router.put('/:id', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const ferlizer_cost = await FertilizerCost.findByIdAndUpdate(
        req.params.id, { 
            date: req.body.date,
            quantity: req.body.quantity,
            amount: req.body.amount,
         }, {
      new: true
    });
  
    if (!ferlizer_cost) return res.status(404).send('The ferlizer_cost with the given ID was not found.');
    
    res.send(ferlizer_cost);
  });

  router.delete('/:id', async (req, res) => {
    const ferlizer_cost = await FertilizerCost.findByIdAndRemove(req.params.id);
  
    if (!ferlizer_cost) return res.status(404).send('The ferlizer_cost with the given ID was not found.');
  
    res.send(ferlizer_cost);
  });
  module.exports=router;