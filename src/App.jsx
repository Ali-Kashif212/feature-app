import React, { useEffect, useRef, useState } from "react";
import NoteCards from "./components/NoteCards";
import EditNoteCard from "./components/EditNoteCard";
import EmptyState from "./components/EmptyState";

const App = () => {
  const [titleVal, setTitleVal] = useState("");
  const [noteVal, setNoteVal] = useState("");
  const [noteArr, setNoteArr] = useState([]);
  let [errFlag, setErrFlag] = useState(false);
  let [errMsg, setErrMsg] = useState("");
  const id = useRef(1);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadNotes();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    addToNote();
  }

  function addToNote() {
    const head = titleVal.trim();
    const body = noteVal.trim();
    if (head === "" || body === "") {
      setErrMsg("Please fill the following inputs");
      setErrFlag(true);
      return;
    }
    let noteObj = { id: id.current++, title: head, note: body };
    let updated = [...noteArr, noteObj];
    setNoteArr(updated);
    saveNote(updated);

    setTitleVal("");
    setNoteVal("");
    setErrFlag(false);
    setErrMsg("");
  }

  function saveNote(updated) {
    localStorage.setItem("Notes", JSON.stringify(updated));
  }

  function loadNotes() {
    let savedNotes = JSON.parse(localStorage.getItem("Notes"));

    if (!savedNotes || savedNotes.length === 0) {
      return;
    } else {
      let nextId = 0;
      for (let i = 0; i < savedNotes.length; i++) {
        if (savedNotes[i].id > nextId) {
          nextId = savedNotes[i].id;
        }
      }
      id.current = nextId + 1;
      setNoteArr(savedNotes);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && e.ctrlKey === true) {
      e.preventDefault();
      addToNote();
    }
  }

  function dltNote(noteId) {
    let filteredNotes = noteArr.filter((elem) => elem.id !== noteId);
    setNoteArr(filteredNotes);
    saveNote(filteredNotes);
  }

  function saveEdit(editObj) {
    let updatedNoteArr = noteArr.map((elem) => {
      if (elem.id === editObj.id) {
        return editObj;
      } else {
        return elem;
      }
    });
    setNoteArr(updatedNoteArr);
    saveNote(updatedNoteArr);
    setEditId(null);
  }

  function cancelEdit() {
    setEditId(null);
  }

  return (
    <>
      <div className="container mx-auto mt-20 px-4">
        <form
          className="mx-auto flex w-full max-w-xl flex-col gap-3 sm:flex-col"
          onSubmit={(e) => handleSubmit(e)}
        >
          <input
            type="text"
            placeholder="Add Title"
            value={titleVal}
            onChange={(e) => setTitleVal(e.target.value)}
            className={`w-full rounded-full  border-2 px-5 py-3 outline-none ${errFlag ? "border-red-500" : "border-sky-500"}`}
          />
          <textarea
            placeholder="Add Note"
            value={noteVal}
            onChange={(e) => setNoteVal(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
            className={`w-full rounded-2xl border-2 px-5 py-3 min-h-35 outline-none leading-relaxed resize-none ${
              errFlag ? "border-red-500" : "border-sky-500"
            }`}
          />
          <p className="text-red-500 mb-3">{errMsg}</p>

          <button
            type="submit"
            className="rounded-full bg-sky-500 px-5 py-3 text-white cursor-pointer w-full"
          >
            Enter
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-20 px-4 sm:px-8 lg:px-12 gap-6 items-start">
        {noteArr.map((elem) =>
          editId === elem.id ? (
            <EditNoteCard
              data={elem}
              key={editId}
              saveEdit={saveEdit}
              cancel={cancelEdit}
            />
          ) : (
            <NoteCards
              data={elem}
              key={elem.id}
              getDltId={dltNote}
              getEditId={setEditId}
            />
          ),
        )}
      </div>
      {noteArr.length === 0 && <EmptyState />}
    </>
  );
};

export default App;
