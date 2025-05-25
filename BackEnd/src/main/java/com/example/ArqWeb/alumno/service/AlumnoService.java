package com.example.ArqWeb.alumno.service;

import com.example.ArqWeb.alumno.dto.AlumnoDTO;
import com.example.ArqWeb.alumno.entity.Alumno;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface AlumnoService {

    Optional<Alumno> obtenerAlumnoPorLegajo(long legajo);

    Alumno crearAlumno(Alumno alumno);

    List<Alumno> listarAlumnos();

    boolean existeAlumnoConDni(int dni);

    Alumno guardarAlumno(Alumno alumno);

    void eliminarAlumno(long legajo);
}
