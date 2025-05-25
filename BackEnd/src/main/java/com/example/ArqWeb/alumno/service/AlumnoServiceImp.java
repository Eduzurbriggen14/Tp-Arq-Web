package com.example.ArqWeb.alumno.service;

import com.example.ArqWeb.alumno.entity.Alumno;
import com.example.ArqWeb.alumno.repository.AlumnoRespository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class AlumnoServiceImp implements AlumnoService{

    private final AlumnoRespository alumnoRespository;

    public AlumnoServiceImp(AlumnoRespository alumnoRespository){
        this.alumnoRespository = alumnoRespository;
    }

    @Override
    public Optional<Alumno> obtenerAlumnoPorLegajo(long legajo){
        return alumnoRespository.findByLegajo(legajo);
    }

    @Override
    public Alumno crearAlumno(Alumno alumno){
        return alumnoRespository.save(alumno);
    }

    @Override
    public List<Alumno> listarAlumnos(){
        return alumnoRespository.findAll();
    }
    @Override
    public boolean existeAlumnoConDni(int dni){
        return alumnoRespository.existsByDni(dni);
    }
    @Override
    public Alumno guardarAlumno(Alumno alumno){
        return alumnoRespository.save(alumno);
    }
    @Override
    public void eliminarAlumno(long legajo){
        alumnoRespository.deleteById(legajo);
    }
}
