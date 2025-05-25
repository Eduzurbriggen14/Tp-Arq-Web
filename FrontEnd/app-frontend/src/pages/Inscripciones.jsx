/*
import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from "../components/ui/input.jsx";
import Button from "../components/ui/button.jsx";
import { Card, CardContent } from "../components/ui/card.jsx";

const API = "http://localhost:8080/api";

export default function Inscripciones() {
  const [seleccionAlumno, setSeleccionAlumno] = useState("");
  const [seleccionCurso, setSeleccionCurso] = useState("");
  const [inscripciones, setInscripciones] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortColumn, setSortColumn] = useState("nombreAlumno");
  const [alumnosOptions, setAlumnosOptions] = useState([]);
  const [cursosOptions, setCursosOptions] = useState([]);

  const fetchDatos = async () => {
    try {
      const [resAlumnos, resCursos, resInscripciones] = await Promise.all([
        axios.get(`${API}/alumnos`),
        axios.get(`${API}/cursos`),
        axios.get(`${API}/inscripciones`),
      ]);
      setAlumnosOptions(resAlumnos.data);
      setCursosOptions(resCursos.data);
      setInscripciones(resInscripciones.data);
    } catch (error) {
      console.error(error);
      alert("Error al cargar datos");
    }
  };

  const crearInscripcion = async (e) => {
    e.preventDefault();
    if (!seleccionAlumno || !seleccionCurso) {
      alert("Por favor selecciona alumno y curso");
      return;
    }
    console.log("Inscripciones.jsx: ID de curso al enviar:", seleccionCurso);
    try {
      await axios.post(`${API}/inscripciones`, {
        legajo: seleccionAlumno,
        codCurso: seleccionCurso,
      });
      setSeleccionAlumno("");
      setSeleccionCurso("");
      fetchDatos();
      alert("Inscripción exitosa");
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 409) {
        alert("El curso no posee cupo"); 
      } else {
        alert("Error al inscribir alumno");
      }

    }
  };

  useEffect(() => {
    fetchDatos();
  }, []);

  const sortInscripciones = (data, by, direction) => {
    if (!by) return data;

    return [...data].sort((a, b) => {
      let comparison = 0;
      if (by === "nombreCurso") {
        comparison = a.nombreCurso.localeCompare(b.nombreCurso);
      } else if (by === "fechaInsc") {
        const dateA = new Date(a.fechaInsc);
        const dateB = new Date(b.fechaInsc);
        comparison = dateA - dateB;
      } else if (by === "nombreAlumno") {
        comparison = a.nombreAlumno.localeCompare(b.nombreAlumno);
      }
      return direction === "asc" ? comparison : comparison * -1;
    });
  };

  const handleSortColumnChange = (e) => {
    setSortColumn(e.target.value);
    setSortBy(e.target.value);
    setSortDirection("asc");
  };

  const handleSortDirectionChange = (by) => {
    if (sortBy === by) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(by);
      setSortDirection("asc");
    }
  };

  const sortedInscripciones = sortInscripciones(inscripciones, sortBy || sortColumn, sortDirection);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardContent>
          <h1 className="text-xxl font-semibold mb-4">Inscribir Alumno a Curso</h1>
          <form onSubmit={crearInscripcion} className="space-y-4">
            <div>
              <label htmlFor="seleccionAlumno" className="block text-sm font-medium mb-1">Alumno</label>
              <select
                id="seleccionAlumno"
                className="w-full border border-gray-300 rounded-md p-2"
                value={seleccionAlumno}
                onChange={(e) => setSeleccionAlumno(e.target.value)}
              >
                <option value="">-- Seleccionar Alumno --</option>
                {alumnosOptions.map((a) => (
                  <option key={a.legajo} value={a.legajo}>
                    {a.nombre} {a.apellido}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="seleccionCurso" className="block text-sm font-medium mb-1">Curso</label>
              <select
                id="seleccionCurso"
                className="w-full border border-gray-300 rounded-md p-2"
                value={seleccionCurso}
                onChange={(e) => setSeleccionCurso(e.target.value)}
              >
                <option value="">-- Seleccionar Curso --</option>
                {cursosOptions.map((c) => (
                  <option key={c.codCurso} value={c.codCurso}>
                    {c.nombreCurso || c.nombre}
                  </option>
                ))}
              </select>
            </div>
            <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">Inscribir</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h1 className="text-xxl font-semibold mb-4">Listado de Inscripciones</h1>

          <div className="mb-4">
            <label htmlFor="sortColumn" className="block text-sm font-medium mb-1">Ordenar por:</label>
            <select
              id="sortColumn"
              className="w-full border border-gray-300 rounded-md p-2"
              value={sortColumn}
              onChange={handleSortColumnChange}
            >
              <option value="nombreAlumno">Alumno</option>
              <option value="nombreCurso">Curso</option>
              <option value="fechaInsc">Fecha de Inscripción</option>
            </select>
          </div>

          {inscripciones.length === 0 ? (
            <p>No hay inscripciones registradas.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border border-gray-300">
                <thead className="bg-[#e0f2f7] text-black">
                  <tr className="bg-gray-100">
                    <th
                      className="border px-4 py-2 text-left cursor-pointer"
                      onClick={() => handleSortDirectionChange("nombreAlumno")}
                    >
                      Alumno {sortBy === "nombreAlumno" && (sortDirection === "asc" ? "▲" : "▼")}
                    </th>
                    <th
                      className="border px-4 py-2 text-left cursor-pointer"
                      onClick={() => handleSortDirectionChange("nombreCurso")}
                    >
                      Curso {sortBy === "nombreCurso" && (sortDirection === "asc" ? "▲" : "▼")}
                    </th>
                    <th
                      className="border px-4 py-2 text-left cursor-pointer"
                      onClick={() => handleSortDirectionChange("fechaInsc")}
                    >
                      Fecha Inscripcion {sortBy === "fechaInsc" && (sortDirection === "asc" ? "▲" : "▼")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedInscripciones.map((i, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="border px-4 py-2">{i.nombreAlumno}</td>
                      <td className="border px-4 py-2">{i.nombreCurso}</td>
                      <td className="border px-4 py-2">{i.fechaInsc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}*/

