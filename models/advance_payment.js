const Joi = require('joi-oid')
const mongoose =require('mongoose');

const advancePaymentsSchema = new mongoose.Schema({

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

    amount : {
       type :Number,
       required: true,
    },

    description :{
        type :String,
       
    },

  
});


const AdvancePayment = mongoose.model('AdvancePayment',advancePaymentsSchema);


function validateAdvancePayement(advancePayment){

    const schema =Joi.object({
        customerId:Joi.objectId(),
        date :Joi.date().required(),
        amount :Joi.number().min(0).required(),
        description :Joi.string().required(),
    });

    return schema.validate(advancePayment);
}

exports.AdvancePayment =AdvancePayment;
exports.validate =validateAdvancePayement;
