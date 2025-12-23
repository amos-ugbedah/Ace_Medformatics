import { motion } from "framer-motion";

export default function Research() {
  const researches = [
    {
      title: "Improving HIM Practice in Nigeria",
      year: "2024",
      description:
        "A comprehensive study on structural, professional, and policy challenges facing Health Information Management practice in Nigeria.",
      link: "#",
    },
    {
      title: "Digital Transformation in Health Records",
      year: "2023",
      description:
        "An evaluation of electronic medical record adoption and its impact on service delivery.",
      link: "#",
    },
  ];

  return (
    <section className="bg-aceLight py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <header className="mb-12 text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-acePurple"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Research
          </motion.h1>
          <motion.p
            className="mt-4 max-w-2xl mx-auto text-gray-700"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Evidence-based research advancing Health Information Management
            practice, policy, and innovation.
          </motion.p>
        </header>

        {/* Research Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {researches.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.03 }}
            >
              <div>
                <h3 className="text-xl font-semibold text-acePurple">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{item.year}</p>
                <p className="text-gray-700 mt-4">{item.description}</p>
              </div>

              <a
                href={item.link}
                className="mt-6 w-max bg-aceGreen text-aceDark font-semibold px-4 py-2 rounded-lg hover:bg-acePurple hover:text-white transition-colors duration-300"
              >
                Download Research
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
