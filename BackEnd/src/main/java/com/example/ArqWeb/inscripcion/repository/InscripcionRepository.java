package com.example.ArqWeb.inscripcion.repository;

import com.example.ArqWeb.inscripcion.entity.Inscripcion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InscripcionRepository extends JpaRepository<Inscripcion ,Long> {
}
