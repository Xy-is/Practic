package com.example.pract.api.repo;

import com.example.pract.api.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EmployeeRepo extends JpaRepository<Employee, Long> {
    List<Employee> findAllByLastName(String lastName);
    Optional<Employee> findByLastName(String lastName);
    Optional<Employee> findById(Long id);
}