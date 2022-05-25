const Joi = require('joi-oid')
const mongoose =require('mongoose');
// const { businessSchema} =require('./buisness');



const customerSchema = new mongoose.Schema({

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
        minlength:5,
        maxlength:255,
    },

    nic : {

        type :String,
       required: true,
        minlength:10,
        maxlength:12,

    },

    address :{
        type :String,
       required: true,
        minlength:5,
        maxlength:255,
    },

    dateOfBirth :{
        type :String,
       required: true,

    },

    contact :{
        type :String,
        required: true,
        minlength:5,
        maxlength:50,
    },

    accountNumber :{
        type :Number,
        required: true,
        minlength:5,
        maxlength:50,
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique:true
       
      },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
      },
});


const Custoemr = mongoose.model('Customer',customerSchema);


function validateCustomer(customer){

    const schema =Joi.object({
        businessId:Joi.objectId(),
        name :Joi.string().min(5).max(255).required(),
        nic :Joi.string().min(10).max(12).required(),
        address :Joi.string().min(5).max(255).required(),
        dateOfBirth : Joi.string().required(),
        contact :Joi.string().min(5).max(255).required(),
        accountNumber :Joi.string().min(5).max(255).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });

    return schema.validate(customer);
}

exports.Customer =Custoemr;
exports.validate =validateCustomer;
