import { Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Semester from "./components/Semester";
import CT from "./components/CT";
import Admin from "./components/Admin";
import NotesRead from "./components/NotesRead";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/semester" element={<Semester/>}/>
      <Route path="ct" element={<CT/>}/>
      <Route path="/notes" element={<NotesRead/>}/>
      <Route path="/love" element={<Admin/>}/>

      
    </Routes>
  );
}

export default App;