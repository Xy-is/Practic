package com.example.pract.api.repo;


import com.example.pract.api.model.Project;
import com.example.pract.api.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TaskRepo extends JpaRepository<Task, Long> {
}