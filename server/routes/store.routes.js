
const StoreController = require('../controllers/store.controller');

module.exports = app => {
    app.get('/api/stores', StoreController.findAllStores);
    app.get('/api/stores/:id', StoreController.findOneStore);
    app.patch('/api/stores/:id', StoreController.updateStore);
    app.post('/api/stores', StoreController.createStore);
    app.delete('/api/stores/:id', StoreController.deleteOneStore);
    app.put('/api/stores/:id', StoreController.updateStore);
}