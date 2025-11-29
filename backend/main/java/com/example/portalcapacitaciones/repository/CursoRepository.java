package com.example.portalcapacitaciones.repository;
import com.example.portalcapacitaciones.model.Curso;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CursoRepository extends JpaRepository<Curso, Long> {
    List<Curso> findByModulo(String modulo);
}
