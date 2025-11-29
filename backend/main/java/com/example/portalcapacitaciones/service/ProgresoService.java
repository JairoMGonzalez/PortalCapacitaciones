package com.example.portalcapacitaciones.service;

import com.example.portalcapacitaciones.model.Curso;
import com.example.portalcapacitaciones.model.Progreso;
import com.example.portalcapacitaciones.model.Usuario;
import com.example.portalcapacitaciones.repository.ProgresoRepository;
import org.springframework.stereotype.Service;

@Service
public class ProgresoService {

    private final ProgresoRepository repo;

    public ProgresoService(ProgresoRepository repo) {
        this.repo = repo;
    }

    public Progreso marcar(Usuario usuario, Curso curso, String estado) {
        Progreso p = new Progreso();
        p.setUsuario(usuario);
        p.setCurso(curso);
        p.setEstado(estado);
        return repo.save(p);
    }
}

