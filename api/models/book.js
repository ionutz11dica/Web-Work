const mongoose = require('mongoose')
const random = require('mongoose-simple-random');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: { type: String},
    authors:  [{type:String}],
    pageCount: {type: Number},
    description: {type: String},
    publisher: {type: String},
    publishedDate: {type: String},
    imageLink:{type: String},
    isEbook:{type: Boolean},
    publicDomain: {type: Boolean},
    isAvalibleEpub: {type: Boolean},
    downloadLink:{type: String},
    categories: [{type:String}],
    reviews: [{type:Number}],
    noDownloads: {type:Number},
    isbn:{type:String},
    fileID:{
        type: mongoose.Schema.Types.ObjectId,
    }
   
    
    // identifiers:{
    //  isbn_13:{type:String},
    //  isbn_10:{type:String}
    // }
    //language
    
},{versionKey:false})
bookSchema.plugin(random);
module.exports = mongoose.model('Book',bookSchema,'books')