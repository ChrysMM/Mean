const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const category = new Schema(// mon schema
    {
        name: {
            type: String
        },
        description: {
            type: String
        },
        products: [
            {
                type: Schema.Types.ObjectId,
                ref: 'product'
            }
        ]
         
    },
    {
        collection: 'category'// on recupere la collection
    }


);
module.exports = mongoose.model('category', category);// on exporte se module pour qu'il soit utilisable patout