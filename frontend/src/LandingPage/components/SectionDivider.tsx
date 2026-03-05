import { useTheme } from '../../context/ThemeContext';

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
          ? `linear-gradient(to bottom, #030712, ${darkMidColor}, #030712)`
          : `linear-gradient(to bottom, #ffffff, ${lightMidColor}, #ffffff)`,
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
