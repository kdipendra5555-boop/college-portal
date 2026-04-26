import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function CT() {
  const semesters = [1,2,3,4,5,6,7,8];

  const colors = [
    "from-green-500 to-emerald-500",
    "from-teal-500 to-green-500",
    "from-lime-500 to-green-500",
    "from-emerald-500 to-teal-500",
    "from-green-400 to-emerald-400",
    "from-teal-400 to-green-400",
    "from-lime-400 to-green-400",
    "from-green-600 to-emerald-600",
  ];

  const [selectedSem, setSelectedSem] = useState(null);
  const [data, setData] = useState({});

  // 🔥 LOAD DATA (UNCHANGED)
  useEffect(() => {
    const saved = localStorage.getItem("ctData");
    if (saved) setData(JSON.parse(saved));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50 px-6 py-10">

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-green-600"
      >
        📝 CT Papers
      </motion.h1>

      {/* Semester */}
      <div className="mt-8 flex flex-wrap gap-4 justify-center">
        {semesters.map((sem, i) => (
          <motion.div
            key={sem}
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelectedSem(sem)}
            className={`cursor-pointer px-4 py-3 rounded-xl text-white font-semibold shadow 
            bg-gradient-to-r ${colors[i]} ${
              selectedSem === sem ? "ring-2 ring-green-600" : ""
            }`}
          >
            Sem {sem}
          </motion.div>
        ))}
      </div>

      {/* DATA */}
      {selectedSem && (
        <div className="mt-10">

          <h2 className="text-xl font-bold mb-6">
            Semester {selectedSem} CT Papers
          </h2>

          {(data[selectedSem] || []).length === 0 ? (
            <p className="text-gray-500 text-center">
              No CT Papers Available 🚫
            </p>
          ) : (
            <div className="space-y-8">

              {data[selectedSem].map((branch, bIndex) => (
                <div key={bIndex} className="bg-white p-5 rounded-xl shadow">

                  <h3 className="text-lg font-bold text-green-600 mb-4">
                    {branch.name}
                  </h3>

                  {branch.subjects.map((sub, sIndex) => (
                    <div key={sIndex} className="mb-6">

                      <h4 className="font-semibold mb-3">
                        {sub.name}
                      </h4>

                      {/* 🔥 RESPONSIVE PAPERS */}

                      {/* 📱 Mobile → 4 in one row */}
                      <div className="flex gap-3 overflow-x-auto md:hidden pb-2">
                        {sub.papers.map((paper, pIndex) => (
                          <motion.div
                            key={pIndex}
                            whileHover={{ y: -5 }}
                            className="min-w-[22%] bg-green-50 rounded-lg overflow-hidden shadow-sm"
                          >

                            {paper.image && (
                              <img
                                src={paper.image}
                                className="h-16 md:h-20 w-full object-cover"
                              />
                            )}

                            <div className="p-1 text-center">

                              <h5 className="text-[10px] font-semibold">
                                {paper.title}
                              </h5>

                              <a
                                href={paper.link}
                                target="_blank"
                                className="text-green-600 text-[10px]"
                              >
                                Open →
                              </a>

                            </div>

                          </motion.div>
                        ))}
                      </div>

                      {/* 💻 Desktop Grid */}
                      <div className="hidden md:grid grid-cols-4 gap-4">
                        {sub.papers.map((paper, pIndex) => (
                          <motion.div
                            key={pIndex}
                            whileHover={{ y: -5 }}
                            className="bg-green-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
                          >

                            {paper.image && (
                              <img
                                src={paper.image}
                                className="h-24 w-full object-cover"
                              />
                            )}

                            <div className="p-2 text-center">

                              <h5 className="text-sm font-semibold">
                                {paper.title}
                              </h5>

                              <a
                                href={paper.link}
                                target="_blank"
                                className="text-green-600 text-xs block mt-1"
                              >
                                Open →
                              </a>

                            </div>

                          </motion.div>
                        ))}
                      </div>

                    </div>
                  ))}

                </div>
              ))}

            </div>
          )}

        </div>
      )}

    </div>
  );
}