// src/pages/About.jsx
import { useState, useEffect } from "react";
import SectionCard from "../components/SectionCard";
import Lightbox from "../components/Lightbox";
import { supabase } from "../lib/supabaseClient";

export default function About() {
  const [aboutContent, setAboutContent] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Fetch About content & gallery from Supabase
  useEffect(() => {
    async function fetchAbout() {
      try {
        // Fetch sections text
        const { data: sections, error: sectionError } = await supabase
          .from("about_sections")
          .select("*")
          .order("order_index", { ascending: true });

        if (sectionError) console.error(sectionError);
        else setAboutContent(sections);

        // Fetch gallery images
        const { data: images, error: imgError } = await supabase
          .from("about_gallery")
          .select("url, alt")
          .order("display_order", { ascending: true });

        if (imgError) console.error(imgError);
        else setGalleryImages(images);
      } catch (err) {
        console.error(err);
      }
    }
    fetchAbout();
  }, []);

  return (
    <div className="bg-aceLight min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-acePurple mb-10 text-center">
          About Ace Medformatics
        </h1>

        {aboutContent.map((section, idx) => (
          <SectionCard key={idx} title={section.title}>
            {section.type === "list" ? (
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {section.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-700 leading-relaxed">{section.content}</p>
            )}
          </SectionCard>
        ))}

        {/* Gallery */}
        <section className="mt-20">
          <h2 className="text-2xl font-semibold text-acePurple mb-8 text-center">
            Our Journey in Pictures
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {galleryImages.map((img, index) => (
              <img
                key={index}
                src={img.url}
                alt={img.alt || `Ace Medformatics ${index + 1}`}
                loading="lazy"
                onClick={() => setSelectedIndex(index)}
                className="w-full h-48 object-cover rounded-lg shadow-md cursor-pointer hover:scale-105 transition-transform"
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
