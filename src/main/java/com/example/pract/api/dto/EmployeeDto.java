package com.example.pract.api.dto;

import lombok.Getter;
import lombok.Setter;

public class EmployeeDto {
    @Getter
    @Setter
    private Long id;
    @Getter
    @Setter
    private String firstName;
    @Getter
    @Setter
    private String lastName;
    @Getter
    @Setter
    private String position;
    @Getter
    @Setter
    private String departmentName;


}