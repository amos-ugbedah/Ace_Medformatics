// src/pages/Programs.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Programs() {
  const programs = [
    {
      title: "Monthly Professional Classes",
      audience: "Students & Working Professionals",
      description:
        "Structured educational sessions held monthly, and in some cases twice weekly, focused on strengthening theoretical knowledge and practical competencies in Health Information Management.",
    },
    {
      title: "Peer-to-Peer Training Sessions",
      audience: "HIM Students & Early-Career Professionals",
      description:
        "Collaborative learning forums where members share practical skills, experiences, and best practices across core and emerging areas of Health Information Management.",
    },
    {
      title: "Workshops & Capacity Building",
      audience: "Health Information Managers",
      description:
        "Hands-on workshops and capacity-building programs designed to improve data quality, records management, leadership skills, and digital health competencies.",
    },
    {
      title: "Webinars & Virtual Learning",
      audience: "National & Global Participants",
      description:
        "Expert-led virtual sessions addressing topical issues in HIM practice, digital health innovation, research methods, and professional development.",
    },
    {
      title: "Quarterly Clinic Visits",
      audience: "Health Facilities",
      description:
        "On-site professional engagements with healthcare facilities to assess HIM workflows, support best practices, and promote excellence in health records management.",
    },
    {
      title: "Special HIM Programs",
      audience: "Institutions & Partner Organizations",
      description:
        "Targeted programs including conferences, symposiums, advocacy initiatives, and collaborative projects aimed at advancing the recognition and value of the HIM profession.",
    },
  ];

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
            Ace Medformatics delivers structured educational, professional, and
            capacity-building programs designed to strengthen Health Information
            Management practice and promote deserved recognition of the profession.
          </p>
        </motion.header>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {programs.map((program, index) => {
            // Convert program title to URL-friendly slug
            const programSlug = program.title.toLowerCase().replace(/\s+/g, "-");

            return (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                whileHover={{ scale: 1.03 }}
              >
                <div>
                  <h3 className="text-xl font-semibold text-acePurple">
                    {program.title}
                  </h3>
                  <p className="text-accent font-medium text-sm mt-2">
                    {program.audience}
                  </p>
                  <p className="text-gray-600 mt-4 leading-relaxed">
                    {program.description}
                  </p>
                </div>

                <Link
                  to={`/programs/${programSlug}`}
                  className="mt-6 inline-block bg-aceGreen text-white py-2 px-4 rounded-md hover:bg-acePurple transition"
                >
                  View Materials
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
