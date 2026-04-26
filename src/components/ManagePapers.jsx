import { useState, useEffect } from "react";

export default function ManagePapers() {
  const semesters = [1,2,3,4,5,6,7,8];

  const [selectedSem, setSelectedSem] = useState(null);
  const [branches, setBranches] = useState({});

  const [newBranch, setNewBranch] = useState("");
  const [newSubject, setNewSubject] = useState("");

  const [newTitle, setNewTitle] = useState("");
  const [newPaperLink, setNewPaperLink] = useState("");
  const [newImage, setNewImage] = useState("");

  // 🔥 LOAD DATA
  useEffect(() => {
    const saved = localStorage.getItem("papersData");
    if (saved) setBranches(JSON.parse(saved));
  }, []);

  // 🔥 SAVE DATA
  useEffect(() => {
    localStorage.setItem("papersData", JSON.stringify(branches));
  }, [branches]);

  // ✅ ADD BRANCH
  const addBranch = () => {
    if (!newBranch || !selectedSem) return;

    setBranches(prev => ({
      ...prev,
      [selectedSem]: [
        ...(prev[selectedSem] || []),
        { name: newBranch, subjects: [] }
      ]
    }));

    setNewBranch("");
  };

  // ❌ DELETE BRANCH
  const deleteBranch = (bIndex) => {
    const updated = [...branches[selectedSem]];
    updated.splice(bIndex, 1);
    setBranches({ ...branches, [selectedSem]: updated });
  };

  // ✏️ EDIT BRANCH
  const editBranch = (bIndex, value) => {
    const updated = [...branches[selectedSem]];
    updated[bIndex].name = value;
    setBranches({ ...branches, [selectedSem]: updated });
  };

  // ✅ ADD SUBJECT
  const addSubject = (bIndex) => {
    if (!newSubject) return;

    const updated = [...branches[selectedSem]];
    updated[bIndex].subjects.push({ name: newSubject, papers: [] });

    setBranches({ ...branches, [selectedSem]: updated });
    setNewSubject("");
  };

  // ❌ DELETE SUBJECT
  const deleteSubject = (bIndex, sIndex) => {
    const updated = [...branches[selectedSem]];
    updated[bIndex].subjects.splice(sIndex, 1);
    setBranches({ ...branches, [selectedSem]: updated });
  };

  // ✏️ EDIT SUBJECT
  const editSubject = (bIndex, sIndex, value) => {
    const updated = [...branches[selectedSem]];
    updated[bIndex].subjects[sIndex].name = value;
    setBranches({ ...branches, [selectedSem]: updated });
  };

  // ✅ ADD PAPER
  const addPaper = (bIndex, sIndex) => {
    if (!newTitle || !newPaperLink) return;

    const updated = [...branches[selectedSem]];
    updated[bIndex].subjects[sIndex].papers.push({
      title: newTitle,
      link: newPaperLink,
      image: newImage
    });

    setBranches({ ...branches, [selectedSem]: updated });

    setNewTitle("");
    setNewPaperLink("");
    setNewImage("");
  };

  // ❌ DELETE PAPER
  const deletePaper = (bIndex, sIndex, pIndex) => {
    const updated = [...branches[selectedSem]];
    updated[bIndex].subjects[sIndex].papers.splice(pIndex, 1);
    setBranches({ ...branches, [selectedSem]: updated });
  };

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">Manage Papers 🚀</h1>

      {/* 🔥 Semester */}
      <div className="flex gap-2 flex-wrap">
        {semesters.map((sem) => (
          <button
            key={sem}
            onClick={() => setSelectedSem(sem)}
            className={`px-3 py-2 rounded ${
              selectedSem === sem
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            Sem {sem}
          </button>
        ))}
      </div>

      {/* 🔥 MAIN */}
      {selectedSem && (
        <div className="mt-6">

          {/* Add Branch */}
          <div className="flex gap-2">
            <input
              value={newBranch}
              onChange={(e) => setNewBranch(e.target.value)}
              placeholder="Branch (CSE)"
              className="border px-3 py-2 rounded"
            />
            <button onClick={addBranch} className="bg-green-500 text-white px-3 rounded">
              Add
            </button>
          </div>

          {/* Branch List */}
          {(branches[selectedSem] || []).map((branch, bIndex) => (
            <div key={bIndex} className="mt-6 p-4 bg-white shadow rounded-lg">

              {/* Branch */}
              <div className="flex gap-2 items-center">
                <input
                  value={branch.name}
                  onChange={(e) => editBranch(bIndex, e.target.value)}
                  className="border px-2 py-1 rounded"
                />
                <button onClick={() => deleteBranch(bIndex)} className="text-red-500">
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
                <button onClick={() => addSubject(bIndex)} className="bg-blue-500 text-white px-2 rounded">
                  Add
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
                    <button onClick={() => deleteSubject(bIndex, sIndex)} className="text-red-500">
                      Delete
                    </button>
                  </div>

                  {/* Add Paper */}
                  <div className="grid gap-2 mt-3">
                    <input
                      placeholder="Title"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="border px-2 py-1 rounded"
                    />
                    <input
                      placeholder="Link"
                      value={newPaperLink}
                      onChange={(e) => setNewPaperLink(e.target.value)}
                      className="border px-2 py-1 rounded"
                    />
                    <input
                      placeholder="Image URL"
                      value={newImage}
                      onChange={(e) => setNewImage(e.target.value)}
                      className="border px-2 py-1 rounded"
                    />
                    <button
                      onClick={() => addPaper(bIndex, sIndex)}
                      className="bg-purple-500 text-white py-1 rounded"
                    >
                      Add Paper
                    </button>
                  </div>

                  {/* Papers */}
                  {sub.papers.map((p, pIndex) => (
                    <div key={pIndex} className="mt-3 p-2 bg-gray-100 rounded">

                      {p.image && (
                        <img
                          src={p.image}
                          className="h-20 w-full object-cover rounded"
                        />
                      )}

                      <h4 className="font-semibold">{p.title}</h4>

                      <a href={p.link} className="text-blue-500 text-sm">
                        Open Paper →
                      </a>

                      <button
                        onClick={() => deletePaper(bIndex, sIndex, pIndex)}
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