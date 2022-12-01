import React from "react";

const ListaTareas = ({ children }) => {
  return (
    <section className="m-2 flex justify-center">
      <ul>{children}</ul>
    </section>
  );
};

export default ListaTareas;
