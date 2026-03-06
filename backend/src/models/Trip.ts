import mongoose, { Schema } from 'mongoose';

import {
  VALID_TRIP_STATUSES,
  VALID_TRANSPORT_MODES,
  VALID_TRAVEL_STYLES,
  VALID_PACES,
  VALID_ACCOMMODATION_TYPES,
  VALID_DIETARY_PREFERENCES,
  MIN_COMPLETION,
  MAX_COMPLETION,
  DEFAULT_DAILY_START_HOUR,
  DEFAULT_DAILY_END_HOUR,
  DEFAULT_CURRENCY,
  DEFAULT_LANGUAGE,
  DEFAULT_TRAVELER_COUNT,
  DEFAULT_RESTAURANTS_PER_DAY,
  DEFAULT_ATTRACTIONS_PER_DAY,
} from '../constants/trip';

import type { TripDocument } from '../types/trip';

const collaboratorSchema = new Schema(
  {
    userId: {
      type: String,
      required: [true, 'Collaborator userId is required'],
    },
    name: {
      type: String,
      required: [true, 'Collaborator name is required'],
      trim: true,
    },
    avatar: {
      type: String,
    },
  },
  { _id: false },
);

const tripSchema = new Schema<TripDocument>(
  {
    userId: {
      type: String,
      required: [true, 'User ID is required'],
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Trip name is required'],
      trim: true,
    },
    destination: {
      type: String,
      required: [true, 'Destination is required'],
      trim: true,
    },
    origin: {
      type: String,
      trim: true,
      default: '',
    },
    cities: {
      type: [String],
      default: [],
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    endDate: {
      type: Date,
      required: [true, 'End date is required'],
    },
    dailyStartHour: {
      type: String,
      default: DEFAULT_DAILY_START_HOUR,
    },
    dailyEndHour: {
      type: String,
      default: DEFAULT_DAILY_END_HOUR,
    },
    status: {
      type: String,
      enum: [...VALID_TRIP_STATUSES],
      default: 'draft',
    },
    isStarted: {
      type: Boolean,
      default: false,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    budgetMin: {
      type: Number,
      default: 0,
    },
    budgetMax: {
      type: Number,
      default: 0,
    },
    currency: {
      type: String,
      default: DEFAULT_CURRENCY,
      trim: true,
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
    pricePerDay: {
      type: Number,
      default: 0,
    },
    travelerCount: {
      type: Number,
      default: DEFAULT_TRAVELER_COUNT,
    },
    childrenCount: {
      type: Number,
      default: 0,
    },
    collaborators: {
      type: [collaboratorSchema],
      default: [],
    },
    travelStyle: {
      type: String,
      enum: [...VALID_TRAVEL_STYLES],
      default: 'moderate',
    },
    pace: {
      type: String,
      enum: [...VALID_PACES],
      default: 'moderate',
    },
    interests: {
      type: [String],
      default: [],
    },
    dietaryPreferences: {
      type: [String],
      enum: [...VALID_DIETARY_PREFERENCES],
      default: [],
    },
    accessibilityNeeds: {
      type: [String],
      default: [],
    },
    isKidFriendly: {
      type: Boolean,
      default: false,
    },
    transportMode: {
      type: String,
      enum: [...VALID_TRANSPORT_MODES],
      default: 'mixed',
    },
    accommodationType: {
      type: String,
      enum: [...VALID_ACCOMMODATION_TYPES],
      default: 'hotel',
    },
    restaurantsPerDay: {
      type: Number,
      default: DEFAULT_RESTAURANTS_PER_DAY,
    },
    attractionsPerDay: {
      type: Number,
      default: DEFAULT_ATTRACTIONS_PER_DAY,
    },
    coverImages: {
      type: [String],
      default: [],
    },
    thumbnailGradient: {
      type: String,
      default: '',
    },
    tags: {
      type: [String],
      default: [],
    },
    notes: {
      type: String,
      default: '',
    },
    language: {
      type: String,
      default: DEFAULT_LANGUAGE,
      trim: true,
    },
    completionPercentage: {
      type: Number,
      default: 0,
      min: [MIN_COMPLETION, `Completion percentage must be at least ${MIN_COMPLETION}`],
      max: [MAX_COMPLETION, `Completion percentage must be at most ${MAX_COMPLETION}`],
    },
    itinerary: {
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc: unknown, ret: Record<string, unknown>): Record<string, unknown> {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  },
);

const Trip = mongoose.model<TripDocument>('Trip', tripSchema);

export default Trip;
export type { TripDocument };
