const exampleModel = require('../models/example');

function log(name: string, email: string) {
  try {
    exampleModel({
      name,
      email,
    }).save();
  } catch (err) {
    console.log(`logger log. ${err}`);
  }
};

export { log };