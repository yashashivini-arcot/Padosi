package com.padosi.api.service;

import com.padosi.api.dto.AuthRequest;
import com.padosi.api.dto.RegisterRequest;
import com.padosi.api.model.Participation;
import com.padosi.api.model.User;
import com.padosi.api.repository.ParticipationRepository;
import com.padosi.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private ParticipationRepository participationRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already in use");
        }
        if (userRepository.findByFlatNumber(request.getFlatNumber()).isPresent()) {
            throw new RuntimeException("Flat is already registered");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setFlatNumber(request.getFlatNumber());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        
        user = userRepository.save(user);
        
        Participation participation = new Participation();
        participation.setUser(user);
        participation.setLastActivityDate(LocalDate.now());
        participationRepository.save(participation);
        
        return user;
    }

    public User login(AuthRequest request) {
        Optional<User> optionalUser = userRepository.findByEmail(request.getEmail());
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                return user;
            }
        }
        throw new RuntimeException("Invalid email or password");
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }
}
