import CrearTarea from "./CrearTarea";

function Search({ searchValue, setSearchValue, addTask, onSubmit }) {
  const searchChange = (e) => {
    console.log(e.target.value);
    setSearchValue(e.target.value);
  };

  return (
    <form onSubmit={onSubmit} className="m-2">
      <div>
        <input
          className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm w-4/5"
          type="text"
          aria-label="Tarea"
          placeholder="Escribe tu tarea aquí"
          value={searchValue}
          onChange={searchChange}
        />

        <CrearTarea addTask={addTask} />
      </div>
    </form>
  );
}
export { Search };
