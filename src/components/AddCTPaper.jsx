import { useEffect, useState } from "react";

export default function AddCTPaper() {
  const semesters = [1,2,3,4,5,6,7,8];

  const [selectedSem, setSelectedSem] = useState(null);
  const [data, setData] = useState({});

  const [newBranch, setNewBranch] = useState("");
  const [newSubject, setNewSubject] = useState("");

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [link, setLink] = useState("");

  // 🔥 LOAD
  useEffect(() => {
    const saved = localStorage.getItem("ctData");
    if (saved) setData(JSON.parse(saved));
  }, []);

  // 🔥 SAVE
  useEffect(() => {
    localStorage.setItem("ctData", JSON.stringify(data));
  }, [data]);

  // ---------------- BRANCH ----------------
  const addBranch = () => {
    if (!newBranch || !selectedSem) return;

    setData(prev => ({
      ...prev,
      [selectedSem]: [
        ...(prev[selectedSem] || []),
        { name: newBranch, subjects: [] }
      ]
    }));

    setNewBranch("");
  };

  const deleteBranch = (bIndex) => {
    const updated = [...data[selectedSem]];
    updated.splice(bIndex, 1);
    setData({ ...data, [selectedSem]: updated });
  };

  const editBranch = (bIndex, value) => {
    const updated = [...data[selectedSem]];
    updated[bIndex].name = value;
    setData({ ...data, [selectedSem]: updated });
  };

  // ---------------- SUBJECT ----------------
  const addSubject = (bIndex) => {
    if (!newSubject) return;

    const updated = [...data[selectedSem]];
    updated[bIndex].subjects.push({ name: newSubject, papers: [] });

    setData({ ...data, [selectedSem]: updated });
    setNewSubject("");
  };

  const deleteSubject = (bIndex, sIndex) => {
    const updated = [...data[selectedSem]];
    updated[bIndex].subjects.splice(sIndex, 1);
    setData({ ...data, [selectedSem]: updated });
  };

  const editSubject = (bIndex, sIndex, value) => {
    const updated = [...data[selectedSem]];
    updated[bIndex].subjects[sIndex].name = value;
    setData({ ...data, [selectedSem]: updated });
  };

  // ---------------- PAPER ----------------
  const addPaper = (bIndex, sIndex) => {
    if (!title || !link) return;

    const updated = [...data[selectedSem]];
    updated[bIndex].subjects[sIndex].papers.push({
      title,
      image,
      link
    });

    setData({ ...data, [selectedSem]: updated });

    setTitle("");
    setImage("");
    setLink("");
  };

  const deletePaper = (bIndex, sIndex, pIndex) => {
    const updated = [...data[selectedSem]];
    updated[bIndex].subjects[sIndex].papers.splice(pIndex, 1);
    setData({ ...data, [selectedSem]: updated });
  };

  const editPaperTitle = (bIndex, sIndex, pIndex, value) => {
    const updated = [...data[selectedSem]];
    updated[bIndex].subjects[sIndex].papers[pIndex].title = value;
    setData({ ...data, [selectedSem]: updated });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50 p-6">

      <h1 className="text-3xl font-bold text-green-600 mb-6">
        Add CT Papers 📝
      </h1>

      {/* 🔥 Semester */}
      <div className="flex flex-wrap gap-3">
        {semesters.map((sem) => (
          <button
            key={sem}
            onClick={() => setSelectedSem(sem)}
            className={`px-4 py-2 rounded-lg ${
              selectedSem === sem
                ? "bg-green-600 text-white"
                : "bg-white border"
            }`}
          >
            Sem {sem}
          </button>
        ))}
      </div>

      {selectedSem && (
        <div className="mt-6">

          {/* 🔥 Add Branch */}
          <div className="flex gap-2">
            <input
              value={newBranch}
              onChange={(e) => setNewBranch(e.target.value)}
              placeholder="Branch (CSE)"
              className="border px-3 py-2 rounded"
            />
            <button
              onClick={addBranch}
              className="bg-green-500 text-white px-4 rounded"
            >
              Add Branch
            </button>
          </div>

          {/* 🔥 Branch List */}
          {(data[selectedSem] || []).map((branch, bIndex) => (
            <div key={bIndex} className="mt-6 bg-white p-4 rounded-xl shadow">

              {/* Branch */}
              <div className="flex gap-2 items-center">
                <input
                  value={branch.name}
                  onChange={(e) => editBranch(bIndex, e.target.value)}
                  className="border px-2 py-1 rounded"
                />
                <button
                  onClick={() => deleteBranch(bIndex)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>

              {/* Add Subject */}
              <div className="flex gap-2 mt-3">
                <input
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  placeholder="Subject"
                  className="border px-2 py-1 rounded"
                />
                <button
                  onClick={() => addSubject(bIndex)}
                  className="bg-green-500 text-white px-3 rounded"
                >
                  Add Subject
                </button>
              </div>

              {/* Subjects */}
              {branch.subjects.map((sub, sIndex) => (
                <div key={sIndex} className="mt-4 border p-3 rounded">

                  {/* Subject */}
                  <div className="flex gap-2 items-center">
                    <input
                      value={sub.name}
                      onChange={(e) => editSubject(bIndex, sIndex, e.target.value)}
                      className="border px-2 py-1 rounded"
                    />
                    <button
                      onClick={() => deleteSubject(bIndex, sIndex)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </div>

                  {/* Add Paper */}
                  <div className="grid gap-2 mt-3">
                    <input
                      placeholder="Paper Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="border px-2 py-1 rounded"
                    />
                    <input
                      placeholder="Image URL"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      className="border px-2 py-1 rounded"
                    />
                    <input
                      placeholder="Paper Link"
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                      className="border px-2 py-1 rounded"
                    />
                    <button
                      onClick={() => addPaper(bIndex, sIndex)}
                      className="bg-green-600 text-white py-1 rounded"
                    >
                      Add Paper
                    </button>
                  </div>

                  {/* Papers */}
                  {sub.papers.map((p, pIndex) => (
                    <div key={pIndex} className="mt-3 p-2 bg-green-50 rounded">

                      {p.image && (
                        <img
                          src={p.image}
                          className="h-20 w-full object-cover rounded"
                        />
                      )}

                      <input
                        value={p.title}
                        onChange={(e) =>
                          editPaperTitle(bIndex, sIndex, pIndex, e.target.value)
                        }
                        className="font-semibold border px-2 py-1 w-full mt-1"
                      />

                      <a
                        href={p.link}
                        target="_blank"
                        className="text-green-600 text-sm"
                      >
                        Open →
                      </a>

                      <button
                        onClick={() =>
                          deletePaper(bIndex, sIndex, pIndex)
                        }
                        className="text-red-500 text-sm ml-2"
                      >
                        Delete
                      </button>

                    </div>
                  ))}

                </div>
              ))}

            </div>
          ))}

        </div>
      )}
    </div>
  );
}