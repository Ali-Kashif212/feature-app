import React, { use, useState } from "react";
const EditNoteCard = ({ data, saveEdit, cancel }) => {
  const [editTitle, setEditTitle] = useState(data.title);
  const [editBody, setEditBody] = useState(data.note);
  const [editErr, setEditErr] = useState(false);

  function handleEdit() {
    let head = editTitle.trim();
    let body = editBody.trim();
    if (head === "" || body === "") {
      setEditErr(true);
      return;
    }
    setEditErr(false);

    let editobj = { id: data.id, title: editTitle, note: editBody };
    saveEdit(editobj);
  }

  return (
    <>
      <div>
        <div className="h-full rounded-lg border border-gray-300 p-4">
          <div className="flex flex-col h-full">
            <div className="py-3">
              <input
                type="text"
                className={`w-full py-2 rounded-full px-1 ${editErr ? "border-red-500" : "border-sky-500"} outline-blue-500 text-xl sm:text-2xl`}
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            </div>

            <hr className="border-gray-400" />

            <div className="py-6">
              <textarea
                type="text"
                className={`tracking-wide text-sm sm:text-base leading-relaxed w-full  ${editErr ? "border-red-500" : "border-sky-500"} border-2 outline-blue-500 rounded-2xl px-2 py-2`}
                value={editBody}
                onChange={(e) => setEditBody(e.target.value)}
              ></textarea>
            </div>

            <hr className="border-gray-400" />

            <div className="mt-auto pt-4 flex justify-between px-2">
              <button
                className="bg-red-600 text-white py-1.5 cursor-pointer px-3 rounded-full active:scale-[1.2]"
                onClick={() => cancel()}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white py-1.5 cursor-pointer  px-3 rounded-full active:scale-[1.2]"
                onClick={() => handleEdit()}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditNoteCard;
