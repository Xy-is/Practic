package com.example.pract.api.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@Entity
@Table(name = "departments")
public class Department {

    public Department(Long id, String name, Long managerId, List<Project> projects) {
        this.id = id;
        this.name = name;
        this.managerId = managerId;
        this.projects = projects;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @Getter
    private String name;

    @Setter
    @Getter
    private Long managerId;

    @OneToMany(mappedBy = "department")
    @JsonManagedReference
    @Setter
    @Getter
    private List<Employee> employees;

    @OneToMany(mappedBy = "department")
    @Setter
    @Getter
    private List<Project> projects;

    public Department() {
    }
}
