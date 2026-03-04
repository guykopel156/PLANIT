import { useTheme } from '../context/ThemeContext';

function Home(): React.ReactElement {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <header className="flex items-center justify-between p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">PLANIT</h1>
        <button
          onClick={toggleTheme}
          className="rounded-lg bg-gray-200 dark:bg-gray-700 p-2 text-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === "light" ? "\u{1F319}" : "\u{2600}\u{FE0F}"}
        </button>
      </header>
      <main className="flex flex-col items-center justify-center px-6 py-20">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100">PLANIT</h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Your all-in-one trip planner</p>
      </main>
    </div>
  );
}

export default Home;
