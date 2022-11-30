import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Attendance from "./pages/Attendance";
import Calendar from "./pages/Calendar";
import Teams from "./pages/Teams";
import Events from "./pages/Events";
import Bios from "./pages/Bios";
import FrontPage from "./pages/FrontPage"
import Admins from "./pages/Admins";
import { onAuthStateChanged, getIdTokenResult } from "@firebase/auth";
import { auth, db } from "./firebase";
import { UserContext } from "./contexts/UserContext";
import Navbar from "./components/general/Navbar";
import { getDoc, doc } from "@firebase/firestore";
import TransferOwnership from "./pages/TransferOwnership";
import CatchAll from "./pages/CatchAll";
import ResetPassword from "./components/general/ResetPassword";

export const App = () => {

  const [user, setUser] = useState(null)

  useEffect(() => {

    onAuthStateChanged(auth, async user => {

      if (user) {
        const userSnapshot = await getDoc(doc(db, "users", user.uid))
        const idTokenResult = await getIdTokenResult(user)
        user.owner = idTokenResult.claims.role === "owner"
        user.admin = idTokenResult.claims.role === "owner" || idTokenResult.claims.role === "admin" 
        user.exec = idTokenResult.claims.role === "owner" || idTokenResult.claims.role === "admin" || idTokenResult.claims.role === "exec"
        user.officer = idTokenResult.claims.role === "owner" || idTokenResult.claims.role === "admin" || idTokenResult.claims.role === "exec" || idTokenResult.claims.role === "officer"
        user.firstName = userSnapshot.data().firstName
        user.lastName = userSnapshot.data().lastName
        user.grade = userSnapshot.data().grade
        user.profileBackgroundColor = userSnapshot.data().profileBackgroundColor
      }
      setUser(user)
    })
  }, [])

  return (
    <Router>
      <UserContext.Provider value={user}>
        {user ? (
          <>
            <Navbar/>
            <Routes>
              <Route exact path="/" element={<Home/>}/>
              <Route exact path="/attendance" element={<Attendance/>}/>
              <Route exact path="/calendar" element={<Calendar/>}/>
              <Route exact path="/teams" element={<Teams/>}/>
              <Route exact path="/events" element={<Events/>}/>
              <Route exact path="/bios" element={<Bios/>}/>
              {user.admin && <Route exact path="/admins" element={<Admins/>}/>}
              {user.owner && <Route exact path="/transfer-ownership" element={<TransferOwnership/>}/>}
              <Route exact path="/reset-password" element={<ResetPassword/>}/>
              <Route path="/*" element={<CatchAll/>}/>
            </Routes>
          </>
        ) :
          <Routes> 
            <Route exact path="/reset-password" element={<ResetPassword/>}/>
            <Route path="/*" element={<FrontPage/>}/>
          </Routes>
          
        }
        
          
      </UserContext.Provider>
    </Router>
  )
}

export default App;
