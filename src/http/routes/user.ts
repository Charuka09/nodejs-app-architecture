import express, { Request, Response } from 'express';
import { asyncWrapper } from '../utils/asyncWrapper';
import { UserService } from '../../services/userService';

const router = express.Router();

export function userRoute(userService: UserService) {
  router.get(
    '/',
    asyncWrapper(async (_: Request, res: Response) => {
      const users = await userService.getAllUsers();
      res.json(users);
    }),
  );

  // TODO: Install middleware to validate the input
  router.post(
    '/',
    asyncWrapper(async (req: Request, res: Response) => {
      const { firstName, lastName, age } = req.body;
      const user = await userService.createUser(firstName, lastName, age);
      res.json(user);
    }),
  );

  return router;
}
