import {Route, Routes} from "react-router-dom"

import Landing from './views/Landing/landing.component'
import Home from './views/home/home.component'
import Detail from './views/detail/detail.component'
import Create from './views/create/create.component'


import './App.css'

function App() {

  return (
    
    <Routes>

        <Route path="/" element={<Landing/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/home/:id" element={<Detail/>}/>
        <Route path="/create" element={<Create/>}/>
      
    </Routes>    
  )
}

export default App
