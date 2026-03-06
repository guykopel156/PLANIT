import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import AuthDialog from '../features/auth/AuthDialog';
import { useAuth } from '../context/AuthContext';
import { NavBarShell, MobileMenu } from './UINavbarParts';

interface INavbarState {
  isMobileMenuOpen: boolean;
  isAuthOpen: boolean;
}

function useNavbarHandlers(): {
  state: INavbarState;
  handleCloseMobileMenu: () => void;
  handleOpenAuth: () => void;
  handleCloseAuth: () => void;
  handleLogout: () => void;
  handleToggleMobileMenu: () => void;
} {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  return {
    state: { isMobileMenuOpen, isAuthOpen },
    handleCloseMobileMenu: (): void => setIsMobileMenuOpen(false),
    handleOpenAuth: (): void => setIsAuthOpen(true),
    handleCloseAuth: (): void => setIsAuthOpen(false),
    handleLogout: (): void => {
      auth.logout();
      toast.success('Logged out successfully');
      navigate('/');
    },
    handleToggleMobileMenu: (): void =>
      setIsMobileMenuOpen((previous) => !previous),
  };
}

function UINavbar(): React.ReactElement {
  const auth = useAuth();
  const {
    state,
    handleCloseMobileMenu,
    handleOpenAuth,
    handleCloseAuth,
    handleLogout,
    handleToggleMobileMenu,
  } = useNavbarHandlers();
  const userName = auth.user?.name ?? '';

  return (
    <>
      <NavBarShell
        isAuthenticated={auth.isAuthenticated}
        userName={userName}
        isMobileMenuOpen={state.isMobileMenuOpen}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        onToggleMobileMenu={handleToggleMobileMenu}
      />
      <MobileMenu
        isOpen={state.isMobileMenuOpen}
        isAuthenticated={auth.isAuthenticated}
        userName={userName}
        onClose={handleCloseMobileMenu}
        onSignUp={handleOpenAuth}
        onLogout={handleLogout}
      />
      <AuthDialog isOpen={state.isAuthOpen} onClose={handleCloseAuth} />
    </>
  );
}

export default UINavbar;
