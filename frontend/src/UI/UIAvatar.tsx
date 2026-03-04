interface IUIAvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZE_CLASSES: Record<string, string> = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-lg',
};

const BG_COLORS = [
  'bg-blue-500 dark:bg-blue-600',
  'bg-green-500 dark:bg-green-600',
  'bg-purple-500 dark:bg-purple-600',
  'bg-orange-500 dark:bg-orange-600',
  'bg-pink-500 dark:bg-pink-600',
  'bg-teal-500 dark:bg-teal-600',
];

function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

function getColorFromName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return BG_COLORS[Math.abs(hash) % BG_COLORS.length];
}

function UIAvatar({ name, size = 'md', className = '' }: IUIAvatarProps): React.ReactElement {
  return (
    <div
      className={`inline-flex items-center justify-center rounded-full font-medium text-white ${SIZE_CLASSES[size]} ${getColorFromName(name)} ${className}`}
      title={name}
    >
      {getInitials(name)}
    </div>
  );
}

export default UIAvatar;
