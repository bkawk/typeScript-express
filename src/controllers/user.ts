
import { Request, Response, NextFunction } from 'express';
import * as Joi from '@hapi/joi';
import * as bcrypt from 'bcrypt';
import UserModel, { IUser } from '../models/example'
import * as jwt from 'jsonwebtoken'

class User {

  static validateLogin = async (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object().keys({
      email: Joi.string().email({ minDomainSegments: 2 }),
      password: Joi.string().min(5)
    })
    const email = req.body.email;
    const password = req.body.password;
    Joi.validate({ email, password }, schema, (err) => { 
      if(!err) next(); else res.json(err.details)
    });  
  };

  static login = async (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;
    const account = await UserModel.findOne({email}).exec();
    if (!account) {
      res.status(400).send({ message: "You have not registered" });
    } else {
      const passwordsMatch = await bcrypt.compare(password, account.password);
      if (!passwordsMatch) {
        res.status(400).send({ message: "Incorrect Password" });
      } else {
        const token = jwt.sign({ email: account.email, id: account._id }, process.env.JWT_SECRET);
        res.status(200).send({ message: "You are now logged-in", token });
      }
    }
  };

  static validateRegister = async (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object().keys({
      email: Joi.string().email({ minDomainSegments: 2 }),
      password: Joi.string().min(5)
    })
    const email = req.body.email;
    const password = req.body.password;
    Joi.validate({ email,password }, schema, (err) => { 
      if(!err) next(); else res.json(err.details)
    });  
  };


  static register = async (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;
    const alreadyRegistered = await UserModel.findOne({email}).exec();
    if (!alreadyRegistered) {
      const hashedPassword = await bcrypt.hash(password,10);
        if (!hashedPassword) {
          res.status(500).send({ message: "Failed to encrypt your password" });
        } else {
          const user = new UserModel(<IUser>{email:email, password:hashedPassword});
          const saved = await user.save();
          if (!saved) {
            res.status(500).send({ message: "Failed to register you" });
          } else {
            res.status(200).send({ message: "You are now registered" });
          }
        }
    } else {
      res.status(400).send({ message: "You have already registered" });
    }
  };

}

export {User} 
