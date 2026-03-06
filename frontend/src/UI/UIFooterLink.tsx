interface IUIFooterLinkProps {
  href: string;
  children: React.ReactNode;
}

function UIFooterLink({ href, children }: IUIFooterLinkProps): React.ReactElement {
  return (
    <a
      href={href}
      className="transition-colors hover:text-gray-600 dark:hover:text-gray-400"
    >
      {children}
    </a>
  );
}

export default UIFooterLink;
