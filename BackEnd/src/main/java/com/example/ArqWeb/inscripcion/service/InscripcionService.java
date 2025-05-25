package com.example.ArqWeb.inscripcion.service;

import com.example.ArqWeb.exception.CupoCompletoException;
import com.example.ArqWeb.inscripcion.dto.MostrarInscripcionDTO;
import com.example.ArqWeb.inscripcion.entity.Inscripcion;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;

public interface InscripcionService {
    @Transactional
    Inscripcion guardarInscripcion(Long alumnoId, Long cursoId) throws CupoCompletoException;

    Optional<MostrarInscripcionDTO> buscarInscripconPorCodigo(long codInsc);

    List<MostrarInscripcionDTO> listarInscripciones();

    void eliminarInscripcion(long codInsc);

    @Transactional
    Inscripcion actualizarInscripcion(long codInscripcion, Long nuevoCursoId, String nuevoEstado) throws CupoCompletoException;
}
