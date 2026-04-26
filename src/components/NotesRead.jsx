import { useState, useEffect } from "react";

export default function NotesRead() {
  const semesters = [1,2,3,4,5,6,7,8];

  const [selectedSem, setSelectedSem] = useState(null);
  const [data, setData] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem("notesData");
    if (saved) setData(JSON.parse(saved));
  }, []);

  return (
    <div className="min-h-screen px-4 md:px-10 py-10 bg-gradient-to-br from-white via-blue-50 to-purple-50">

      {/* 🔥 Heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-8">
        📚 Notes 
      </h1>

      {/* 🔥 Semester Selector */}
      <div className="flex flex-wrap gap-3 justify-center">
        {semesters.map((sem) => (
          <button
            key={sem}
            onClick={() => setSelectedSem(sem)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 shadow-sm
              ${
                selectedSem === sem
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white scale-105 shadow-lg"
                  : "bg-white text-gray-700 hover:shadow-md hover:-translate-y-0.5"
              }`}
          >
            Sem {sem}
          </button>
        ))}
      </div>

      {/* 🔥 DATA */}
      {selectedSem && (
        <div className="mt-12 max-w-6xl mx-auto">

          <h2 className="text-2xl font-bold mb-8 text-gray-700 text-center">
            Semester {selectedSem}
          </h2>

          {(data[selectedSem] || []).length === 0 ? (
            <p className="text-center text-gray-500 text-lg">
              🚫 No Notes Available
            </p>
          ) : (
            <div className="space-y-10">

              {data[selectedSem].map((branch, bIndex) => (
                <div
                  key={bIndex}
                  className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
                >

                  {/* 🔹 Branch */}
                  <h3 className="text-xl font-bold text-blue-600 mb-5">
                    {branch.name}
                  </h3>

                  {/* 🔹 Subjects */}
                  {branch.subjects.map((sub, sIndex) => (
                    <div key={sIndex} className="mb-8">

                      <h4 className="font-semibold text-gray-700 mb-4 text-lg">
                        {sub.name}
                      </h4>

                      {/* 🔥 Papers Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">

                        {sub.papers.map((paper, pIndex) => (
                          <div
                            key={pIndex}
                            className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 border border-gray-100 hover:-translate-y-1"
                          >

                            {/* Image */}
                            {paper.image && (
                              <div className="overflow-hidden">
                                <img
                                  src={paper.image}
                                  alt=""
                                  className="h-24 w-full object-cover group-hover:scale-105 transition duration-300"
                                />
                              </div>
                            )}

                            {/* Content */}
                            <div className="p-3 text-center">

                              <h5 className="text-sm font-semibold text-gray-800 line-clamp-2">
                                {paper.title}
                              </h5>

                              <a
                                href={paper.link}
                                target="_blank"
                                className="inline-block mt-2 text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                              >
                                Open →
                              </a>

                            </div>

                          </div>
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