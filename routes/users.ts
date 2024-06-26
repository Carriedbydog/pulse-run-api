import express from 'express';
import validateBody from '../middlewares/validateBody';
import {
  schemaPayment,
  schemaSubscribe,
  schemaSupport,
  schemaUpdateUser,
} from '../schemas/joi/joiValidator';
import subscribeEmail from '../controllers/users/subscribeEmail';
import authentication from '../middlewares/authentication';
import deleteUser from '../controllers/users/deleteUser';
import forgotPassword from '../controllers/users/forgotPassword';
import resetPassword from '../controllers/users/resetPassword';
import updateUser from '../controllers/users/updateUser';
import upload from '../middlewares/upload';
import createSupportTicket from '../controllers/users/supportTicket';
import addPayment from '../controllers/users/addPayment';
import deletePayment from '../controllers/users/deletePayment';

const router = express.Router();

router.post('/subscribe', validateBody(schemaSubscribe), subscribeEmail);
router.delete('/', authentication, deleteUser);
router.post('/forgot-password', forgotPassword);
router.patch('/reset-password', resetPassword);
router.patch(
  '/',
  authentication,
  upload.single('avatar'),
  validateBody(schemaUpdateUser),
  updateUser,
);
router.post(
  '/payments',
  authentication,
  validateBody(schemaPayment),
  addPayment,
);
router.delete('/payments/:paymentId', authentication, deletePayment);
router.post('/supports', validateBody(schemaSupport), createSupportTicket);
export default router;
