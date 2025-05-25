package com.example.ArqWeb.inscripcion.controller;

import com.example.ArqWeb.exception.CupoCompletoException;
import com.example.ArqWeb.inscripcion.dto.CrearInscripcionesDTO;
import com.example.ArqWeb.inscripcion.dto.MostrarInscripcionDTO;
import com.example.ArqWeb.inscripcion.entity.Inscripcion;
import com.example.ArqWeb.inscripcion.service.InscripcionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/inscripciones")
public class InscripcionController {

    private final InscripcionService inscripcionService;

    public InscripcionController(InscripcionService inscripcionService) {
        this.inscripcionService = inscripcionService;
    }

    @PostMapping
    public ResponseEntity<?> crearInscripcion(@RequestBody CrearInscripcionesDTO crearInscripcionesDTO, UriComponentsBuilder uri) {
        System.out.println("InscripcionController.java: codCurso recibido: " + crearInscripcionesDTO.codCurso()); // Log agregado
        try {
            Inscripcion nuevaInscripcion = inscripcionService.guardarInscripcion(
                    crearInscripcionesDTO.legajo(),
                    crearInscripcionesDTO.codCurso());

            MostrarInscripcionDTO inscripcionDTO = new MostrarInscripcionDTO(
                    nuevaInscripcion.getCodInscripcion(),
                    nuevaInscripcion.getAlumno().getNombre(),
                    nuevaInscripcion.getCurso().getNombreCurso(),
                    nuevaInscripcion.getFechaInscripcion(),
                    nuevaInscripcion.getEstadoInscripcion());


            URI url = uri.path("/api/inscripciones/{codInsc}").buildAndExpand(nuevaInscripcion.getCodInscripcion()).toUri();
            return ResponseEntity.created(url).body(inscripcionDTO);
        } catch (CupoCompletoException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (jakarta.persistence.EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error al crear la inscripción.");
        }
    }

    @GetMapping("/{codInsc}")
    public ResponseEntity<?> obtenerInscripcionPorCodigo(@PathVariable long codInsc) {
        Optional<MostrarInscripcionDTO> inscripcionDTOOptional = inscripcionService.buscarInscripconPorCodigo(codInsc);
        if (inscripcionDTOOptional.isPresent()){
            return ResponseEntity.ok(inscripcionDTOOptional);
        }
        else{
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<MostrarInscripcionDTO>> listarInscripciones() {
        List<MostrarInscripcionDTO> inscripciones = inscripcionService.listarInscripciones();
        return ResponseEntity.ok().body(inscripciones);
    }

    @DeleteMapping("/{codInsc}")
    public ResponseEntity<?> eliminarInscripcion(@PathVariable long codInsc) {
        Optional<MostrarInscripcionDTO> inscripcionBuscada = inscripcionService.buscarInscripconPorCodigo(codInsc);

        if (inscripcionBuscada.isPresent()){
            inscripcionService.eliminarInscripcion(codInsc);
            return ResponseEntity.noContent().build();
        }
        else{
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{codInsc}")
    public ResponseEntity<?> actualizarInscripcion(@PathVariable long codInsc,
                                                   @RequestParam(required = false) Long nuevoCursoId,
                                                   @RequestParam(required = false) String nuevoEstado) {
        try {
            Inscripcion inscripcionActualizada = inscripcionService.actualizarInscripcion(codInsc, nuevoCursoId, nuevoEstado);
            return ResponseEntity.ok().body(inscripcionActualizada);
        } catch (CupoCompletoException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (jakarta.persistence.EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error al actualizar la inscripción.");
        }
    }
}
