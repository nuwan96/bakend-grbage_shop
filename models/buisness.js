
const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');


const businessSchema = new mongoose.Schema({
    name :{
        type :String,
       required: true,
        minlength:5,
        maxlength:255,
    },

    address :{
        type :String,
       required: true,
        minlength:5,
        maxlength:255,
    },

    contact :{
        type :String,
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
    isAdmin: {
        type : Boolean

    }
});

businessSchema.methods.generateAuthToken = function() { 
    // const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, "Asanka1560");
    return token;
  }

const Business = mongoose.model('Business', businessSchema);

function validateBusiness(business){

    const schema =Joi.object({
        name :Joi.string().min(5).max(255).required(),
        address :Joi.string().min(5).max(255).required(),
        contact :Joi.string().min(5).max(255).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
        isAdmin: Joi.boolean()
    });

    return schema.validate(business);
}
exports.businessSchema=businessSchema;
exports.Business=Business;
exports.validate=validateBusiness;