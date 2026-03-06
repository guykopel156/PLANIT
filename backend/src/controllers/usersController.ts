import { Request, Response } from 'express';

import { asyncHandler } from '../middleware/asyncHandler';
import {
  registerUser,
  loginUser,
  getUserById,
  updateUserProfile,
  deleteUserById,
} from '../services/usersService';
import { AppError, HTTP_UNAUTHORIZED } from '../utils/appError';

import type { CreateUserInput, UpdateUserInput } from '../types/user';

const STATUS_CREATED = 201;
const STATUS_OK = 200;
const STATUS_NO_CONTENT = 204;
const AUTH_REQUIRED_CODE = 'UNAUTHORIZED';
const AUTH_REQUIRED_MESSAGE = 'Authentication required';

function getAuthenticatedUserId(req: Request): string {
  if (!req.userId) {
    throw new AppError(AUTH_REQUIRED_MESSAGE, HTTP_UNAUTHORIZED, AUTH_REQUIRED_CODE);
  }
  return req.userId;
}

const register = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const input: CreateUserInput = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  const result = await registerUser(input);
  res.status(STATUS_CREATED).json(result);
});

const login = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const result = await loginUser({ email: req.body.email, password: req.body.password });
  res.status(STATUS_OK).json(result);
});

function logout(_req: Request, res: Response): void {
  res.status(STATUS_NO_CONTENT).send();
}

const getProfile = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const user = await getUserById(getAuthenticatedUserId(req));
  res.status(STATUS_OK).json({ user });
});

const updateProfile = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const updates: UpdateUserInput = {};
  if (req.body.name !== undefined) updates.name = req.body.name;
  if (req.body.email !== undefined) updates.email = req.body.email;
  if (req.body.avatar !== undefined) updates.avatar = req.body.avatar;

  const user = await updateUserProfile(getAuthenticatedUserId(req), updates, req.body.password);
  res.status(STATUS_OK).json({ user });
});

const deleteAccount = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  await deleteUserById(getAuthenticatedUserId(req));
  res.status(STATUS_NO_CONTENT).send();
});

export { register, login, logout, getProfile, updateProfile, deleteAccount };
