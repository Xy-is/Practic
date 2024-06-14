package com.example.pract.api.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;


@Data
@Entity
@Table(name = "tasks")
public class Task {

    public Task(Long id, String description, Project project, Employee employee, String status, Date dueDate) {
        this.id = id;
        this.description = description;
        this.project = project;
        this.employee = employee;
        this.status = status;
        this.dueDate = dueDate;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @Getter
    private String description;

    @Setter
    @Getter
    private String status;

    @Setter
    @Getter
    private Date dueDate;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "employee_id")
    @JsonBackReference
    private Employee employee;

    @Setter
    @Getter
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "project_id")
    @JsonBackReference
    private Project project;

    public Task() {

    }
}
