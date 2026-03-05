import { useTheme } from '../../context/ThemeContext';

const DARK_BASE_COLOR = '#030712';
const LIGHT_BASE_COLOR = '#ffffff';

interface ISectionDividerProps {
  darkMidColor: string;
  lightMidColor: string;
  accentColor: string;
  darkAccentOpacity?: string;
  lightAccentOpacity?: string;
}

function SectionDivider({
  darkMidColor,
  lightMidColor,
  accentColor,
  darkAccentOpacity = '0.06',
  lightAccentOpacity = '0.04',
}: ISectionDividerProps): React.ReactElement {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div
      className="relative h-40 sm:h-56"
      style={{
        background: isDark
          ? `linear-gradient(to bottom, ${DARK_BASE_COLOR}, ${darkMidColor}, ${DARK_BASE_COLOR})`
          : `linear-gradient(to bottom, ${LIGHT_BASE_COLOR}, ${lightMidColor}, ${LIGHT_BASE_COLOR})`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `linear-gradient(to right, transparent, ${accentColor}/${isDark ? darkAccentOpacity : lightAccentOpacity}, transparent)`,
        }}
      />
    </div>
  );
}

export default SectionDivider;
