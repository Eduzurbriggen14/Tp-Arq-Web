package com.example.ArqWeb.curso.repository;

import com.example.ArqWeb.curso.entity.Curso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CursoRepository extends JpaRepository<Curso, Long> {
    void deleteById(long codigoCurso);
}
