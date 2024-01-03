// routes/user.ts
import { Router, Request, Response } from 'express';
import createMicroOrmDatabase from '../database/connector';
import { Note } from '../models/Note';
import { tokenVerify } from '../utils/tokenVerify';
import { User } from '../models/User';
import { v4 } from 'uuid';
import { Collection } from '@mikro-orm/core';
import logger from '../utils/Logging';
// import { Note } from '../models/Note';

const noteRouter = Router();

noteRouter.get('/notes', async (req: Request, res: Response) => {
  // Handle GET request for /api/user
  const em = (await createMicroOrmDatabase().then((options) => options.orm)).em.fork()

  const token = req.headers.authorization?.split(' ')[1]

  if (token) {
    const id = tokenVerify(token)

    if (id) {
      const notes = await em.find(Note, { owner: id })

      logger.info('Notes Found')

      res.status(200).json(notes)
    } else {
      logger.info('Unauthorized')
      res.status(401).json({ message: 'Unauthorized' })
    }
  } else {
    logger.info('Unauthorized')
    res.status(401).json({ message: 'Unauthorized' })
  }
});


//GET /api/notes/:id: get a note by ID for the authenticated user. 
noteRouter.get('/notes/:id', async (req: Request, res: Response) => {
  const em = (await createMicroOrmDatabase().then((options) => options.orm)).em.fork()

  const token = req.headers.authorization?.split(' ')[1]

  if (token) {
    const id = tokenVerify(token)

    if (id) {
      const note = await em.findOne(Note, { id: req.params.id, owner: id })

      if (!note) {

        logger.info('Note Not Found')

        res.status(404).json({ message: 'Note not found' })
      } else {
        logger.info('Note Found')
        res.status(200).json(note)
      }
    } else {
      logger.info('Unauthorized')
      res.status(401).json({ message: 'Unauthorized' })
    }
  } else {
    res.status(401).json({ message: 'Unauthorized' })
  }
});

// create new note // POST 
noteRouter.post('/notes', async (req: Request, res: Response) => {
  const em = (await createMicroOrmDatabase().then((options) => options.orm)).em.fork()

  const token = req.headers.authorization?.split(' ')[1]

  if (token) {
    const id = tokenVerify(token)

    if (id) {
      const title = req.body.title
      const content = req.body.content

      const note_id = v4()

      const authenticatedUser = await em.findOne(User, { id: id })

      if (authenticatedUser) {
        const newNote = new Note({
          id: note_id,
          title: title,
          content: content,
          owner: authenticatedUser,
          createdAt: new Date(),
          updatedAt: new Date(),
          sharedWith: new Collection<User>(User)
        })

        em.persistAndFlush(newNote)

        logger.info('Note Created')

        res.status(200).json({ message: 'Note created' })
      } else {
        logger.info('User Not Found')
        res.status(404).json({ message: 'User not found , Note Cannot be created ' })
      }
    } else {
      logger.info('Unauthorized')
      res.status(401).json({ message: 'Unauthorized' })
    }
  } else {
    logger.info('Unauthorized')
    res.status(401).json({ message: 'Unauthorized' })
  }
});

//PUT /api/notes/:id: update an existing note by ID for the authenticated user.
noteRouter.put('/notes/:id', async (req: Request, res: Response) => {
  const em = (await createMicroOrmDatabase().then((options) => options.orm)).em.fork()

  const token = req.headers.authorization?.split(' ')[1]

  if (token) {
    const id = tokenVerify(token)

    if (id) {
      const note = await em.findOne(Note, { id: req.params.id, owner: id })

      if (!note) {
        logger.info('Note Not Found')
        res.status(404).json({ message: 'Note not found' })
      } else {
        if(req.body.title)  note.title = req.body.title
        if(req.body.content) note.content = req.body.content

        em.persistAndFlush(note)

        logger.info('Note Updated')

        res.status(200).json({ message: 'Note updated' })
      }
    } else {
      logger.info('Unauthorized')
      res.status(401).json({ message: 'Unauthorized' })
    }
  } else {
    logger.info('Unauthorized')
    res.status(401).json({ message: 'Unauthorized' })
  }
});

// DELETE /api/notes/:id: delete a note by ID for the authenticated user.
noteRouter.delete("/notes/:id", async (req: Request, res: Response) => {
  const em = (await createMicroOrmDatabase().then((options) => options.orm)).em.fork()

  const token = req.headers.authorization?.split(' ')[1]

  if (token) {
    const id = tokenVerify(token)

    if (id) {
      const note = await em.findOne(Note, { id: req.params.id, owner: id })

      if (!note) {
        logger.info('Note Not Found')
        res.status(404).json({ message: 'Note not found' })
      } else {
        em.removeAndFlush(note)

        logger.info('Note Deleted')

        res.status(200).json({ message: 'Note deleted' })
      }
    } else {
      logger.info('Unauthorized')
      res.status(401).json({ message: 'Unauthorized' })
    }
  } else {
    logger.info('Unauthorized')
    res.status(401).json({ message: 'Unauthorized' })
  }
});

// GET /api/search?q=:query: search for notes based on keywords for the authenticated user.
noteRouter.get('/search', async (req: Request, res: Response) => {
  const em = (await createMicroOrmDatabase().then((options) => options.orm)).em.fork()

  const token = req.headers.authorization?.split(' ')[1]

  if (token) {
    const id = tokenVerify(token)

    if (id) {
      const query = req.query.q

      const notes = await em.find(Note, { owner: id, title: { $like: `%${query}%` } })

      logger.info('Notes Found')

      res.status(200).json(notes)
    } else {
      logger.info('Unauthorized')
      res.status(401).json({ message: 'Unauthorized' })
    }
  } else {
    logger.info('Unauthorized')
    res.status(401).json({ message: 'Unauthorized' })
  }
});

// POST /api/notes/:id/share: share a note with another user for the authenticated user.
noteRouter.post('/notes/:id/share', async (req: Request, res: Response) => {
  const em = (await createMicroOrmDatabase().then((options) => options.orm)).em.fork()

  const token = req.headers.authorization?.split(' ')[1]

  if (token) {
    const id = tokenVerify(token)

    if (id) {
      const note = await em.findOne(Note, { id: req.params.id, owner: id })

      if (!note) {
        logger.info('Note Not Found')
        res.status(404).json({ message: 'Note not found' })
      } else {
        const user = await em.findOne(User, { username: req.body.username })

        if (!user) {
          res.status(404).json({ message: 'User not found' })
        } else {
          note.sharedWith.add(user)
          em.persistAndFlush(note)

          logger.info('Note Shared')

          res.status(200).json({ message: 'Note shared' })
        }
      }
    } else {
      logger.info('Unauthorized')
      res.status(401).json({ message: 'Unauthorized' })
    }
  } else {
    logger.info('Unauthorized')
    res.status(401).json({ message: 'Unauthorized' })
  }
});

export default noteRouter;
