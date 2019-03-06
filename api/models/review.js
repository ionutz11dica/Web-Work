
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    bookId: {type:mongoose.Schema.Types.ObjectId,ref:'Book'},
    email: {type:String},
    rating:{type:Number}
},{versionKey:false})

module.exports = mongoose.model('Review', reviewSchema,'reviews')