package com.example.ArqWeb.inscripcion.dto;

import java.time.LocalDate;

public record MostrarInscripcionDTO(long cod_inscripcion, String nombreAlumno, String nombreCurso, LocalDate fechaInsc, String estado) {
}
