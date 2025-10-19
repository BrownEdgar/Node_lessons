import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/user.model';
import { ApiError } from '../utils/ApiError';
import { catchAsync } from '../utils/catchAsync';

interface CreateUserBody {
  name: string;
  email: string;
  password: string;
  role?: 'user' | 'admin' | 'moderator';
}

interface UserParams {
  id: string;
}

export const getAllUsers = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const users = await User.find().select('-password');

    res.status(200).json({
      success: true,
      results: users.length,
      data: users,
    });
  }
);

export const getUser = catchAsync(
  async (
    req: Request<UserParams>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return next(ApiError.notFound('User not found'));
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  }
);

export const createUser = catchAsync(
  async (
    req: Request<{}, {}, CreateUserBody>,
    res: Response
  ): Promise<void> => {
    const user = await User.create(req.body);

    res.status(201).json({
      success: true,
      data: user,
    });
  }
);

export const updateUser = catchAsync(
  async (
    req: Request<UserParams, {}, Partial<CreateUserBody>>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).select('-password');

    if (!user) {
      return next(ApiError.notFound('User not found'));
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  }
);

export const deleteUser = catchAsync(
  async (
    req: Request<UserParams>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return next(ApiError.notFound('User not found'));
    }

    res.status(204).send();
  }
);

