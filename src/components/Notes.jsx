import { useState, useEffect } from "react";

export default function Notes() {
  const semesters = [1,2,3,4,5,6,7,8];

  const [selectedSem, setSelectedSem] = useState(null);
  const [data, setData] = useState({});

  const [branchName, setBranchName] = useState("");
  const [subjectName, setSubjectName] = useState("");

  const [paper, setPaper] = useState({
    title: "",
    link: "",
    image: "",
  });

  const [editIndex, setEditIndex] = useState(null);

  // 🔥 Load
  useEffect(() => {
    const saved = localStorage.getItem("notesData");
    if (saved) setData(JSON.parse(saved));
  }, []);

  // 🔥 Save
  useEffect(() => {
    localStorage.setItem("notesData", JSON.stringify(data));
  }, [data]);

  // ➕ Add Branch
  const addBranch = () => {
    if (!branchName || !selectedSem) return;

    setData((prev) => ({
      ...prev,
      [selectedSem]: [
        ...(prev[selectedSem] || []),
        { name: branchName, subjects: [] },
      ],
    }));

    setBranchName("");
  };

  // ❌ Delete Branch
  const deleteBranch = (bIndex) => {
    const updated = [...data[selectedSem]];
    updated.splice(bIndex, 1);
    setData({ ...data, [selectedSem]: updated });
  };

  // ➕ Add Subject
  const addSubject = (bIndex) => {
    if (!subjectName) return;

    const updated = [...data[selectedSem]];
    updated[bIndex].subjects.push({ name: subjectName, papers: [] });

    setData({ ...data, [selectedSem]: updated });
    setSubjectName("");
  };

  // ❌ Delete Subject
  const deleteSubject = (bIndex, sIndex) => {
    const updated = [...data[selectedSem]];
    updated[bIndex].subjects.splice(sIndex, 1);

    setData({ ...data, [selectedSem]: updated });
  };

  // ➕ Add / ✏️ Update Paper
  const addPaper = (bIndex, sIndex) => {
    const updated = [...data[selectedSem]];

    if (editIndex !== null) {
      updated[bIndex].subjects[sIndex].papers[editIndex] = paper;
      setEditIndex(null);
    } else {
      updated[bIndex].subjects[sIndex].papers.push(paper);
    }

    setData({ ...data, [selectedSem]: updated });

    setPaper({ title: "", link: "", image: "" });
  };

  // ❌ Delete Paper
  const deletePaper = (bIndex, sIndex, pIndex) => {
    const updated = [...data[selectedSem]];
    updated[bIndex].subjects[sIndex].papers.splice(pIndex, 1);

    setData({ ...data, [selectedSem]: updated });
  };

  // ✏️ Edit Paper
  const editPaper = (bIndex, sIndex, pIndex) => {
    const p = data[selectedSem][bIndex].subjects[sIndex].papers[pIndex];
    setPaper(p);
    setEditIndex(pIndex);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">

      <h1 className="text-3xl font-bold mb-6">📄 Notes Manager</h1>

      {/* 🔥 Semester */}
      <div className="flex gap-2 flex-wrap">
        {semesters.map((sem) => (
          <button
            key={sem}
            onClick={() => setSelectedSem(sem)}
            className={`px-3 py-2 rounded ${
              selectedSem === sem ? "bg-blue-500 text-white" : "bg-white"
            }`}
          >
            Sem {sem}
          </button>
        ))}
      </div>

      {/* 🔥 Branch */}
      {selectedSem && (
        <div className="mt-6">

          <div className="flex gap-3">
            <input
              value={branchName}
              onChange={(e) => setBranchName(e.target.value)}
              placeholder="Branch"
              className="border px-3 py-2 rounded"
            />
            <button
              onClick={addBranch}
              className="bg-green-500 text-white px-4 rounded"
            >
              Add
            </button>
          </div>

          {/* DATA */}
          <div className="mt-6 space-y-6">

            {(data[selectedSem] || []).map((branch, bIndex) => (
              <div key={bIndex} className="bg-white p-4 rounded shadow">

                <div className="flex justify-between">
                  <h2 className="font-bold">{branch.name}</h2>
                  <button
                    onClick={() => deleteBranch(bIndex)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </div>

                {/* Subject */}
                <div className="flex gap-2 mt-3">
                  <input
                    value={subjectName}
                    onChange={(e) => setSubjectName(e.target.value)}
                    placeholder="Subject"
                    className="border px-2 py-1 rounded"
                  />
                  <button
                    onClick={() => addSubject(bIndex)}
                    className="bg-blue-500 text-white px-3 rounded"
                  >
                    Add
                  </button>
                </div>

                {/* Subjects */}
                {branch.subjects.map((sub, sIndex) => (
                  <div key={sIndex} className="mt-4 pl-4">

                    <div className="flex justify-between">
                      <h3 className="font-semibold">{sub.name}</h3>
                      <button
                        onClick={() => deleteSubject(bIndex, sIndex)}
                        className="text-red-400"
                      >
                        Delete
                      </button>
                    </div>

                    {/* Paper Form */}
                    <div className="flex flex-col md:flex-row gap-2 mt-2">
                      <input
                        placeholder="Title"
                        value={paper.title}
                        onChange={(e) =>
                          setPaper({ ...paper, title: e.target.value })
                        }
                        className="border px-2 py-1 rounded"
                      />
                      <input
                        placeholder="Link"
                        value={paper.link}
                        onChange={(e) =>
                          setPaper({ ...paper, link: e.target.value })
                        }
                        className="border px-2 py-1 rounded"
                      />
                      <input
                        placeholder="Image"
                        value={paper.image}
                        onChange={(e) =>
                          setPaper({ ...paper, image: e.target.value })
                        }
                        className="border px-2 py-1 rounded"
                      />
                      <button
                        onClick={() => addPaper(bIndex, sIndex)}
                        className="bg-purple-500 text-white px-3 rounded"
                      >
                        {editIndex !== null ? "Update" : "Add"}
                      </button>
                    </div>

                    {/* Papers */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                      {sub.papers.map((p, i) => (
                        <div key={i} className="bg-gray-100 p-2 rounded">

                          {p.image && (
                            <img
                              src={p.image}
                              className="h-20 w-full object-cover rounded"
                            />
                          )}

                          <p className="text-sm font-semibold">{p.title}</p>

                          <a href={p.link} target="_blank" className="text-blue-500 text-xs">
                            Open →
                          </a>

                          <div className="flex justify-between mt-2 text-xs">
                            <button
                              onClick={() => editPaper(bIndex, sIndex, i)}
                              className="text-green-600"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deletePaper(bIndex, sIndex, i)}
                              className="text-red-500"
                            >
                              Delete
                            </button>
                          </div>

                        </div>
                      ))}
                    </div>

                  </div>
                ))}

              </div>
            ))}

          </div>

        </div>
      )}
    </div>
  );
}