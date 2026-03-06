import { AxiosError } from 'axios';

// --- Types ---

type AuthMode = 'register' | 'login';

interface RegisterFormState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface LoginFormState {
  email: string;
  password: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  server?: string;
}

interface ServerErrorResponse {
  error?: { code?: string; message?: string; details?: string[] };
}

// --- Constants ---

const INITIAL_REGISTER_STATE: RegisterFormState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const INITIAL_LOGIN_STATE: LoginFormState = {
  email: '',
  password: '',
};

// --- Type Guards ---

function isServerErrorResponse(value: unknown): value is ServerErrorResponse {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  if (!('error' in candidate)) {
    return true;
  }

  if (typeof candidate.error !== 'object' || candidate.error === null) {
    return false;
  }

  const errorObject = candidate.error as Record<string, unknown>;
  const hasValidCode = !('code' in errorObject) || typeof errorObject.code === 'string';
  const hasValidMessage = !('message' in errorObject) || typeof errorObject.message === 'string';

  return hasValidCode && hasValidMessage;
}

// --- Validation Functions ---

function parseServerError(error: Error): string {
  if (error instanceof AxiosError && error.response) {
    const data: unknown = error.response.data;

    if (isServerErrorResponse(data)) {
      return data?.error?.message ?? error.message;
    }

    return error.message;
  }

  return error.message;
}

function validateRegisterForm(form: RegisterFormState): FormErrors {
  const errors: FormErrors = {};

  if (!form.name.trim()) {
    errors.name = 'Name is required';
  }

  if (!form.email.trim()) {
    errors.email = 'Email is required';
  }

  if (!form.password) {
    errors.password = 'Password is required';
  }

  if (form.password !== form.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
}

function validateLoginForm(form: LoginFormState): FormErrors {
  const errors: FormErrors = {};

  if (!form.email.trim()) {
    errors.email = 'Email is required';
  }

  if (!form.password) {
    errors.password = 'Password is required';
  }

  return errors;
}

function hasValidationErrors(errors: FormErrors): boolean {
  return Object.keys(errors).length > 0;
}

export type { AuthMode, RegisterFormState, LoginFormState, FormErrors };
export {
  INITIAL_REGISTER_STATE,
  INITIAL_LOGIN_STATE,
  isServerErrorResponse,
  parseServerError,
  validateRegisterForm,
  validateLoginForm,
  hasValidationErrors,
};
