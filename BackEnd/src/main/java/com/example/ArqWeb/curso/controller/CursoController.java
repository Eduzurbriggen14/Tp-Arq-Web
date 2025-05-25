package com.example.ArqWeb.curso.controller;

import com.example.ArqWeb.curso.dto.CursoDTO;
import com.example.ArqWeb.curso.entity.Curso;
import com.example.ArqWeb.curso.service.CursoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/cursos")
public class CursoController {

    private final CursoService cursoService;

    public CursoController(CursoService cursoService) {
        this.cursoService = cursoService;
    }

    @PostMapping
    public ResponseEntity<?> crearCurso(@RequestBody Curso curso, UriComponentsBuilder uri) {
        Curso nuevoCurso = cursoService.crearCurso(curso);
        URI url = uri.path("/api/cursos/{codigo}").buildAndExpand(nuevoCurso.getCodCurso()).toUri();
        return ResponseEntity.created(url).body(nuevoCurso);
    }

    @GetMapping
    public ResponseEntity<List<CursoDTO>> listarCursos() {
        List<CursoDTO> listadoCursosDTO = cursoService.listarCursos().stream()
                .map(curso -> new CursoDTO(curso.getCodCurso(),curso.getNombreCurso(), curso.getDescCurso(), curso.getPrecioCurso(), curso.getVacantes()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(listadoCursosDTO);
    }

    @GetMapping("/{codigo}")
    public ResponseEntity<?> obtenerCursoPorCodigo(@PathVariable long codigo) {
        Optional<Curso> cursoOptional = cursoService.obtenerCursoPorCodigo(codigo);
        if (cursoOptional.isPresent()){
            CursoDTO cursoDto = new CursoDTO(
                    cursoOptional.get().getCodCurso(),
                    cursoOptional.get().getNombreCurso(),
                    cursoOptional.get().getDescCurso(),
                    cursoOptional.get().getPrecioCurso(),
                    cursoOptional.get().getVacantes()
            );
            return ResponseEntity.ok(cursoDto);

        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Curso no encontrado con ese codigo nro: "+ codigo);
        }
    }

    @DeleteMapping("/{codigo}")
    public ResponseEntity<?> eliminarCurso(@PathVariable long codigo) {
        Optional<Curso> cursoOptional = cursoService.obtenerCursoPorCodigo(codigo);
        if (cursoOptional.isPresent()) {
            cursoService.eliminarCurso(codigo);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontró el curso con código: " + codigo);
        }
    }


}