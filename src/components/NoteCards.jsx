import React from "react";
import { BsFillTrash3Fill } from "react-icons/bs";
import { BiSolidEdit } from "react-icons/bi";
const NoteCards = ({ data, getDltId, getEditId }) => {
  return (
    <>
      <div>
        <div className="h-full rounded-lg border border-gray-300 p-4">
          <div className="flex flex-col h-full">
            <div className="py-3">
              <h1 className="text-xl sm:text-2xl">{data.title}</h1>
            </div>

            <hr className="border-gray-400" />

            <div className="py-6">
              <p className="tracking-wide text-sm sm:text-base leading-relaxed">
                {data.note}
              </p>
            </div>

            <hr className="border-gray-400" />

            <div className="mt-auto pt-4 flex justify-between px-2">
              <button onClick={() => getDltId(data.id)}>
                <BsFillTrash3Fill className="text-red-500 cursor-pointer text-xl" />
              </button>
              <button onClick={() => getEditId(data.id)}>
                <BiSolidEdit className="text-sky-500 cursor-pointer text-2xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteCards;
