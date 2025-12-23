export default function Footer() {
  return (
    <footer className="bg-aceGreen text-aceDark text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-medium">
          © {new Date().getFullYear()} Ace Medformatics
        </p>

        <p className="italic text-center">
          A Legacy of Purpose and Impact
        </p>
      </div>
    </footer>
  );
}
