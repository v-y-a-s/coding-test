import {Application, Router, Request, Response, NextFunction} from 'express';
import { rootHandler, transformationHandler } from './api/handlers';

const router =  (app: Application) => {
  const apiRouter: Router = Router();
  // Attach routes
  rootHandler(apiRouter)
  transformationHandler(apiRouter)
  app.use('/api', apiRouter);
};

export default router;