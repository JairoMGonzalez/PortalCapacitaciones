package com.example.portalcapacitaciones.repository;

import com.example.portalcapacitaciones.model.Insignia;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InsigniaRepository extends JpaRepository<Insignia, Long> {
    List<Insignia> findByUsuarioId(Long usuarioId);
}
