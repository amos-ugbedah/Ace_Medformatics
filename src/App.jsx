// src/App.jsx
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageLoader from "./components/loaders/PageLoader";
import { ThemeProvider } from "./context/ThemeContext";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Team = lazy(() => import("./pages/Team"));
const Research = lazy(() => import("./pages/Research"));
const Mentorship = lazy(() => import("./pages/Mentorship"));
const Collaboration = lazy(() => import("./pages/Collaboration"));
const Programs = lazy(() => import("./pages/Programs"));
const ProgramMaterials = lazy(() => import("./pages/ProgramMaterials"));
const Contact = lazy(() => import("./pages/Contact"));

export default function App() {
  return (
    <ThemeProvider>
      {/* Global layout wrapper */}
      <div className="flex flex-col min-h-screen bg-aceLight dark:bg-black transition-colors duration-300">
        {/* Persistent Navigation */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-grow">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/team" element={<Team />} />
              <Route path="/research" element={<Research />} />
              <Route path="/mentorship" element={<Mentorship />} />
              <Route path="/collaboration" element={<Collaboration />} />
              <Route path="/programs" element={<Programs />} />
              <Route
                path="/programs/:slug/materials"
                element={<ProgramMaterials />}
              />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Suspense>
        </main>

        {/* Persistent Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
}
