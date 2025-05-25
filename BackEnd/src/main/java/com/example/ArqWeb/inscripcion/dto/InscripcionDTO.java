package com.example.ArqWeb.inscripcion.dto;

import java.time.LocalDate;

public record InscripcionDTO(long codInscripcion, LocalDate fechaInscripcion, String estado, long legajoAlumno, long codCurso) {
}
