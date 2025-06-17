package com.example.ArqWeb;


import com.example.ArqWeb.alumno.controller.AlumnoController;
import com.example.ArqWeb.alumno.dto.AlumnoDTO;
import com.example.ArqWeb.alumno.entity.Alumno;
import com.example.ArqWeb.alumno.service.AlumnoService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AlumnoControllerTest {

    @InjectMocks
    private AlumnoController alumnoController;

    @Mock
    private AlumnoService alumnoService;

    private Alumno alumno;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        alumno = new Alumno();
        alumno.setLegajo(1);
        alumno.setNombre("Juan");
        alumno.setApellido("Pérez");
        alumno.setDni(12345678);
    }

    @Test
    void listarAlumnos_deberiaRetornarListaDeAlumnoDTO() {
        when(alumnoService.listarAlumnos()).thenReturn(List.of(alumno));

        ResponseEntity<List<AlumnoDTO>> respuesta = alumnoController.listarAlumnos();

        assertEquals(200, respuesta.getStatusCodeValue());
        assertEquals(1, respuesta.getBody().size());
        assertEquals("Juan", respuesta.getBody().get(0).nombre());
    }

    @Test
    void obtenerAlumnoPorLegajo_existente_deberiaRetornarAlumnoDTO() {
        when(alumnoService.obtenerAlumnoPorLegajo(1L)).thenReturn(Optional.of(alumno));

        ResponseEntity<?> respuesta = alumnoController.obtenerAlumnoPorLegajo(1);

        assertEquals(200, respuesta.getStatusCodeValue());
        AlumnoDTO dto = (AlumnoDTO) respuesta.getBody();
        assertEquals("Juan", dto.nombre(), "El nombre del alumno no coincide");

        verify(alumnoService).obtenerAlumnoPorLegajo(1);
    }

    @Test
    void obtenerAlumnoPorLegajo_inexistente_deberiaRetornarNotFound() {
        when(alumnoService.obtenerAlumnoPorLegajo(1L)).thenReturn(Optional.empty());

        ResponseEntity<?> respuesta = alumnoController.obtenerAlumnoPorLegajo(1);

        assertEquals(404, respuesta.getStatusCodeValue());
    }


}
