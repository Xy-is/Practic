package com.example.pract.api.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@Entity
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @Getter
    private String firstName;

    @Setter
    @Getter
    private String lastName;

    @Setter
    @Getter
    private String position;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "department_id")
    @JsonBackReference
    @Setter
    @Getter
    private Department department;

    @OneToMany(mappedBy = "employee")
    @JsonBackReference
    @Setter
    @Getter
    private List<Task> tasks;

    public Employee() {
    }
}
