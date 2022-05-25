const Joi = require('joi-oid')
const mongoose =require('mongoose');

const supplyTeaSchema = new mongoose.Schema({

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

    amountOfKilos : {
       type :Number,
       required: true,
    },

    numberOfBages :{
        type :Number,
       required: true,
    },

  
});


const SupplyTea = mongoose.model('SupplyTea',supplyTeaSchema);


function validateSupplyKilo(supplyKilos){

    const schema =Joi.object({
        customerId:Joi.objectId(),
        date :Joi.date().required(),
        amountOfKilos :Joi.number().min(0).required(),
        numberOfBages :Joi.number().min(0).required(),
    });

    return schema.validate(supplyKilos);
}

exports.SupplyTea =SupplyTea;
exports.validate =validateSupplyKilo;
