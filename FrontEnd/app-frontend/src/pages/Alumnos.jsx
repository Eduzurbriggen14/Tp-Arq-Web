import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from "../components/ui/input.jsx"; // Verifica que esta ruta sea correcta
import Button from "../components/ui/button.jsx"; // Verifica que esta ruta sea correcta
import { Card, CardContent } from "../components/ui/card.jsx"; // Verifica que esta ruta sea correcta

// URL base de la API para tu entorno local (backend corriendo en IntelliJ)
const API = "http://localhost:8080/api";

export default function Alumnos() {
  const [nuevoAlumno, setNuevoAlumno] = useState({ nombre: "", apellido: "", dni: "", correo: "" });
  const [alumnos, setAlumnos] = useState([]);
  const [alumnoEditando, setAlumnoEditando] = useState({ legajo: null, nombre: "", apellido: "" });
  const [mostrarModal, setMostrarModal] = useState(false);
  const [errors, setErrors] = useState({}); 


  //Cargar alumnos desde la base de datos
  const fetchAlumnos = async () => {
    try {
      const res = await axios.get(`${API}/alumnos`);
      setAlumnos(res.data);
    } catch (error) { 
      console.error("Error al cargar alumnos:", error);
      alert("Error al cargar alumnos");
    }
  };

  const validateForm = () => {
    let newErrors = {};

  
    if (!nuevoAlumno.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio.";
    }
    if (!nuevoAlumno.apellido.trim()) {
      newErrors.apellido = "El apellido es obligatorio.";
    }
    if (!nuevoAlumno.correo.trim()) {
      newErrors.correo = "El correo es obligatorio.";
    } else if (!/\S+@\S+\.\S+/.test(nuevoAlumno.correo)) { 
      newErrors.correo = "El formato del correo no es válido.";
    }

    if (!nuevoAlumno.dni.trim()) { 
      newErrors.dni = "El DNI es obligatorio.";
    } else if (isNaN(Number(nuevoAlumno.dni))) { 
      newErrors.dni = "El DNI debe ser un número.";
    }

    setErrors(newErrors); 
    return Object.keys(newErrors).length === 0; 
  };

  const crearAlumno = async (e) => {
    e.preventDefault(); 

    if (!validateForm()) { 
      alert("Por favor, completa todos los campos requeridos y corrige los errores.");
      return; 
    }

    
    
    const dataToSend = {
      nombre: nuevoAlumno.nombre,
      apellido: nuevoAlumno.apellido,
      dni: Number(nuevoAlumno.dni), 
      correo: nuevoAlumno.correo
    };

    try {
      await axios.post(`${API}/alumnos`, dataToSend); 
      setNuevoAlumno({ nombre: "", apellido: "", dni: "", correo: "" }); 
      setErrors({}); 
      fetchAlumnos(); 
    } catch (error) {
      console.error("Error al crear alumno:", error.response?.data || error.message || error); 
      alert("Error al crear alumno");
    }
  };

 
  const eliminarAlumno = async (legajo) => {
    try {
      await axios.delete(`${API}/alumnos/${legajo}`);
      fetchAlumnos();
    } catch (error) {
      console.error("Error al eliminar alumno:", error);
      alert("Error al eliminar alumno");
    }
  };

 
  const abrirModalEdicion = (alumno) => {
    setAlumnoEditando({ legajo: alumno.legajo, nombre: alumno.nombre, apellido: alumno.apellido });
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setAlumnoEditando({ legajo: null, nombre: "", apellido: "" });
  };

  const guardarEdicion = async () => {
    try {
      await axios.patch(`${API}/alumnos/${alumnoEditando.legajo}`, {
        nombre: alumnoEditando.nombre,
        apellido: alumnoEditando.apellido,
      });
      cerrarModal();
      fetchAlumnos();
    } catch (error) { 
      console.error("Error al actualizar alumno:", error);
      alert("Error al actualizar alumno");
    }
  };

  useEffect(() => {
    fetchAlumnos();
  }, []); 

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="mb-4">
        <CardContent>
          <h1 className="text-xxl font-semibold mb-4">Registro de Alumnos</h1>
          <form onSubmit={crearAlumno} className="space-y-4">
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
              <Input
                id="nombre"
                placeholder="Nombre"
                value={nuevoAlumno.nombre}
                onChange={e => {
                  setNuevoAlumno({ ...nuevoAlumno, nombre: e.target.value });
                  if (errors.nombre) setErrors({ ...errors, nombre: undefined });
                }}
                className={errors.nombre ? "border-red-500" : ""}
              />
              {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
            </div>
            <div>
              <label htmlFor="apellido" className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
              <Input
                id="apellido"
                placeholder="Apellido"
                value={nuevoAlumno.apellido}
                onChange={e => {
                  setNuevoAlumno({ ...nuevoAlumno, apellido: e.target.value });
                  if (errors.apellido) setErrors({ ...errors, apellido: undefined });
                }}
                className={errors.apellido ? "border-red-500" : ""}
              />
              {errors.apellido && <p className="text-red-500 text-xs mt-1">{errors.apellido}</p>}
            </div>
            <div>
              <label htmlFor="dni" className="block text-sm font-medium text-gray-700 mb-1">DNI (sin puntos)</label>
              <Input
                id="dni"
                placeholder="Ej: 12555666"
                value={nuevoAlumno.dni}
                onChange={e => {
                  setNuevoAlumno({ ...nuevoAlumno, dni: e.target.value });
                  if (errors.dni) setErrors({ ...errors, dni: undefined });
                }}
                type="text"
                className={errors.dni ? "border-red-500" : ""}
              />
              {errors.dni && <p className="text-red-500 text-xs mt-1">{errors.dni}</p>}
            </div>
            <div>
              <label htmlFor="correo" className="block text-sm font-medium text-gray-700 mb-1">Correo</label>
              <Input
                id="correo"
                placeholder="Correo"
                value={nuevoAlumno.correo}
                onChange={e => {
                  setNuevoAlumno({ ...nuevoAlumno, correo: e.target.value });
                  if (errors.correo) setErrors({ ...errors, correo: undefined });
                }}
                className={errors.correo ? "border-red-500" : ""}
              />
              {errors.correo && <p className="text-red-500 text-xs mt-1">{errors.correo}</p>}
            </div>
            <div>
              <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">Guardar</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h1 className="text-xxl font-semibold mb-4">Lista de Alumnos</h1>
          {alumnos.length === 0 ? (
            <p>No hay alumnos cargados aún.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border px-4 py-2 text-left">Nombre</th>
                    <th className="border px-4 py-2 text-left">Apellido</th>
                    <th className="border px-4 py-2 text-left">DNI</th>
                    <th className="border px-4 py-2 text-left">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {alumnos.map((alumno) => (
                    <tr key={alumno.legajo} className="hover:bg-gray-50">
                      <td className="border px-4 py-2">{alumno.nombre}</td>
                      <td className="border px-4 py-2">{alumno.apellido}</td>
                      <td className="border px-4 py-2">{alumno.dni}</td>
                      <td className="border px-4 py-2 space-x-2">
                        <Button
                          onClick={() => abrirModalEdicion(alumno)}
                          className="bg-yellow-500 text-white hover:bg-yellow-600"
                        >
                          Editar
                        </Button>
                        <Button
                          onClick={() => eliminarAlumno(alumno.legajo)}
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

      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-md">
            <h2 className="text-xl font-bold mb-4">Editar Alumno</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Nombre</label>
              <Input
                value={alumnoEditando.nombre || ""}
                onChange={(e) => setAlumnoEditando({ ...alumnoEditando, nombre: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Apellido</label>
              <Input
                value={alumnoEditando.apellido || ""}
                onChange={(e) => setAlumnoEditando({ ...alumnoEditando, apellido: e.target.value })}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button className="bg-gray-500 text-white hover:bg-gray-600" onClick={cerrarModal}>
                Cancelar
              </Button>
              <Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={guardarEdicion}>
                Guardar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}