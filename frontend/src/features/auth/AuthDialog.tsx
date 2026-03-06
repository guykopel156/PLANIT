import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import { useAuth } from '../../context/AuthContext';
import { useCreateUser } from './hooks/useCreateUser';
import { useLoginUser } from './hooks/useLoginUser';
import { RegisterForm, LoginForm } from './components/AuthForms';
import { UIBox, UIDialog, UITextButton, UITypography } from '../../UI';

import type { User } from '../../types/user';
import type { AuthMode, RegisterFormState, LoginFormState, FormErrors } from './utils/authValidation';
import {
  INITIAL_REGISTER_STATE,
  INITIAL_LOGIN_STATE,
  parseServerError,
  validateRegisterForm,
  validateLoginForm,
  hasValidationErrors,
} from './utils/authValidation';

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AuthSuccessData {
  user: User;
  accessToken: string;
}

function AuthDialog({ isOpen, onClose }: AuthDialogProps): React.ReactElement {
  const [mode, setMode] = useState<AuthMode>('register');
  const [registerForm, setRegisterForm] = useState<RegisterFormState>(INITIAL_REGISTER_STATE);
  const [loginForm, setLoginForm] = useState<LoginFormState>(INITIAL_LOGIN_STATE);
  const [errors, setErrors] = useState<FormErrors>({});
  const auth = useAuth();
  const navigate = useNavigate();
  const createUser = useCreateUser();
  const loginUser = useLoginUser();
  const isLoading = createUser.isPending || loginUser.isPending;
  const isRegister = mode === 'register';

  const handleClose = (): void => {
    setRegisterForm(INITIAL_REGISTER_STATE);
    setLoginForm(INITIAL_LOGIN_STATE);
    setErrors({});
    onClose();
  };

  const handleSwitchMode = (): void => {
    setMode((previous) => (previous === 'register' ? 'login' : 'register'));
    setErrors({});
  };

  const handleAuthSuccess = (data: AuthSuccessData, message: string): void => {
    auth.login(data.user, data.accessToken);
    toast.success(message);
    handleClose();
    navigate('/app');
  };

  const handleAuthError = (error: Error): void => {
    const message = parseServerError(error);
    setErrors({ server: message });
    toast.error(message);
  };

  const handleRegisterChange = (field: keyof RegisterFormState): (event: React.ChangeEvent<HTMLInputElement>) => void => {
    return (event: React.ChangeEvent<HTMLInputElement>): void => {
      setRegisterForm((previous) => ({ ...previous, [field]: event.target.value }));
      setErrors((previous) => ({ ...previous, [field]: undefined, server: undefined }));
    };
  };

  const handleLoginChange = (field: keyof LoginFormState): (event: React.ChangeEvent<HTMLInputElement>) => void => {
    return (event: React.ChangeEvent<HTMLInputElement>): void => {
      setLoginForm((previous) => ({ ...previous, [field]: event.target.value }));
      setErrors((previous) => ({ ...previous, [field]: undefined, server: undefined }));
    };
  };

  const handleRegisterSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    const validationErrors = validateRegisterForm(registerForm);
    if (hasValidationErrors(validationErrors)) { setErrors(validationErrors); return; }
    createUser.mutate(
      { name: registerForm.name, email: registerForm.email, password: registerForm.password },
      { onSuccess: (data) => handleAuthSuccess(data, 'Account created successfully!'), onError: handleAuthError },
    );
  };

  const handleLoginSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    const validationErrors = validateLoginForm(loginForm);
    if (hasValidationErrors(validationErrors)) { setErrors(validationErrors); return; }
    loginUser.mutate(
      { email: loginForm.email, password: loginForm.password },
      { onSuccess: (data) => handleAuthSuccess(data, 'Welcome back!'), onError: handleAuthError },
    );
  };

  return (
    <UIDialog isOpen={isOpen} onClose={handleClose}>
      <UIBox className="flex flex-col gap-6">
        <UIBox className="text-center">
          <UITypography variant="h2" className="text-gray-900 dark:text-white">
            {isRegister ? 'Create Account' : 'Welcome Back'}
          </UITypography>
          <UITypography variant="p" className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {isRegister ? 'Start planning your next adventure' : 'Log in to continue planning'}
          </UITypography>
        </UIBox>

        {errors.server && (
          <UIBox className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
            {errors.server}
          </UIBox>
        )}

        {isRegister ? (
          <RegisterForm
            form={registerForm} errors={errors} isLoading={isLoading}
            onFieldChange={handleRegisterChange} onSubmit={handleRegisterSubmit}
          />
        ) : (
          <LoginForm
            form={loginForm} errors={errors} isLoading={isLoading}
            onFieldChange={handleLoginChange} onSubmit={handleLoginSubmit}
          />
        )}

        <UITypography variant="p" className="text-center text-sm text-gray-500 dark:text-gray-400">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <UITextButton onClick={handleSwitchMode}>
            {isRegister ? 'Log In' : 'Sign Up'}
          </UITextButton>
        </UITypography>
      </UIBox>
    </UIDialog>
  );
}

export default AuthDialog;
