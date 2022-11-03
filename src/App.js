import React, { useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Attendance from "./pages/Attendance";
import Calendar from "./pages/Calendar";
import Teams from "./pages/Teams";
import Events from "./pages/Events";
import Socials from "./pages/Socials";
import Bios from "./pages/Bios";
import FrontPage from "./components/home/FrontPage";
import { onAuthStateChanged } from "@firebase/auth"
import { auth } from "./firebase"
import { UserContext } from "./contexts/UserContext";

export const App = () => {

  const [user, setUser] = useState(null)

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setUser(user)
  })
  }, [])

  return (
    <Router>
      <UserContext.Provider value={user}>
        {user ? (
          <Routes>  
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/attendance" element={<Attendance/>}/>
            <Route exact path="/calendar" element={<Calendar/>}/>
            <Route exact path="/teams" element={<Teams/>}/>
            <Route exact path="/events" element={<Events/>}/>
            <Route exact path="/socials" element={<Socials/>}/>
            <Route exact path="/bios" element={<Bios/>}></Route>
          </Routes>
        ) :
          <FrontPage/>
        }
        
          
      </UserContext.Provider>
    </Router>
  )
}

export default App;
