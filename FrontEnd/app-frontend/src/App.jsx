import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header.jsx"; 
import Alumnos from "./pages/Alumnos.jsx";
import Cursos from "./pages/Cursos.jsx";
import Inscripciones from "./pages/Inscripciones.jsx";

function App() {
  return (
    <>
      <Header />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/alumnos" />} />
          <Route path="/alumnos" element={<Alumnos />} />
          <Route path="/cursos" element={<Cursos />} />
          <Route path="/inscripciones" element={<Inscripciones />} />
        </Routes>
      </div>
    </>
  );
}

export default App;