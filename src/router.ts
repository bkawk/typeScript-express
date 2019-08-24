import * as express from 'express'

const router = express.Router();
const exampleRoute = require('./routes/example');

router.use('/api/v1/example', exampleRoute);


export {router};