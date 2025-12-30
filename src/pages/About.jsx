// src/pages/About.jsx
import { useState, useEffect } from "react";
import SectionCard from "../components/SectionCard";
import Lightbox from "../components/Lightbox";
import { supabase } from "../lib/supabaseClient";

export default function About() {
  const [aboutContent, setAboutContent] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    async function fetchAbout() {
      const { data: sections } = await supabase
        .from("about_sections")
        .select("*")
        .order("order_index", { ascending: true });

      const { data: images } = await supabase
        .from("about_gallery")
        .select("url, alt")
        .order("display_order", { ascending: true });

      setAboutContent(sections || []);
      setGalleryImages(images || []);
    }
    fetchAbout();
  }, []);

  return (
    <div className="min-h-screen px-4 py-16 transition-colors bg-aceLight dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="mb-12 text-4xl font-bold text-center md:text-5xl text-acePurple">
          About Ace Medformatics
        </h1>

        {aboutContent.map((section) => (
          <SectionCard key={section.id} title={section.title}>
            {section.type === "list" ? (
              <ul className="space-y-3 leading-relaxed text-gray-700 list-disc list-inside dark:text-gray-200">
                {section.items?.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="leading-relaxed text-gray-700 dark:text-gray-200">
                {section.content}
              </p>
            )}
          </SectionCard>
        ))}

        {/* Gallery */}
        <section className="mt-24">
          <h2 className="mb-10 text-2xl font-semibold text-center text-acePurple">
            Our Journey in Pictures
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
            {galleryImages.map((img, index) => (
              <img
                key={index}
                src={img.url}
                alt={img.alt || `Ace Medformatics ${index + 1}`}
                loading="lazy"
                onClick={() => setSelectedIndex(index)}
                className="object-cover w-full h-48 transition-transform rounded-lg shadow-md cursor-pointer hover:scale-105"
              />
            ))}
          </div>
        </section>

        <Lightbox
          images={galleryImages}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
      </div>
    </div>
  );
}
