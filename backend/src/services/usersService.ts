import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import env from '../config/env';
import User from '../models/User';
import { AppError, HTTP_CONFLICT, HTTP_NOT_FOUND, HTTP_UNAUTHORIZED } from '../utils/appError';

import type { AuthPayload, CreateUserInput, LoginInput, UpdateUserInput, UserResponse } from '../types/user';

const BCRYPT_COST_FACTOR = 12;
const ACCESS_TOKEN_EXPIRY = '15m';
const DUPLICATE_EMAIL_CODE = 'EMAIL_ALREADY_EXISTS';
const INVALID_CREDENTIALS_CODE = 'INVALID_CREDENTIALS';
const USER_NOT_FOUND_CODE = 'USER_NOT_FOUND';
const USER_NOT_FOUND_MESSAGE = 'User not found';

function isAuthPayload(value: unknown): value is AuthPayload {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return typeof candidate.userId === 'string' && typeof candidate.email === 'string';
}

function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, BCRYPT_COST_FACTOR);
}

function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

function generateAccessToken(payload: AuthPayload): string {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
}

function verifyAccessToken(token: string): AuthPayload {
  const decoded: unknown = jwt.verify(token, env.JWT_SECRET);

  if (!isAuthPayload(decoded)) {
    throw new AppError('Invalid token payload', HTTP_UNAUTHORIZED, 'INVALID_TOKEN');
  }

  return decoded;
}

function sanitizeUser(user: { _id: unknown; name: string; email: string; avatar?: string; createdAt: Date; updatedAt: Date }): UserResponse {
  return {
    id: String(user._id),
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

async function registerUser(input: CreateUserInput): Promise<{ user: UserResponse; accessToken: string }> {
  const existingUser = await User.findOne({ email: input.email }).lean();
  if (existingUser) {
    throw new AppError('A user with this email already exists', HTTP_CONFLICT, DUPLICATE_EMAIL_CODE);
  }

  const password = await hashPassword(input.password);
  const user = await User.create({
    name: input.name,
    email: input.email,
    password,
  });

  const payload: AuthPayload = { userId: String(user._id), email: user.email };
  const accessToken = generateAccessToken(payload);

  return {
    user: sanitizeUser(user),
    accessToken,
  };
}

async function loginUser(input: LoginInput): Promise<{ user: UserResponse; accessToken: string }> {
  const user = await User.findOne({ email: input.email }).select('+password');
  if (!user) {
    throw new AppError('Invalid email or password', HTTP_UNAUTHORIZED, INVALID_CREDENTIALS_CODE);
  }

  const isPasswordValid = await comparePassword(input.password, user.password);
  if (!isPasswordValid) {
    throw new AppError('Invalid email or password', HTTP_UNAUTHORIZED, INVALID_CREDENTIALS_CODE);
  }

  const payload: AuthPayload = { userId: String(user._id), email: user.email };
  const accessToken = generateAccessToken(payload);

  return {
    user: sanitizeUser(user),
    accessToken,
  };
}

async function getUserById(userId: string): Promise<UserResponse> {
  const user = await User.findById(userId).lean();
  if (!user) {
    throw new AppError(USER_NOT_FOUND_MESSAGE, HTTP_NOT_FOUND, USER_NOT_FOUND_CODE);
  }

  return sanitizeUser(user);
}

async function updateUserProfile(userId: string, updates: UpdateUserInput, newPassword?: string): Promise<UserResponse> {
  const updateFields: Record<string, unknown> = { ...updates };

  if (newPassword !== undefined) {
    updateFields.password = await hashPassword(newPassword);
  }

  const user = await User.findByIdAndUpdate(userId, updateFields, { new: true }).lean();
  if (!user) {
    throw new AppError(USER_NOT_FOUND_MESSAGE, HTTP_NOT_FOUND, USER_NOT_FOUND_CODE);
  }

  return sanitizeUser(user);
}

async function deleteUserById(userId: string): Promise<void> {
  const user = await User.findByIdAndDelete(userId);
  if (!user) {
    throw new AppError(USER_NOT_FOUND_MESSAGE, HTTP_NOT_FOUND, USER_NOT_FOUND_CODE);
  }
}

export {
  hashPassword,
  comparePassword,
  generateAccessToken,
  verifyAccessToken,
  sanitizeUser,
  registerUser,
  loginUser,
  getUserById,
  updateUserProfile,
  deleteUserById,
};
