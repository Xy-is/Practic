package com.example.pract.api.repo;


import com.example.pract.api.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProjectRepo extends JpaRepository<Project, Long> {
}