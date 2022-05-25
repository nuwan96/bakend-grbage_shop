
const _ = require('lodash');
const {AdvancePayment, validate} = require('../models/advance_payment'); 
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

    
    const advance_payment = await AdvancePayment.find({customer:customerObj}).sort('name');

  res.send(advance_payment);
  });

router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    
    const customer = await Customer.findById( req.body.customerId);
    if (!customer) return res.status(400).send('Invalid customer there is no such a customer registerd.');

   try{ 
       
    const advancePaymentGoingToSave = new AdvancePayment({

        customer :{ _id : customer._id, name: customer.name,email:customer.email},

        date: Date.now(),
        amount:req.body.amount,
        description:req.body.description,
       
    });
    await advancePaymentGoingToSave.save();
    res.send(advancePaymentGoingToSave._id);

   }catch(e){
       console.log(e);
   }
   
   
  }); 

  
router.put('/:id', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const advance_payment = await AdvancePayment.findByIdAndUpdate(
        req.params.id, { 
            date: req.body.date,
            amount: req.body.amount,
            description: req.body.description,
         }, {
      new: true
    });
  
    if (!advance_payment) return res.status(404).send('The advancepayment with the given ID was not found.');
    
    res.send(advance_payment);
  });

  router.delete('/:id', async (req, res) => {
    const advance_payment = await AdvancePayment.findByIdAndRemove(req.params.id);
  
    if (!advance_payment) return res.status(404).send('The advancepayment with the given ID was not found.');
  
    res.send(advance_payment);
  });
  module.exports=router;