import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import {Routes, Route} from "react-router-dom";
import { ThemeProvider } from './ThemeProvider';
import {ToggleButton} from "./ToggleButton";
import KanbanBoard from "./Task10/KanbanBoard";
function App() {
  const [count, setCount] = useState(0)
    const themes = {
        light: {
            backgroundColor: 'white',
            color: 'black',
        },
        dark: {
            backgroundColor: 'black',
            color: 'white',
        },
    };

    const todos = [
        { id: '1', title: 'Buy groceries', status: 'todo' },
        { id: '2', title: 'Clean house', status: 'todo' },
        { id: '3', title: 'Finish project', status: 'inProgress', description: 'Work on React project' },
        { id: '4', title: 'Exercise', status: 'done', description: 'Go for a run' },
    ];


    return (
      <ThemeProvider>
          <ToggleButton />
    <div className="App">
        {/*<Routes>*/}
        {/*    <Route path='/' element={<UserList/>}/>*/}
        {/*    <Route path='/user-form' element={<UserForm isEdit={false} user={null}/>}/>*/}
        {/*    <Route path='/user-form/:id' element={<UserForm isEdit={true} user={null}/>}/>*/}
        {/*</Routes>*/}
        <KanbanBoard  />
    </div>
          </ThemeProvider>
  )
}

export default App
