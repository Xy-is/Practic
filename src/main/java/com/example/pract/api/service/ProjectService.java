package com.example.pract.api.service;

import com.example.pract.api.model.Project;
import com.example.pract.api.repo.ProjectRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private ProjectRepo projectRepo;

    @Autowired
    public ProjectService(ProjectRepo projectRepo) {
        this.projectRepo = projectRepo;
    }

    public List<Project> getAllProjects() {
        List<Project> projects = projectRepo.findAll();
        return projects;
    }

    public Optional<Project> getProjectsById(Long id) {
        Optional<Project> project = projectRepo.findById(id);
        return project;
    }

    public Project createProject(Project project) {
        Project project1 = new Project();
        project1.setName(project.getName());
        project1.setDescription(project.getDescription());
        project1.setDepartment(project.getDepartment());
        project1.setTasks(project.getTasks());
        project1.setStatus(project.getStatus());
        projectRepo.save(project1);
        return project1;
    }

    public Project updateProject(Long id, Project project) {
        Optional<Project> projectOptional = projectRepo.findById(id);
        if (projectOptional.isPresent()) {
            Project project1 = projectOptional.get();
            project1.setName(project.getName());
            project1.setDescription(project.getDescription());
            project1.setDepartment(project.getDepartment());
            project1.setTasks(project.getTasks());
            project1.setStatus(project.getStatus());
            projectRepo.save(project1);
            return project1;
        }
        return null;
    }

    public Project updateProjectStatus(Long id, String status) {
        Optional<Project> projectOptional = projectRepo.findById(id);
        if (projectOptional.isPresent()) {
            Project project1 = projectOptional.get();
            project1.setStatus(status);
            projectRepo.save(project1);
            return project1;
        }
        return null;
    }


    public boolean deleteProject(Long id) {
        Optional<Project> projectOptional = projectRepo.findById(id);
        if (projectOptional.isPresent()) {
            projectRepo.delete(projectOptional.get());
            return true;
        }
        return false;
    }


}
