const mongoose = require('mongoose');

//change all occurance from store

const StoreSchema = new mongoose.Schema({
    storeName: {
        type: String,
        required: [true, 'Store name is required'],
        minlength: [3, 'Store name must be at least 3 characters']
    },
    storeNumber: {
        type: Number,
        required: [true, 'Store number is required'],
        min: [1, 'Store number must be greater than 0']
    },
    isOpen: {
        type: Boolean,
        default: false
    }

}, {timestamps: true});

const Store = mongoose.model('Store', StoreSchema);

module.exports = Store;
