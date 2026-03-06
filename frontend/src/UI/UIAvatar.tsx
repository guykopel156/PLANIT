interface IUIAvatarProps {
  name: string;
  imageUrl?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZE_CLASSES: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function UIAvatar({ name, imageUrl, size = 'md', className = '' }: IUIAvatarProps): React.ReactElement {
  const sizeClass = SIZE_CLASSES[size];

  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={name}
        className={`inline-block rounded-full object-cover ${sizeClass} ${className}`}
      />
    );
  }

  return (
    <div
      className={`inline-flex items-center justify-center rounded-full bg-blue-100 font-medium text-blue-700 dark:bg-blue-900 dark:text-blue-300 ${sizeClass} ${className}`}
    >
      {getInitials(name)}
    </div>
  );
}

export default UIAvatar;
