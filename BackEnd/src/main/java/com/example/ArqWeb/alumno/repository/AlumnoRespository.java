package com.example.ArqWeb.alumno.repository;

import com.example.ArqWeb.alumno.entity.Alumno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AlumnoRespository extends JpaRepository< Alumno,Long> {
    Optional<Alumno> findByLegajo(long legajo);

    boolean existsByDni(int dni);
}
