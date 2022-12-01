import React from "react";
import { MdAddCircle } from "react-icons/md";

const CrearTarea = ({ addTask }) => {
  return (
    <button type="submit">
      <MdAddCircle className="h-5 w-10 fill-blue-500 hover:fill-blue-700" />
    </button>
  );
};

export default CrearTarea;
