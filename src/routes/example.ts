

import * as express from 'express';
const validate = require('express-validation');

const exampleController = require('../controllers/example');
const router = express.Router();

const postExample = require('../validators/example');

router.route('/example/').post(
    validate(postExample.validate), exampleController.postExample);

module.exports = router;