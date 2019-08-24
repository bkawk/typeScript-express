
import * as express from 'express';
const exampleLog = require('../components/example');

async function postExample(req: express.Request, res: express.Response) {
  const io = req.app.get('socketio'); 
  try {
    const name = req.body.name;
    const email = req.body.email;
    if (name) {
      exampleLog.log(name, email);
      res.status(200).json({data: true});
    }
  } catch (err) {
    res.status(400);
  }
}

export {postExample}