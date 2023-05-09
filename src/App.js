import { useEffect } from "react";
import "./App.css";
import { useSelector } from "react-redux";
import { setItem } from "./utils/localStorage";
import TasksLists from "./components/TasksLists";

function App() {
  const taskState = useSelector((state) => state.tasks);

  const HandleData = () => {
    setItem("tasks", taskState);
  };
  useEffect(() => {
    setItem("tasks", taskState);
  }, [taskState]);
  console.log(taskState);
  return (
    <>
      <div className="bg-zinc-900 h-screen text-white">
        <div className="flex items-center justify-center h-full">
          <TasksLists />
        </div>
      </div>
    </>
  );
}

export default App;
