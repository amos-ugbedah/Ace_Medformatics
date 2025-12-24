// src/pages/Programs.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { usePrograms } from "../hooks/usePrograms";
import { useProgramCategories } from "../hooks/useProgramCategories";

export default function Programs() {
  const { programs, loading, error } = usePrograms();
  const { categories } = useProgramCategories();

  if (loading) return <p className="text-center py-10">Loading programs...</p>;
  if (error)
    return (
      <p className="text-center py-10 text-red-500">
        Error loading programs. Please try again later.
      </p>
    );

  // Helper: get category name from category_id
  const getCategoryName = (categoryId) => {
    const category = categories.find((c) => c.id === categoryId);
    return category ? category.name : "";
  };

  return (
    <section className="bg-aceLight py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        {/* Page Header */}
        <motion.header
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-acePurple">
            Our Programs
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-gray-700">
            Ace Medformatics delivers structured educational programs that serve as
            an ecosystem for Health Information Management resources and materials.
          </p>
        </motion.header>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {programs.map((program, index) => (
            <motion.div
              key={program.id}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              <div>
                <h3 className="text-xl font-semibold text-acePurple">
                  {program.title}
                </h3>

                {/* Display category name if category_id exists */}
                {program.category_id && (
                  <p className="text-accent font-medium text-sm mt-2">
                    {getCategoryName(program.category_id)}
                  </p>
                )}

                {/* Program description */}
                <p className="text-gray-600 mt-4 leading-relaxed">
                  {program.description}
                </p>
              </div>

              {/* Link to program materials */}
              <Link
                to={`/programs/${program.slug}/materials`}
                className="mt-6 inline-block bg-aceGreen text-white py-2 px-4 rounded-md hover:bg-acePurple transition font-medium text-sm"
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
