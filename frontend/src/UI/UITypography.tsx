type TypographyVariant =
  | 'header'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'p'
  | 'span'
  | 'errorHeader'
  | 'successHeader'
  | 'errorText'
  | 'successText';

interface UITypographyProps {
  variant: TypographyVariant;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

type TypographyElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p' | 'span';

interface VariantConfig {
  element: TypographyElement;
  baseClasses: string;
}

const VARIANT_MAP: Record<TypographyVariant, VariantConfig> = {
  header: { element: 'h1', baseClasses: 'text-4xl font-bold' },
  h1: { element: 'h1', baseClasses: 'text-3xl font-bold' },
  h2: { element: 'h2', baseClasses: 'text-2xl font-bold' },
  h3: { element: 'h3', baseClasses: 'text-xl font-semibold' },
  h4: { element: 'h4', baseClasses: 'text-lg font-semibold' },
  h5: { element: 'h5', baseClasses: 'text-base font-semibold' },
  p: { element: 'p', baseClasses: 'text-base' },
  span: { element: 'span', baseClasses: '' },
  errorHeader: {
    element: 'h2',
    baseClasses: 'text-2xl font-bold text-red-600 dark:text-red-400',
  },
  successHeader: {
    element: 'h2',
    baseClasses: 'text-2xl font-bold text-green-600 dark:text-green-400',
  },
  errorText: {
    element: 'p',
    baseClasses: 'text-sm text-red-600 dark:text-red-400',
  },
  successText: {
    element: 'p',
    baseClasses: 'text-sm text-green-600 dark:text-green-400',
  },
};

function UITypography({
  variant,
  children,
  className = '',
  style,
}: UITypographyProps): React.ReactElement {
  const { element: Element, baseClasses } = VARIANT_MAP[variant];
  const combinedClasses = className
    ? `${baseClasses} ${className}`
    : baseClasses;

  return (
    <Element className={combinedClasses} style={style}>
      {children}
    </Element>
  );
}

export default UITypography;
