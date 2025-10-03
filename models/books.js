const {mongoose} = require('../db');
const {Schema} = mongoose;

const booksSchema = new Schema({
    title: { type: String },
    author: { type: String },
    genre: { type: String },
    published_year: { type: Number },
    price: { type: Number },
    in_stock: { type: Boolean },
    pages: { type: Number },
    publisher: { type: String }
});

const Books = mongoose.model('books', booksSchema);

module.exports = { Books }