import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from "../components/ui/input.jsx";
import Button from "../components/ui/button.jsx";
import { Card, CardContent } from "../components/ui/card.jsx";

const API = "http://localhost:8080/api";

export default function Inscripciones() {
  const [seleccionAlumno, setSeleccionAlumno] = useState("");
  const [seleccionCurso, setSeleccionCurso] = useState("");
  const [inscripciones, setInscripciones] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortColumn, setSortColumn] = useState("nombreAlumno");
  const [alumnosOptions, setAlumnosOptions] = useState([]);
  const [cursosOptions, setCursosOptions] = useState([]);

  const fetchDatos = async () => {
    try {
      const [resAlumnos, resCursos, resInscripciones] = await Promise.all([
        axios.get(`${API}/alumnos`),
        axios.get(`${API}/cursos`),
        axios.get(`${API}/inscripciones`),
      ]);
      setAlumnosOptions(resAlumnos.data);
      setCursosOptions(resCursos.data);
      setInscripciones(resInscripciones.data);
    } catch (error) {
      console.error(error);
      alert("Error al cargar datos");
    }
  };

  const crearInscripcion = async (e) => {
    e.preventDefault();
    if (!seleccionAlumno || !seleccionCurso) {
      alert("Por favor selecciona alumno y curso");
      return;
    }
    try {
      await axios.post(`${API}/inscripciones`, {
        legajo: seleccionAlumno,
        codCurso: seleccionCurso,
      });
      setSeleccionAlumno("");
      setSeleccionCurso("");
      fetchDatos();
      alert("Inscripción exitosa");
    } catch (error) {
      console.error(error);
      if (error.response?.status === 409) {
        alert("El curso no posee cupo");
      } else {
        alert("Error al inscribir alumno");
      }
    }
  };
