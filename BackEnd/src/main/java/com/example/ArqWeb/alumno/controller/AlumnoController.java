package com.example.ArqWeb.alumno.controller;

import com.example.ArqWeb.alumno.dto.AlumnoDTO;
import com.example.ArqWeb.alumno.dto.AlumnoPatchDTO;
import com.example.ArqWeb.alumno.entity.Alumno;
import com.example.ArqWeb.alumno.service.AlumnoService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/alumnos")
public class AlumnoController {

    @Autowired
    private AlumnoService alumnoService;

    @GetMapping
    public ResponseEntity<List<AlumnoDTO>> listarAlumnos(){
        List<AlumnoDTO> alumnoDTOS = alumnoService.listarAlumnos().stream()
                .map(a -> new AlumnoDTO(a.getLegajo(), a.getNombre(), a.getApellido(), a.getDni()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(alumnoDTOS);
    }

    @GetMapping("/{legajo}")
    public ResponseEntity<?> obtenerAlumnoPorLegajo(@PathVariable long legajo){
        Optional<Alumno> alumno = alumnoService.obtenerAlumnoPorLegajo(legajo);
        if (alumno.isPresent()){
            AlumnoDTO alumnoDTO = new AlumnoDTO(
                    alumno.get().getLegajo(),
                    alumno.get().getNombre(),
                    alumno.get().getApellido(),
                    alumno.get().getDni()
            );
            return ResponseEntity.ok(alumnoDTO);
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<?> registrarAlumno(@RequestBody Alumno alumno, UriComponentsBuilder uri){
        int dni = alumno.getDni();
        if(alumnoService.existeAlumnoConDni(dni)){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Ya ha sido registrado el dni: " + dni);
        }
        URI url = uri.path("/api/alumnos/{legajo}").buildAndExpand(alumno.getLegajo()).toUri();
        return ResponseEntity.created(url).body(alumnoService.crearAlumno(alumno));
    }

   /* @PutMapping("/{legajo}")
    public ResponseEntity<Alumno> modificarAlumno(@PathVariable Long legajo, @RequestBody Alumno alumnoActualizado){
        Optional<Alumno> alumnoAModificar = alumnoService.obtenerAlumnoPorLegajo(legajo);
        if (alumnoAModificar.isPresent()) {
            Alumno alumnoExistente = alumnoAModificar.get();
            alumnoExistente.setNombre(alumnoActualizado.getNombre());
            alumnoExistente.setApellido(alumnoActualizado.getApellido());
            alumnoExistente.setCorreo(alumnoActualizado.getCorreo());

            Alumno alumnoGuardado = alumnoService.guardarAlumno(alumnoExistente);
            return ResponseEntity.ok(alumnoGuardado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }*/

    @PatchMapping("/{legajo}")
    public ResponseEntity<?> actualizarNombreApellidoAlumno(@PathVariable Long legajo, @RequestBody AlumnoPatchDTO alumnoPatch) {
        Optional<Alumno> alumnoOptional = alumnoService.obtenerAlumnoPorLegajo(legajo);

        if (alumnoOptional.isPresent()) {
            Alumno alumnoExistente = alumnoOptional.get();
            boolean actualizado = false;

            if (alumnoPatch.nombre() != null) {
                alumnoExistente.setNombre(alumnoPatch.nombre());
                actualizado = true;
            }
            if (alumnoPatch.apellido() != null) {
                alumnoExistente.setApellido(alumnoPatch.apellido());
                actualizado = true;
            }

            if (actualizado) {
                Alumno alumnoGuardado = alumnoService.guardarAlumno(alumnoExistente);
                AlumnoDTO alumnoDTOGuardado = new AlumnoDTO(alumnoGuardado.getLegajo(), alumnoGuardado.getNombre(), alumnoGuardado.getApellido(), alumnoGuardado.getDni());
                return ResponseEntity.ok(alumnoDTOGuardado);
            } else {
                return ResponseEntity.badRequest().body("No se proporcionaron campos para actualizar (nombre o apellido).");
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{legajo}")
    public ResponseEntity<Void> eliminarAlumno(@PathVariable Long legajo){
        Optional<Alumno> alumnoBuscado = alumnoService.obtenerAlumnoPorLegajo(legajo);
        if(alumnoBuscado.isPresent()){
            alumnoService.eliminarAlumno(legajo);
            return ResponseEntity.noContent().build();
        }
        else{
            return ResponseEntity.notFound().build();
        }

    }
}
