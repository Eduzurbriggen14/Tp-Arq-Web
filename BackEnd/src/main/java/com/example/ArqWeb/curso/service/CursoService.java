package com.example.ArqWeb.curso.service;


import com.example.ArqWeb.curso.entity.Curso;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface CursoService {

    public Curso crearCurso(Curso curso);
    public List<Curso> listarCursos();
    public Optional<Curso> obtenerCursoPorCodigo(long codigoCurso);
    public void eliminarCurso(long codigoCurso);
}
