package com.example.ArqWeb.inscripcion.entity;

import com.example.ArqWeb.alumno.entity.Alumno;
import com.example.ArqWeb.curso.entity.Curso;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "inscripciones")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Inscripcion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cod_inscripcion")
    private long codInscripcion;

    @Column(name = "fecha_inscripcion", nullable = false)
    private LocalDate fechaInscripcion;

    @Column(name = "estado_inscripcion")
    private String estadoInscripcion;

    @ManyToOne
    @JoinColumn(name = "legajo")
    private Alumno alumno;

    @ManyToOne
    @JoinColumn(name = "cod_curso", nullable = false)
    private Curso curso;

    public long getCodInscripcion() {
        return codInscripcion;
    }

    public void setCodInscripcion(long codInscripcion) {
        this.codInscripcion = codInscripcion;
    }

    public LocalDate getFechaInscripcion() {
        return fechaInscripcion;
    }

    public void setFechaInscripcion(LocalDate fechaInscripcion) {
        this.fechaInscripcion = fechaInscripcion;
    }

    public String getEstadoInscripcion() {
        return estadoInscripcion;
    }

    public void setEstadoInscripcion(String estadoInscripcion) {
        this.estadoInscripcion = estadoInscripcion;
    }

    public Alumno getAlumno() {
        return alumno;
    }

    public void setAlumno(Alumno alumno) {
        this.alumno = alumno;
    }

    public Curso getCurso() {
        return curso;
    }

    public void setCurso(Curso curso) {
        this.curso = curso;
    }
}
