package com.example.pract.api.service;

import com.example.pract.api.model.Task;
import com.example.pract.api.repo.ProjectRepo;
import com.example.pract.api.repo.TaskRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TaskService {

    private TaskRepo taskRepo;

    @Autowired
    public TaskService(TaskRepo taskRepo) {
        this.taskRepo = taskRepo;
    }

    public List<Task> getAllTasks() {
        List<Task> tasks = taskRepo.findAll();
        return tasks;
    }

    public Optional<Task> getTaskById(Long id) {
        return taskRepo.findById(id);
    }

    public Task createTask(Task task) {
        return taskRepo.save(task);
    }

    public Task updateTask(Long id, Task task) {
        Optional<Task> taskOptional = taskRepo.findById(id);
        if (taskOptional.isPresent()) {
            Task updatedTask = taskOptional.get();
            updatedTask.setProject(task.getProject());
            updatedTask.setDescription(task.getDescription());
            updatedTask.setDueDate(task.getDueDate());
            updatedTask.setStatus(task.getStatus());
            //updatedTask.setEmployee(task.getEmployee());
            return taskRepo.save(task);
        }
        return null;
    }

    public Task updateTaskStatus(Long id, String status) {
        Optional<Task> taskOptional = taskRepo.findById(id);
        if (taskOptional.isPresent()) {
            Task task = taskOptional.get();
            task.setStatus(status);
            return taskRepo.save(task);
        }
        return null;
    }

    public boolean deleteTask(Long id) {
        Optional<Task> taskOptional = taskRepo.findById(id);
        if (taskOptional.isPresent()) {
            taskRepo.delete(taskOptional.get());
            return true;
        }
        return false;
    }
}
