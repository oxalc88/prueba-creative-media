import { useState } from "react";
import { MdDeleteOutline, MdOutlineDone } from "react-icons/md";

const Tarea = ({ text, onComplete, onDelete, tachado }) => {
  return (
    <li className="flex space-x-6 p-6 items-center">
      <button onClick={onComplete}>
        <MdOutlineDone className="fill-green-500 hover:fill-green-700 w-10 h15" />
      </button>
      <p className={tachado ? "line-through" : "no-underline"}>{text}</p>
      <button onClick={onDelete}>
        <MdDeleteOutline className="fill-red-500 hover:fill-red-700 w-10 h-10" />
      </button>
    </li>
  );
};

export default Tarea;
