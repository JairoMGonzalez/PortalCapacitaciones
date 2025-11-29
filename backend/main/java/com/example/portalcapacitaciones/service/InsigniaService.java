package com.example.portalcapacitaciones.service;

import com.example.portalcapacitaciones.model.Curso;
import com.example.portalcapacitaciones.model.Insignia;
import com.example.portalcapacitaciones.model.Usuario;
import com.example.portalcapacitaciones.repository.CursoRepository;
import com.example.portalcapacitaciones.repository.InsigniaRepository;
import com.example.portalcapacitaciones.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InsigniaService {

    private final InsigniaRepository repo;
    private final UsuarioRepository usuarioRepo;
    private final CursoRepository cursoRepo;

    public InsigniaService(InsigniaRepository repo,
                           UsuarioRepository usuarioRepo,
                           CursoRepository cursoRepo) {
        this.repo = repo;
        this.usuarioRepo = usuarioRepo;
        this.cursoRepo = cursoRepo;
    }

    public Insignia generarInsignia(Long usuarioId, Long cursoId) {

        // 1️⃣ Buscar si YA existe una insignia para ese usuario + curso
        List<Insignia> existentes = repo.findByUsuarioId(usuarioId)
                .stream()
                .filter(i -> i.getCurso().getId().equals(cursoId))
                .toList();

        if (!existentes.isEmpty()) {
            return existentes.get(0);  // ⚠ Ya existe → se retorna la misma
        }

        // 2️⃣ Cargar el usuario REAL desde la base de datos
        Usuario usuario = usuarioRepo.findById(usuarioId).orElse(null);

        // 3️⃣ Cargar el curso REAL desde la base de datos
        Curso curso = cursoRepo.findById(cursoId).orElse(null);

        if (usuario == null || curso == null) {
            return null; // evitar errores
        }

        // 4️⃣ Crear la nueva insignia
        Insignia nueva = new Insignia();
        nueva.setUsuario(usuario);
        nueva.setCurso(curso);
        nueva.setImagenUrl("medalla.png"); // Imagen mostrada en frontend

        return repo.save(nueva);
    }

    public List<Insignia> obtenerPorUsuario(Long usuarioId) {
        return repo.findByUsuarioId(usuarioId);
    }
}
