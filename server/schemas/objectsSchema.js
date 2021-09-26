const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const objectsSchema = new Schema({
  objects: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model('objectsModel', objectsSchema);
