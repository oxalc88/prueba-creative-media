import axios from "axios";

let api = import.meta.env.VITE_URL;

const getTask = async (setTask) => {
  try {
    const response = await axios.get(`${api}/task`);
    return setTask(response.data);
  } catch (error) {
    console.error(error);
  }
};

const getTaskById = async (idTarea) => {
  try {
    const response = await axios.get(`${api}/task/${idTarea}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const createTask = async (value) => {
  try {
    const response = await axios.post(`${api}/task/`, { text: value });
    return response.data.json;
  } catch (error) {
    console.error(error);
  }
};

const updateTask = async (idTarea, value) => {
  try {
    const response = await axios.put(`${api}/task/${idTarea}`, {
      realizado: value,
    });
    return response.data.json;
  } catch (error) {
    console.log(error);
  }
};

const deleteTask = async (idTarea) => {
  try {
    const response = await axios.delete(`${api}/task/${idTarea}`);
    response.status;
  } catch (error) {
    console.log(error);
  }
};

export { getTask, getTaskById, createTask, updateTask, deleteTask };
