// routes/user.ts
import { Router, Request, Response } from 'express';
import { User } from '../models/User';
import { v4 } from 'uuid'
import generateToken from '../utils/generateToken';
import createMicroOrmDatabase from '../database/connector';
import { hashGenerate } from '../utils/hashGenerate';
import { tokenVerify } from '../utils/tokenVerify';
import { verifyPassword } from '../utils/verifyPassword';
import { Note } from '../models/Note';
import { Collection } from '@mikro-orm/core';
import logger from '../Logger/Logging';

const userRouter = Router();

userRouter.post('/login', async (req: Request, res: Response) => {

  const em = (await createMicroOrmDatabase().then((options) => options.orm)).em.fork()

  // Handle GE request for /api/user

  const token = req.headers.authorization?.split(' ')[1];

  const username = req.body.username;
  const password = req.body.password;

  if (token) {
    const id = tokenVerify(token);
    const userExists = await em.findOne(User, { id: id });

    if (userExists) {
      if (userExists.isLogged) {
        logger.info('User Already Logged In')
        res.status(400)
        res.send({
          message: 'User Already Logged In'
        })
      } else {
        userExists.isLogged = true;
        em.persistAndFlush(userExists);

        logger.info('User Logged In')
        res.send({
          message: 'User Logged In'
        })
      }
    } else {

      logger.info('User Not Found')

      res.status(400)
      res.send({
        message: 'User Not Found'
      })
    }
  } else {
    const userExists = await em.findOne(User, { username: username });

    if (userExists) {
      const isVerified = await verifyPassword({
        password: password,
        user: userExists
      })

      if (isVerified) {
        const token = generateToken(userExists.id);
        userExists.isLogged = true;
        em.persistAndFlush(userExists);

        logger.info('User Logged In')

        res.send({
          message: 'User Logged In',
          token: token
        })
      } else {
        logger.info('Wrong Password')
        res.status(400)
        res.send({
          message: 'Wrong Password'
        })
      }
    } else {
      logger.info('User Not Found')
      res.status(400)
      res.send({
        message: 'User Not Found'
      })
    }
  }
});


userRouter.post('/signup', async (req: Request, res: Response) => {
  const username = req.body.username;
  const password = req.body.password;

  // check if user is already in the database or not 

  const em = (await createMicroOrmDatabase().then((options) => options.orm)).em.fork()

  const userExists = await em.find(User, { username: username });

  if (userExists.length > 0) {
    logger.info('User Already Exists')
    res.status(400)
    res.send({
      message: 'User Already Exists'
    })
  } else {

    const id = v4();
    const { hash, salt } = hashGenerate(password)
    const token = generateToken(id);

    const user = new User({
      id: id,
      username,
      password: hash,
      createdAt: new Date(),
      isLogged: true,
      salt,
      ownedNotes: new Collection<Note>(User), 
      sharedNotes: new Collection<Note>(User), 
    });

    em.persistAndFlush(user);

    logger.info('User Created')

    res.send({
      message: 'User Created',
      token: token
    })
  }
});


userRouter.post('/logout', async (req: Request, res: Response) => {

  const em = (await createMicroOrmDatabase().then((options) => options.orm)).em.fork()

  const token = req.headers.authorization?.split(' ')[1];

  if (token) {
    const id = tokenVerify(token);

    const userExists = await em.findOne(User, { id: id });

    if (userExists) {
      userExists.isLogged = false;
      em.persistAndFlush(userExists);

      logger.info('User Logged Out')

      res.send({
        message: 'User Logged Out'
      })
    } else {

      logger.info('User Not Found')

      res.status(400)
      res.send({
        message: 'User Not Found'
      })
    }
  } else {

    logger.info('User Not Found')

    res.status(400)
    res.send({
      message: 'User Not Found'
    })
  };
});


export default userRouter;
