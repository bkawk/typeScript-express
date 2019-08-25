import {Router} from 'express';
import {Folder} from './controllers/folder';
import {User} from './controllers/user';

const router = Router();

router.post('/user/login', User.validateLogin, User.login);
router.post('/user/register', User.validateRegister, User.register);
// router.get('/user/me', User.validateMe, User.me);

router.post('/folder/create', Folder.validateCreate, Folder.create);
router.delete('/folder/delete', Folder.validateDelete, Folder.delete);
router.get('/folder/list', Folder.validateList, Folder.list);
// router.put('/folder/edit', Folder.validateLogin, Folder.login);

// router.delete('/files/create', Files.validateLogin, Files.login);
// router.delete('/files/delete', Files.validateLogin, Files.login);
// router.put('/files/edit', Files.validateLogin, Files.login);
// router.get('/files/list', Files.validateLogin, Files.login);

export {router};
