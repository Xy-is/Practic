package com.example.pract.api.service;


import com.example.pract.api.dto.DepartmentDto;
import com.example.pract.api.dto.EmployeeDto;
import com.example.pract.api.dto.ProjectDto;
import com.example.pract.api.model.Department;
import com.example.pract.api.model.Employee;
import com.example.pract.api.model.Project;
import com.example.pract.api.repo.DepartmentRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DepartmentService {

    private DepartmentRepo departmentRepo;


    @Autowired
    public DepartmentService(DepartmentRepo departmentRepo) {
        this.departmentRepo = departmentRepo;
    }

    public DepartmentDto findById(Long id) {
        Optional<Department> department = departmentRepo.findById(id);
        return department.map(this::convertToDepartmentDto).orElse(null);
    }

    public Department save(Department department) {
        Department department1 = new Department();
        department1.setName(department.getName());
        department1.setManagerId(department.getManagerId());
        departmentRepo.save(department1);
        return department1;
    }

    public Department update(Long id, Department department) {
        Optional<Department> departmentOptional = departmentRepo.findById(id);
        if (departmentOptional.isPresent()) {
            Department department1 = departmentOptional.get();
            department1.setName(department.getName());
            department1.setManagerId(department.getManagerId());
            departmentRepo.save(department1);
            return department1;
        }
        else {
            throw new RuntimeException("Department not found with id " + id);
        }
    }

    public boolean delete(Long id) {
        Optional<Department> departmentOptional = departmentRepo.findById(id);
        if (departmentOptional.isPresent()) {
            departmentRepo.deleteById(id);
            return true;
        }
        return false;
    }

    public List<DepartmentDto> findAllDepartment() {
        List<Department> departments = departmentRepo.findAll();
        return departments.stream()
                .map(this::convertToDepartmentDto)
                .collect(Collectors.toList());
    }

    private DepartmentDto convertToDepartmentDto(Department department) {
        DepartmentDto dto = new DepartmentDto();
        dto.setId(department.getId());
        dto.setName(department.getName());
        dto.setManagerId(department.getManagerId());
        dto.setEmployeeDtos(department.getEmployees().stream()
                .map(this::convertToEmployeeDto)
                .collect(Collectors.toList()));
        dto.setProjectDtos(department.getProjects().stream()
                .map(this::convertToProjectDto)
                .collect(Collectors.toList())
        );
        return dto;
    }

    private EmployeeDto convertToEmployeeDto(Employee employee) {
        EmployeeDto dto = new EmployeeDto();
        dto.setId(employee.getId());
        dto.setFirstName(employee.getFirstName());
        dto.setLastName(employee.getLastName());
        dto.setPosition(employee.getPosition());
        dto.setDepartmentName(employee.getDepartment().getName()); // Assuming there is a 'getName' method in Department
        return dto;
    }

    private ProjectDto convertToProjectDto(Project project) {
        ProjectDto dto = new ProjectDto();
        dto.setId(project.getId());
        dto.setName(project.getName());
        dto.setDescription(project.getDescription());
        dto.setDepartmentName(project.getDepartment().getName());
        dto.setStatus(project.getStatus());
        return dto;
    }



}
