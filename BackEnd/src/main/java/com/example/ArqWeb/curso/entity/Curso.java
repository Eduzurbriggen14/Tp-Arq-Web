package com.example.ArqWeb.curso.entity;

import com.example.ArqWeb.inscripcion.entity.Inscripcion;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "cursos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Curso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "codigo_curso")
    private long codCurso;

    @Column(name = "nombre_curso", nullable = false)
    private String nombreCurso;

    @Column(name = "descripcion")
    private String descCurso;

    @Column(name= "precio_curso")
    private double precioCurso;

    @Column(name = "vacantes")
    private int vacantes;

    @OneToMany(mappedBy = "curso")
    private List<Inscripcion> inscripciones;

    public long getCodCurso() {
        return codCurso;
    }

    public void setCodCurso(long codCurso) {
        this.codCurso = codCurso;
    }

    public String getNombreCurso() {
        return nombreCurso;
    }

    public void setNombreCurso(String nombreCurso) {
        this.nombreCurso = nombreCurso;
    }

    public String getDescCurso() {
        return descCurso;
    }

    public void setDescCurso(String descCurso) {
        this.descCurso = descCurso;
    }

    public double getPrecioCurso() {
        return precioCurso;
    }

    public void setPrecioCurso(double precioCurso) {
        this.precioCurso = precioCurso;
    }

    public int getVacantes() {
        return vacantes;
    }

    public void setVacantes(int vacantes) {
        this.vacantes = vacantes;
    }

    public List<Inscripcion> getInscripciones() {
        return inscripciones;
    }

    public void setInscripciones(List<Inscripcion> inscripciones) {
        this.inscripciones = inscripciones;
    }
}
