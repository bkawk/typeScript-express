const mongoose = require('mongoose');

const exampleSchema = new mongoose.Schema({
  name: {type: String},
  email: {type: String},
});

const Example = mongoose.model('example', exampleSchema);

export { Example }