const Joi = require('joi-oid')
const mongoose =require('mongoose');

const fertilizerCostSchema = new mongoose.Schema({

    customer:{
        type: new mongoose.Schema({
            name :{
                type :String,
               required: true,
                minlength:5,
                maxlength:255,
            },
            email: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 255,
            },
              
          }),  
          required: true
    },
    date :{
        type :Date,
    //    required: true,
        
    },

    fertilizer : {
        type: new mongoose.Schema({
            name :{
                type :String,
               required: true,
                minlength:3,
                maxlength:255,
            },  
          }),  
          required: true
    },

    quantity : {
       type :Number,
       required: true,
    },

    amount :{
        type :Number,
        required: true,
       
    },

  
});


const FertilizerCost = mongoose.model('FertilizerCost',fertilizerCostSchema);


function validateFertilizerCost(fertilzerCost){

    const schema =Joi.object({
        customerId:Joi.objectId(),
        date :Joi.date().required(),
        fertilizerId:Joi.objectId(),
        quantity :Joi.number().min(0).required(),
        amount :Joi.number().min(0).required(),
    });

    return schema.validate(fertilzerCost);
}

exports.FertilizerCost =FertilizerCost;
exports.validate =validateFertilizerCost;
