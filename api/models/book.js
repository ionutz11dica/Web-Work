const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: { type: String, required:true},
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
    reviews: [String]
    // identifiers:[{
    //  isbn_13:{type:String},
    //  isbn_10:{type:String}
    // }]
    //language
    //reviews
},{versionKey:false})

module.exports = mongoose.model('Book',bookSchema,'books')