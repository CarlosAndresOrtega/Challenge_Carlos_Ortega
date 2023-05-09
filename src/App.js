
import { useEffect } from 'react';
import './App.css';
import { useSelector } from 'react-redux';
import { setItem } from './utils/localStorage';

function App() {
  const taskState= useSelector(state=>state.tasks)

  const HandleData = ()=>{
    setItem('tasks',taskState)
  }
  useEffect(()=>{
    setItem('tasks',taskState)
  },[taskState])
  console.log(taskState)
  return (
    <div className="App">
      <h1>Estamos activos</h1>
      <button onClick={HandleData}>probando</button>
    </div>
  );
}

export default App;
