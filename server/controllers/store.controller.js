//use change all occurances of store. Add or remove functions as needed
const Store = require('../models/store.model');



// get all

module.exports.findAllStores = (req, res) => {
    Store.find()
        .then((allStores) => {
            res.json(allStores)
        })
        .catch(err =>res.json(err));
}

// get one

module.exports.findOneStore = (req, res) => {
    Store.findOne({_id: req.params.id})
        .then((oneStore) => {
            res.json(oneStore)
        })
        .catch(err =>res.json(err));
}

// create

module.exports.createStore = (req, res) => {
    Store.create(req.body)
        .then(newStore => {
            res.json(newStore)
        })
        .catch(err =>res.status(400).json(err));
}

//update 

module.exports.updateStore = (req, res) => {
    Store.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators: true})
        .then((updatedStore) => {
            res.json(updatedStore)
        })
        .catch(err =>res.status(400).json(err));
}


// delete one

module.exports.deleteOneStore = (req, res) => {
    Store.findByIdAndDelete(req.params.id)
        .then((deletedStore) => {
            res.json(deletedStore)
        })
        .catch(err =>res.json(err));
}