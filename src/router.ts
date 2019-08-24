import {Router} from 'express';
import {User} from "./controllers/user";

const router = Router();

router.post('/user/login', User.validateLogin, User.login);
router.post('/user/register', User.validateRegister, User.register);

export {router};