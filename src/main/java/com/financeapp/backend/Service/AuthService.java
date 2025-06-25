package com.financeapp.backend.Service;

import com.financeapp.backend.DTOs.LoginRequest;
import com.financeapp.backend.DTOs.SignupRequest;
import com.financeapp.backend.Model.User;
import com.financeapp.backend.Repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepo userRepo;
    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    public User register(SignupRequest request){
        if(userRepo.findByEmail(request.getEmail()).isPresent()){
            throw new RuntimeException("Email already registered");
        }
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(bCryptPasswordEncoder.encode(request.getPassword()));

        return userRepo.save(user);
    }
    public User login(LoginRequest request){
        Optional<User> userOptional = userRepo.findByEmail(request.getEmail());
        if(userOptional.isEmpty()){
            throw new RuntimeException("Invalid Credentails");
        }
        User user = userOptional.get();
        if(!bCryptPasswordEncoder.matches(request.getPassword(), user.getPassword())){
            throw new RuntimeException("Invalid Credentials");
        }
        return user;
    }
}
