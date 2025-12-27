import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="ml-4 px-3 py-2 rounded-md text-sm font-medium
                 bg-gray-100 dark:bg-gray-800
                 text-gray-800 dark:text-gray-200
                 border border-gray-300 dark:border-gray-700
                 hover:opacity-80 transition"
      aria-label="Toggle theme"
    >
      {theme === "light" ? "Dark Mode" : "Light Mode"}
    </button>
  );
}
