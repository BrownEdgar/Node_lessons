import { IUser } from '../models/user.model';

// Extend Express Request to include user
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
      file?: Multer.File;
    }
  }
}

export { };

