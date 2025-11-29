package com.example.portalcapacitaciones.controller;

import com.example.portalcapacitaciones.model.Usuario;
import com.example.portalcapacitaciones.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {

    private final AuthService service;

    public AuthController(AuthService service) {
        this.service = service;
    }

    @PostMapping("/login")
    public Usuario login(@RequestBody Usuario datos) {
        return service.login(datos.getCorreo(), datos.getPassword());
    }
}
