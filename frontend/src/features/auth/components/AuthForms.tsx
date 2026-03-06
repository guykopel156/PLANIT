import { UIInput, UIPrimaryButton } from '../../../UI';

import type { RegisterFormState, LoginFormState, FormErrors } from '../utils/authValidation';

// --- Interfaces ---

interface RegisterFormProps {
  form: RegisterFormState;
  errors: FormErrors;
  isLoading: boolean;
  onFieldChange: (field: keyof RegisterFormState) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent) => void;
}

interface LoginFormProps {
  form: LoginFormState;
  errors: FormErrors;
  isLoading: boolean;
  onFieldChange: (field: keyof LoginFormState) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent) => void;
}

// --- Components ---

function RegisterForm({
  form,
  errors,
  isLoading,
  onFieldChange,
  onSubmit,
}: RegisterFormProps): React.ReactElement {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <UIInput
        label="Name"
        name="name"
        value={form.name}
        onChange={onFieldChange('name')}
        error={errors.name}
        placeholder="Your name"
      />
      <UIInput
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={onFieldChange('email')}
        error={errors.email}
        placeholder="you@example.com"
      />
      <UIInput
        label="Password"
        name="password"
        type="password"
        value={form.password}
        onChange={onFieldChange('password')}
        error={errors.password}
        placeholder="Choose a password"
      />
      <UIInput
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        value={form.confirmPassword}
        onChange={onFieldChange('confirmPassword')}
        error={errors.confirmPassword}
        placeholder="Confirm your password"
      />
      <UIPrimaryButton type="submit" disabled={isLoading} className="mt-2 w-full rounded-lg py-2.5">
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </UIPrimaryButton>
    </form>
  );
}

function LoginForm({
  form,
  errors,
  isLoading,
  onFieldChange,
  onSubmit,
}: LoginFormProps): React.ReactElement {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <UIInput
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={onFieldChange('email')}
        error={errors.email}
        placeholder="you@example.com"
      />
      <UIInput
        label="Password"
        name="password"
        type="password"
        value={form.password}
        onChange={onFieldChange('password')}
        error={errors.password}
        placeholder="Your password"
      />
      <UIPrimaryButton type="submit" disabled={isLoading} className="mt-2 w-full rounded-lg py-2.5">
        {isLoading ? 'Logging In...' : 'Log In'}
      </UIPrimaryButton>
    </form>
  );
}

export { RegisterForm, LoginForm };
