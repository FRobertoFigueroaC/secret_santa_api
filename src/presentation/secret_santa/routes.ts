import { Router } from 'express';
import { SecretSantaController } from './controller';


export class SecretSantaRoutes {
  static get routes(): Router {
    const router = Router();

    const secretSantaController = new SecretSantaController();
    router.get( '/persons', secretSantaController.getPersons );
    router.get( '/persons/:id', secretSantaController.getPersonById );
    router.post( '/assign_person', secretSantaController.generateSecretSantaPair );
    router.post( '/assignment', secretSantaController.getAssignment );


    return router;
  }
}