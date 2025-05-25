import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from "../components/ui/input.jsx";
import Button from "../components/ui/button.jsx";
import { Card, CardContent } from "../components/ui/card.jsx";

const API = "http://localhost:8080/api";

export default function Cursos() {
  const [nuevoCurso, setNuevoCurso] = useState({
    nombreCurso: "",
    descCurso: "",
    precioCurso: 0,
    vacantes: 0,
  });
  const [cursos, setCursos] = useState([]);

  const fetchCursos = async () => {
    try {
      const res = await axios.get(`${API}/cursos`);
      setCursos(res.data);
    } catch (error) {
      console.error(error);
      alert("Error al obtener cursos");
    }
  };

  const crearCurso = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/cursos`, nuevoCurso);
      setNuevoCurso({
        nombreCurso: "",
        descCurso: "",
        precioCurso: 0,
        vacantes: 0,
      });
      fetchCursos();
    } catch (error) {
      console.error(error);
      alert("Error al crear curso");
    }
  };

  const eliminarCurso = async (codCurso) => {
    try {
      await axios.delete(`${API}/cursos/${codCurso}`);
      fetchCursos();
    } catch (error) {
      console.error(error);
      alert("Error al eliminar curso");
    }
  };

  useEffect(() => {
    fetchCursos();
  }, []);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Formulario de Creación */}
      <Card>
        <CardContent>
          <h1 className="text-xxl font-semibold mb-4">Registro de Cursos</h1>
          <form onSubmit={crearCurso} className="space-y-4">
            <div>
              <label htmlFor="nombreCurso" className="block text-sm font-medium mb-1">
                Nombre del Curso
              </label>
              <Input
                id="nombreCurso"
                placeholder="Nombre del curso"
                value={nuevoCurso.nombreCurso}
                onChange={e =>
                  setNuevoCurso({ ...nuevoCurso, nombreCurso: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="descCurso" className="block text-sm font-medium mb-1">
                Descripción
              </label>
              <Input
                id="descCurso"
                placeholder="Descripción"
                value={nuevoCurso.descCurso}
                onChange={e =>
                  setNuevoCurso({ ...nuevoCurso, descCurso: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="precioCurso" className="block text-sm font-medium mb-1">
                Precio
              </label>
              <Input
                id="precioCurso"
                type="number"
                placeholder="Precio"
                value={nuevoCurso.precioCurso}
                onChange={e =>
                  setNuevoCurso({ ...nuevoCurso, precioCurso: Number(e.target.value) })
                }
              />
            </div>
            <div>
              <label htmlFor="vacantes" className="block text-sm font-medium mb-1">
                Vacantes
              </label>
              <Input
                id="vacantes"
                type="number"
                placeholder="Vacantes"
                value={nuevoCurso.vacantes}
                onChange={e =>
                  setNuevoCurso({ ...nuevoCurso, vacantes: Number(e.target.value) })
                }
              />
            </div>
            <div>
              <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">Guardar</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Tabla de Cursos */}
      <Card>
        <CardContent>
          <h1 className="text-xxl font-semibold mb-4">Lista de Cursos</h1>
          {cursos.length === 0 ? (
            <p>No hay cursos cargados aún.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border px-4 py-2 text-left">Nombre</th>
                    <th className="border px-4 py-2 text-left">Descripción</th>
                    <th className="border px-4 py-2 text-left">Precio</th>
                    <th className="border px-4 py-2 text-left">Vacantes</th>
                    <th className="border px-4 py-2 text-left">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {cursos.map(curso => (
                    <tr key={curso.codCurso} className="hover:bg-gray-50">
                      <td className="border px-4 py-2">{curso.nombreCurso}</td>
                      <td className="border px-4 py-2">{curso.descCurso}</td>
                      <td className="border px-4 py-2">${curso.precioCurso}</td>
                      <td className="border px-4 py-2">{curso.vacantes}</td>
                      <td className="border px-4 py-2">
                        <Button
                          onClick={() => eliminarCurso(curso.codCurso)}
                          className="bg-red-600 text-white hover:bg-red-700"
                        >
                          Eliminar
                        </Button>
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
