import bcrypt from 'bcryptjs';
import express from 'express';

import { signInSchema } from '../schemas/schemas';

const router = express.Router();

router.get('/', (_req, res) => res.render('index'));

router.post('/', async (req, res) => {
  try {
    const { users } = res.locals;
    const { email, password } = await signInSchema.validateAsync(req.body);

    const user = users.find((u) => u.email === email);

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!user || !validPassword) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    return res.redirect('/users');
  } catch (err) {
    res.status(400).json({ message: 'Invalid email or password' });
  }
});

export default router;
