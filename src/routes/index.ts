// routes/index.ts
import { Express } from 'express';
import { Settings } from '../config/settings';
import userRouter from './user';
import noteRouter from './note'

const setupRoutes = (app: Express): void => {
  // Use your desired base route, in this case, "/api/"
  const baseRoute = Settings.server.apiPrefix

  // Set up user routes
  app.use(`${baseRoute}/auth`, userRouter);

  // Set up note routes
  app.use(`${baseRoute}/`, noteRouter);

  // Add more routes as needed

  // If you want a default route or other global middleware, you can add it here

  // Example: app.use(`${baseRoute}/default`, defaultRoutes);
};

export default setupRoutes;
