
const _ = require('lodash');
const {Fertilizer, validate} = require('../models/fertilizer'); 
const {Business} =require('../models/buisness');

const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();



router.get('/', async (req, res) => {

    const buisness =await Business.findById( req.body.businessId);
    if (!buisness) return res.status(400).send('No such a buisness registerd !');

    const businessObj =await {
        "name" : buisness.name,
        "email" : buisness.email,
        "_id" : buisness._id
    }

    console.log(businessObj);
    const ferlizer = await Fertilizer.find({business:businessObj}).sort('name');

  res.send(ferlizer);
  });

router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    
    const business = await Business.findById( req.body.businessId);
    if (!business) return res.status(400).send('Invalid business there is no such a businses registerd.');

    
    let ferlizer = await Fertilizer.findOne({ name: req.body.name });
    if (ferlizer) return res.status(400).send('This fertilzer already add.');

    

   try{ const fertilzerGoingToSave = new Fertilizer({

        business :{ _id : business._id, name: business.name,email:business.email},

        name: req.body.name,
        type:req.body.type,
        unitePrice:req.body.unitePrice,
        stoke:req.body.stoke,
        imagePath: req.body.imagePath,
      

    });
    await fertilzerGoingToSave.save();
    res.send(fertilzerGoingToSave._id);

   }catch(e){
       console.log(e);
   }
   
   
  }); 

  
router.put('/:id', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const ferlizer = await Fertilizer.findByIdAndUpdate(
        req.params.id, { 
            name: req.body.name,
            type: req.body.type,
            unitePrice: req.body.unitePrice,
            stoke: req.body.stoke,
            imagePath:req.body.imagePath,
         }, {
      new: true
    });
  
    if (!ferlizer) return res.status(404).send('The fertilzer with the given ID was not found.');
    
    res.send(ferlizer);
  });

  router.delete('/:id', async (req, res) => {
    const ferlizer = await Fertilizer.findByIdAndRemove(req.params.id);
  
    if (!ferlizer) return res.status(404).send('The customer with the given ID was not found.');
  
    res.send(ferlizer);
  });
  module.exports=router;