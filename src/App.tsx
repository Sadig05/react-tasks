import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import {Routes, Route} from "react-router-dom";
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
        <Routes>
            <Route path='/' element={<UserList/>}/>
            <Route path='/user-form' element={<UserForm isEdit={false} user={null}/>}/>
            <Route path='/user-form/:id' element={<UserForm isEdit={true} user={null}/>}/>
        </Routes>
    </div>
  )
}

export default App