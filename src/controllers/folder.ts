import * as Joi from '@hapi/joi';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import {FolderInterface, folderModel } from '../models/folders';

class Folder {

  static validateCreate = async (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object().keys({
      jwtToken: Joi.string().min(5),
      name: Joi.string().min(5),
    });
    const name = req.body.name;
    const jwtToken = req.headers.authorization;
    Joi.validate({ name, jwtToken }, schema, (err) => {
      if (!err) next(); else res.json(err.details);
    });
  };

  static create = async (req: Request, res: Response) => {
    const name = req.body.name;
    const jwtToken = req.headers.authorization.slice(7);
    const decodedJwt = await jwt.verify(jwtToken, process.env.JWT_SECRET);
    if (!decodedJwt) {
        res.status(400).send({ message: 'Please login' });
    } else {
      interface DecodedJwtInterface { userId?: string; name?: string; }
      const userId = (decodedJwt as DecodedJwtInterface).userId;
      const alreadyCreated = await folderModel.findOne({name, userId}).exec();
      if (!alreadyCreated) {
        const folder = new folderModel({name, userId} as FolderInterface);
        const saved = await folder.save();
        if (!saved) {
          res.status(500).send({ message: 'Failed to create folder' });
        } else {
          const folderList = await folderModel.find({userId}).exec();
          res.status(200).send({ message: 'Folder created', folderList});
        }
      } else {
        res.status(400).send({ message: 'Folder already exists' });
      }
    }
  };

  static validateDelete = async (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object().keys({
      jwtToken: Joi.string().min(5),
      name: Joi.string().min(5),
    });
    const name = req.body.name;
    const jwtToken = req.headers.authorization;
    Joi.validate({ name, jwtToken }, schema, (err) => {
      if (!err) next(); else res.json(err.details);
    });
  };

  static delete = async (req: Request, res: Response) => {
    const name = req.body.name;
    const jwtToken = req.headers.authorization.slice(7);
    const decodedJwt = await jwt.verify(jwtToken, process.env.JWT_SECRET);
    if (!decodedJwt) {
        res.status(400).send({ message: 'Please Login' });
    } else {
      interface DecodedJwtInterface { userId?: string; name?: string; }
      const userId = (decodedJwt as DecodedJwtInterface).userId;
      const folderExists = await folderModel.findOne({name, userId}).exec();
      if (!folderExists) {
        res.status(400).send({ message: 'Folder does not exist' });
      } else {
        const deleted = await folderModel.findOne({name, userId}).remove().exec();
        if (!deleted) {
          res.status(500).send({ message: 'Failed to delete folder' });
        } else {
          res.status(200).send({ message: 'Folder Deleted' });
        }
      }
    }
  };

  static validateList = async (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object().keys({
      jwtToken: Joi.string().min(5),
    });
    const jwtToken = req.headers.authorization;
    Joi.validate({ jwtToken }, schema, (err) => {
      if (!err) next(); else res.json(err.details);
    });
  };

  static list = async (req: Request, res: Response) => {
    const jwtToken = req.headers.authorization.slice(7);
    const decodedJwt = await jwt.verify(jwtToken, process.env.JWT_SECRET);
    if (!decodedJwt) {
        res.status(400).send({ message: 'Please login' });
    } else {
      interface DecodedJwtInterface { userId?: string; name?: string; }
      const userId = (decodedJwt as DecodedJwtInterface).userId;
      const folderList = await folderModel.find({userId}).exec();
      if (!folderList) {
        res.status(500).send({ message: 'Failed to get folder list' });
      } else {
        res.status(200).send({ message: 'Recieved list of folders', folderList});
      }
    }
  };
}

export {Folder};
