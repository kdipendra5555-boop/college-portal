import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Semester() {
  const semesters = [1,2,3,4,5,6,7,8];

  const colors = [
    "from-blue-500 to-cyan-500",
    "from-purple-500 to-pink-500",
    "from-green-500 to-emerald-500",
    "from-orange-500 to-red-500",
    "from-indigo-500 to-blue-500",
    "from-pink-500 to-rose-500",
    "from-teal-500 to-green-500",
    "from-yellow-500 to-orange-500",
  ];

  const [selectedSem, setSelectedSem] = useState(null);
  const [data, setData] = useState({});

  // 🔥 LOAD DATA FROM STORAGE
  useEffect(() => {
    const saved = localStorage.getItem("papersData");
    if (saved) setData(JSON.parse(saved));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-blue-50 px-4 md:px-10 py-12">

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-800"
      >
        🎓 Choose Your Semester
      </motion.h1>

      {/* 🔥 Semester Cards */}
      <div className="mt-10 flex flex-wrap justify-center gap-4">

        {semesters.map((sem, i) => (
          <motion.div
            key={sem}
            whileHover={{ y: -6, scale: 1.06 }}
            onClick={() => setSelectedSem(sem)}
            className={`w-[110px] cursor-pointer ${
              selectedSem === sem ? "ring-2 ring-blue-500" : ""
            }`}
          >
            <div className="p-4 rounded-xl bg-white shadow-md hover:shadow-xl transition">

              <div className={`w-10 h-10 mx-auto rounded-lg bg-gradient-to-r ${colors[i]} text-white flex items-center justify-center font-bold`}>
                {sem}
              </div>

              <p className="mt-3 text-sm font-semibold text-center">
                Sem {sem}
              </p>

            </div>
          </motion.div>
        ))}

      </div>

      {/* 🔥 DATA VIEW */}
      {selectedSem && (
        <div className="mt-12">

          <h2 className="text-xl font-bold mb-6">
            📚 Semester {selectedSem}
          </h2>

          {(data[selectedSem] || []).length === 0 ? (
            <div className="text-center text-gray-500 mt-10">
              No Data Available 🚫
            </div>
          ) : (
            <div className="space-y-8">

              {data[selectedSem].map((branch, bIndex) => (
                <div key={bIndex} className="bg-white p-5 rounded-xl shadow">

                  {/* Branch */}
                  <h3 className="text-lg font-bold text-gray-800 mb-4">
                    {branch.name}
                  </h3>

                  {/* Subjects */}
                  <div className="space-y-6">
                    {branch.subjects.map((sub, sIndex) => (
                      <div key={sIndex}>

                        <h4 className="font-semibold text-gray-700 mb-3">
                          {sub.name}
                        </h4>

                        {/* Papers */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {sub.papers.map((paper, pIndex) => (
                            <motion.div
                              key={pIndex}
                              whileHover={{ scale: 1.05 }}
                              className="bg-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
                            >

                              {/* Image */}
                              {paper.image && (
                                <img
                                  src={paper.image}
                                  alt=""
                                  className="h-28 w-full object-cover"
                                />
                              )}

                              {/* Link */}
                              <div className="p-2 text-center">
                                <a
                                  href={paper.link}
                                  target="_blank"
                                  className="text-blue-600 text-sm font-medium hover:underline"
                                >
                                  Open Paper →
                                </a>
                              </div>

                            </motion.div>
                          ))}
                        </div>

                      </div>
                    ))}
                  </div>

                </div>
              ))}

            </div>
          )}

        </div>
      )}

    </div>
  );
}