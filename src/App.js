import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Attendance from "./pages/Attendance";
import Calendar from "./pages/Calendar";
import Teams from "./pages/Teams";
import Events from "./pages/Events";
import Socials from "./pages/Socials";
import Bios from "./pages/Bios";


export const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/attendance" element={<Attendance/>}/>
        <Route exact path="/calendar" element={<Calendar/>}/>
        <Route exact path="/teams" element={<Teams/>}/>
        <Route exact path="/events" element={<Events/>}/>
        <Route exact path="/socials" element={<Socials/>}/>
        <Route exact path="/bios" element={<Bios/>}></Route>
      </Routes>
    </Router>
  )
}

export default App;
