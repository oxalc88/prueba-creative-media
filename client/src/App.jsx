import { useEffect, useState } from "react";

import { Search } from "./components/search";
import ListaTareas from "./components/ListaTareas";
import Tarea from "./components/Tarea";
import { createTask, deleteTask, getTask, updateTask } from "./api";

function App() {
  const [tareas, setTareas] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    getTask(setTareas);
  }, []);

  const setTask = (elem, value) => {
    let filteredTask = tareas.filter((t) => t.text === elem);
    updateTask(filteredTask[0]._id, !value);

    const newTasks = tareas.map((t) => {
      if (t._id === filteredTask[0]._id) {
        t.realizado = !value;
      }
      return t;
    });
    setTareas(newTasks);
  };

  const handleTask = (e) => {
    e.preventDefault();
    createTask(searchValue);
    setTareas([...tareas, { text: searchValue }]);
    setSearchValue("");
  };

  const handleDelete = (value) => {
    const newTasks = tareas.filter((t) => t._id !== value);
    console.log(newTasks);
    setTareas(newTasks);
    deleteTask(value);
  };

  return (
    <div className="flex m-20 p-15 gap-4 flex-col">
      <h1 class="text-4xl font-bold mb-8 text-center">Lista de Tareas</h1>
      <Search
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onSubmit={handleTask}
      />
      <ListaTareas>
        {tareas.map((t) => (
          <Tarea
            key={t._id}
            text={t.text}
            tachado={t.realizado}
            onComplete={() => setTask(t.text, t.realizado)}
            onDelete={() => handleDelete(t._id)}
          />
        ))}
      </ListaTareas>
    </div>
  );
}

export default App;
