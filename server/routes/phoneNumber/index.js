import Router from 'express';
import { phoneNumberController } from '../../controllers';

const phoneNumberRouter = Router();

phoneNumberRouter.get('/generate/:number', phoneNumberController.generate);
phoneNumberRouter.get('/fetch', phoneNumberController.fetch);

export default Router().use('/phonenumber', phoneNumberRouter);

