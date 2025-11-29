package com.example.portalcapacitaciones.controller;

import com.example.portalcapacitaciones.model.Curso;
import com.example.portalcapacitaciones.model.Insignia;
import com.example.portalcapacitaciones.model.Usuario;
import com.example.portalcapacitaciones.repository.CursoRepository;
import com.example.portalcapacitaciones.repository.UsuarioRepository;
import com.example.portalcapacitaciones.service.InsigniaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/insignias")
@CrossOrigin("*")
public class InsigniaController {

    private final InsigniaService service;
    private final UsuarioRepository usuarioRepo;
    private final CursoRepository cursoRepo;

    public InsigniaController(InsigniaService service,
                              UsuarioRepository usuarioRepo,
                              CursoRepository cursoRepo) {
        this.service = service;
        this.usuarioRepo = usuarioRepo;
        this.cursoRepo = cursoRepo;
    }

    @GetMapping("/usuario/{usuarioId}")
    public List<Insignia> obtenerInsigniasUsuario(@PathVariable Long usuarioId) {
        return service.obtenerPorUsuario(usuarioId);
    }

    @PostMapping("/generar")
    public Insignia generar(@RequestParam Long usuarioId,
                            @RequestParam Long cursoId) {

        Usuario usuario = usuarioRepo.findById(usuarioId).orElse(null);
        Curso curso = cursoRepo.findById(cursoId).orElse(null);

        return service.generarInsignia(usuarioId, cursoId);
    }
}

