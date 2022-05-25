const Joi = require('joi-oid')
const mongoose =require('mongoose');

const fertilizerSchema = new mongoose.Schema({

    business:{
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
    name :{
        type :String,
       required: true,
        minlength:3,
        maxlength:255,
    },

    type : {

        type :String,
       required: true,
        minlength:3,
        maxlength:50,

    },

    unitePrice :{
        type :Number,
       required: true,
        minlength:5,
        maxlength:255,
    },

    stoke :{
        type :Number,
       required: true,
        minlength:5,
        maxlength:255,

    },

    imagePath :{
        type :String,
      
    },
});


const Fertilizer = mongoose.model('Fertilzer',fertilizerSchema);


function validateFertilizer(fertilizer){

    const schema =Joi.object({
        businessId:Joi.objectId(),
        name :Joi.string().min(3).max(255).required(),
        type :Joi.string().min(3).max(50).required(),
        unitePrice :Joi.number().min(0).required(),
        stoke : Joi.number().min(0).required(),
    });

    return schema.validate(fertilizer);
}

exports.Fertilizer =Fertilizer;
exports.validate =validateFertilizer;
