package com.example.pract.api.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class SignInDto {
    @Getter @Setter
    private String email;
    @Getter @Setter
    private String password;
}