const eliminarInscripcion = async (codInsc) => {
  if (!window.confirm("¿Seguro que querés eliminar esta inscripción?")) return;
  try {
    await axios.delete(`${API}/inscripciones/${codInsc}`);
    alert("Inscripción eliminada");
    fetchDatos();
  } catch (error) {
    console.error(error);
    alert("Error al eliminar inscripción");
  }
};

  useEffect(() => {
    fetchDatos();
  }, []);

  const sortInscripciones = (data, by, direction) => {
    if (!by) return data;
    return [...data].sort((a, b) => {
      let comparison = 0;
      if (by === "nombreCurso") {
        comparison = a.nombreCurso.localeCompare(b.nombreCurso);
      } else if (by === "fechaInsc") {
        comparison = new Date(a.fechaInsc) - new Date(b.fechaInsc);
      } else if (by === "nombreAlumno") {
        comparison = a.nombreAlumno.localeCompare(b.nombreAlumno);
      }
      return direction === "asc" ? comparison : comparison * -1;
    });
  };

  const handleSortColumnChange = (e) => {
    setSortColumn(e.target.value);
    setSortBy(e.target.value);
    setSortDirection("asc");
  };

  const handleSortDirectionChange = (by) => {
    if (sortBy === by) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(by);
      setSortDirection("asc");
    }
  };

  const sortedInscripciones = sortInscripciones(inscripciones, sortBy || sortColumn, sortDirection);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardContent>
          <h1 className="text-xxl font-semibold mb-4">Inscribir Alumno a Curso</h1>
          <form onSubmit={crearInscripcion} className="space-y-4">
            <div>
              <label htmlFor="seleccionAlumno" className="block text-sm font-medium mb-1">Alumno</label>
              <select
                id="seleccionAlumno"
                className="w-full border border-gray-300 rounded-md p-2"
                value={seleccionAlumno}
                onChange={(e) => setSeleccionAlumno(e.target.value)}
              >
                <option value="">-- Seleccionar Alumno --</option>
                {alumnosOptions.map((a) => (
                  <option key={a.legajo} value={a.legajo}>
                    {a.nombre} {a.apellido}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="seleccionCurso" className="block text-sm font-medium mb-1">Curso</label>
              <select
                id="seleccionCurso"
                className="w-full border border-gray-300 rounded-md p-2"
                value={seleccionCurso}
                onChange={(e) => setSeleccionCurso(e.target.value)}
              >
                <option value="">-- Seleccionar Curso --</option>
                {cursosOptions.map((c) => (
                  <option key={c.codCurso} value={c.codCurso}>
                    {c.nombreCurso || c.nombre}
                  </option>
                ))}
              </select>
            </div>
            <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">Inscribir</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h1 className="text-xxl font-semibold mb-4">Listado de Inscripciones</h1>

          <div className="mb-4">
            <label htmlFor="sortColumn" className="block text-sm font-medium mb-1">Ordenar por:</label>
            <select
              id="sortColumn"
              className="w-full border border-gray-300 rounded-md p-2"
              value={sortColumn}
              onChange={handleSortColumnChange}
            >
              <option value="nombreAlumno">Alumno</option>
              <option value="nombreCurso">Curso</option>
              <option value="fechaInsc">Fecha de Inscripción</option>
            </select>
          </div>

          {inscripciones.length === 0 ? (
            <p>No hay inscripciones registradas.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border border-gray-300">
                <thead className="bg-[#e0f2f7] text-black">
                  <tr className="bg-gray-100">
                    <th className="border px-4 py-2 cursor-pointer" onClick={() => handleSortDirectionChange("nombreAlumno")}>
                      Alumno {sortBy === "nombreAlumno" && (sortDirection === "asc" ? "▲" : "▼")}
                    </th>
                    <th className="border px-4 py-2 cursor-pointer" onClick={() => handleSortDirectionChange("nombreCurso")}>
                      Curso {sortBy === "nombreCurso" && (sortDirection === "asc" ? "▲" : "▼")}
                    </th>
                    <th className="border px-4 py-2 cursor-pointer" onClick={() => handleSortDirectionChange("fechaInsc")}>
                      Fecha Inscripción {sortBy === "fechaInsc" && (sortDirection === "asc" ? "▲" : "▼")}
                    </th>
                    <th className="border px-4 py-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
  {sortedInscripciones.map((i, idx) => (
    <tr key={idx} className="hover:bg-gray-50">
      <td className="border px-4 py-2">{i.nombreAlumno}</td>
      <td className="border px-4 py-2">{i.nombreCurso}</td>
      <td className="border px-4 py-2">{i.fechaInsc}</td>
      <td className="border px-4 py-2">
        <button
          onClick={() => {
          eliminarInscripcion(i.cod_inscripcion);
        }}
          className="bg-red-600 text-white hover:bg-red-700"
        >
          Eliminar
        </button>
      </td>
    </tr>
  ))}
</tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
