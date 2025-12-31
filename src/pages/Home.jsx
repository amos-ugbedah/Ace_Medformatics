import Hero from "../components/Hero";
import TeamPreview from "../sections/TeamPreview";
import LogoScroller from "../sections/LogoScroller";
import TestimonialsPreview from "../sections/TestimonialsPreview";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <Hero />

      {/* TEAM PREVIEW */}
      <section className="py-16 transition-colors bg-aceLight dark:bg-gray-900">
        <div className="px-4 mx-auto max-w-7xl">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl">
            <TeamPreview />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <TestimonialsPreview />

      {/* LOGO SCROLLER */}
      <section className="py-16 transition-colors bg-aceBeige dark:bg-gray-900">
        <div className="px-4 mx-auto max-w-7xl">
          <div className="p-6 bg-white shadow-sm dark:bg-gray-800 rounded-xl">
            <LogoScroller />
          </div>
        </div>
      </section>
    </>
  );
}
