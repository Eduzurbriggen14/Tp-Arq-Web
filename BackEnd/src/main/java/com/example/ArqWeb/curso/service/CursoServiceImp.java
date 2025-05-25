package com.example.ArqWeb.curso.service;

import com.example.ArqWeb.curso.entity.Curso;
import com.example.ArqWeb.curso.repository.CursoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CursoServiceImp implements CursoService {

    private final CursoRepository cursoRepository;

    public CursoServiceImp(CursoRepository cursoRepository) {
        this.cursoRepository = cursoRepository;
    }

    @Override
    public Curso crearCurso(Curso curso){
        return cursoRepository.save(curso);
    }
    @Override
    public List<Curso> listarCursos(){
        return cursoRepository.findAll();
    }
    @Override
    public Optional<Curso> obtenerCursoPorCodigo(long codigoCurso){
        return cursoRepository.findById(codigoCurso);
    }
    @Override
    public void eliminarCurso(long codigoCurso){
        cursoRepository.deleteById(codigoCurso);
    }
}
