package com.padosi.api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class RegisterRequest {
    @NotBlank
    private String name;
    
    @Email @NotBlank
    private String email;
    
    @NotBlank
    private String password;
    
    @NotBlank
    @Pattern(regexp = "^(G|1|2|3|4|5)-(0[1-9]|1[0-2])$", message = "Invalid flat number. Must be G-01 to G-12, or 1-01 to 5-12")
    private String flatNumber;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getFlatNumber() { return flatNumber; }
    public void setFlatNumber(String flatNumber) { this.flatNumber = flatNumber; }
}
