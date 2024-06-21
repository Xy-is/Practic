package com.example.pract.api.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class SignUpDto {
    @Getter @Setter
    private String email;
    @Getter @Setter
    private String firstName;
    @Getter @Setter
    private String lastName;
    @Getter @Setter
    private String password;
}
