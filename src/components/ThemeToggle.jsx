import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-2 ml-4 text-sm font-medium text-gray-800 transition-colors duration-300 bg-gray-100 border border-gray-300 rounded-md font-inter dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 hover:opacity-80"
      aria-label="Toggle theme"
    >
      {theme === "light" ? "Dark Mode" : "Light Mode"}
    </button>
  );
}
