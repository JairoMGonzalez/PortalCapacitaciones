package com.example.portalcapacitaciones.controller;

import com.example.portalcapacitaciones.model.Curso;
import com.example.portalcapacitaciones.model.Progreso;
import com.example.portalcapacitaciones.model.Usuario;
import com.example.portalcapacitaciones.repository.CursoRepository;
import com.example.portalcapacitaciones.repository.UsuarioRepository;
import com.example.portalcapacitaciones.service.ProgresoService;
import com.example.portalcapacitaciones.service.InsigniaService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/progreso")
@CrossOrigin("*")
public class ProgresoController {

    private final ProgresoService progresoService;
    private final UsuarioRepository usuarioRepo;
    private final CursoRepository cursoRepo;
    private final InsigniaService insigniaService;

    public ProgresoController(ProgresoService progresoService,
                              UsuarioRepository usuarioRepo,
                              CursoRepository cursoRepo,
                              InsigniaService insigniaService) {
        this.progresoService = progresoService;
        this.usuarioRepo = usuarioRepo;
        this.cursoRepo = cursoRepo;
        this.insigniaService = insigniaService;
    }

    @PostMapping("/marcar")
    public Progreso marcar(@RequestParam Long usuarioId,
                           @RequestParam Long cursoId,
                           @RequestParam String estado) {

        // Buscar entidades
        Usuario usuario = usuarioRepo.findById(usuarioId).orElse(null);
        Curso curso = cursoRepo.findById(cursoId).orElse(null);

        // Guardar progreso
        Progreso progreso = progresoService.marcar(usuario, curso, estado);

        // Si el usuario completó el curso, generar insignia automáticamente
        if ("completado".equalsIgnoreCase(estado)) {
            insigniaService.generarInsignia(usuarioId, cursoId);
        }

        return progreso;
    }
}
