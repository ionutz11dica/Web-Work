const mongoose = require('mongoose')

const Schema = mongoose.Schema;

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
  };

const userSchema = new Schema({
    username: {type:String},
    email: {
        type: String,
        trim: true,
        lowercase: true,  
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
      },
    password: {type:String},
    books:[{type: mongoose.Schema.Types.ObjectId, ref:'Book'}],
    wantToRead:[{type: mongoose.Schema.Types.ObjectId, ref:'Book'}],
    backup:[{type: mongoose.Schema.Types.ObjectId}]
},{versionKey:false})

module.exports = mongoose.model('User',userSchema,'users')