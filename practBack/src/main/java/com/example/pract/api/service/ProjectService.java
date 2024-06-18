package com.example.pract.api.service;

import com.example.pract.api.dto.ProjectDto;
import com.example.pract.api.dto.TaskDto;
import com.example.pract.api.model.Project;
import com.example.pract.api.model.Task;
import com.example.pract.api.repo.ProjectRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private ProjectRepo projectRepo;

    @Autowired
    public ProjectService(ProjectRepo projectRepo) {
        this.projectRepo = projectRepo;
    }

    private ProjectDto convertToProjectDto(Project project) {
        ProjectDto dto = new ProjectDto();
        dto.setId(project.getId());
        dto.setName(project.getName());
        dto.setDescription(project.getDescription());
        dto.setDepartmentName(project.getDepartment().getName());
        dto.setStatus(project.getStatus());
        dto.setTaskDtos(project.getTasks().stream()
                .map(this::convertToTaskDto)
                .collect(Collectors.toList()));
        return dto;
    }

    private TaskDto convertToTaskDto(Task task) {
        TaskDto dto = new TaskDto();
        dto.setId(task.getId());
        dto.setName(task.getName());
        dto.setDescription(task.getDescription());
        dto.setStatus(task.getStatus());
        dto.setDueDate(task.getDueDate());
        dto.setProjectName(task.getProject().getName());
        return dto;
    }

    public List<ProjectDto> getAllProjects() {
        return projectRepo.findAll().stream()
                .map(this::convertToProjectDto)
                .collect(Collectors.toList());
    }

    public ProjectDto getProjectById(Long id) {
        return projectRepo.findById(id)
                .map(this::convertToProjectDto)
                .orElse(null); // or throw an exception if preferred
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
