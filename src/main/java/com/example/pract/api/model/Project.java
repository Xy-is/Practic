package com.example.pract.api.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@Entity
@Table(name = "projects")
public class Project {

    public Project(Long id, String name, String description, Department department, String status, List<Task> tasks) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.department = department;
        this.status = status;
        this.tasks = tasks;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @Getter
    private String name;

    @Setter
    @Getter
    private String description;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "department_id")
    @Setter
    @Getter
    private Department department;

    @Setter
    @Getter
    private String status;

    @OneToMany(mappedBy = "project", fetch = FetchType.EAGER)
    @Setter
    @Getter
    private List<Task> tasks;

    public Project() {
    }
}
