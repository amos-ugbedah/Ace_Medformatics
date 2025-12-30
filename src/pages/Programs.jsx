import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { usePrograms } from "../hooks/usePrograms";
import { useProgramCategories } from "../hooks/useProgramCategories";
import ProgramReviewSubmit from "../components/ProgramReviewSubmit";

export default function Programs() {
  const { programs, loading, error } = usePrograms();
  const { categories } = useProgramCategories();
  const [selectedProgramId, setSelectedProgramId] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  if (loading)
    return (
      <p className="py-24 text-center text-gray-500 dark:text-gray-400 font-inter">
        Loading programs...
      </p>
    );

  if (error)
    return (
      <p className="py-24 text-center text-red-500 font-inter">
        Error loading programs. Please try again later.
      </p>
    );

  const getCategoryName = (categoryId) => {
    const category = categories.find((c) => c.id === categoryId);
    return category ? category.name : "";
  };

  return (
    <section className="min-h-screen px-6 py-24 transition-colors duration-300 bg-aceLight dark:bg-gray-900 font-inter">
      <div className="max-w-6xl mx-auto text-center">
        {/* Page Header */}
        <motion.header
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="mb-4 text-4xl font-bold md:text-5xl text-acePurple dark:text-aceGreen">
            Our Programs
          </h1>
          <p className="max-w-3xl mx-auto text-lg leading-relaxed text-gray-700 md:text-xl dark:text-gray-200">
            Ace Medformatics delivers structured educational programs that serve as
            an ecosystem for Health Information Management resources and materials.
          </p>
        </motion.header>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program, index) => (
            <motion.div
              key={program.id}
              className="flex flex-col justify-between p-6 transition-shadow duration-300 bg-white shadow-md md:p-8 dark:bg-gray-800 rounded-2xl hover:shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              {/* Top: Title + Review Button */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold md:text-xl text-acePurple dark:text-aceGreen">
                  {program.title}
                </h3>
                <button
                  onClick={() => setSelectedProgramId(program.id)}
                  className="px-3 py-1 text-sm font-medium text-white transition-colors duration-300 rounded-md bg-acePurple hover:bg-aceGreen"
                >
                  Review
                </button>
              </div>

              {program.category_id && (
                <p className="mt-1 text-sm font-medium text-acePurple dark:text-aceGreen">
                  {getCategoryName(program.category_id)}
                </p>
              )}

              <p className="mt-4 text-base leading-relaxed text-gray-600 md:text-md dark:text-gray-200">
                {program.description}
              </p>

              <Link
                to={`/programs/${program.slug}/materials`}
                className="inline-block px-5 py-2 mt-6 text-sm font-medium text-center transition-colors duration-300 rounded-md bg-aceGreen text-aceDark dark:text-white hover:bg-acePurple hover:text-white"
              >
                View Materials
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Review Modal */}
      {selectedProgramId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black bg-opacity-50">
          <div className="relative w-full max-w-3xl p-8 mx-auto bg-white shadow-lg rounded-xl dark:bg-gray-800">
            <button
              className="absolute text-lg text-gray-600 top-4 right-4 dark:text-gray-300"
              onClick={() => setSelectedProgramId(null)}
            >
              ✕
            </button>

            {showSuccessMessage ? (
              <p className="py-12 text-xl font-semibold text-center text-green-600">
                Review successfully submitted!
              </p>
            ) : (
              <ProgramReviewSubmit
                programId={selectedProgramId}
                onSubmitSuccess={() => {
                  setShowSuccessMessage(true);
                  setTimeout(() => {
                    setShowSuccessMessage(false);
                    setSelectedProgramId(null);
                  }, 2000);
                }}
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}
