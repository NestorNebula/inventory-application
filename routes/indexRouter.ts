import { Router } from 'express';
const indexRouter = Router();
import indexController from '../controllers/indexController';

indexRouter.get('/', indexController.getIndexPage);

export default indexRouter;
