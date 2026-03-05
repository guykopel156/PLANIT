import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import UINavLink from './UINavLink';
import UIPrimaryButton from './UIPrimaryButton';
import UIIconButton from './UIIconButton';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/trips', label: 'Trips' },
  { to: '/explore', label: 'Explore' },
] as const;

function AirplaneIcon(): React.ReactElement {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
    </svg>
  );
}

function ThemeToggle(): React.ReactElement {
  const { theme, toggleTheme } = useTheme();

  return (
    <UIIconButton
      ariaLabel={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={toggleTheme}
      className="bg-transparent hover:bg-white/10"
    >
      {theme === 'dark' ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
    </UIIconButton>
  );
}

function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }): React.ReactElement | null {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-x-0 top-20 z-40 mx-4 rounded-2xl border border-white/10 bg-gray-950/95 p-4 shadow-2xl backdrop-blur-xl md:hidden">
      <div className="flex flex-col gap-3">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            onClick={onClose}
            className="rounded-xl px-4 py-3 text-base font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
          >
            {link.label}
          </Link>
        ))}
        <hr className="border-white/10" />
        <Link to="/trips" onClick={onClose}>
          <UIPrimaryButton className="w-full rounded-xl px-4 py-3">Sign Up</UIPrimaryButton>
        </Link>
      </div>
    </div>
  );
}

function UINavbar(): React.ReactElement {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleCloseMobileMenu = (): void => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-4 right-0 left-0 z-50 flex justify-center px-4">
        <div className="flex items-center gap-1 rounded-full border border-white/10 bg-gray-950/90 px-2 py-1.5 shadow-2xl shadow-black/20 backdrop-blur-xl sm:gap-2 sm:px-3">
          <Link
            to="/"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-950 transition-transform hover:scale-105"
          >
            <AirplaneIcon />
          </Link>

          <div className="hidden items-center gap-1 px-2 md:flex">
            {NAV_LINKS.map((link) => (
              <UINavLink
                key={link.to}
                to={link.to}
                className="rounded-full px-4 py-1.5 text-gray-300 hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </UINavLink>
            ))}
          </div>

          <div className="hidden items-center gap-1 md:flex">
            <ThemeToggle />
            <Link to="/trips">
              <UIPrimaryButton className="rounded-full px-5 py-1.5 text-sm font-semibold">
                Sign Up
              </UIPrimaryButton>
            </Link>
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <UIIconButton
              ariaLabel={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="bg-transparent hover:bg-white/10"
            >
              {isMobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </UIIconButton>
          </div>
        </div>
      </nav>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={handleCloseMobileMenu} />
    </>
  );
}

export default UINavbar;
