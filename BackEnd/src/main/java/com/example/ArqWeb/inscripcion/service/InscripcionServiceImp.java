package com.example.ArqWeb.inscripcion.service;

import com.example.ArqWeb.alumno.entity.Alumno;
import com.example.ArqWeb.alumno.repository.AlumnoRespository;
import com.example.ArqWeb.curso.entity.Curso;
import com.example.ArqWeb.curso.repository.CursoRepository;
import com.example.ArqWeb.exception.CupoCompletoException;
import com.example.ArqWeb.inscripcion.dto.MostrarInscripcionDTO;
import com.example.ArqWeb.inscripcion.entity.Inscripcion;
import com.example.ArqWeb.inscripcion.repository.InscripcionRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class InscripcionServiceImp implements InscripcionService{

    private final InscripcionRepository inscripcionRepository;
    private final AlumnoRespository alumnoRepository;
    private final CursoRepository cursoRepository;

    public InscripcionServiceImp(InscripcionRepository inscripcionRepository, AlumnoRespository alumnoRepository, CursoRepository cursoRepository) {
        this.inscripcionRepository = inscripcionRepository;
        this.alumnoRepository = alumnoRepository;
        this.cursoRepository = cursoRepository;
    }

    @Override
    @Transactional
    public Inscripcion guardarInscripcion(Long legajo, Long codCurso) throws CupoCompletoException {
        Alumno alumno = alumnoRepository.findById(legajo)
                .orElseThrow(() -> new EntityNotFoundException("Alumno no encontrado con ID: " + legajo));
        Curso curso = cursoRepository.findById(codCurso)
                .orElseThrow(() -> new EntityNotFoundException("Curso no encontrado con ID: " + codCurso));

        if (curso.getVacantes() <= 0) {
            throw new CupoCompletoException("El curso '" + curso.getNombreCurso() + "' no tiene vacantes disponibles.");
        }
        Inscripcion nuevaInscripcion = new Inscripcion();
        nuevaInscripcion.setAlumno(alumno);
        nuevaInscripcion.setCurso(curso);
        nuevaInscripcion.setFechaInscripcion(LocalDate.now());
        nuevaInscripcion.setEstadoInscripcion("Procesando");

        Inscripcion inscripcionGuardada = inscripcionRepository.save(nuevaInscripcion);

        curso.setVacantes(curso.getVacantes() - 1);
        cursoRepository.save(curso);
        return inscripcionGuardada;
    }

    @Override
    public Optional<MostrarInscripcionDTO> buscarInscripconPorCodigo(long codInsc){
        return inscripcionRepository.findById(codInsc)
                .map(inscripcion -> {
                    return new MostrarInscripcionDTO(
                            inscripcion.getCodInscripcion(),
                            inscripcion.getAlumno().getNombre(),
                            inscripcion.getCurso().getNombreCurso(),
                            inscripcion.getFechaInscripcion(),
                            inscripcion.getEstadoInscripcion()
                    );
                });
    }

    @Override
    public List<MostrarInscripcionDTO> listarInscripciones(){
        return inscripcionRepository.findAll().stream()
                .map(inscripcion ->{
                    String nombreAlumno = inscripcion.getAlumno().getNombre();
                    String nombreCurso = inscripcion.getCurso().getNombreCurso();

                    return new MostrarInscripcionDTO(
                            inscripcion.getCodInscripcion(),
                            nombreAlumno,
                            nombreCurso,
                            inscripcion.getFechaInscripcion(),
                            inscripcion.getEstadoInscripcion()
                    );
                }).collect(Collectors.toList());
    }
    @Override
    public void eliminarInscripcion(long codInsc){
        inscripcionRepository.deleteById(codInsc);
    }


    @Override
    @Transactional
    public Inscripcion actualizarInscripcion(long codInscripcion, Long nuevoCursoId, String nuevoEstado) throws CupoCompletoException {
        Inscripcion inscripcionExistente = inscripcionRepository.findById(codInscripcion)
                .orElseThrow(() -> new EntityNotFoundException("Inscripción no encontrada con ID: " + codInscripcion));

        if (nuevoCursoId != null && !nuevoCursoId.equals(inscripcionExistente.getCurso().getCodCurso())) {
            Curso nuevoCurso = cursoRepository.findById(nuevoCursoId)
                    .orElseThrow(() -> new EntityNotFoundException("Curso no encontrado con ID: " + nuevoCursoId));
            Curso cursoAnterior = inscripcionExistente.getCurso();

            if (nuevoCurso.getVacantes() <= 0) {
                throw new CupoCompletoException("El curso '" + nuevoCurso.getNombreCurso() + "' no tiene vacantes disponibles.");
            }
            nuevoCurso.setVacantes(nuevoCurso.getVacantes() - 1);
            cursoRepository.save(nuevoCurso);
            cursoAnterior.setVacantes(cursoAnterior.getVacantes() + 1);
            cursoRepository.save(cursoAnterior);

            inscripcionExistente.setCurso(nuevoCurso);
        }
        if (nuevoEstado != null) {
            inscripcionExistente.setEstadoInscripcion(nuevoEstado);
        }
        return inscripcionRepository.save(inscripcionExistente);
    }
}
