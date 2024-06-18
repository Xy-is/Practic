package com.example.pract.api.repo;

import com.example.pract.api.model.Department;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DepartmentRepo extends JpaRepository<Department, Long> {
}