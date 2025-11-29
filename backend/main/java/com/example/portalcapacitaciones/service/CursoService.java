package com.example.portalcapacitaciones.service;

import com.example.portalcapacitaciones.model.Curso;
import com.example.portalcapacitaciones.repository.CursoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CursoService {

    private final CursoRepository repo;

    public CursoService(CursoRepository repo) {
        this.repo = repo;
    }

    public List<Curso> listar() {
        return repo.findAll();
    }

    public Curso obtenerPorId(Long id) {
        return repo.findById(id).orElse(null);
    }

    public Curso crear(Curso curso) {
        return repo.save(curso);
    }

    public Curso actualizar(Long id, Curso datos) {
        Curso curso = repo.findById(id).orElseThrow();

        curso.setNombre(datos.getNombre());
        curso.setDescripcion(datos.getDescripcion());
        curso.setModulo(datos.getModulo());

        return repo.save(curso);
    }

    public void eliminar(Long id) {
        repo.deleteById(id);
    }
}
