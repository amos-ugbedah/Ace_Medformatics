// Updated App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
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
   ADMIN PAGES
============================ */
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const DashboardAdmin = lazy(() => import("./pages/admin/DashboardAdmin"));
const MentorshipAdmin = lazy(() => import("./pages/admin/MentorshipAdmin"));
const MenteesAdmin = lazy(() => import("./pages/admin/MenteesAdmin"));
const ProgramsAdmin = lazy(() => import("./pages/admin/ProgramsAdmin"));
const TeamAdmin = lazy(() => import("./pages/admin/TeamAdmin"));
const ContactMessagesAdmin = lazy(() =>
  import("./pages/admin/ContactMessagesAdmin")
);
const TestimonialsAdmin = lazy(() =>
  import("./pages/admin/TestimonialsAdmin")
);
const AdminMediaPage = lazy(() => import("./pages/admin/AdminMediaPage"));
const ResearchAdmin = lazy(() => import("./pages/admin/ResearchAdmin"));
const GeneralSettings = lazy(() => import("./pages/admin/GeneralSettings"));
const AdminReviewsPage = lazy(() => import("./pages/admin/AdminReviewsPage"));

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
                  ADMIN ROUTES
              ====================== */}
              <Route path="/admin/login" element={<AdminLogin />} />
              
              {/* Redirect /admin/dashboard to /admin/dashboard/mentorship */}
              <Route path="/admin/dashboard" element={
                <Navigate to="/admin/dashboard/mentorship" replace />
              } />
              
              {/* Nested admin dashboard routes */}
              <Route
                path="/admin/dashboard/*"
                element={
                  <AdminRoute>
                    <DashboardAdmin />
                  </AdminRoute>
                }
              >
                <Route index element={<Navigate to="mentorship" replace />} />
                <Route path="mentorship" element={<MentorshipAdmin />} />
                <Route path="mentees" element={<MenteesAdmin />} />
                <Route path="programs" element={<ProgramsAdmin />} />
                <Route path="media" element={<AdminMediaPage />} />
                <Route path="team" element={<TeamAdmin />} />
                <Route path="contact-messages" element={<ContactMessagesAdmin />} />
                <Route path="testimonials" element={<TestimonialsAdmin />} />
                <Route path="research" element={<ResearchAdmin />} />
                <Route path="reviews" element={<AdminReviewsPage />} />
                <Route path="settings" element={<GeneralSettings />} />
              </Route>
            </Routes>
          </Suspense>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}