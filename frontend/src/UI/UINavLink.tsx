import { NavLink } from 'react-router-dom';

interface IUINavLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

function UINavLink({
  to,
  children,
  className = '',
  onClick,
}: IUINavLinkProps): React.ReactElement {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `text-sm font-medium transition-colors ${
          isActive
            ? 'text-blue-600 dark:text-blue-400'
            : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
        } ${className}`
      }
    >
      {children}
    </NavLink>
  );
}

export default UINavLink;
