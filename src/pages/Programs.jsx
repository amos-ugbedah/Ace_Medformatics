// src/pages/Programs.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { usePrograms } from "../hooks/usePrograms";
import { useProgramCategories } from "../hooks/useProgramCategories";

export default function Programs() {
  const { programs, loading, error } = usePrograms();
  const { categories } = useProgramCategories();

  if (loading)
    return (
      <p className="text-center py-10 text-gray-500 dark:text-gray-400 font-sans">
        Loading programs...
      </p>
    );
  if (error)
    return (
      <p className="text-center py-10 text-red-500 font-sans">
        Error loading programs. Please try again later.
      </p>
    );

  const getCategoryName = (categoryId) => {
    const category = categories.find((c) => c.id === categoryId);
    return category ? category.name : "";
  };

  return (
    <section className="bg-aceLight dark:bg-gray-900 py-16 px-4 font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto text-center">
        {/* Page Header */}
        <motion.header
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-acePurple dark:text-aceGreen font-sans">
            Our Programs
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-gray-700 dark:text-gray-200 font-sans">
            Ace Medformatics delivers structured educational programs that serve as
            an ecosystem for Health Information Management resources and materials.
          </p>
        </motion.header>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {programs.map((program, index) => (
            <motion.div
              key={program.id}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow transition-colors duration-300 flex flex-col justify-between font-sans"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              <div>
                <h3 className="text-xl font-semibold text-acePurple dark:text-aceGreen font-sans">
                  {program.title}
                </h3>

                {program.category_id && (
                  <p className="text-accent dark:text-acePurple font-medium text-sm mt-2 font-sans">
                    {getCategoryName(program.category_id)}
                  </p>
                )}

                <p className="text-gray-600 dark:text-gray-200 mt-4 leading-relaxed font-sans">
                  {program.description}
                </p>
              </div>

              <Link
                to={`/programs/${program.slug}/materials`}
                className="mt-6 inline-block bg-aceGreen text-aceDark dark:text-white font-medium px-5 py-2 rounded-md hover:bg-acePurple hover:text-white transition-colors duration-300 text-sm font-sans"
              >
                View Materials
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
