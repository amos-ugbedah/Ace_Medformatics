// src/App.jsx - CORRECTED
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageLoader from "./components/loaders/PageLoader";
import { ThemeProvider } from "./context/ThemeContext";
import AdminRoute from "./components/AdminRoute";

/* ============================
   PUBLIC PAGES (LAZY LOADED)
============================ */
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Team = lazy(() => import("./pages/Team"));
const Research = lazy(() => import("./pages/Research"));
const Mentorship = lazy(() => import("./pages/Mentorship"));
const MentorshipApply = lazy(() => import("./pages/MentorshipApply"));
const Collaboration = lazy(() => import("./pages/Collaboration"));
const Programs = lazy(() => import("./pages/Programs"));
const ProgramMaterials = lazy(() => import("./pages/ProgramMaterials"));
const Contact = lazy(() => import("./pages/Contact"));
const Media = lazy(() => import("./pages/Media"));

/* Testimonials */
const Testimonials = lazy(() => import("./pages/Testimonials"));
const TestimonialsSubmit = lazy(() =>
  import("./pages/testimonials/TestimonialsSubmit")
);

/* ============================
   ADMIN PAGES - FIXED IMPORTS
============================ */
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard")); // ✅ Correct: Dashboard.jsx

export default function App() {
  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen transition-colors duration-300 font-inter bg-aceLight dark:bg-black">
        <Navbar />

        <main className="flex-grow">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* =====================
                  PUBLIC ROUTES
              ====================== */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/team" element={<Team />} />
              <Route path="/research" element={<Research />} />
              <Route path="/mentorship" element={<Mentorship />} />
              <Route path="/mentorship/apply" element={<MentorshipApply />} />
              <Route path="/collaboration" element={<Collaboration />} />
              <Route path="/programs" element={<Programs />} />
              <Route
                path="/programs/:slug/materials"
                element={<ProgramMaterials />}
              />
              <Route path="/media" element={<Media />} />
              <Route path="/contact" element={<Contact />} />

              {/* =====================
                  TESTIMONIALS ROUTES
              ====================== */}
              <Route path="/testimonials" element={<Testimonials />} />
              <Route
                path="/testimonials/submit"
                element={<TestimonialsSubmit />}
              />

              {/* =====================
                  ADMIN ROUTES - SIMPLE
              ====================== */}
              <Route path="/admin/login" element={<AdminLogin />} />
              
              {/* ✅ CORRECT: Simple /admin/dashboard route */}
              <Route 
                path="/admin/dashboard" 
                element={
                  <AdminRoute>
                    <Dashboard />
                  </AdminRoute>
                } 
              />
              
              {/* Catch-all for admin 404 */}
              <Route path="/admin/*" element={
                <div className="flex items-center justify-center min-h-screen p-4">
                  <div className="max-w-md text-center">
                    <h1 className="mb-4 text-6xl font-bold text-gray-800 dark:text-white">404</h1>
                    <p className="mb-6 text-xl text-gray-600 dark:text-gray-300">
                      Admin page not found
                    </p>
                    <div className="space-y-3">
                      <a 
                        href="/admin/dashboard" 
                        className="block w-full px-6 py-3 text-white transition-colors bg-black rounded-lg hover:bg-gray-800"
                      >
                        Go to Admin Dashboard
                      </a>
                      <a 
                        href="/admin/login" 
                        className="block w-full px-6 py-3 text-gray-700 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        Go to Admin Login
                      </a>
                    </div>
                  </div>
                </div>
              } />
              
              {/* Global 404 */}
              <Route path="*" element={
                <div className="flex items-center justify-center min-h-screen p-4">
                  <div className="max-w-md text-center">
                    <h1 className="mb-4 text-6xl font-bold text-gray-800 dark:text-white">404</h1>
                    <p className="mb-6 text-xl text-gray-600 dark:text-gray-300">
                      Page not found
                    </p>
                    <a 
                      href="/" 
                      className="inline-block px-6 py-3 text-white transition-colors bg-black rounded-lg hover:bg-gray-800"
                    >
                      Return to Homepage
                    </a>
                  </div>
                </div>
              } />
            </Routes>
          </Suspense>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}