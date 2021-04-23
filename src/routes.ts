import { Router } from 'express';
import { SettingsController } from './controllers/SettingsControllers'
import { UsersController } from './controllers/UsersControllers'
import { MessageController } from './controllers/MessageControllers'

export const routes = Router();

const settingsController = new SettingsController();
const usersController = new UsersController();
const messageController = new MessageController();

routes.post("/users", usersController.create);

routes.post("/settings", settingsController.create);
routes.get("/settings/:id", settingsController.findByUsername);
routes.put("/settings/:id", settingsController.update);

routes.post("/messages", messageController.create);
routes.get("/messages/:id", messageController.showByUser);

