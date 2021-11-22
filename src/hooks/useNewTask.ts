import { useState } from "react";
import { db } from "../firebase";

export const useNewTask = () => {
  const [tasks, setTasks] = useState([{ id: "", title: "" }]);

  const [input, setInput] = useState("");

  const newTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    db.collection("tasks").add({ title: input });
    setInput("");
  };

  return { tasks, setTasks, input, setInput, newTask };
};
