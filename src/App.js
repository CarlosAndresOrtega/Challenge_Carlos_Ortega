import { useEffect } from "react";
import "./App.css";
import { useSelector } from "react-redux";
import { setItem } from "./utils/localStorage";
import TasksLists from "./components/TasksLists";
import TasksForm from "./components/TasksForm";

function App() {
  const taskState = useSelector((state) => state.tasks);

  useEffect(() => {
    setItem("tasks", taskState);
  }, [taskState]);

  return (
    <>
      <div className="bg-zinc-900 h-screen text-white">
        <div className="flex flex-col gap-y-5 items-center justify-center h-full">
          <TasksForm/>
          <TasksLists />
        </div>
      </div>
    </>
  );
}

export default App;
