// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="mt-auto text-sm transition-colors duration-300 bg-aceGreen text-aceDark font-inter">
      <div className="flex flex-col items-center justify-between gap-4 px-4 py-8 mx-auto max-w-7xl md:flex-row">
        <p className="font-medium text-center md:text-left">
          © {new Date().getFullYear()} Ace Medformatics
        </p>

        <p className="italic text-center text-gray-800 md:text-right dark:text-gray-100">
          A Legacy of Purpose and Impact
        </p>
      </div>
    </footer>
  );
}
