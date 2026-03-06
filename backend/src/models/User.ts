import mongoose, { Schema } from 'mongoose';

import { NAME_MIN_LENGTH, NAME_MAX_LENGTH } from '../constants/validation';

import type { UserDocument } from '../types/user';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [
        NAME_MIN_LENGTH,
        `Name must be at least ${NAME_MIN_LENGTH} characters`,
      ],
      maxlength: [
        NAME_MAX_LENGTH,
        `Name must be at most ${NAME_MAX_LENGTH} characters`,
      ],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (value: string): boolean => EMAIL_REGEX.test(value),
        message: 'Invalid email format',
      },
      index: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
    },
    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc: unknown, ret: Record<string, unknown>): Record<string, unknown> {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        return ret;
      },
    },
  },
);

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;
export type { UserDocument };
