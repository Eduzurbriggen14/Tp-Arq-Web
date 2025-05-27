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
    precioCurso: "", 
    vacantes: "",    
  });
  const [cursos, setCursos] = useState([]);
  const [errors, setErrors] = useState({}); 

  const fetchCursos = async () => {
    try {
      const res = await axios.get(`${API}/cursos`);
      setCursos(res.data);
    } catch (error) {
      console.error("Error al obtener cursos:", error); 
      alert("Error al obtener cursos");
    }
  };

  const validateForm = () => {
    let newErrors = {};

    if (!nuevoCurso.nombreCurso.trim()) {
      newErrors.nombreCurso = "El nombre del curso es obligatorio.";
    }
    if (!nuevoCurso.descCurso.trim()) {
      newErrors.descCurso = "La descripción del curso es obligatoria.";
    }

    if (!String(nuevoCurso.precioCurso).trim()) {
      newErrors.precioCurso = "El precio es obligatorio.";
    } else {
      const precio = Number(nuevoCurso.precioCurso);
      if (isNaN(precio)) {
        newErrors.precioCurso = "El precio debe ser un número.";
      } else if (precio <= 0) {
        newErrors.precioCurso = "El precio debe ser mayor que 0.";
      }
    }

    if (!String(nuevoCurso.vacantes).trim()) { 
      newErrors.vacantes = "Las vacantes son obligatorias.";
    } else {
      const vacantes = Number(nuevoCurso.vacantes);
      if (isNaN(vacantes)) {
        newErrors.vacantes = "Las vacantes deben ser un número.";
      } else if (!Number.isInteger(vacantes)) {
        newErrors.vacantes = "Las vacantes deben ser un número entero.";
      } else if (vacantes < 0) {
        newErrors.vacantes = "Las vacantes no pueden ser negativas.";
      }
    }

    setErrors(newErrors); 
    return Object.keys(newErrors).length === 0; 
  };

  const crearCurso = async (e) => {
    e.preventDefault();

    if (!validateForm()) { 
      alert("Por favor, completa todos los campos requeridos y corrige los errores.");
      return; 
    }

    const dataToSend = {
      nombreCurso: nuevoCurso.nombreCurso,
      descCurso: nuevoCurso.descCurso,
      precioCurso: parseFloat(nuevoCurso.precioCurso),
      vacantes: parseInt(nuevoCurso.vacantes, 10), 
    };

    try {
      await axios.post(`${API}/cursos`, dataToSend);
      setNuevoCurso({
        nombreCurso: "",
        descCurso: "",
        precioCurso: "", 
        vacantes: "",    
      });
      setErrors({}); 
      fetchCursos();
    } catch (error) {
      console.error("Error al crear curso:", error.response?.data || error.message || error);
      alert("Error al crear curso");
    }
  };

  const eliminarCurso = async (codCurso) => {
    try {
      await axios.delete(`${API}/cursos/${codCurso}`);
      fetchCursos();
    } catch (error) {
      console.error("Error al eliminar curso:", error);
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
                onChange={e => {
                  setNuevoCurso({ ...nuevoCurso, nombreCurso: e.target.value });
                  if (errors.nombreCurso) setErrors({ ...errors, nombreCurso: undefined });
                }}
                className={errors.nombreCurso ? "border-red-500" : ""}
              />
              {errors.nombreCurso && <p className="text-red-500 text-xs mt-1">{errors.nombreCurso}</p>}
            </div>
            <div>
              <label htmlFor="descCurso" className="block text-sm font-medium mb-1">
                Descripción
              </label>
              <Input
                id="descCurso"
                placeholder="Descripción"
                value={nuevoCurso.descCurso}
                onChange={e => {
                  setNuevoCurso({ ...nuevoCurso, descCurso: e.target.value });
                  if (errors.descCurso) setErrors({ ...errors, descCurso: undefined });
                }}
                className={errors.descCurso ? "border-red-500" : ""}
              />
              {errors.descCurso && <p className="text-red-500 text-xs mt-1">{errors.descCurso}</p>}
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
                onChange={e => {
                  setNuevoCurso({ ...nuevoCurso, precioCurso: e.target.value }); 
                  if (errors.precioCurso) setErrors({ ...errors, precioCurso: undefined });
                }}
                className={errors.precioCurso ? "border-red-500" : ""}
              />
              {errors.precioCurso && <p className="text-red-500 text-xs mt-1">{errors.precioCurso}</p>}
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
                onChange={e => {
                  setNuevoCurso({ ...nuevoCurso, vacantes: e.target.value }); 
                  if (errors.vacantes) setErrors({ ...errors, vacantes: undefined });
                }}
                className={errors.vacantes ? "border-red-500" : ""}
              />
              {errors.vacantes && <p className="text-red-500 text-xs mt-1">{errors.vacantes}</p>}
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