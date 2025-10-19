import { readFile } from 'fs/promises';
import { resolve } from 'path';

export async function getUsers(req, res, next) {
  try {
    const usersJson = await readFile(resolve('users.json'), 'utf-8');
    const usersData = JSON.parse(usersJson);

    res.locals.users = usersData;

    next();
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}
