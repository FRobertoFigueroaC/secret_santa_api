import { Router } from 'express';
import { SecretSantaRoutes } from './secret_santa';

export class AppRoutes {

  static get routes(): Router {
    const router = Router();

    router.use( '/api/secret-santa', SecretSantaRoutes.routes );

    return router;
  }
}