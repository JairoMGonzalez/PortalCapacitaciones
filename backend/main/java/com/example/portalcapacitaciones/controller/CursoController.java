package com.example.portalcapacitaciones.controller;

import com.example.portalcapacitaciones.model.Curso;
import com.example.portalcapacitaciones.service.CursoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cursos")
@CrossOrigin("*")
public class CursoController {

    private final CursoService service;

    public CursoController(CursoService service) {
        this.service = service;
    }

    // LISTAR
    @GetMapping
    public List<Curso> listar() {
        return service.listar();
    }

    // CREAR
    @PostMapping
    public Curso crear(@RequestBody Curso curso) {
        return service.crear(curso);
    }

    // OBTENER POR ID
    @GetMapping("/{id}")
    public Curso obtenerCurso(@PathVariable Long id) {
        return service.obtenerPorId(id);
    }

    // 🔥 ACTUALIZAR (NECESARIO PARA EDITAR)
    @PutMapping("/{id}")
    public Curso actualizar(@PathVariable Long id, @RequestBody Curso curso) {
        return service.actualizar(id, curso);
    }

    // 🔥 ELIMINAR (NECESARIO PARA ELIMINAR)
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        service.eliminar(id);
    }
}
