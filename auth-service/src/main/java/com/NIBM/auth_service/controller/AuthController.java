package com.NIBM.auth_service.controller;

import com.NIBM.auth_service.dto.AuthRequest;
import com.NIBM.auth_service.dto.AuthResponse;
import com.NIBM.auth_service.security.JwtUtil;
import io.jsonwebtoken.Jwt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin // Allow frontend or other origins
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<String> getMe(@AuthenticationPrincipal Jwt jwt) {
        String username = String.valueOf(jwt.getClass()); // or sub
        return ResponseEntity.ok("Logged in as: " + username);
    }

}
