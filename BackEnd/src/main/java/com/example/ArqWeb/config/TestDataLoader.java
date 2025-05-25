package com.example.ArqWeb.config;

import com.example.ArqWeb.alumno.entity.Alumno;
import com.example.ArqWeb.alumno.repository.AlumnoRespository;
import com.example.ArqWeb.curso.entity.Curso;
import com.example.ArqWeb.curso.repository.CursoRepository;
import com.example.ArqWeb.inscripcion.entity.Inscripcion;
import com.example.ArqWeb.inscripcion.repository.InscripcionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Component
public class TestDataLoader implements CommandLineRunner {

    private final Logger logger = LoggerFactory.getLogger(TestDataLoader.class);

    @Autowired
    private AlumnoRespository alumnoRepository;

    @Autowired
    private CursoRepository cursoRepository;

    @Autowired
    private InscripcionRepository inscripcionRepository;

    @Override
    public void run(String... args) throws Exception {
        logger.info("Cargando datos de prueba...");

        // Verifica si ya existen datos para evitar duplicados
        if (alumnoRepository.count() == 0 && cursoRepository.count() == 0 && inscripcionRepository.count() == 0) {
            // Primero cargar alumnos y cursos
            List<Alumno> alumnos = cargarAlumnos();
            List<Curso> cursos = cargarCursos();

            // Luego cargar inscripciones (dependen de alumnos y cursos)
            cargarInscripciones(alumnos, cursos);

            logger.info("Datos de prueba cargados exitosamente.");
        } else {
            logger.info("Los datos ya estaban cargados. No se realizaron cambios.");
        }
    }

    private List<Alumno> cargarAlumnos() {
        List<Alumno> alumnos = new ArrayList<>();

        // Alumno 1
        Alumno alumno1 = new Alumno();
        //alumno1.setLegajo(1);
        alumno1.setNombre("Juan");
        alumno1.setApellido("Pérez");
        alumno1.setDni(35123456);
        alumno1.setCorreo("juan.perez@ejemplo.com");
        alumnos.add(alumnoRepository.save(alumno1));

        // Alumno 2
        Alumno alumno2 = new Alumno();
        //alumno1.setLegajo(2);
        alumno2.setNombre("María");
        alumno2.setApellido("González");
        alumno2.setDni(36789012);
        alumno2.setCorreo("maria.gonzalez@ejemplo.com");
        alumnos.add(alumnoRepository.save(alumno2));

        // Alumno 3
        Alumno alumno3 = new Alumno();
        //alumno1.setLegajo(3);
        alumno3.setNombre("Carlos");
        alumno3.setApellido("Rodríguez");
        alumno3.setDni(37456789);
        alumno3.setCorreo("carlos.rodriguez@ejemplo.com");
        alumnos.add(alumnoRepository.save(alumno3));

        logger.info("3 alumnos cargados correctamente");
        return alumnos;
    }

    private List<Curso> cargarCursos() {
        List<Curso> cursos = new ArrayList<>();

        // Curso 1
        Curso curso1 = new Curso();
        //curso1.setCodCurso(1);
        curso1.setNombreCurso("Programación Java");
        curso1.setDescCurso("Curso completo de programación en Java desde cero");
        curso1.setPrecioCurso(25000.00);
        curso1.setVacantes(30);
        cursos.add(cursoRepository.save(curso1));

        // Curso 2
        Curso curso2 = new Curso();
        //curso2.setCodCurso(2);
        curso2.setNombreCurso("Desarrollo Web");
        curso2.setDescCurso("HTML, CSS y JavaScript para principiantes");
        curso2.setPrecioCurso(18500.00);
        curso2.setVacantes(25);
        cursos.add(cursoRepository.save(curso2));

        // Curso 3
        Curso curso3 = new Curso();
        //curso3.setCodCurso(3);
        curso3.setNombreCurso("Base de Datos SQL");
        curso3.setDescCurso("Diseño y gestión de bases de datos relacionales");
        curso3.setPrecioCurso(22000.00);
        curso3.setVacantes(20);
        cursos.add(cursoRepository.save(curso3));


        logger.info("3 cursos cargados correctamente");
        return cursos;
    }

    private void cargarInscripciones(List<Alumno> alumnos, List<Curso> cursos) {
        String[] estados = {"ACTIVA", "FINALIZADA", "CANCELADA"};

        // Inscripción 1: Juan en Programación Java
        Inscripcion inscripcion1 = new Inscripcion();
        //inscripcion1.setCodInscripcion(1);
        inscripcion1.setFechaInscripcion(LocalDate.now().minusDays(15));
        inscripcion1.setEstadoInscripcion("ACTIVA");
        inscripcion1.setAlumno(alumnos.get(0)); // Juan
        inscripcion1.setCurso(cursos.get(0));   // Programación Java
        inscripcionRepository.save(inscripcion1);

        // Inscripción 2: María en Desarrollo Web
        Inscripcion inscripcion2 = new Inscripcion();
        //inscripcion2.setCodInscripcion(2);
        inscripcion2.setFechaInscripcion(LocalDate.now().minusDays(20));
        inscripcion2.setEstadoInscripcion("ACTIVA");
        inscripcion2.setAlumno(alumnos.get(1)); // María
        inscripcion2.setCurso(cursos.get(1));   // Desarrollo Web
        inscripcionRepository.save(inscripcion2);

        // Inscripción 3: Carlos en Base de Datos SQL
        Inscripcion inscripcion3 = new Inscripcion();
        //inscripcion3.setCodInscripcion(3);
        inscripcion3.setFechaInscripcion(LocalDate.now().minusDays(10));
        inscripcion3.setEstadoInscripcion("ACTIVA");
        inscripcion3.setAlumno(alumnos.get(2)); // Carlos
        inscripcion3.setCurso(cursos.get(2));   // Base de Datos SQL
        inscripcionRepository.save(inscripcion3);



        logger.info("3 inscripciones cargadas correctamente");
    }
}