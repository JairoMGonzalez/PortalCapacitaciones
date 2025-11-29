package com.example.portalcapacitaciones.service;

import com.example.portalcapacitaciones.model.Usuario;
import com.example.portalcapacitaciones.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UsuarioRepository repo;

    public AuthService(UsuarioRepository repo) {
        this.repo = repo;
    }

    public Usuario login(String correo, String password) {

        Usuario usuario = repo.findByCorreo(correo);

        if (usuario == null) return null;

        if (!usuario.getPassword().equals(password)) return null;

        return usuario;
    }
}
