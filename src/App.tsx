import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import {Routes, Route} from "react-router-dom";
import { ThemeProvider } from './ThemeProvider';
import {ToggleButton} from "./ToggleButton";
import Task8 from './Task8/Task8'
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

    return (
      <ThemeProvider>
          <ToggleButton />
    <div className="App">
        {/*<Routes>*/}
        {/*    <Route path='/' element={<UserList/>}/>*/}
        {/*    <Route path='/user-form' element={<UserForm isEdit={false} user={null}/>}/>*/}
        {/*    <Route path='/user-form/:id' element={<UserForm isEdit={true} user={null}/>}/>*/}
        {/*</Routes>*/}
        <Task8/>
    </div>
          </ThemeProvider>
  )
}

export default App
