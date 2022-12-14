import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Attendance from "./pages/Attendance";
import Calendar from "./pages/Calendar";
import Teams from "./pages/Teams";
import Events from "./pages/Events";
import AboutUs from "./pages/AboutUs";
import FrontPage from "./pages/FrontPage"
import Admins from "./pages/Admins";
import { onAuthStateChanged, getIdTokenResult } from "@firebase/auth";
import { httpsCallable } from "@firebase/functions"
import { auth, db, functions } from "./firebase";
import { UserContext } from "./contexts/UserContext";
import Navbar from "./components/general/Navbar";
import { getDoc, doc, onSnapshot } from "@firebase/firestore";
import TransferOwnership from "./pages/TransferOwnership";
import UserNotInDatabase from "./components/general/UserNotInDatabase";
import PageNotFound from "./components/general/PageNotFound";
import Help from "./pages/Help";
import Settings from "./pages/Settings";
import FullLoadingScreen from "./components/general/FullLoadingScreen";

export const App = () => {

  const [user, setUser] = useState(null)
  const [userInDb, setUserInDb] = useState(false)
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState("light")

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      
      if (user) {
        const userSnapshot = await getDoc(doc(db, "users", user.uid))
        if (userSnapshot.exists()) {
          const idTokenResult = await getIdTokenResult(user)
          user.owner = idTokenResult.claims.role === "owner"
          user.admin = idTokenResult.claims.role === "owner" || idTokenResult.claims.role === "admin" 
          user.exec = idTokenResult.claims.role === "owner" || idTokenResult.claims.role === "admin" || idTokenResult.claims.role === "exec"
          user.officer = idTokenResult.claims.role === "owner" || idTokenResult.claims.role === "admin" || idTokenResult.claims.role === "exec" || idTokenResult.claims.role === "officer"
          user.firstName = userSnapshot.data().firstName
          user.lastName = userSnapshot.data().lastName
          user.grade = userSnapshot.data().grade
          user.phone = userSnapshot.data().phone
          user.optIn = userSnapshot.data().allowText
          user.theme = userSnapshot.data().theme
          setUser(user)
          setUserInDb(true)

          onSnapshot(doc(db, "users", user.uid), async querySnapshot => {
            if (!querySnapshot.exists() || querySnapshot.data().refresh) {
              const handleRefreshRequest = httpsCallable(functions, 'handleRefreshRequest')
              const result = await handleRefreshRequest({})
              if (result.data.error) {
                console.log(result.data.error)
              }
              window.location.reload()
            }
            
            if (querySnapshot.data().theme) {
              setTheme(querySnapshot.data().theme)
            } else {
              setTheme("light")
            }
            
          })

        } else {
          setUser(user)
          setUserInDb(false)
        } 
        
      }
      setLoading(false);

      

    })

      
    return () => unsubscribe();

  }, [])

  if (loading) {
    return <FullLoadingScreen/>;
  }

  return (
    <Router>
      <UserContext.Provider value={user}>
        {user ? 
          <>
            {userInDb ? 
                <div className="App" id={theme}>
                  <Navbar/>
                  <Routes>
                    <Route exact path="/" element={<Home/>}/>
                    <Route exact path="/help" element={<Help/>}/>
                    <Route exact path="/attendance" element={<Attendance/>}/>
                    <Route exact path="/calendar" element={<Calendar/>}/>
                    <Route exact path="/teams" element={<Teams/>}/>
                    <Route exact path="/events" element={<Events/>}/>
                    <Route exact path="/about-us" element={<AboutUs/>}/>
                    <Route exact path="/settings" element={<Settings/>}/>
                    {user.admin && <Route exact path="/admins" element={<Admins/>}/>}
                    {user.owner && <Route exact path="/transfer-ownership" element={<TransferOwnership/>}/>}
                    <Route path="/*" element={<PageNotFound/>}/>
                  </Routes>
                </div>
              : 
              <UserNotInDatabase/>
              }
            </>
          :
          <FrontPage/>
        }
        
          
      </UserContext.Provider>
    </Router>
  )
}

export default App;
